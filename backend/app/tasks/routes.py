from flask import Blueprint, request, jsonify
from app.tasks.controllers import get_tasks, get_tasks_by_user, get_tasks_by_category, create_task, toggle_task_status, update_task, delete_task
from . import task_bp

@task_bp.route("/", methods=["GET"])
def get_tasks_routes():
    return get_tasks()

@task_bp.route("/user/<int:user_id>", methods=["GET"])
def get_tasks_by_user_routes(user_id):
    return get_tasks_by_user(user_id)

@task_bp.route("/category/<int:category_id>", methods=["GET"])
def get_tasks_by_category_routes(category_id):
    return get_tasks_by_category(category_id)

@task_bp.route("/create", methods=["POST"])
def create_task_routes():
    data = request.get_json()
    return create_task(data)

@task_bp.route("/toggle/<int:task_id>", methods=["PUT"])
def toggle_task_status_routes(task_id):
    return toggle_task_status(task_id)

@task_bp.route("/update/<int:task_id>", methods=["PUT"])
def update_task_routes(task_id):
    data = request.get_json()
    return update_task(task_id, data)

@task_bp.route("/delete/<int:task_id>", methods=["DELETE"])
def delete_task_routes(task_id):
    return delete_task(task_id)