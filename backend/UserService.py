from flask import jsonify
from Model import UserVM
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


    def create_user(user: UserVM):
        password_hash = user.hash_password(user.password)

        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO user (name, password) VALUES (%s, %s)",
                (user.name, password_hash)
            )
            connection.commit()
        return jsonify({"message": "User created successfully"}), 201

    def login_user(user: UserVM):
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM user WHERE name = %s AND password = %s",
                    (user.username, user.hash_password(user.password))
                )
                user = cursor.fetchone()
            return jsonify({"message": "Login successful", "user": {"name": user[1]}}), 200
        except Exception as e:
            return jsonify({"message": "Invalid username or password"}), 401

