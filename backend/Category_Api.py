from flask import Flask, request, jsonify
from CategoryService import CategoryService
from Model.CategoryVM import CategoryVM  

app = Flask(__name__)

category_service = CategoryService()

@app.route('/categories', methods=['POST'])
def create_category_endpoint():
    data = request.get_json()
    new_category = CategoryVM(id=data['id'], name=data['name'])
                    
    return category_service.create_category(new_category)

@app.route('/categories', methods = ['GET'])
def get_categories_endpoint():
    data = request.get_json()
    categories = category_service.get_categories(data['id'])

    categories_dict = [category.to_dict() for category in categories]

    return jsonify(categories_dict), 200
    

if __name__ == '__main__':
    app.run(debug=True)
