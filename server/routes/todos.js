import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// Get all todos for the authenticated user
router.get('/', async (req, res) => {
  try {
    const [todos] = await pool.execute(
      'SELECT id, text, completed, created_at, updated_at FROM todos WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    )

    res.json(todos)
  } catch (error) {
    console.error('Get todos error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { text } = req.body

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Todo text is required' })
    }

    const [result] = await pool.execute(
      'INSERT INTO todos (user_id, text, completed) VALUES (?, ?, ?)',
      [req.user.userId, text.trim(), false]
    )

    const [todos] = await pool.execute(
      'SELECT id, text, completed, created_at, updated_at FROM todos WHERE id = ?',
      [result.insertId]
    )

    res.status(201).json(todos[0])
  } catch (error) {
    console.error('Create todo error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { text, completed } = req.body

    // Verify todo belongs to user
    const [existingTodos] = await pool.execute(
      'SELECT id FROM todos WHERE id = ? AND user_id = ?',
      [id, req.user.userId]
    )

    if (existingTodos.length === 0) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    const updates = []
    const values = []

    if (text !== undefined) {
      if (!text.trim()) {
        return res.status(400).json({ error: 'Todo text cannot be empty' })
      }
      updates.push('text = ?')
      values.push(text.trim())
    }

    if (completed !== undefined) {
      updates.push('completed = ?')
      values.push(completed)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(id, req.user.userId)

    await pool.execute(
      `UPDATE todos SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    )

    const [updatedTodos] = await pool.execute(
      'SELECT id, text, completed, created_at, updated_at FROM todos WHERE id = ?',
      [id]
    )

    res.json(updatedTodos[0])
  } catch (error) {
    console.error('Update todo error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Verify todo belongs to user
    const [result] = await pool.execute(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [id, req.user.userId]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    res.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Delete todo error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete all completed todos
router.delete('/completed/all', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM todos WHERE user_id = ? AND completed = ?',
      [req.user.userId, true]
    )

    res.json({ message: `${result.affectedRows} completed todos deleted` })
  } catch (error) {
    console.error('Delete completed todos error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router

