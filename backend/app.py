import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail
from config import config
from models import db
from routes import auth_bp, reports_bp, users_bp

# Initialize extensions
mail = Mail()

def create_app(config_name='development'):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    mail.init_app(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(reports_bp, url_prefix='/api')
    app.register_blueprint(users_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({
            'message': 'AgriSupport API is running',
            'status': 'healthy',
            'timestamp': datetime.datetime.utcnow().isoformat()
        })
    
    # Root endpoint
    @app.route('/')
    def root():
        return jsonify({
            'message': 'Welcome to AgriSupport API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'auth': '/api/auth',
                'users': '/api/users',
                'admin': '/api/admin',
                'support': '/api/support',
                'resources': '/api/resources'
            }
        })
    
    return app

if __name__ == '__main__':
    import datetime
    
    config_name = os.environ.get('FLASK_ENV', 'development')
    app = create_app(config_name)

    print("🚀 Starting AgriSupport API Server...")
    print(f"📊 Environment: {config_name}")
    print(f"🌐 Server will run on: http://localhost:5004")
    print(f"📚 API Documentation: http://localhost:5004/")
    print(f"🔍 Health Check: http://localhost:5004/api/health")
    print("=" * 50)

    app.run(
        debug=app.config.get('DEBUG', True),
        host='0.0.0.0',
        port=5004
    )
