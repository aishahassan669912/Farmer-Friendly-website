# AgriSupport Backend API

A Flask-based REST API for the AgriSupport platform with role-based authentication and SQLite database.

## Features

- **Role-based Authentication**: Support for Admin, Farmer, and NGO roles
- **JWT Token Authentication**: Secure token-based authentication
- **Password Reset**: 7-digit code-based password reset functionality
- **Support Request System**: Farmers can request help, NGOs can respond
- **Admin Dashboard**: Complete platform management for admins
- **SQLite Database**: Lightweight, file-based database

## Setup

1. **Create Virtual Environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize Database**:
   ```bash
   python app.py
   ```
   This will automatically create the database and admin user.

## Default Admin Account

- **Email**: agriaisha466@gmail.com
- **Password**: aisha123

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-code` - Verify reset code
- `POST /api/auth/reset-password` - Reset password

### User Management

- `GET /api/user/profile` - Get user profile (requires auth)

### Support Requests

- `GET /api/support-requests` - Get support requests (role-based)
- `POST /api/support-requests` - Create support request (farmers only)
- `PUT /api/support-requests/<id>/status` - Update request status (NGOs/Admin)

### Admin Endpoints

- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/stats` - Get platform statistics (admin only)

## Database Models

### User

- Basic fields: id, email, password, name, role, phone, location, created_at
- Farmer fields: farm_size, crops, drought_impact
- NGO fields: organization_name, organization_type, focus_areas, description

### PasswordReset

- id, email, code, created_at, used

### SupportRequest

- id, farmer_id, request_type, description, status, priority, created_at

## Running the Server

```bash
python app.py
```

The server will run on `http://localhost:5000`

## Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///agrisupport.db
```

## Frontend Integration

The API is configured to work with the React frontend running on `http://localhost:5173`. CORS is enabled for this origin.

## Security Notes

- Change the SECRET_KEY in production
- Use HTTPS in production
- Implement rate limiting for production
- Add input validation and sanitization
- Consider using environment variables for sensitive data
