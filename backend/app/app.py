# app.py
from flask import Flask, render_template, redirect, url_for
from flask_migrate import Migrate
from flask_login import LoginManager
from models.user import User
from models.base_model import db
from routes.auth import auth_bp
from routes.chat import chat_bp
from routes.friends import friends_bp
from routes.register import register_bp
from routes.profile import profile_bp
from config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    db.init_app(app)
    migrate = Migrate(app, db)
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(register_bp, url_prefix="/register")
    app.register_blueprint(chat_bp, url_prefix="/chat")
    app.register_blueprint(friends_bp, url_prefix="/friends")
    app.register_blueprint(profile_bp, url_prefix="/profile")
    @app.route('/')
    def home():
        return redirect(url_for('auth.login'))

    @login_manager.user_loader
    def load_user(user_id):
        return User.get_user_by_id(user_id)

    @app.route('/dashboard')
    def dashboard():
        # Render the home page
        return render_template('dashboard.html')

    @app.route('/notifications')
    def notifications():
        return render_template('notifications.html')


    return app


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
