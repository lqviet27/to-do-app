from flask import jsonify, Flask
from Model import TaskVM
import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    port=3307,
    password="",
    database="todoapp"
)


app = Flask(__name__)

class TaskService:
    def __init__(self):
        # Initialize your user service
        pass


    def create_task(task:TaskVM):
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO task (title, description, status, createdAt, UpdateAt, idUser, idCategory) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (task.title, task.description, task.status, task.created_at, task.updated_at, task.id_user, task.id_category)
            )
            connection.commit()
        return jsonify({"message": "Task created successfully"}), 201

    def get_tasks():
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM task")
                tasks = cursor.fetchall()
                # Assuming TaskVM is a dataclass or a similar structure
                task_list = []
                for task in tasks:
                    newtask = TaskVM(task[0], task[1], task[2], task[3], task[4],task[5], task[6], task[7])
                    task_list.append(newtask)

            return jsonify(task_list), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

