import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """User model for farmers, NGOs, and admins"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False, index=True)  # farmer, ngo, admin
    phone = db.Column(db.String(20))
    location = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Farmer-specific fields
    farm_size = db.Column(db.Float)  # in acres
    drought_impact = db.Column(db.String(50))  # low, medium, high, critical
    
    # NGO-specific fields
    organization_name = db.Column(db.String(200))
    contact_person = db.Column(db.String(100))
    organization_type = db.Column(db.String(100))  # NGO, Government, Private
    focus_areas = db.Column(db.Text)  # comma-separated areas of focus
    description = db.Column(db.Text)
    
    # Relationships
    support_requests = db.relationship('SupportRequest',
                                     foreign_keys='SupportRequest.farmer_id',
                                     backref='farmer',
                                     lazy=True,
                                     cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def to_dict(self):
        """Convert user to dictionary for JSON response"""
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'phone': self.phone,
            'location': self.location,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_active': self.is_active,
            'farm_size': self.farm_size,
            'drought_impact': self.drought_impact,
            'organization_name': self.organization_name,
            'contact_person': self.contact_person,
            'organization_type': self.organization_type,
            'focus_areas': self.focus_areas,
            'description': self.description
        }

class DroughtReport(db.Model):
    """Drought reports submitted by farmers"""
    __tablename__ = 'drought_reports'
    
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    severity = db.Column(db.String(20), nullable=False)  # Mild, Moderate, Severe, Extreme
    description = db.Column(db.Text, nullable=False)
    contact_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # Relationship
    farmer = db.relationship('User', backref='drought_reports')
    
    def to_dict(self):
        return {
            'id': self.id,
            'farmer_id': self.farmer_id,
            'location': self.location,
            'severity': self.severity,
            'description': self.description,
            'contact_name': self.contact_name,
            'phone': self.phone,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'farmer_name': self.farmer.name if self.farmer else None
        }

class PasswordReset(db.Model):
    """Password reset codes for users"""
    __tablename__ = 'password_resets'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False, index=True)
    code = db.Column(db.String(7), nullable=False)  # 7-digit reset code
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    used = db.Column(db.Boolean, default=False)
    
    def __init__(self, **kwargs):
        # Set created_at first
        if 'created_at' not in kwargs:
            kwargs['created_at'] = datetime.datetime.utcnow()
        
        # Calculate expires_at
        created_at = kwargs['created_at']
        kwargs['expires_at'] = created_at + datetime.timedelta(minutes=15)
        
        super(PasswordReset, self).__init__(**kwargs)
    
    def is_expired(self):
        """Check if the reset code has expired"""
        return datetime.datetime.utcnow() > self.expires_at
    
    def __repr__(self):
        return f'<PasswordReset {self.email}>'

class SupportRequest(db.Model):
    """Support requests from farmers to NGOs"""
    __tablename__ = 'support_requests'
    
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    request_type = db.Column(db.String(100), nullable=False)  # Water Access, Equipment, Training, etc.
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='pending', index=True)  # pending, approved, completed, rejected
    priority = db.Column(db.String(20), default='medium')  # low, medium, high, critical
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    # Additional fields for request management
    assigned_ngo_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    response_message = db.Column(db.Text)
    response_date = db.Column(db.DateTime)
    
    # Relationships
    assigned_ngo = db.relationship('User', 
                                 foreign_keys=[assigned_ngo_id],
                                 backref='assigned_requests')
    
    def __repr__(self):
        return f'<SupportRequest {self.id} - {self.request_type}>'
    
    def to_dict(self):
        """Convert support request to dictionary for JSON response"""
        return {
            'id': self.id,
            'farmer_id': self.farmer_id,
            'farmer_name': self.farmer.name if self.farmer else None,
            'farmer_location': self.farmer.location if self.farmer else None,
            'request_type': self.request_type,
            'description': self.description,
            'status': self.status,
            'priority': self.priority,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'assigned_ngo_id': self.assigned_ngo_id,
            'assigned_ngo_name': self.assigned_ngo.name if self.assigned_ngo else None,
            'response_message': self.response_message,
            'response_date': self.response_date.isoformat() if self.response_date else None
        }

class Resource(db.Model):
    """Resources that NGOs can provide to farmers"""
    __tablename__ = 'resources'
    
    id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    resource_type = db.Column(db.String(50), nullable=False)  # equipment, training, financial, material
    quantity_available = db.Column(db.Integer, default=0)
    quantity_distributed = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    ngo = db.relationship('User', 
                        foreign_keys=[ngo_id],
                        backref='resources')
    
    def __repr__(self):
        return f'<Resource {self.name}>'
    
    def to_dict(self):
        """Convert resource to dictionary for JSON response"""
        return {
            'id': self.id,
            'ngo_id': self.ngo_id,
            'ngo_name': self.ngo.organization_name if self.ngo else None,
            'name': self.name,
            'description': self.description,
            'resource_type': self.resource_type,
            'quantity_available': self.quantity_available,
            'quantity_distributed': self.quantity_distributed,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'is_active': self.is_active
        }

class ResourceDistribution(db.Model):
    """Track distribution of resources to farmers"""
    __tablename__ = 'resource_distributions'
    
    id = db.Column(db.Integer, primary_key=True)
    resource_id = db.Column(db.Integer, db.ForeignKey('resources.id'), nullable=False)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    distributed_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    status = db.Column(db.String(20), default='distributed')  # distributed, returned, lost
    
    # Relationships
    resource = db.relationship('Resource', backref='distributions')
    farmer = db.relationship('User', backref='received_resources')
    
    def __repr__(self):
        return f'<ResourceDistribution {self.resource.name} to {self.farmer.name}>'

class Notification(db.Model):
    """Notifications for users"""
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), default='info')  # info, success, warning, error
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref='notifications')
    
    def __repr__(self):
        return f'<Notification {self.title} for {self.user.email}>'
    
    def to_dict(self):
        """Convert notification to dictionary for JSON response"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'message': self.message,
            'type': self.type,
            'read': self.read,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
