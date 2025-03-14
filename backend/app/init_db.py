# init_db.py
from app import create_app
from models.base_model import db


def init_database():
    # Create the Flask app and push an application context
    app = create_app()
    with app.app_context():
        # Drop existing tables (if any)
        db.drop_all()
        print("Dropped all existing tables")

        # Create new tables
        db.create_all()
        print("Created new tables")

        # Verify tables were created


if __name__ == "__main__":
    init_database()