# Todo App

A beautiful, robust todo application built with React, Express, MySQL, and Tailwind CSS. Features a modern UI with gradient backgrounds, smooth animations, and a complete set of todo management features.

## Features

### Todo Management
- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit todos inline
- ✅ Delete todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Toggle all todos at once
- ✅ Clear all completed todos
- ✅ Persistent storage in MySQL database
- ✅ Beautiful, responsive UI with Tailwind CSS
- ✅ Smooth animations and transitions
- ✅ Local storage support (frontend uses localStorage)

## Architecture

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js (optional - frontend works standalone with localStorage)
- **Database**: MySQL (optional - for backend API)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL (5.7+ or 8.0+) - Only if using backend API

### Database Setup (Optional - for backend API)

1. **Install MySQL** (if not already installed):
   - macOS: `brew install mysql && brew services start mysql`
   - Ubuntu/Debian: `sudo apt install mysql-server`
   - Windows: Download from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)

2. **Create the database and tables**:
   ```bash
   mysql -u root -p < server/database.sql
   ```
   
   Or manually run the SQL script from `server/database.sql` in your MySQL console.

3. See `MYSQL_SETUP.md` for detailed database setup instructions.

### Installation

1. **Install frontend dependencies**:
   ```bash
   npm install
   ```

2. **Install backend dependencies** (optional - only if using backend API):
   ```bash
   npm run server:install
   ```
   Or manually:
   ```bash
   cd server && npm install
   ```

3. **Configure backend environment** (optional - only if using backend API):
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `server/.env` with your MySQL credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your-mysql-password
   DB_NAME=todoapp
   FRONTEND_URL=http://localhost:5173
   ```

### Running the Application

**Frontend Development Server** (works standalone with localStorage):
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` and use localStorage for todo storage.

**Backend Server** (optional - only if using backend API):
```bash
npm run server
```
Or:
```bash
cd server && npm run dev
```

The backend will run on `http://localhost:5000`

### Build for Production

**Frontend**:
```bash
npm run build
```

**Backend** (optional):
```bash
cd server && npm start
```

## Usage

### Todo Management
- **Add a todo**: Type in the input field and click "Add" or press Enter
- **Complete a todo**: Click the checkbox or the todo text
- **Edit a todo**: Click the edit icon (pencil) next to a todo
- **Delete a todo**: Click the delete icon (trash) next to a todo
- **Filter todos**: Use the filter buttons (All, Active, Completed) in the footer
- **Toggle all**: Click the checkmark icon in the input area to toggle all todos
- **Clear completed**: Click "Clear Completed" to remove all completed todos

**Note**: The frontend uses localStorage by default. Todos are stored in your browser's local storage and persist across page refreshes.

## Project Structure

```
todoApp-cursor/
├── server/                 # Backend Express server (optional)
│   ├── config/
│   │   └── database.js    # MySQL connection pool
│   ├── routes/
│   │   └── todos.js       # Todo CRUD routes
│   ├── database.sql       # Database schema
│   ├── server.js          # Express server entry point
│   └── package.json       # Backend dependencies
├── src/
│   ├── components/
│   │   └── TodoApp.jsx    # Main todo app component
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind CSS imports
├── index.html             # HTML template
├── package.json           # Frontend dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## API Endpoints (Optional - Backend API)

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `DELETE /api/todos/completed/all` - Delete all completed todos

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Express.js** - Backend web framework (optional)
- **MySQL** - Relational database (optional)
- **localStorage** - Browser storage for todos (default)

## Environment Variables

### Backend (`server/.env`) - Optional
- `PORT` - Server port (default: 5000)
- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default: todoapp)
- `FRONTEND_URL` - Frontend URL for CORS

## License

MIT
