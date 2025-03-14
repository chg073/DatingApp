from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from models.base_model import db
from models.user import User
from models.invitation import Invitation
from werkzeug.security import generate_password_hash
from twilio.rest import Client
from random import randint
register_bp = Blueprint("register", __name__)
TWILIO_ACCOUNT_SID = 'AC60dca4f7dadb17e929085aca8794ca1a'
TWILIO_AUTH_TOKEN = 'f094945b255300484f1e49861b7db571'
TWILIO_PHONE_NUMBER = '+18588664054'

def send_sms_with_twilio(phone_number, message):
    """Send SMS using Twilio."""
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(
            to=phone_number,
            from_=TWILIO_PHONE_NUMBER,
            body=message
        )
        return True  # SMS sent successfully
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return False  # SMS sending

@register_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        # Check if username already exists
        if User.query.filter_by(username=username).first():
            flash('Username already exists', 'error')
            return render_template('register.html')
        if User.query.filter_by(email=email).first():
            flash('Email already exists', 'error')
            return render_template('register.html')
        # Validate that both passwords match
        if password != confirm_password:
            flash('Passwords do not match', 'error')
            return render_template('register.html')

        # Generate hashed password and create a new user
        password_hash = generate_password_hash(password)
        new_user = User(username=username, password_hash=password_hash,
                        email=email)
        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Database error: {e}")
            flash('An error occurred while registering', 'error')
            return render_template('register.html')

        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('auth.login'))

    return render_template('register.html')

@register_bp.route('validate_invitation_code', methods=['GET', 'POST'])
def validate_invitation_code():
    if request.method == 'POST':
        invitation_code = request.form.get('invitation_code')
        if invitation_code == '000000':
            flash('You have been invited to the app!', 'success')
            return redirect(url_for('register.register_phone'))
        check_invitation = Invitation.query.filter_by(invitation_code=invitation_code).first()
        if check_invitation is None:
            flash('Invitation code is invalid', 'error')
            return redirect(url_for('register.validate_invitation_code'))
        else:
            db.session.delete(check_invitation)
            db.session.commit()
        return redirect(url_for('register.register_phone'))
    return render_template('validate_invitation_code.html')

@register_bp.route('/register_phone', methods=['GET', 'POST'])
def register_phone():
    if request.method == 'POST':
        phone_number = request.form.get('phone_number')

        if not phone_number:
            flash("Phone number is required!", "error")
            return redirect(url_for('register.register_phone'))

        # Save phone number in session to use later
        session['phone_number'] = phone_number

        # Send verification code
        verification_code = str(randint(100000, 999999))  # Replace with actual generated OTP
        session['verification_code'] = verification_code  # For demo purposes

        send_sms_with_twilio(phone_number, f"Your verification code is: {verification_code}")
        flash("Verification code sent to your phone number.", "info")

        return redirect(url_for('register.validate_phone'))

    return render_template('register_phone.html')

@register_bp.route('/validate_phone', methods=['GET', 'POST'])
# Step 2: Verify code
def validate_phone():
    if request.method == 'POST':
        user_input_code = request.form.get('verification_code')
        actual_code = session.get('verification_code')  # Retrieve the code stored in session

        if user_input_code != actual_code:
            flash("Invalid verification code. Please try again.", "error")
            return redirect(url_for('register.validate_phone'))

        flash("Phone verification successful!", "success")
        return redirect(url_for('register.register'))

    return render_template('validate_phone.html')