# AgriSupport - Farmer-Friendly Website

A comprehensive platform connecting farmers affected by drought with NGOs and support organizations. Built with React frontend and Flask backend.

## 🌟 Features

### Role-Based Authentication

- **Farmers**: Register and request help for drought management
- **NGOs**: Register to provide support and resources to farmers
- **Admin**: Complete platform management and oversight

### Key Functionality

- **Drought Awareness**: Educational content about drought management
- **Farming Tips**: Comprehensive farming knowledge base
- **Support Request System**: Farmers can request help, NGOs can respond
- **Password Reset**: 7-digit code-based password reset
- **Dashboard System**: Role-specific dashboards with relevant features

## 🏗️ Architecture

```
AgriSupport/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── context/       # Authentication context
│   │   └── utils/         # API utilities
│   └── package.json
├── backend/           # Flask + SQLite backend
│   ├── app.py         # Main Flask application
│   ├── requirements.txt
│   └── README.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Farmer-Friendly-website
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

The backend will run on `http://localhost:5000` and automatically create:

- SQLite database (`agrisupport.db`)
- Admin user: `agriaisha466@gmail.com` / `aisha123`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 👥 User Roles & Features

### 🌾 Farmers

- **Registration**: Sign up with farm details and drought impact level
- **Dashboard**: View support requests, access resources, manage profile
- **Support Requests**: Create requests for help with drought management
- **Resources**: Access farming tips and drought management guides

### 🏢 NGOs

- **Registration**: Sign up as organization with focus areas
- **Dashboard**: View pending farmer requests, manage resources
- **Support System**: Accept and manage support requests from farmers
- **Resource Management**: Distribute equipment, training, and financial support

### 👑 Admin (Aisha)

- **Platform Management**: Oversee all users and activities
- **User Management**: View, approve, and manage all registered users
- **Analytics**: Platform statistics and performance metrics
- **System Settings**: Configure platform settings and notifications

## 🔐 Authentication System

### Login Credentials

- **Admin**: `agriaisha466@gmail.com` / `aisha123`
- **Farmers**: Register through `/signup-farmer`
- **NGOs**: Register through `/signup-ngo`

### Password Reset

- 7-digit code sent to email
- 15-minute expiration
- Secure token-based authentication

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-code` - Verify reset code
- `POST /api/auth/reset-password` - Reset password

### User Management

- `GET /api/user/profile` - Get user profile

### Support Requests

- `GET /api/support-requests` - Get support requests (role-based)
- `POST /api/support-requests` - Create support request (farmers)
- `PUT /api/support-requests/<id>/status` - Update status (NGOs/Admin)

### Admin Endpoints

- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get platform statistics

## 🛠️ Development

### Frontend Development

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development

```bash
cd backend
python app.py        # Run Flask server
python test_api.py   # Run API tests
```

### Database Management

```bash
cd backend
python -c "from app import db; db.create_all()"  # Create tables
```

## 🧪 Testing

### Backend API Testing

```bash
cd backend
python test_api.py
```

This will test:

- Health check endpoint
- Admin login
- Farmer registration
- NGO registration
- Admin endpoints
- Support request endpoints

## 🔧 Configuration

### Environment Variables

Create `.env` files in respective directories:

**Backend (.env)**

```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///agrisupport.db
```

**Frontend (.env)**

```env
VITE_API_URL=http://localhost:5000/api
```

## 📊 Database Schema

### Users Table

- Basic fields: id, email, password, name, role, phone, location, created_at
- Farmer fields: farm_size, crops, drought_impact
- NGO fields: organization_name, organization_type, focus_areas, description

### PasswordReset Table

- id, email, code, created_at, used

### SupportRequest Table

- id, farmer_id, request_type, description, status, priority, created_at

## 🚀 Deployment

### Frontend Deployment

```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment

```bash
cd backend
# Set production environment variables
# Use production WSGI server (gunicorn, uwsgi)
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🔒 Security Considerations

- Change default SECRET_KEY in production
- Use HTTPS in production
- Implement rate limiting
- Add input validation and sanitization
- Use environment variables for sensitive data
- Regular security updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Aisha Hassan** - agriaisha466@gmail.com

## 🆘 Support

For support and questions:

- Email: agriaisha466@gmail.com
- Create an issue in the repository

---

**AgriSupport** - Empowering farmers through knowledge and innovation 🌱
