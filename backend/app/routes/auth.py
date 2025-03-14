from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import logout_user, login_required
from models.user import User
from werkzeug.security import check_password_hash

auth_bp = Blueprint("auth", __name__)  # Create a Flask Blueprint for authentication routes


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.get_user_by_username(username)
        if user and check_password_hash(user.password_hash, password):
            # Here you would typically set up a session
            flash('Successfully logged in!', 'success')
            return render_template('dashboard.html')
        else:
            flash('Invalid username or password', 'error')

    return render_template('login.html')


# Route for logging out
@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have successfully logged out!", "success")
    return redirect(url_for("login"))
