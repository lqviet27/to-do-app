
from flask import Flask
from Model.TaskVM import TaskVM
import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    port=3306,
    password="",
    database="todoapp",
    autocommit=True
)

app = Flask(__name__)

class TaskService:
    def __init__(self):
        # Initialize your user service
        pass

    def create_task(self, task: TaskVM):
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO task (title, description, status, createdAt, UpdatedAt, idUser, idCategory) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (task.title, task.description, task.status, task.created_at, task.updated_at, task.id_user, task.id_category)
                )
                connection.commit()
            return "Task created successfully"
        except Exception as e:
            return str(e)

    def get_tasks(self,idUser: int):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM task WHERE idUser = %s", (idUser,))
                tasks = cursor.fetchall()
                task_list = []
                for task in tasks:
                    newtask = TaskVM(id= task[0],title= task[1],description= task[2],status= task[3],
                                     created_at= task[4],updated_at= task[5],id_user= task[6],id_category= task[7])
                    task_list.append(newtask)
            return task_list
        except Exception as e:
            return str(e)

    def get_tasks_by_status(self, idUser: int, status: str ):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM task WHERE status = %s AND idUser = %s", (status,idUser,))
                tasks = cursor.fetchall()
                task_list = []
                for task in tasks:
                    newtask = TaskVM(task[1], task[1], task[2], task[3], task[4], task[5], task[6],task[7])
                    task_list.append(newtask)
            return task_list
        except Exception as e:
            return str(e)

    def get_tasks_by_category(self, idUser: int, idCategory: int):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM task WHERE idCategory = %s AND idUser = %s", (idCategory,idUser,))
                tasks = cursor.fetchall()
                task_list = []
                for task in tasks:
                    newtask = TaskVM(task[0], task[1], task[2], task[3], task[4], task[5], task[6],task[7])
                    task_list.append(newtask)
            return task_list
        except Exception as e:
            return str(e)

    def get_tasks_by_category_status(self, idUser: int, idCategory: int, status: str ):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM task WHERE status = %s AND idCategory = %s AND idUser = %s", (status,idCategory,idUser,))
                tasks = cursor.fetchall()
                task_list = []
                for task in tasks:
                    newtask = TaskVM(task[0], task[1], task[2], task[3], task[4], task[5], task[6],task[7])
                    task_list.append(newtask)
            return task_list
        except Exception as e:
            return str(e)