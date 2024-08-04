from flask import Flask, jsonify, request
from flask_cors import CORS
import ollama
from langchain.prompts import ChatPromptTemplate

app = Flask(__name__)
CORS(app)

model = 'phi3:mini'
# PROMPT_TEMPLATE = """
# Context: {context}
# You have been given some code, please review it and discuss any potential issues in "topic", an array of 2-3 potential recommendations in "recommendations", the corresponding confidence from 0-1 for each recommendation as an array corresponding to the index of the recommendation and any example code in "code". Return your response in this json format: {{"topic": "Potential issues", "advice": ["Potential advice 1", "Potential advice 2", "Potential advice 3"], "confidence": [int, int, int], "code": "Example code"}}
# """
PROMPT_TEMPLATE = """
Context: {context}
Evaluate the code above. Return your response in 2 parts: advice and example code.
"""

@app.route('/code-input', methods=['POST'])
def c_route():
    query = request.json["query"]
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=query) # query is what you feed into the model
    return prompt

@app.route('/generate-suggestions', methods=['POST'])
def g_route():
    query = request.json["query"]
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=query)
    return ollama_func(model, prompt)

def ollama_func(model, prompt):
    return ollama.chat(
        model=model,
        messages=[{'role': 'user', 'content': prompt}],
        stream=False,
        format="json",
    )['message']['content']

if __name__ == '__main__':
    app.run(port=5001)