from flask import Flask
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3307/todoapp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Tạo bảng khi chạy ứng dụng
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Tạo tất cả các bảng trong cơ sở dữ liệu
    app.run(debug=True)