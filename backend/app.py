from flask import Flask, jsonify
import ollama

app = Flask(__name__)

@app.route('/')
def get_data():
    return jsonify({'message': 'Testing Flask'})

if __name__ == '__main__':
    app.run(debug=True)

# llm interaction function
def ollama_func(model, prompt):
    return ollama.chat(
        model=model,
        messages=[{'role': 'user', 'content': prompt}],
        stream=False
    )['message']['content']