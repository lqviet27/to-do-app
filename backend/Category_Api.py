from flask import Flask, request
from CategoryService import CategoryService
from models import Category  

app = Flask(__name__)

category_service = CategoryService()

@app.route('/categories', methods=['POST'])
def create_category_endpoint():
    data = request.get_json()
    new_category = Category(id=data['id'], name=data['name'])
                    
    return category_service.create_category(new_category)

if __name__ == '__main__':
    app.run(debug=True)
