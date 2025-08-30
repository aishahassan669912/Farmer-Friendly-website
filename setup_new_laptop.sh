#!/bin/bash

# Farmer-Friendly Website Setup Script for New Laptops
# This script automates the complete setup process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Python
    if command_exists python3; then
        PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
        print_success "Python3 found: $PYTHON_VERSION"
    else
        print_error "Python3 is not installed. Please install Python 3.8 or higher."
        exit 1
    fi
    
    # Check Node.js
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js found: $NODE_VERSION"
    else
        print_error "Node.js is not installed. Please install Node.js 16 or higher."
        exit 1
    fi
    
    # Check npm
    if command_exists npm; then
        NPM_VERSION=$(npm --version)
        print_success "npm found: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    # Check if we're in the right directory
    if [ ! -f "backend/app.py" ] || [ ! -f "frontend/package.json" ]; then
        print_error "Please run this script from the root directory of the Farmer-Friendly-website project."
        exit 1
    fi
    
    print_success "All prerequisites are satisfied!"
}

# Function to setup backend
setup_backend() {
    print_header "Setting Up Backend"
    
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        print_status "Creating virtual environment..."
        python3 -m venv venv
        print_success "Virtual environment created!"
    else
        print_status "Virtual environment already exists."
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install Python dependencies
    print_status "Installing Python dependencies..."
    pip install -r requirements.txt
    print_success "Python dependencies installed!"
    
    # Initialize database
    print_status "Initializing database..."
    python3 init_db.py
    print_success "Database initialized successfully!"
    
    cd ..
}

# Function to setup frontend
setup_frontend() {
    print_header "Setting Up Frontend"
    
    cd frontend
    
    # Install Node.js dependencies
    print_status "Installing Node.js dependencies..."
    npm install
    print_success "Node.js dependencies installed!"
    
    cd ..
}

# Function to create start scripts
create_start_scripts() {
    print_header "Creating Start Scripts"
    
    # Create start-backend.sh
    cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting AgriSupport Backend Server..."
cd backend
source venv/bin/activate
python3 app.py
EOF
    
    # Create start-frontend.sh
    cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "🌐 Starting AgriSupport Frontend Server..."
cd frontend
npm run dev
EOF
    
    # Create start-all.sh
    cat > start-all.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting AgriSupport Full Stack Application..."
echo "This will start both backend and frontend servers."
echo ""

# Start backend in background
echo "Starting backend server..."
cd backend
source venv/bin/activate
python3 app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting..."
echo "Backend: http://localhost:5004"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
EOF
    
    # Make scripts executable
    chmod +x start-backend.sh start-frontend.sh start-all.sh
    
    print_success "Start scripts created!"
}

# Function to test setup
test_setup() {
    print_header "Testing Setup"
    
    # Test backend health
    print_status "Testing backend health..."
    if command_exists curl; then
        sleep 2  # Give backend time to start
        if curl -s http://localhost:5004/api/health > /dev/null; then
            print_success "Backend is responding!"
        else
            print_warning "Backend health check failed. Make sure to start the backend server."
        fi
    else
        print_warning "curl not found. Skipping backend health check."
    fi
    
    print_success "Setup testing completed!"
}

# Function to display final instructions
display_final_instructions() {
    print_header "Setup Complete!"
    
    echo -e "${GREEN}🎉 Your Farmer-Friendly Website is ready to use!${NC}"
    echo ""
    echo -e "${CYAN}Next Steps:${NC}"
    echo "1. Start the backend server:"
    echo "   ${YELLOW}./start-backend.sh${NC}"
    echo ""
    echo "2. Start the frontend server (in a new terminal):"
    echo "   ${YELLOW}./start-frontend.sh${NC}"
    echo ""
    echo "3. Or start both servers at once:"
    echo "   ${YELLOW}./start-all.sh${NC}"
    echo ""
    echo -e "${CYAN}Access URLs:${NC}"
    echo "• Frontend: ${GREEN}http://localhost:5173${NC}"
    echo "• Backend API: ${GREEN}http://localhost:5004${NC}"
    echo "• Admin Login: ${GREEN}http://localhost:5173/admin-login${NC}"
    echo ""
    echo -e "${CYAN}Admin Credentials:${NC}"
    echo "• Email: ${GREEN}agriaisha466@gmail.com${NC}"
    echo "• Password: ${GREEN}aisha123${NC}"
    echo ""
    echo -e "${CYAN}Available Scripts:${NC}"
    echo "• ${YELLOW}./start-backend.sh${NC} - Start backend server only"
    echo "• ${YELLOW}./start-frontend.sh${NC} - Start frontend server only"
    echo "• ${YELLOW}./start-all.sh${NC} - Start both servers"
    echo ""
    echo -e "${PURPLE}Happy coding! 🚀${NC}"
}

# Main execution
main() {
    print_header "Farmer-Friendly Website Setup"
    echo "This script will set up the complete development environment."
    echo ""
    
    # Check prerequisites
    check_prerequisites
    
    # Setup backend
    setup_backend
    
    # Setup frontend
    setup_frontend
    
    # Create start scripts
    create_start_scripts
    
    # Test setup
    test_setup
    
    # Display final instructions
    display_final_instructions
}

# Run main function
main "$@"
