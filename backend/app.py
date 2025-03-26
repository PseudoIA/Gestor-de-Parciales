from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from database import init_db
from routes import auth_bp, cronogramas_bp
from config import Config

def create_app():
    """Crear y configurar la aplicación Flask"""
    app = Flask(__name__)
    
    # Cargar configuración
    app.config.from_object(Config)
    
    # Inicializar extensiones
    jwt = JWTManager(app)
    
    CORS(app)
    
    # Inicializar base de datos
    db = init_db(app)
    
    # Registrar blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(cronogramas_bp)
    
    # Ruta de prueba
    @app.route('/')
    def index():
        return {
            'mensaje': 'API de Cronogramas Universitarios',
            'version': '1.0',
            'status': 'online'
        }
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) 