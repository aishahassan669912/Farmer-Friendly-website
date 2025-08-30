import os
import jwt
import random
import string
import datetime
from functools import wraps
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, PasswordReset, DroughtReport
import jwt
import datetime
import random
import string
from functools import wraps

auth_bp = Blueprint('auth', __name__)
reports_bp = Blueprint('reports', __name__)
users_bp = Blueprint('users', __name__)

# JWT token decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Invalid token!'}), 401
        except:
            return jsonify({'message': 'Invalid token!'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

# Role-based access decorator
def role_required(allowed_roles):
    def decorator(f):
        @wraps(f)
        def decorated(current_user, *args, **kwargs):
            if current_user.role not in allowed_roles:
                return jsonify({'message': 'Access denied!'}), 403
            return f(current_user, *args, **kwargs)
        return decorated
    return decorator

# Email sending function
def send_reset_email(email, code):
    try:
        from app import mail
        from flask_mail import Message
        
        msg = Message(
            'AgriSupport - Password Reset Code',
            sender=current_app.config['MAIL_USERNAME'],
            recipients=[email]
        )
        msg.html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">AgriSupport Password Reset</h2>
            <p>You have requested to reset your password.</p>
            <p>Your reset code is: <strong style="font-size: 24px; color: #16a34a;">{code}</strong></p>
            <p>This code will expire in 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr>
            <p style="color: #666; font-size: 12px;">AgriSupport - Supporting farmers in drought-affected areas</p>
        </div>
        """
        mail.send(msg)
        print(f"✅ Email sent successfully to {email} with code: {code}")
        return True
    except Exception as e:
        print(f"❌ Email sending failed: {e}")
        print(f"📧 Code for {email}: {code}")
        return False

# Auth routes
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'Email already registered'}), 400
    
    hashed_password = generate_password_hash(data['password'])
    user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,
        role=data.get('role', 'farmer')
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'User registered successfully'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'success': False, 'message': 'Missing email or password'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password, data['password']):
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")
        
        return jsonify({
            'success': True,
            'token': token,
            'user': user.to_dict()
        })
    
    return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    
    if not data or not data.get('email'):
        return jsonify({'success': False, 'message': 'Email is required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'success': False, 'message': 'Email not found'}), 404
    
    # Generate 7-digit code
    code = ''.join(random.choices(string.digits, k=7))
    
    # Delete any existing reset codes for this email
    PasswordReset.query.filter_by(email=data['email']).delete()
    
    # Create new reset record
    reset_record = PasswordReset(email=data['email'], code=code)
    db.session.add(reset_record)
    db.session.commit()
    
    if send_reset_email(data['email'], code):
        return jsonify({'success': True, 'message': 'Reset code sent to your email'})
    else:
        print(f"Password reset code for {data['email']}: {code}")
        return jsonify({'success': True, 'message': 'Reset code sent to your email (check console for code)'})

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('code') or not data.get('newPassword'):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    reset_record = PasswordReset.query.filter_by(
        email=data['email'],
        code=data['code'],
        used=False
    ).first()
    
    if not reset_record:
        return jsonify({'success': False, 'message': 'Invalid or expired reset code'}), 400
    
    if reset_record.expires_at < datetime.datetime.utcnow():
        return jsonify({'success': False, 'message': 'Reset code has expired'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    user.password = generate_password_hash(data['newPassword'])
    reset_record.used = True
    
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Password reset successfully'})

# Drought Reports routes
@reports_bp.route('/drought-reports', methods=['POST'])
@token_required
@role_required(['farmer'])
def create_drought_report(current_user):
    data = request.get_json()
    
    required_fields = ['location', 'severity', 'description', 'contact_name', 'phone']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'success': False, 'message': f'{field} is required'}), 400
    
    if data['severity'] not in ['Mild', 'Moderate', 'Severe', 'Extreme']:
        return jsonify({'success': False, 'message': 'Invalid severity level'}), 400
    
    report = DroughtReport(
        farmer_id=current_user.id,
        location=data['location'],
        severity=data['severity'],
        description=data['description'],
        contact_name=data['contact_name'],
        phone=data['phone'],
        email=data.get('email')
    )
    
    db.session.add(report)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Drought report submitted successfully'})

@reports_bp.route('/drought-reports', methods=['GET'])
@token_required
@role_required(['ngo', 'admin'])
def get_drought_reports(current_user):
    reports = DroughtReport.query.order_by(DroughtReport.created_at.desc()).all()
    return jsonify({
        'success': True,
        'reports': [report.to_dict() for report in reports]
    })

@reports_bp.route('/drought-reports/<int:report_id>', methods=['GET'])
@token_required
@role_required(['ngo', 'admin'])
def get_drought_report(current_user, report_id):
    report = DroughtReport.query.get(report_id)
    if not report:
        return jsonify({'success': False, 'message': 'Report not found'}), 404
    
    return jsonify({'success': True, 'report': report.to_dict()})

@reports_bp.route('/drought-reports/<int:report_id>', methods=['PUT'])
@token_required
@role_required(['admin'])
def update_drought_report(current_user, report_id):
    report = DroughtReport.query.get(report_id)
    if not report:
        return jsonify({'success': False, 'message': 'Report not found'}), 404
    
    data = request.get_json()
    
    if data.get('location'):
        report.location = data['location']
    if data.get('severity'):
        if data['severity'] not in ['Mild', 'Moderate', 'Severe', 'Extreme']:
            return jsonify({'success': False, 'message': 'Invalid severity level'}), 400
        report.severity = data['severity']
    if data.get('description'):
        report.description = data['description']
    if data.get('contact_name'):
        report.contact_name = data['contact_name']
    if data.get('phone'):
        report.phone = data['phone']
    if data.get('email'):
        report.email = data['email']
    
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Report updated successfully'})

@reports_bp.route('/drought-reports/<int:report_id>', methods=['DELETE'])
@token_required
@role_required(['admin'])
def delete_drought_report(current_user, report_id):
    report = DroughtReport.query.get(report_id)
    if not report:
        return jsonify({'success': False, 'message': 'Report not found'}), 404
    
    db.session.delete(report)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Report deleted successfully'})

# Users management routes
@users_bp.route('/users', methods=['GET'])
@token_required
@role_required(['admin'])
def get_users(current_user):
    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify({
        'success': True,
        'users': [user.to_dict() for user in users]
    })

@users_bp.route('/users/<int:user_id>', methods=['PUT'])
@token_required
@role_required(['admin'])
def update_user(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    if user.role == 'admin':
        return jsonify({'success': False, 'message': 'Admin users cannot be edited'}), 403
    
    data = request.get_json()
    
    if data.get('name'):
        user.name = data['name']
    if data.get('email'):
        # Check if email is already taken by another user
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({'success': False, 'message': 'Email already taken'}), 400
        user.email = data['email']
    if data.get('role'):
        if data['role'] not in ['farmer', 'ngo']:
            return jsonify({'success': False, 'message': 'Invalid role'}), 400
        user.role = data['role']
    if data.get('password'):
        user.password = generate_password_hash(data['password'])
    
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'User updated successfully'})

@users_bp.route('/users/<int:user_id>', methods=['DELETE'])
@token_required
@role_required(['admin'])
def delete_user(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    if user.role == 'admin':
        return jsonify({'success': False, 'message': 'Admin users cannot be deleted'}), 403
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'User deleted successfully'})

# Health check route
@auth_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'AgriSupport API is running',
        'timestamp': datetime.datetime.utcnow().isoformat()
    })
