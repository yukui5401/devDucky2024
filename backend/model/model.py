from flask import Flask, jsonify, request
from flask_cors import CORS
import ollama
from langchain.prompts import ChatPromptTemplate

app = Flask(__name__)
CORS(app)

model = 'codegeex4'
PROMPT_TEMPLATE = """
Context: {
context
}
You have been given some code, please review it and discuss any potential issues in "topic", an array of 2-3 potential recommendations in "recommendations", the corresponding confidence from 0-1 on each recommendation as an array corresponding to the index of the recommendations array in "percentages" and any example code in "code". Format your response in this format: {{"topic": "Potential issues", "advice": ["Potential advice 1", "Potential advice 2", "Potential advice 3"], "confidence": [1.00, 0.99, 0.81], "code": "Example code"}}
Example (do not copy the contents directly, use it as a template and use your own logic given Context): {{"topic": "There are issues with the syntax", "advice": ["You should use a semicolon at the end of the line", "You should use a colon after the if statement", "You should use a colon after the else statement"], "confidence": [0.99, 0.98, 0.97], "code": "if (x == 1) {{ print('Hello, World!') }} else {{ print('Goodbye, World!') }}"}}
"""

@app.route('/flask-route', methods=['POST'])
def flask_route():
    query = request.json["query"]
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=query) # query is what you feed into the model
    return prompt

def ollama_func(model, prompt):
    return ollama.chat(
        model=model,
        messages=[{'role': 'user', 'content': prompt}],
        stream=False
    )['message']['content']

if __name__ == '__main__':
    app.run(port=5000)