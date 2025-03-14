from .base_model import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Sender's ID
    receiver_id = db.Column(db.Integer, nullable=False)  # Receiver's ID ('chatbot' can be hard-coded for the chatbot)
    content = db.Column(db.Text, nullable=False)  # Message content
    created_at = db.Column(db.DateTime, server_default=db.func.now())