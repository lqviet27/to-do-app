from flask import Blueprint, request, jsonify
from app.tasks.controllers import get_tasks, get_tasks_by_user, create_task, toggle_task_status
from . import task_bp

@task_bp.route("/", methods=["GET"])
def get_tasks_routes():
    return get_tasks()

@task_bp.route("/user/<int:user_id>", methods=["GET"])
def get_tasks_by_user_routes(user_id):
    return get_tasks_by_user(user_id)

@task_bp.route("/create", methods=["POST"])
def create_task_routes():
    data = request.get_json()
    return create_task(data)

@task_bp.route("/toggle/<int:task_id>", methods=["PUT"])
def toggle_task_status_routes(task_id):
    return toggle_task_status(task_id)