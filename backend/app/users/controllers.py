from flask import jsonify, request
from app.extensions import db
from app.models import User

def updata_user_info(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.username = data['username']
    user.email = data['email']
    user.avatar = data['avatar']
    db.session.commit()
    return jsonify(user.to_dict()), 200

def change_password(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    oldPass = data['old_password']
    newPass = data['new_password']
    if not user.check_password(oldPass):
        return jsonify({"error": "Old password is incorrect"}), 400

    user.set_password(newPass)

    db.session.commit()
    return jsonify(user.to_dict()), 200

def reset_password(user_id):
    defalut_password = "1"
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.set_password(defalut_password)
    db.session.commit()
    return jsonify("Default Password is: " + defalut_password), 200