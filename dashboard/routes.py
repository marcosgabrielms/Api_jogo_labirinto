# Em dashboard/routes.py

from flask import Blueprint, request, jsonify, render_template

dashboard_bp = Blueprint('dashboard', __name__)

# O estado agora guarda os dados do labirinto
estado_atual_jogo = {
    "accel_x": 0,
    "accel_y": 0
}

@dashboard_bp.route('/dados', methods=['POST'])
def receber_dados():
    global estado_atual_jogo
    dados_recebidos = request.get_json()
    
    if dados_recebidos:
        print(f"Dados recebidos do labirinto: {dados_recebidos}")
        # Atualiza o estado com os dados do acelerômetro
        estado_atual_jogo['accel_x'] = dados_recebidos.get('accel_x', 0)
        estado_atual_jogo['accel_y'] = dados_recebidos.get('accel_y', 0)
        return jsonify({"status": "sucesso"}), 200
    
    return jsonify({"status": "erro"}), 400

@dashboard_bp.route('/')
def index():
    return render_template('index.html')

@dashboard_bp.route('/status', methods=['GET'])
def get_status():
    # Envia o estado atual do jogo para a interface web
    return jsonify(estado_atual_jogo)