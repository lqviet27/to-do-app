from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import pymysql
from sqlalchemy import text

pymysql.install_as_MySQLdb()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://root:@localhost:3307/todoapp"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/test-db')
def test_db():
    try:
        result = db.session.execute(text("SHOW TABLES"))
        tables = [row[0] for row in result.fetchall()]
        return jsonify({"tables": tables})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
