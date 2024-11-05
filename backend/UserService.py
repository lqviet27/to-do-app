from flask import jsonify
from Model.UserVM import UserVM
from Model.LoginRequest import LoginRequest
import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    port=3307,
    password="",
    database="todoapp"
)

class UserService:
    def __init__(self):
        # Initialize your user service
        pass

    def create_user(self, user: UserVM):
        try:
            with connection.cursor() as cursor:
                # Kiểm tra nếu tên người dùng đã tồn tại
                cursor.execute("SELECT COUNT(*) FROM user WHERE name = %s", (user.name,))
                result = cursor.fetchone()
                if result[0] > 0:
                    return {"success": False, "message": "Username already exists"}

                # Hash mật khẩu và thêm người dùng mới

                cursor.execute(
                    "INSERT INTO user (name, password) VALUES (%s, %s)",
                    (user.name, user.password)
                )
                connection.commit()

            return {"success": True, "message": "User created successfully", "user": user}
        except Exception as e:
            return {"success": False, "message": str(e)}

    def login_user(self, loginRequest: LoginRequest):
        try:
            with connection.cursor() as cursor:

                cursor.execute("SELECT password FROM user WHERE name = %s", (loginRequest.username,))
                user_record = cursor.fetchone()

                if user_record:
                    stored_password = user_record[0]

                    if UserVM.hash_password(loginRequest.password) == stored_password:
                        return {"success": True, "username": loginRequest.username}

                # Nếu không tìm thấy hoặc mật khẩu sai, trả về lỗi chung
                return {"success": False, "message": "Username or password incorrect"}
        except Exception as e:
            return {"success": False, "message": str(e)}

