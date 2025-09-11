#!/usr/bin/env python3
"""
Database initialization script for AgriSupport
Creates all tables and the default admin user
"""

import os
import sys
from werkzeug.security import generate_password_hash
from app import create_app
from models import db, User

def init_database():
    """Initialize the database with tables and admin user"""
    app = create_app('development')
    
    with app.app_context():
        print("🗄️ Creating database tables...")
        db.create_all()
        print("✅ Database tables created successfully!")
        
        # Check if admin user already exists
        admin_user = User.query.filter_by(email='agriaisha466@gmail.com').first()
        if not admin_user:
            print("👤 Creating default admin user...")
            admin_user = User(
                name='Admin',
                email='agriaisha466@gmail.com',
                password=generate_password_hash('aisha123'),
                role='admin',
                email_verified=True
            )
            db.session.add(admin_user)
            db.session.commit()
            print("✅ Admin user created successfully!")
        else:
            print("ℹ️ Admin user already exists")
        
        print("🎉 Database initialization completed!")

if __name__ == '__main__':
    init_database()
