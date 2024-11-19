from flask import Blueprint, request
from app.categories.controllers import get_categories, get_categories_by_user, create_category, update_category, delete_category
from . import categories_bp

@categories_bp.route("/", methods=["GET"])
def get_categories_routes():
    return get_categories()

@categories_bp.route("/user/<int:user_id>", methods=["GET"])
def get_categories_by_user_routes(user_id):
    return get_categories_by_user(user_id)

@categories_bp.route("/create", methods=["POST"])
def create_category_routes():
    data = request.get_json()
    return create_category(data)

@categories_bp.route("/update/<int:category_id>", methods=["PUT"])
def update_category_routes(category_id):
    data = request.get_json()
    return update_category(category_id, data)

@categories_bp.route("/delete/<int:category_id>", methods=["DELETE"])
def delete_category_routes(category_id):
    return delete_category(category_id)