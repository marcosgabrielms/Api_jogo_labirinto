from flask import Flask
from flask_cors import CORS

from dashboard.routes import dashboard_bp

app = Flask(__name__)
CORS(app) # Habilita CORS para todas as rotas

app.register_blueprint(dashboard_bp)

if __name__ - '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)