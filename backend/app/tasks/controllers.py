from flask import jsonify, request
from app.extensions import db
from app.models import Task

def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks]), 200

def get_tasks_by_user(user_id):
    tasks = Task.query.filter_by(user_id=user_id).all()
    if not tasks:
        return jsonify({"error": "No tasks found for this user"}), 404
    return jsonify([task.to_dict() for task in tasks]), 200

def get_tasks_by_category(category_id):
    tasks = Task.query.filter_by(category_id=category_id).all()
    if not tasks:
        return jsonify({"error": "No tasks found for this category", "ec": 1}), 200
    return jsonify([task.to_dict() for task in tasks]), 200
def create_task(data):
    new_task = Task(
        title=data['title'],
        description=data['description'],
        category_id=data['category_id'],
        user_id=data['user_id'],
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

def toggle_task_status(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.is_done = not task.is_done
    db.session.commit()

    return jsonify(task.to_dict()), 200

def update_task(task_id, data):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.title = data['title']
    task.description = data['description']
    task.category_id = data['category_id']

    db.session.commit()

    return jsonify(task.to_dict()), 200

def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"}), 200