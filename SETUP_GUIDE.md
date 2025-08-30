# Farmer-Friendly Website Setup Guide

This guide will help you set up the project on a new laptop after cloning the repository.

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd Farmer-Friendly-website
```

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory
```bash
cd backend
```

### 2.2 Create Virtual Environment
```bash
python3 -m venv venv
```

### 2.3 Activate Virtual Environment
**On Linux/Mac:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### 2.4 Install Dependencies
```bash
pip install -r requirements.txt
```

### 2.5 Initialize Database (CRITICAL STEP)
This is the most important step! The database must be initialized to create all tables and the admin user.

```bash
python3 init_db.py
```

**Expected Output:**
```
🗄️ Creating database tables...
✅ Database tables created successfully!
👤 Creating default admin user...
✅ Admin user created successfully!
🎉 Database initialization completed!
```

### 2.6 Start Backend Server
```bash
python3 app.py
```

**Expected Output:**
```
🚀 AgriSupport Backend Server Starting...
📧 Mail server configured
🌐 CORS enabled for development
🔧 Development mode active
✅ Server running on http://localhost:5004
```

## Step 3: Frontend Setup

### 3.1 Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Start Frontend Development Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.2.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 4: Verify Setup

### 4.1 Test Backend Health
```bash
curl http://localhost:5004/api/health
```

**Expected Output:**
```json
{"message":"AgriSupport API is running!","status":"healthy"}
```

### 4.2 Test Frontend
Open your browser and go to: `http://localhost:5173`

### 4.3 Test Admin Login
- Go to: `http://localhost:5173/admin-login`
- Use these credentials:
  - **Email:** `agriaisha466@gmail.com`
  - **Password:** `aisha123`

## Troubleshooting

### Issue: "Failed to load dashboard data"
**Cause:** Database not initialized
**Solution:** Run `python3 init_db.py` in the backend directory

### Issue: "Failed to fetch" during signup/login
**Cause:** Backend server not running
**Solution:** Start the backend server with `python3 app.py`

### Issue: "Module not found" errors
**Cause:** Dependencies not installed
**Solution:** 
1. Activate virtual environment: `source venv/bin/activate`
2. Install dependencies: `pip install -r requirements.txt`

### Issue: "Port already in use"
**Cause:** Another process is using the port
**Solution:** 
- Kill the process using the port
- Or change the port in `backend/config.py`

## Important Notes

1. **Database Initialization is Required**: The `init_db.py` script must be run on every new setup to create the database tables and admin user.

2. **Admin Credentials**: The default admin user is created automatically:
   - Email: `agriaisha466@gmail.com`
   - Password: `aisha123`

3. **Database File**: The `agrisupport.db` file is created in the `backend/instance/` directory after running `init_db.py`.

4. **Environment**: Always activate the virtual environment before running backend commands.

## File Structure

```
Farmer-Friendly-website/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── models.py           # Database models
│   ├── routes.py           # API routes
│   ├── config.py           # Configuration
│   ├── init_db.py          # Database initialization
│   ├── requirements.txt    # Python dependencies
│   └── instance/
│       └── agrisupport.db  # SQLite database (created after init)
└── frontend/
    ├── src/
    │   ├── pages/          # React pages
    │   ├── components/     # React components
    │   ├── context/        # React context
    │   └── utils/          # Utility functions
    ├── package.json        # Node.js dependencies
    └── vite.config.js      # Vite configuration
```

## Support

If you encounter any issues:
1. Check that all prerequisites are installed
2. Ensure the database is initialized (`python3 init_db.py`)
3. Verify both backend and frontend servers are running
4. Check the console for error messages
