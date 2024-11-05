from flask import Flask, request

from UserService import UserService
from  Model.LoginRequest import LoginRequest
from Model.UserVM import UserVM
app = Flask(__name__)

user_service = UserService()


@app.route('/users', methods=['POST'])
def create_user_endpoint():
    data = request.get_json()
    new_user = UserVM(name=data['name'], password=data['password'])
    return user_service.create_user(new_user)
@app.route('/users/login', methods=['POST'])
def login_user_endpoint():
    data = request.get_json()
    login_request = LoginRequest(username=data['name'], password=data['password'])
    return user_service.login_user(login_request)



if __name__ == '__main__':
    app.run(debug=True)
