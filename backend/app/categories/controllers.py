from flask import jsonify, request
from app.extensions import db
from app.models import Category

def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200

def get_categories_by_user(user_id):
    categories = Category.query.filter_by(user_id=user_id).all()
    if not categories:
        return jsonify({"error": "No categories found for this user"}), 404
    return jsonify([category.to_dict() for category in categories]), 200