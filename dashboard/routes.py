from flask import Blueprint, request, jsonify, render_template

dashboard_bp = Blueprint('dashboard', __name__, template_folder='templates')

# Agora o estado guarda o mapa completo e a posição do jogador
estado_atual_jogo = {
    "labirinto": [],
    "jogador_x": 0,
    "jogador_y": 0,
    "nivel": 1
}

@dashboard_bp.route('/dados', methods=['POST'])
def receber_dados():
    global estado_atual_jogo
    dados_recebidos = request.get_json()
    
    if dados_recebidos:
        # Imprime os dados completos recebidos da placa
        print(f"Dados recebidos do labirinto: {dados_recebidos}")
        
        # Atualiza o estado global com os novos dados do jogo
        estado_atual_jogo['labirinto'] = dados_recebidos.get('labirinto', [])
        estado_atual_jogo['jogador_x'] = dados_recebidos.get('jogador_x', 0)
        estado_atual_jogo['jogador_y'] = dados_recebidos.get('jogador_y', 0)
        estado_atual_jogo['nivel'] = dados_recebidos.get('nivel', 1)
        
        return jsonify({"status": "sucesso"}), 200
    
    return jsonify({"status": "erro"}), 400

@dashboard_bp.route('/')
def index():
    return render_template('index.html')

@dashboard_bp.route('/status', methods=['GET'])
def get_status():
    return jsonify(estado_atual_jogo)