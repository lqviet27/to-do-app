from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .models import db
from .config import Config
from app.models import Task, Category, User
from app.extensions import db, migrate
from .auth import auth_bp
from .tasks import task_bp
from .categories import categories_bp
from flask_cors import CORS
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(task_bp, url_prefix='/tasks')
    app.register_blueprint(categories_bp, url_prefix='/categories')

    return app

