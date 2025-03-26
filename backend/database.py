from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Inicializar SQLAlchemy
db = SQLAlchemy()

def init_db(app):
    """Inicializar la base de datos con la aplicación Flask"""
    db.init_app(app)
    
    # Configurar Flask-Migrate
    migrate = Migrate(app, db)
    
    # Crear todas las tablas si no existen
    with app.app_context():
        db.create_all()
        
    return db 