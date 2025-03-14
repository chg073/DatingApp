from flask import Blueprint, render_template, jsonify
from flask_login import login_required
from models.invitation import Invitation
from models.base_model import db
import random
import string

profile_bp = Blueprint('profile', __name__)


@profile_bp.route('/profile')


def profile():
    return render_template('profile.html')


@profile_bp.route('/generate-invitation-code', methods=['POST'])
def generate_invitation_code():
    def generate_code():
        # Generate the random six-character alphanumeric code
        return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

    max_attempts = 1000
    for _ in range(max_attempts):
        code = generate_code()
        existing_code = Invitation.query.filter_by(invitation_code=code).first()
        if not existing_code:
            new_code = Invitation(invitation_code=code)
            db.session.add(new_code)
            db.session.commit()
            return jsonify({'invitation_code': code})
    return jsonify({'error': 'Could not generate an unique invitation code'}), 500  # Return JSON with the code


@profile_bp.route('/my-invitation-codes', methods=['GET'])
@login_required
def my_invitation_codes():
    # Retrieve all invitation codes created by the current user
    codes = Invitation.query.filter_by().all()
    return jsonify({'codes': [code.code for code in codes]})
