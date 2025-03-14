from flask import Blueprint, render_template, jsonify, request
from models.base_model import db
from models.message import Message
from werkzeug.security import check_password_hash
from openai import OpenAI

DEESEEK_API_URL = "https://api.deepseek.com"
DEESEEK_API_KEY = "sk-b8dd2104a98b458b92a16d5caf08279e"

chat_bp = Blueprint("chat", __name__)
chat_client = OpenAI(api_key=DEESEEK_API_KEY, base_url=DEESEEK_API_URL)

@chat_bp.route('/chat')
def chat():
    return render_template('chat.html')


@chat_bp.route('/chats/<friend_id>', methods=['GET'])
def get_chat_history(friend_id):
    """
    Get chat history with a specific friend or the chatbot.
    """
    user_id = request.args.get('user_id')  # Get user ID from the client request (e.g., session)

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    if friend_id == "chatbot":
        # If friend is 'chatbot', retrieve all messages sent to or from the chatbot
        messages = Message.query.filter(
            (Message.sender_id == user_id) & (Message.receiver_id == "chatbot") |
            (Message.sender_id == "chatbot") & (Message.receiver_id == user_id)
        ).order_by(Message.created_at).all()
    else:
        # Retrieve messages with a specific friend
        messages = Message.query.filter(
            (Message.sender_id == user_id) & (Message.receiver_id == friend_id) |
            (Message.sender_id == friend_id) & (Message.receiver_id == user_id)
        ).order_by(Message.created_at).all()

    messages_list = [{"sender_id": m.sender_id, "content": m.content, "created_at": m.created_at} for m in messages]
    return jsonify(messages_list)


@chat_bp.route('/chats/<friend_id>', methods=['POST'])
def send_message(friend_id):
    """
    Send message to a specific friend or the chatbot.
    """
    data = request.json
    user_id = "123@gmail.com"  # data.get("user_id")  # Sender's ID
    content = data.get("content")

    if not user_id or not content:
        return jsonify({"error": "User ID and content are required"}), 400
    # If message is sent to the chatbot
    try:
        messages = [{"role": "user", "content": f"{content}"}]
        response = chat_client.chat.completions.create(
            model="deepseek-chat",
            messages=messages
        )
        bot_reply = response.choices[0].message
        print(bot_reply.content)
        # Save user's message and bot's reply to database
        user_message = Message(sender_id=user_id, receiver_id=friend_id, content=content)
        bot_message = Message(sender_id=friend_id, receiver_id=user_id, content=bot_reply.content)
        db.session.add(user_message)
        db.session.add(bot_message)
        db.session.commit()

        return jsonify({"bot_reply": bot_reply.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # If message is sent to a friend (non-chatbot)
    new_message = Message(sender_id=user_id, receiver_id=friend_id, content=content)
    db.session.add(new_message)
    db.session.commit()

    return jsonify({"success": True, "message_content": content})
