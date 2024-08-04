from flask import Flask, jsonify, request
from flask_cors import CORS
import ollama
from langchain.prompts import ChatPromptTemplate

app = Flask(__name__)
CORS(app)
model = 'duckyModel'

PROMPT_TEMPLATE_V1 = """
Context: {context}
Fix the code above for syntax and logical errors. Return your response with 2 keys: advice and improved_code.
"""


PROMPT_TEMPLATE_V2 = """
Transcript: {transcript}
Context: {context}
Fix the code above for syntax and logical errors. Return your response with 2 keys: topic (choose from syntax/logic error or optimization), advice, advice_confidence (from 0 to 1) and improved_code.
"""

@app.route('/code-input', methods=['POST'])
def c_route():
    query = request.json["query"]
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE_V1)
    prompt = prompt_template.format(context=query) # query is what you feed into the model
    return ollama_func(model, prompt)

@app.route('/generate-suggestions', methods=['POST'])
def g_route():
    query = request.json["query"]
    transcribed = request.json["transcribed"]
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE_V2)
    prompt = prompt_template.format(context=query, transcript=transcribed)
    return ollama_func(model, prompt)

def ollama_func(model, prompt):
    return ollama.chat(
        model=model,
        messages=[{'role': 'user', 'content': prompt}],
        stream=False,
        format="json",
    )['message']['content']

if __name__ == '__main__':
    app.run(port=5005)