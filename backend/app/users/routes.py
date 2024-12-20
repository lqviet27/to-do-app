from flask import Blueprint, request, jsonify
from . import user_bp
from app.users.controllers import updata_user_info, change_password, reset_password


@user_bp.route("/update/<int:user_id>", methods=["PUT"])
def update_user_info_routes(user_id):
    data = request.get_json()
    return updata_user_info(user_id, data)

@user_bp.route("/cp/<int:user_id>", methods=["PUT"])
def change_password_routes(user_id):
    data = request.get_json()
    return change_password(user_id, data)

@user_bp.route("/rp/<int:user_id>", methods=["PUT"])
def reset_password_routes(user_id):
    return reset_password(user_id)
