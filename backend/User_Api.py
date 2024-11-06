
from flask import Flask, request, jsonify
from Model.UserVM import UserVM, LoginRequest
from UserService import UserService
app = Flask(__name__)

user_service = UserService()


@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = UserVM(email = data['email'], username=data['username'], password=data['password'])
    response = user_service.create_user(new_user)

    if response.get("success"):
        return jsonify({"message": "Register successful!", "user": response.get("user").username}), 201
    else:
        if response.get("message") == "Email already exists":
            return jsonify({"error": response.get("message")}), 400
        return jsonify({"error": response.get("message")}), 500



@app.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    login_request = LoginRequest(email=data['email'], password=data['password'])
    response = user_service.login_user(login_request)

    if response.get("success"):
        return jsonify({"message": "Login successful!", "user": response.get("username")}), 200
    else:
        if response.get("message") == "Email or password incorrect":
            return jsonify({"error": "Email or password incorrect"}), 401
        return jsonify({"error": response.get("message")}), 500



if __name__ == '__main__':
    app.run(debug=True)       
