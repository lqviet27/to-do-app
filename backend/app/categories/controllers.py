from flask import jsonify, request
from app.extensions import db
from app.models import Category

def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200

def get_categories_by_user(user_id):
    categories = Category.query.filter_by(user_id=user_id).all()
    if not categories:
        return jsonify({"em": "No categories found for this user", "ec": 1}), 200
    return jsonify([category.to_dict() for category in categories]), 200

def create_category(data):
    new_category = Category(
        name=data['name'],
        color=data['color'],
        user_id=data['user_id'],
    )
    db.session.add(new_category)
    db.session.commit()
    return jsonify(new_category.to_dict()), 201

def update_category(category_id, data):
    category = Category.query.get(category_id)
    if not category:
        return  jsonify([]), 200

    category.name = data['name']
    category.color = data['color']

    db.session.commit()

    return jsonify(category.to_dict()), 200

def delete_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Category not found"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({"message": "Category deleted"}), 200