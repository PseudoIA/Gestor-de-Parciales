from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import Usuario, Cronograma
from database import db

# Crear blueprints
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
cronogramas_bp = Blueprint('cronogramas', __name__, url_prefix='/cronogramas')

# Importar funciones de autenticación
from auth import register_user, login_user, get_current_user, check_is_coordinator

# Rutas de autenticación
auth_bp.route('/register', methods=['POST'])(register_user)
auth_bp.route('/login', methods=['POST'])(login_user)
auth_bp.route('/me', methods=['GET'])(get_current_user)
auth_bp.route('/is-coordinator', methods=['GET'])(check_is_coordinator)

# Rutas de cronogramas
@cronogramas_bp.route('', methods=['GET'])
@jwt_required()
def get_cronogramas():
    """Obtener cronogramas (maestro: solo propios, coordinador: todos)"""
    usuario_id = get_jwt_identity()
    
    # Verificar si el usuario existe
    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    # Filtrar cronogramas según el rol
    if usuario.rol == 'coordinador':
        # Los coordinadores pueden ver todos los cronogramas
        cronogramas = Cronograma.query.all()
    else:
        # Los maestros solo pueden ver sus propios cronogramas
        cronogramas = Cronograma.query.filter_by(usuario_id=usuario_id).all()
    
    # Convertir a formato JSON
    cronogramas_json = [cronograma.to_dict() for cronograma in cronogramas]
    
    return jsonify(cronogramas_json), 200

@cronogramas_bp.route('', methods=['POST'])
@jwt_required()
def create_cronograma():
    """Crear un nuevo cronograma"""
    usuario_id = get_jwt_identity()
    data = request.get_json()
    
    # Verificar datos requeridos
    required_fields = ['titulo', 'materia', 'fecha_inicio', 'fecha_fin']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"El campo '{field}' es requerido"}), 400
    
    try:
        # Convertir fechas de string a datetime
        fecha_inicio = datetime.fromisoformat(data['fecha_inicio'])
        fecha_fin = datetime.fromisoformat(data['fecha_fin'])
        
        # Verificar que la fecha de fin sea posterior a la de inicio
        if fecha_fin <= fecha_inicio:
            return jsonify({"error": "La fecha de fin debe ser posterior a la fecha de inicio"}), 400
        
        # Crear nuevo cronograma
        nuevo_cronograma = Cronograma(
            titulo=data['titulo'],
            materia=data['materia'],
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            usuario_id=usuario_id,
            color=data.get('color', '#3788d8'),
            descripcion=data.get('descripcion')
        )
        
        db.session.add(nuevo_cronograma)
        db.session.commit()
        
        return jsonify(nuevo_cronograma.to_dict()), 201
        
    except ValueError:
        return jsonify({"error": "Formato de fecha inválido. Use ISO format (YYYY-MM-DDTHH:MM:SS)"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@cronogramas_bp.route('/<int:cronograma_id>', methods=['PUT'])
@jwt_required()
def update_cronograma(cronograma_id):
    """Editar un cronograma (maestro: solo propios, coordinador: todos)"""
    usuario_id = get_jwt_identity()
    data = request.get_json()
    
    # Buscar el cronograma
    cronograma = Cronograma.query.get(cronograma_id)
    if not cronograma:
        return jsonify({"error": "Cronograma no encontrado"}), 404
    
    # Verificar permisos
    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    # Si no es coordinador y no es el dueño del cronograma, denegar acceso
    if usuario.rol != 'coordinador' and cronograma.usuario_id != usuario_id:
        return jsonify({"error": "No tienes permiso para editar este cronograma"}), 403
    
    try:
        # Actualizar campos
        if 'titulo' in data:
            cronograma.titulo = data['titulo']
        if 'materia' in data:
            cronograma.materia = data['materia']
        if 'fecha_inicio' in data:
            cronograma.fecha_inicio = datetime.fromisoformat(data['fecha_inicio'])
        if 'fecha_fin' in data:
            cronograma.fecha_fin = datetime.fromisoformat(data['fecha_fin'])
        if 'color' in data:
            cronograma.color = data['color']
        if 'descripcion' in data:
            cronograma.descripcion = data['descripcion']
        
        # Verificar que la fecha de fin sea posterior a la de inicio
        if cronograma.fecha_fin <= cronograma.fecha_inicio:
            return jsonify({"error": "La fecha de fin debe ser posterior a la fecha de inicio"}), 400
        
        db.session.commit()
        
        return jsonify(cronograma.to_dict()), 200
        
    except ValueError:
        return jsonify({"error": "Formato de fecha inválido. Use ISO format (YYYY-MM-DDTHH:MM:SS)"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@cronogramas_bp.route('/<int:cronograma_id>', methods=['DELETE'])
@jwt_required()
def delete_cronograma(cronograma_id):
    """Eliminar un cronograma (maestro: solo propios, coordinador: todos)"""
    usuario_id = get_jwt_identity()
    
    # Buscar el cronograma
    cronograma = Cronograma.query.get(cronograma_id)
    if not cronograma:
        return jsonify({"error": "Cronograma no encontrado"}), 404
    
    # Verificar permisos
    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    # Si no es coordinador y no es el dueño del cronograma, denegar acceso
    if usuario.rol != 'coordinador' and cronograma.usuario_id != usuario_id:
        return jsonify({"error": "No tienes permiso para eliminar este cronograma"}), 403
    
    try:
        db.session.delete(cronograma)
        db.session.commit()
        
        return jsonify({"mensaje": "Cronograma eliminado exitosamente"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500 