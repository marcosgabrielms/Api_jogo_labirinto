import sys
import os
from flask import Flask
from flask_cors import CORS

# --- INÍCIO DA CORREÇÃO ---
# Adiciona a pasta raiz (API_JOGO_LABIRINTO) aos locais onde o Python procura módulos
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
# --- FIM DA CORREÇÃO ---

from dashboard.routes import dashboard_bp

# --- CORREÇÃO AQUI ---
# Informa ao Flask que a pasta 'static' está um nível acima
app = Flask(__name__, static_folder='../static')

CORS(app) 

app.register_blueprint(dashboard_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)