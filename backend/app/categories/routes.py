from flask import Blueprint, request
from app.categories.controllers import get_categories, get_categories_by_user
from . import categories_bp

@categories_bp.route("/", methods=["GET"])
def get_categories_routes():
    return get_categories()

@categories_bp.route("/user/<int:user_id>", methods=["GET"])
def get_categories_by_user_routes(user_id):
    return get_categories_by_user(user_id)