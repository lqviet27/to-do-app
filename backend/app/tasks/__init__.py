from flask import Blueprint

task_bp = Blueprint('tasks', __name__)

from . import routes