# devDucky @ HT6 2024

## About
An integrated IDE that does more than hold your code.

### Stack
- Unsloth: We used Unsloth to fine-tune and quantize our model. We fine-tuned three different models (llama3.1 @ 375 steps, tinyllama @ 1 epoch, phi3 @ 375 steps) before settling on phi3 due to hardware constraints. We quantized all of our models to Q4_K_M.
- Ollama: We used the Ollama python library along with the Ollama cli and desktop instance to run inference on our model.
- Express: This forms the backbone of our API architecture, handling backend logic for audio recording, data analysis, and cleaning processes.
- Node: This powers our server-side operations, providing a fast and scalable foundation for our backend infrastructure.
- Vite: This drives our frontend development, enabling rapid UI implementation and efficient routing across our responsive, modern interface.
- Flask: This runs as a dedicated microservice, managing our Python-based backend components, including the integration of Ollama for advanced language processing.
- Mongoose: This streamlines our database operations, storing critical backend information, LLM responses, and user transcripts with efficiency and reliability.

## Setup
**Make sure to download and run the Ollama desktop app from (https://ollama.com/download)** *(select option to install the cli)*

### Installing our model
1. Download our trained gguf (https://huggingface.co/sjsaug17/ht6_phi3mini.1efinetune/blob/main/unsloth.Q4_K_M.gguf)
2. Name it 'model.gguf' and place it in the root project directory
3. Run 'ollama create duckyModel' (in the root directory)
4. Done!

### Installing node modules
1. cd frontend
2. npm install

### Installing pip packages
1. python -m venv [name]
2. ON MAC -> source venv/bin/activate
3. Go to root directory
4. pip install -r requirements.txt
