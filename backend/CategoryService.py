from flask import jsonify, Flask
from Model.CategoryVM import CategoryVM
import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    port = 3306,
    password="",
    database="todoapp",
    autocommit=True
)

app = Flask(__name__)

class CategoryService:
    def __init__(self):
        # Initialize your user service
        pass
    
    def create_category(self, category: CategoryVM):
        with connection.cursor() as cursor:
            try:
                cursor.execute(
                    "INSERT INTO category (id, name) VALUES (%s, %s)",
                    (category.id, category.name)  
                )
                connection.commit()
            except Exception as e:
                connection.rollback() 
                return jsonify({"error": str(e)}), 500
        return jsonify({"message": "Category created successfully"}), 201

    
    def get_categories(self):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM category")
                categories = cursor.fetchall()
                category_list = []
                for category in categories:
                    newcategory = CategoryVM(category[1], category[2])
                    category_list.append(newcategory)

            return jsonify(category_list), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500