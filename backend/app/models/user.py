from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from .base_model import db


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    @staticmethod
    def get_user_by_username(username):
        """Static method to fetch a user by username."""
        user_data = User.query.filter_by(username=username).first()
        if user_data:
            return user_data
        return None

    @staticmethod
    def get_user_by_id(user_id):
        """Static method to fetch a user by ID."""
        user_data = User.query.filter_by(id=user_id).first()
        if user_data:
            return user_data
        return None

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)