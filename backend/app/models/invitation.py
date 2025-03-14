from .base_model import db

class Invitation(db.Model):
    __tablename__ = 'invitations'

    id = db.Column(db.Integer, primary_key=True)
    invitation_code = db.Column(db.String(6), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_user = db.Column(db.Integer, db.ForeignKey('users.id'))
    consumed_user = db.Column(db.Integer, db.ForeignKey('users.id'))