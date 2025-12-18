import express from 'express'
import pool from '../config/database.js'

const router = express.Router()

// Get all todos
router.get('/', async (req, res) => {
  try {
    const [todos] = await pool.execute(
      'SELECT id, text, completed, created_at, updated_at FROM todos ORDER BY created_at DESC'
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
      'INSERT INTO todos (text, completed) VALUES (?, ?)',
      [text.trim(), false]
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

    // Verify todo exists
    const [existingTodos] = await pool.execute(
      'SELECT id FROM todos WHERE id = ?',
      [id]
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

    values.push(id)

    await pool.execute(
      `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`,
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

    // Delete todo
    const [result] = await pool.execute(
      'DELETE FROM todos WHERE id = ?',
      [id]
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
      'DELETE FROM todos WHERE completed = ?',
      [true]
    )

    res.json({ message: `${result.affectedRows} completed todos deleted` })
  } catch (error) {
    console.error('Delete completed todos error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router

