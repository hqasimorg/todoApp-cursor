# MySQL Setup Guide

This guide will help you set up the MySQL database for the Todo App.

## Prerequisites

- MySQL installed on your system (MySQL 5.7+ or MySQL 8.0+)
- Node.js and npm installed
- MySQL server running

## Step 1: Install MySQL

If you don't have MySQL installed:

### macOS (using Homebrew):
```bash
brew install mysql
brew services start mysql
```

### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### Windows:
Download and install from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)

## Step 2: Create Database and Tables

1. Log into MySQL:
```bash
mysql -u root -p
```

2. Run the database setup script:
```bash
mysql -u root -p < server/database.sql
```

Or manually copy and paste the SQL from `server/database.sql` into your MySQL console.

## Step 3: Create MySQL User (Optional but Recommended)

For security, create a dedicated user for the application:

```sql
CREATE USER 'todoapp_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON todoapp.* TO 'todoapp_user'@'localhost';
FLUSH PRIVILEGES;
```

## Step 4: Configure Backend Environment

1. Navigate to the server directory:
```bash
cd server
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Edit `.env` with your MySQL credentials:
```env
PORT=5000

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root                    # or 'todoapp_user' if you created one
DB_PASSWORD=your-mysql-password
DB_NAME=todoapp

# JWT Secret (change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

**Important**: Generate a strong JWT_SECRET for production. You can use:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Step 5: Install Backend Dependencies

```bash
cd server
npm install
```

Or from the root directory:
```bash
npm run server:install
```

## Step 6: Start the Backend Server

```bash
cd server
npm run dev
```

Or from the root directory:
```bash
npm run server
```

The server will start on port 5000 (or the port specified in your `.env` file).

## Step 7: Install Frontend Dependencies and Start

In a new terminal, from the root directory:

```bash
npm install
npm run dev
```

## Verification

1. Check if the database was created:
```sql
SHOW DATABASES;
USE todoapp;
SHOW TABLES;
```

You should see `users` and `todos` tables.

2. Check the server is running:
Visit `http://localhost:5000/api/health` - you should see `{"status":"OK","message":"Server is running"}`

## Troubleshooting

### Connection refused error
- Make sure MySQL server is running
- Verify your DB_HOST, DB_USER, and DB_PASSWORD in `.env`
- Check MySQL is listening on the correct port (default: 3306)

### Access denied error
- Verify your MySQL user password is correct
- Make sure the user has privileges on the `todoapp` database

### Table doesn't exist error
- Make sure you ran the `database.sql` script
- Verify you're using the correct database: `USE todoapp;`

### Port already in use
- Change the PORT in `.env` file
- Or stop the process using port 5000

## Production Considerations

1. **Database Security**:
   - Use a dedicated MySQL user with limited privileges
   - Use strong passwords
   - Enable SSL connections for remote databases

2. **JWT Secret**:
   - Use a long, random string for JWT_SECRET
   - Never commit `.env` file to version control

3. **Environment Variables**:
   - Use environment-specific `.env` files
   - Consider using a secrets management service for production

4. **Database Backups**:
   - Set up regular database backups
   - Test your backup and restore procedures

