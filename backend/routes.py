import os
import jwt
import random
import string
import datetime
import json
from functools import wraps
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, PasswordReset, DroughtReport, EmailConfirmation

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
def send_confirmation_email(email, code, user_data):
    """Send email confirmation code to user"""
    try:
        from flask_mail import Message
        from app import mail
        
        msg = Message(
            subject='Email Confirmation - Farmer Friendly Platform',
            recipients=[email],
            sender=current_app.config['MAIL_USERNAME']
        )
        
        role = user_data.get('role', 'user')
        name = user_data.get('name', 'User')
        
        msg.html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Farmer Friendly Platform</h1>
                <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Email Confirmation</p>
            </div>
            
            <div style="padding: 30px; background: #f8f9fa;">
                <h2 style="color: #333; margin-bottom: 20px;">Hello {name}!</h2>
                
                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                    Thank you for registering as a <strong>{role.title()}</strong> on our Farmer Friendly Platform. 
                    To complete your registration, please use the confirmation code below:
                </p>
                
                <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 30px 0;">
                    <h3 style="color: #667eea; margin: 0; font-size: 32px; letter-spacing: 5px;">{code}</h3>
                </div>
                
                <p style="color: #666; font-size: 14px; line-height: 1.6;">
                    <strong>Important:</strong>
                    <br>• This code will expire in 30 minutes
                    <br>• Enter this code in the confirmation form to activate your account
                    <br>• If you didn't register for this account, please ignore this email
                </p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="color: #999; font-size: 12px; margin: 0;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </div>
        </div>
        """
        
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'Email already registered'}), 400
    
    # Check if there's already a pending confirmation for this email
    existing_confirmation = EmailConfirmation.query.filter_by(
        email=data['email'], 
        used=False
    ).first()
    
    if existing_confirmation and not existing_confirmation.is_expired():
        return jsonify({'success': False, 'message': 'Confirmation email already sent. Please check your email or wait for it to expire.'}), 400
    
    # Generate 7-digit confirmation code
    confirmation_code = ''.join(random.choices(string.digits, k=7))
    
    # Store user data and confirmation code
    user_data = {
        'name': data['name'],
        'email': data['email'],
        'password': data['password'],
        'role': data.get('role', 'farmer'),
        'phone': data.get('phone'),
        'location': data.get('location'),
        'farm_size': data.get('farm_size'),
        'drought_impact': data.get('drought_impact'),
        'organization_name': data.get('organization_name'),
        'contact_person': data.get('contact_person'),
        'organization_type': data.get('organization_type'),
        'focus_areas': data.get('focus_areas'),
        'description': data.get('description')
    }
    
    # Create email confirmation record
    confirmation = EmailConfirmation(
        email=data['email'],
        code=confirmation_code,
        user_data=json.dumps(user_data)
    )
    
    # Remove any existing confirmations for this email
    EmailConfirmation.query.filter_by(email=data['email']).delete()
    
    db.session.add(confirmation)
    db.session.commit()
    
    # Send confirmation email
    if send_confirmation_email(data['email'], confirmation_code, user_data):
        return jsonify({
            'success': True, 
            'message': 'Confirmation email sent. Please check your email and enter the 7-digit code to complete registration.',
            'email': data['email']
        })
    else:
        # If email sending fails, clean up the confirmation record
        db.session.delete(confirmation)
        db.session.commit()
        return jsonify({'success': False, 'message': 'Failed to send confirmation email. Please try again.'}), 500

@auth_bp.route('/confirm-email', methods=['POST'])
def confirm_email():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('code'):
        return jsonify({'success': False, 'message': 'Missing email or confirmation code'}), 400
    
    # Find the confirmation record
    confirmation = EmailConfirmation.query.filter_by(
        email=data['email'],
        code=data['code'],
        used=False
    ).first()
    
    if not confirmation:
        return jsonify({'success': False, 'message': 'Invalid confirmation code'}), 400
    
    if confirmation.is_expired():
        return jsonify({'success': False, 'message': 'Confirmation code has expired'}), 400
    
    try:
        # Parse user data
        user_data = json.loads(confirmation.user_data)
        
        # Check if user already exists (shouldn't happen, but safety check)
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'success': False, 'message': 'User already exists'}), 400
        
        # Create the user
        hashed_password = generate_password_hash(user_data['password'])
        user = User(
            name=user_data['name'],
            email=user_data['email'],
            password=hashed_password,
            role=user_data['role'],
            phone=user_data.get('phone'),
            location=user_data.get('location'),
            farm_size=user_data.get('farm_size'),
            drought_impact=user_data.get('drought_impact'),
            organization_name=user_data.get('organization_name'),
            contact_person=user_data.get('contact_person'),
            organization_type=user_data.get('organization_type'),
            focus_areas=user_data.get('focus_areas'),
            description=user_data.get('description'),
            email_verified=True
        )
        
        db.session.add(user)
        
        # Mark confirmation as used
        confirmation.used = True
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Email confirmed successfully! You can now log in.',
            'user': user.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': 'Failed to confirm email. Please try again.'}), 500

@auth_bp.route('/resend-confirmation', methods=['POST'])
def resend_confirmation():
    data = request.get_json()
    
    if not data or not data.get('email'):
        return jsonify({'success': False, 'message': 'Email is required'}), 400
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'User already registered'}), 400
    
    # Find existing confirmation
    confirmation = EmailConfirmation.query.filter_by(
        email=data['email'],
        used=False
    ).first()
    
    if not confirmation:
        return jsonify({'success': False, 'message': 'No pending confirmation found for this email'}), 400
    
    if not confirmation.is_expired():
        return jsonify({'success': False, 'message': 'Confirmation email already sent recently. Please wait before requesting another.'}), 400
    
    # Generate new code
    new_code = ''.join(random.choices(string.digits, k=7))
    confirmation.code = new_code
    confirmation.created_at = datetime.datetime.utcnow()
    confirmation.expires_at = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    
    db.session.commit()
    
    # Send new confirmation email
    user_data = json.loads(confirmation.user_data)
    if send_confirmation_email(data['email'], new_code, user_data):
        return jsonify({
            'success': True,
            'message': 'New confirmation email sent. Please check your email.'
        })
    else:
        return jsonify({'success': False, 'message': 'Failed to send confirmation email. Please try again.'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'success': False, 'message': 'Missing email or password'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password, data['password']):
        # Check if email is verified
        if not user.email_verified:
            return jsonify({'success': False, 'message': 'Please verify your email before logging in. Check your email for the confirmation code.'}), 401
        
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

@users_bp.route('/users/stats', methods=['GET'])
@token_required
def get_user_stats(current_user):
    """Get user statistics for analytics - accessible by all authenticated users"""
    users = User.query.all()
    
    # Calculate statistics
    total_users = len(users)
    farmers = len([u for u in users if u.role == 'farmer'])
    ngos = len([u for u in users if u.role == 'ngo'])
    admins = len([u for u in users if u.role == 'admin'])
    
    # Return only statistics, not full user data
    return jsonify({
        'success': True,
        'stats': {
            'total_users': total_users,
            'farmers': farmers,
            'ngos': ngos,
            'admins': admins
        }
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
