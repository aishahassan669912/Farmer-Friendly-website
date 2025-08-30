# Quick Setup for New Laptops

## 🚀 One-Command Setup

After cloning the repository to a new laptop, simply run:

```bash
./setup_new_laptop.sh
```

This single command will:
- ✅ Check all prerequisites (Python3, Node.js, npm)
- ✅ Set up the Python virtual environment
- ✅ Install all Python dependencies
- ✅ Initialize the database with admin user
- ✅ Install all Node.js dependencies
- ✅ Create convenient start scripts
- ✅ Test the setup

## 📋 What the Script Does

### 1. **Prerequisites Check**
- Verifies Python 3.8+ is installed
- Verifies Node.js 16+ is installed
- Verifies npm is installed
- Checks you're in the correct directory

### 2. **Backend Setup**
- Creates Python virtual environment
- Installs all Python dependencies
- Initializes SQLite database
- Creates admin user (`agriaisha466@gmail.com` / `aisha123`)

### 3. **Frontend Setup**
- Installs all Node.js dependencies

### 4. **Creates Start Scripts**
- `start-backend.sh` - Start backend server only
- `start-frontend.sh` - Start frontend server only
- `start-all.sh` - Start both servers together

## 🎯 After Running the Script

### Start the Application

**Option 1: Start both servers at once**
```bash
./start-all.sh
```

**Option 2: Start servers separately**
```bash
# Terminal 1 - Backend
./start-backend.sh

# Terminal 2 - Frontend
./start-frontend.sh
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5004
- **Admin Login**: http://localhost:5173/admin-login

### Admin Credentials
- **Email**: `agriaisha466@gmail.com`
- **Password**: `aisha123`

## 🔧 Troubleshooting

### If the script fails:
1. Make sure you're in the project root directory
2. Ensure Python 3.8+ and Node.js 16+ are installed
3. Check that you have internet connection for downloading dependencies

### If dashboards show "Failed to load dashboard data":
- The database wasn't initialized properly
- Run: `cd backend && python3 init_db.py`

### If you get permission errors:
- Make sure the script is executable: `chmod +x setup_new_laptop.sh`

## 📁 Files Created

After running the script, you'll have:
```
Farmer-Friendly-website/
├── setup_new_laptop.sh      # Setup script
├── start-backend.sh         # Start backend server
├── start-frontend.sh        # Start frontend server
├── start-all.sh            # Start both servers
├── SETUP_GUIDE.md          # Detailed setup guide
└── README_SETUP.md         # This file
```

## 🎉 Success!

Once everything is set up, you can:
- Sign up as a Farmer or NGO
- Login with any role
- Access role-specific dashboards
- Use admin features with the provided credentials

Happy coding! 🚀
