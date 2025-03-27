# Cronogramas de actividades academicas

Sistema para la gestión de cronogramas de parciales universitarios que permite a los maestros registrar, editar y eliminar sus propios cronogramas, mientras que los coordinadores pueden ver, editar y eliminar todos los cronogramas.

## Características

- **Autenticación de usuarios** con JWT
- **Roles de usuario**: Maestro y Coordinador
- **Gestión de cronogramas**:
  - Crear, editar y eliminar cronogramas
  - Visualización en calendario interactivo
  - Filtrado según permisos del usuario
- **Interfaz responsiva** con Bootstrap 5
- **API RESTful** con Flask

## Tecnologías

### Frontend
- HTML, CSS, JavaScript (Vanilla JS)
- [FullCalendar.js](https://fullcalendar.io/) para mostrar el calendario
- [Bootstrap 5](https://getbootstrap.com/) para el diseño
- LocalStorage para almacenamiento del JWT

### Backend
- [Flask](https://flask.palletsprojects.com/) como framework web
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/) para autenticación
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/) para ORM
- [Flask-CORS](https://flask-cors.readthedocs.io/) para manejo de CORS
- [Flask-Migrate](https://flask-migrate.readthedocs.io/) para migraciones de BD

### Base de Datos
- SQLite (desarrollo local)
- Azure SQL Database (producción)

## Estructura del Proyecto

```
cronogramas-universitarios/
├── backend/                # API con Flask
│   ├── app.py              # Punto de entrada de la API
│   ├── models.py           # Modelos de la base de datos
│   ├── routes.py           # Endpoints para autenticación y CRUD
│   ├── auth.py             # Funciones de autenticación con JWT
│   ├── database.py         # Conexión a la base de datos
│   ├── config.py           # Configuración de Flask
│   ├── requirements.txt    # Dependencias de Python
│   └── .env                # Variables de entorno
│
├── frontend/               # Aplicación web
│   ├── assets/             # CSS e imágenes
│   ├── index.html          # Página de login
│   ├── register.html       # Página de registro
│   ├── dashboard.html      # Página principal con calendario
│   ├── api.js              # Llamadas a la API Flask
│   ├── main.js             # Lógica principal
│   └── styles.css          # Estilos personalizados
│
├── .gitignore              # Archivos a ignorar en Git
└── README.md               # Este archivo
```

## Instalación y Ejecución

### Requisitos previos
- Python 3.8+
- Pip
- Navegador web moderno

### Backend
1. Navegar al directorio del backend:
   ```
   cd backend
   ```

2. Crear y activar entorno virtual:
   ```
   python -m venv env
   # En Windows
   env\Scripts\activate
   # En macOS/Linux
   source env/bin/activate
   ```

3. Instalar dependencias:
   ```
   pip install -r requirements.txt
   ```

4. Configurar variables de entorno (copiar `.env.example` a `.env` y editar)

5. Iniciar el servidor:
   ```
   flask run
   ```

### Frontend
1. Simplemente abrir `frontend/index.html` en un navegador web.
2. Para desarrollo, se puede usar un servidor local como Live Server de VS Code.

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Autenticación y generación de JWT |
| GET | `/auth/me` | Obtener información del usuario actual |
| GET | `/auth/is-coordinator` | Verificar si el usuario es coordinador |
| GET | `/cronogramas` | Ver cronogramas (filtrados según rol) |
| POST | `/cronogramas` | Crear un cronograma |
| PUT | `/cronogramas/<id>` | Editar un cronograma |
| DELETE | `/cronogramas/<id>` | Eliminar un cronograma |

## Licencia
Este proyecto es de código abierto y está disponible bajo la licencia MIT. 
