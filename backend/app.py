from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def get_data():
    return jsonify({'message': 'Testing Flask'})

if __name__ == '__main__':
    app.run(debug=True)
