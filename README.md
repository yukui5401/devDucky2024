# devDucky @ HT6 2024
Developer tool.

## Ollama Setup
**Make sure you have downloaded, installed, and are running the Ollama desktop app from (https://ollama.com/download) (make sure to install the cli)**
### Installing Main Code Assistant Model
1. Run 'ollama pull codegeex4'
2. Done!

### Installing the fine-tuned model
1. Download our trained gguf (https://huggingface.co/sjsaug17/ht6_l3.1finetune_v2/blob/main/unsloth.Q4_K_M.gguf)
2. Name it 'model.gguf' and move it to the root project directory
3. Run 'ollama create test1' (in the root directory)
4. Done!
