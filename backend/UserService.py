from flask import jsonify
from Model.UserVM import UserVM, LoginRequest
import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    port=3306,
    password="",
    database="todoapp",
    autocommit=True
)

class UserService:
    def __init__(self):
        # Initialize your user service
        pass

    def create_user(self, user: UserVM):
        try:
            with connection.cursor() as cursor:
                # Kiểm tra nếu tên người dùng đã tồn tại
                cursor.execute("SELECT COUNT(*) FROM user WHERE email = %s", (user.email,))
                result = cursor.fetchone()
                if result[0] > 0:
                    return {"success": False, "message": "Email already used"}

                # Hash mật khẩu và thêm người dùng mới

                cursor.execute(
                    "INSERT INTO user (email, username, password) VALUES (%s, %s, %s)",
                    (user.email, user.username, user.password)
                )
                connection.commit()

            return {"success": True, "message": "Account created successfully", "user": user}
        except Exception as e:
            return {"success": False, "message": str(e)}

    def login_user(self, loginRequest: LoginRequest):
        try:
            with connection.cursor() as cursor:

                cursor.execute("SELECT password FROM user WHERE email = %s", (loginRequest.email,))
                user_record = cursor.fetchone()

                if user_record:
                    stored_password = user_record[0]

                    if UserVM.hash_password(loginRequest.password) == stored_password:
                        return {"success": True, "email": loginRequest.email}

                # Nếu không tìm thấy hoặc mật khẩu sai, trả về lỗi chung
                return {"success": False, "message": "Email or password incorrect"}
        except Exception as e:
            return {"success": False, "message": str(e)}

