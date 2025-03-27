from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

# Inicializar SQLAlchemy
db = SQLAlchemy()

def init_db(app):
    """Inicializar la base de datos con la aplicación Flask"""
    app.config.from_object(Config)
    db.init_app(app)
    
    # Configurar Flask-Migrate
    migrate = Migrate(app, db)
    
    # Crear todas las tablas si no existen
    with app.app_context():
        db.create_all()

    with app.app_context():
        try:
            db.create_all()
            print("✅ Base de datos inicializada correctamente.")
        except Exception as e:
            print(f"❌ Error al inicializar la base de datos: {e}")

    return db
        
    return db 

