#!/usr/bin/env python3
"""
Database management script for AgriSupport
Usage: python manage.py [command]
"""

import os
import sys
from flask import Flask
from models import db, User, PasswordReset, SupportRequest, Resource, ResourceDistribution, Notification
from werkzeug.security import generate_password_hash
from config import config

def create_app():
    """Create Flask application for CLI commands"""
    app = Flask(__name__)
    app.config.from_object(config['development'])
    db.init_app(app)
    return app

def init_db():
    """Initialize database and create admin user"""
    app = create_app()
    
    with app.app_context():
        print("🗄️ Creating database tables...")
        db.create_all()
        
        # Create admin user if it doesn't exist
        admin_email = 'agriaisha466@gmail.com'
        admin_user = User.query.filter_by(email=admin_email).first()
        
        if not admin_user:
            admin_user = User(
                email=admin_email,
                password=generate_password_hash('aisha123'),
                name='Aisha Hassan',
                role='admin',
                phone='+1234567890',
                location='Khartoum, Sudan',
                is_active=True
            )
            db.session.add(admin_user)
            db.session.commit()
            print(f"✅ Admin user created: {admin_email}")
        else:
            print(f"ℹ️ Admin user already exists: {admin_email}")
        
        print("✅ Database initialized successfully!")

def reset_db():
    """Reset database (drop all tables and recreate)"""
    app = create_app()
    
    with app.app_context():
        print("⚠️ Dropping all tables...")
        db.drop_all()
        print("🗄️ Creating new tables...")
        db.create_all()
        
        # Create admin user
        admin_user = User(
            email='agriaisha466@gmail.com',
            password=generate_password_hash('aisha123'),
            name='Aisha Hassan',
            role='admin',
            phone='+1234567890',
            location='Khartoum, Sudan',
            is_active=True
        )
        db.session.add(admin_user)
        db.session.commit()
        
        print("✅ Database reset successfully!")

def show_stats():
    """Show database statistics"""
    app = create_app()
    
    with app.app_context():
        print("📊 Database Statistics:")
        print("=" * 30)
        print(f"Total Users: {User.query.count()}")
        print(f"Farmers: {User.query.filter_by(role='farmer').count()}")
        print(f"NGOs: {User.query.filter_by(role='ngo').count()}")
        print(f"Admins: {User.query.filter_by(role='admin').count()}")
        print(f"Support Requests: {SupportRequest.query.count()}")
        print(f"Pending Requests: {SupportRequest.query.filter_by(status='pending').count()}")
        print(f"Completed Requests: {SupportRequest.query.filter_by(status='completed').count()}")
        print(f"Resources: {Resource.query.count()}")
        print(f"Notifications: {Notification.query.count()}")

def create_sample_data():
    """Create sample data for testing"""
    app = create_app()
    
    with app.app_context():
        print("📝 Creating sample data...")
        
        # Create sample farmers
        farmers = [
            {
                'email': 'farmer1@example.com',
                'name': 'Ahmed Hassan',
                'phone': '+249123456789',
                'location': 'Khartoum, Sudan',
                'farm_size': 50.0,
                'crops': 'Corn, Wheat, Sorghum',
                'drought_impact': 'high'
            },
            {
                'email': 'farmer2@example.com',
                'name': 'Fatima Ali',
                'phone': '+249987654321',
                'location': 'Omdurman, Sudan',
                'farm_size': 25.0,
                'crops': 'Vegetables, Fruits',
                'drought_impact': 'medium'
            }
        ]
        
        for farmer_data in farmers:
            if not User.query.filter_by(email=farmer_data['email']).first():
                farmer = User(
                    email=farmer_data['email'],
                    password=generate_password_hash('password123'),
                    name=farmer_data['name'],
                    role='farmer',
                    phone=farmer_data['phone'],
                    location=farmer_data['location'],
                    farm_size=farmer_data['farm_size'],
                    crops=farmer_data['crops'],
                    drought_impact=farmer_data['drought_impact']
                )
                db.session.add(farmer)
        
        # Create sample NGOs
        ngos = [
            {
                'email': 'ngo1@example.com',
                'name': 'Water Aid Sudan',
                'phone': '+249111222333',
                'location': 'Khartoum, Sudan',
                'organization_name': 'Water Aid Sudan',
                'organization_type': 'ngo',
                'focus_areas': 'Water conservation, Drought relief',
                'description': 'Providing water solutions to drought-affected areas'
            },
            {
                'email': 'ngo2@example.com',
                'name': 'Agricultural Support Foundation',
                'phone': '+249444555666',
                'location': 'Port Sudan, Sudan',
                'organization_name': 'Agricultural Support Foundation',
                'organization_type': 'charity',
                'focus_areas': 'Training, Equipment distribution',
                'description': 'Supporting farmers with training and equipment'
            }
        ]
        
        for ngo_data in ngos:
            if not User.query.filter_by(email=ngo_data['email']).first():
                ngo = User(
                    email=ngo_data['email'],
                    password=generate_password_hash('password123'),
                    name=ngo_data['name'],
                    role='ngo',
                    phone=ngo_data['phone'],
                    location=ngo_data['location'],
                    organization_name=ngo_data['organization_name'],
                    organization_type=ngo_data['organization_type'],
                    focus_areas=ngo_data['focus_areas'],
                    description=ngo_data['description']
                )
                db.session.add(ngo)
        
        db.session.commit()
        print("✅ Sample data created successfully!")

def main():
    """Main CLI function"""
    if len(sys.argv) < 2:
        print("Usage: python manage.py [command]")
        print("Commands:")
        print("  init     - Initialize database")
        print("  reset    - Reset database (drop all tables)")
        print("  stats    - Show database statistics")
        print("  sample   - Create sample data")
        return
    
    command = sys.argv[1].lower()
    
    if command == 'init':
        init_db()
    elif command == 'reset':
        confirm = input("⚠️ This will delete all data. Are you sure? (y/N): ")
        if confirm.lower() == 'y':
            reset_db()
        else:
            print("❌ Operation cancelled.")
    elif command == 'stats':
        show_stats()
    elif command == 'sample':
        create_sample_data()
    else:
        print(f"❌ Unknown command: {command}")
        print("Available commands: init, reset, stats, sample")

if __name__ == '__main__':
    main()
