
from flask import Flask, request, jsonify
from TaskService import TaskService
from Model.TaskVM import TaskVM
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
task_service = TaskService()

@app.route('/')
def index():
    return "Welcome to the Task API!"


@app.route('/tasks', methods=['POST'])
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


@app.route('/tasks', methods=['GET'])
def get_tasks_endpoint():
    # data = request.get_json()
    # tasks = task_service.get_tasks(data['id_user'])
    #
    # tasks_dict = [task.to_dict() for task in tasks]
    #
    # return jsonify(tasks_dict), 200
    id_user = request.args.get('id_user')  # Lấy id_user từ query parameters
    if not id_user:
        return jsonify({"error": "id_user is required"}), 400  # Kiểm tra id_user có tồn tại không

    tasks = task_service.get_tasks(id_user)

    tasks_dict = [task.to_dict() for task in tasks]

    return jsonify(tasks_dict), 200



@app.route('/tasks/status', methods=['GET'])
def get_tasks_by_status():
    data = request.get_json()

    tasks = task_service.get_tasks_by_status(data['id_user'],data['status'])

    tasks_dict = [task.to_dict() for task in tasks]

    return jsonify(tasks_dict), 200


@app.route('/tasks/category', methods=['GET'])
def get_tasks_by_category():
    data = request.get_json()

    tasks = task_service.get_tasks_by_category(data['id_user'],data['id_category'])

    tasks_dict = [task.to_dict() for task in tasks]

    return jsonify(tasks_dict), 200

@app.route('/tasks/category/status', methods=['GET'])
def get_tasks_by_category_status():
    data = request.get_json()

    tasks = task_service.get_tasks_by_category_status(data['id_user'],data['id_category'],data['status'])

    tasks_dict = [task.to_dict() for task in tasks]

    return jsonify(tasks_dict), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
