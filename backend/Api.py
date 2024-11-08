from flask import Flask
from Category_Api import category_api
from Task_Api import task_api
from User_Api import user_api

app = Flask(__name__)

# Đăng ký các Blueprint
app.register_blueprint(category_api)
app.register_blueprint(task_api)
app.register_blueprint(user_api)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
