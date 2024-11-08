from flask import Blueprint, request, jsonify
from TaskService import TaskService
from Model.TaskVM import TaskVM

task_api = Blueprint('task_api', __name__)

task_service = TaskService()

@task_api.route('/', methods=['GET'])
def index():
    return "Welcome to the Task API!"

@task_api.route('/tasks', methods=['POST'])
def create_task_endpoint():
    data = request.get_json()
    new_task = TaskVM(
        title=data['title'],
        description=data['description'],
        status=data['status'],
        created_at=data['created_at'],
        updated_at=data['updated_at'],
        id_user=data['id_user'],
        id_category=data['id_category']
    )
    response = task_service.create_task(new_task)
    if isinstance(response, str):
        return jsonify(message=response), 201
    else:
        return jsonify({"error": response}), 500

@task_api.route('/tasks', methods=['GET'])
def get_tasks_endpoint():
    id_user = request.args.get('id_user')
    if not id_user:
        return jsonify({"error": "id_user is required"}), 400
    tasks = task_service.get_tasks(id_user)
    if isinstance(tasks, str):
        return jsonify({"error": tasks}), 500
    else:
        tasks_dict = [task.to_dict() for task in tasks]
        return jsonify(tasks_dict), 201
