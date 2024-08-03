from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/flask-route')
def flask_route():
    return jsonify({"message": "Flask route test"})

if __name__ == '__main__':
    app.run(port=5000)