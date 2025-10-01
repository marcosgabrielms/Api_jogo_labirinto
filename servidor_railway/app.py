from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Variável para armazenar o último estado recebido do jogo
dados_labirinto = {
    'labirinto': [],
    'jogador_x': 0,
    'jogador_y': 0,
    'nivel': 0,
    'accel_x': 0,
    'accel_y': 0
}

@app.route('/')
def index():
    # --- ALTERAÇÃO INICIADA ---
    # Resposta simples para verificar se a API está online
    return "API do Jogo Labirinto está no ar. Use a rota /view para ver o estado do jogo."
    # --- ALTERAÇÃO FINALIZADA ---

@app.route('/dados', methods=['POST'])
def receber_dados():
    global dados_labirinto
    # --- ALTERAÇÃO INICIADA ---
    # Bloco try-except para garantir que o servidor não quebre com dados inválidos
    try:
        dados_recebidos = request.get_json()
        
        # Imprime os dados recebidos no console para depuração
        print("Dados recebidos do Pico W:")
        print(dados_recebidos)
        
        if dados_recebidos:
            dados_labirinto = dados_recebidos
            return jsonify({"status": "sucesso", "mensagem": "Dados recebidos"}), 200
        else:
            print("ERRO: Request JSON vazio ou mal formatado.")
            return jsonify({"status": "erro", "mensagem": "Request JSON vazio ou mal formatado"}), 400
            
    except Exception as e:
        print(f"ERRO ao processar o request: {e}")
        return jsonify({"status": "erro", "mensagem": str(e)}), 400
    # --- ALTERAÇÃO FINALIZADA ---

@app.route('/api/dados', methods=['GET'])
def obter_dados():
    return jsonify(dados_labirinto)

@app.route('/view')
def view():
    return render_template('index.html')

if __name__ == '__main__':
    # --- ALTERAÇÃO INICIADA ---
    # Garante que o servidor seja acessível na sua rede local
    # Use o IP da sua máquina para o Pico W se conectar
    app.run(host='0.0.0.0', port=5000, debug=True)
    # --- ALTERAÇÃO FINALIZADA ---