
from flask import Flask, request
from TaskService import TaskVM, TaskService
app = Flask(__name__)

task_service = TaskService()


@app.route('/tasks', methods=['POST'])
def create_task_endpoint():
    data = request.get_json()
    new_task = TaskVM(title=data['title'], description=data['description'],
                      status=data['status'], created_at = data['created_at'], updated_at= data['updated_at'], id_user=data['id_user'], id_category=data['id_category'])

    return task_service.create_task(new_task)

if __name__ == '__main__':
    app.run(debug=True)



