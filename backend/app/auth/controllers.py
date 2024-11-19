from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app.extensions import db
from flask import jsonify
def register_user(data):
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"em": "Email already exists" , "ec":1}), 200

    # hashed_password = generate_password_hash(password)
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"user": user.to_dict(), "ec": 0}), 201

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({"user": user.to_dict(), "ec": 0}), 200

    return jsonify({"em": "Invalid credentials", "ec": 1}), 200
