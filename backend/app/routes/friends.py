from flask import Blueprint, render_template, jsonify


friends_bp = Blueprint("friends", __name__)

@friends_bp.route('/friends')
def friends():
    return render_template('friends.html')


@friends_bp.route('/get-friends', methods=['GET'])
def get_friends():
    """
        Return the list of friends, including the default 'Chatbot'.
        """
    friends = [
        # Example: Add actual friends from the database if implemented
        {"id": 1, "name": "Jeff Chu"},
        {"id": 2, "name": "Anton Wu"},
        {"id": 3, "name": "Dark Wing"},
    ]

    # Append the default Chatbot friend
    friends.append({"id": "chatbot", "name": "Chatbot", "is_default": True})

    return jsonify(friends)