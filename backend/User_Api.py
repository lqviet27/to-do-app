from flask import Blueprint, request, jsonify
from Model.UserVM import UserVM, LoginRequest
from UserService import UserService

user_api = Blueprint('user_api', __name__)

user_service = UserService()

@user_api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = UserVM(email = data['email'], username=data['username'], password=data['password'])
    response = user_service.create_user(new_user)
    if response.get("success"):
        return jsonify({"message": "Register successful!", "user": response.get("user").username}), 201
    else:
        return jsonify({"error": response.get("message")}), 500

@user_api.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    login_request = LoginRequest(email=data['email'], password=data['password'])
    response = user_service.login_user(login_request)
    if response.get("success"):
        return jsonify({"message": "Login successful!", "user": response.get("username")}), 200
    else:
        return jsonify({"error": response.get("message")}), 500
