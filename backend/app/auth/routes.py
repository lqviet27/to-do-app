from flask import request, jsonify
from . import auth_bp
from .controllers import login_user, register_user

@auth_bp.route('/hello', methods=['GET'])
def hello():
    return "Hello from the auth blueprint!"

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    return login_user(data)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    return register_user(data)
