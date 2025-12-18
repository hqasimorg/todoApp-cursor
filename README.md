# Todo App

A beautiful, robust todo application built with React, Express, MySQL, and Tailwind CSS. Features user authentication with JWT, a modern UI with gradient backgrounds, smooth animations, and a complete set of todo management features.

## Features

### Authentication
- 🔐 User sign up and login with JWT tokens
- 🔒 Protected routes and API endpoints
- 👤 User-specific todos (each user has their own todos stored in MySQL)
- 🚪 Secure logout
- 🔑 Password hashing with bcrypt

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

## Architecture

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL (5.7+ or 8.0+)

### Database Setup

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

2. **Install backend dependencies**:
   ```bash
   npm run server:install
   ```
   Or manually:
   ```bash
   cd server && npm install
   ```

3. **Configure backend environment**:
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
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:5173
   ```

### Running the Application

You need to run both the backend and frontend servers.

**Terminal 1 - Backend Server**:
```bash
npm run server
```
Or:
```bash
cd server && npm run dev
```

The backend will run on `http://localhost:5000`

**Terminal 2 - Frontend Development Server**:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Build for Production

**Frontend**:
```bash
npm run build
```

**Backend**:
```bash
cd server && npm start
```

## Usage

### Authentication
- **Sign Up**: Click "Sign up" on the login page to create a new account
- **Login**: Enter your email and password to sign in
- **Logout**: Click the "Logout" button in the top right corner

### Todo Management
- **Add a todo**: Type in the input field and click "Add" or press Enter
- **Complete a todo**: Click the checkbox or the todo text
- **Edit a todo**: Click the edit icon (pencil) next to a todo
- **Delete a todo**: Click the delete icon (trash) next to a todo
- **Filter todos**: Use the filter buttons (All, Active, Completed) in the footer
- **Toggle all**: Click the checkmark icon in the input area to toggle all todos
- **Clear completed**: Click "Clear Completed" to remove all completed todos

**Note**: Todos are stored per user in the MySQL database. Each user only sees their own todos.

## Project Structure

```
todoApp-cursor/
├── server/                 # Backend Express server
│   ├── config/
│   │   └── database.js    # MySQL connection pool
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js        # Authentication routes (signup, login)
│   │   └── todos.js       # Todo CRUD routes
│   ├── database.sql       # Database schema
│   ├── server.js          # Express server entry point
│   └── .env.example       # Environment variables template
├── src/
│   ├── components/
│   │   ├── Login.jsx      # Login component
│   │   ├── Signup.jsx     # Signup component
│   │   ├── TodoApp.jsx    # Main todo app component
│   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   ├── contexts/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── services/
│   │   ├── api.js         # Axios instance configuration
│   │   ├── authService.js # Authentication API calls
│   │   └── todoService.js # Todo API calls
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind CSS imports
├── index.html             # HTML template
├── package.json           # Frontend dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Todos (Protected - requires JWT token)
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `DELETE /api/todos/completed/all` - Delete all completed todos

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Express.js** - Backend web framework
- **MySQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Axios** - HTTP client
- **React Router** - Client-side routing

## Environment Variables

### Backend (`server/.env`)
- `PORT` - Server port (default: 5000)
- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default: todoapp)
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (optional)
- `VITE_API_URL` - Backend API URL (default: /api, uses proxy)

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Protected API routes with authentication middleware
- CORS configured for frontend domain
- SQL injection prevention with parameterized queries

## License

MIT
