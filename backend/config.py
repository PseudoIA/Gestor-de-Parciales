import os
from datetime import timedelta
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

class Config:
    # Configuración general
    SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'clave_secreta_por_defecto')
    DEBUG = os.getenv('FLASK_ENV') == 'development'
    
    # Configuración de base de datos
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///cronogramas.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'clave_secreta_por_defecto')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # Configuración CORS
    CORS_HEADERS = 'Content-Type' 