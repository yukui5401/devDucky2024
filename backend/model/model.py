from flask import Flask, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)

model = 'codegeex4'
prompt = """
Hello
"""

@app.route('/flask-route')
def flask_route():
    return jsonify({"message": "Flask route test"})

def ollama_func(model, prompt):
    return ollama.chat(
        model=model,
        messages=[{'role': 'user', 'content': prompt}],
        stream=False
    )['message']['content']

if __name__ == '__main__':
    print(ollama_func(model, prompt))
    app.run(port=5000)