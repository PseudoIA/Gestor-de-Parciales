# Sistema de Gestión de Cronogramas Académicos

Aplicación web diseñada para la gestión eficiente de cronogramas de actividades académicas (como parciales, entregas, etc.) en un entorno universitario. Permite a los usuarios con rol de 'Maestro' administrar sus propios cronogramas, mientras que los usuarios 'Coordinador' tienen visibilidad y control sobre todos los cronogramas registrados en el sistema.

## Características Principales

-   **Autenticación Segura:** Implementación de JSON Web Tokens (JWT) para la autenticación y autorización de usuarios.
-   **Roles de Usuario Diferenciados:**
    -   **Maestro:** Gestión exclusiva de sus cronogramas personales.
    -   **Coordinador:** Acceso y gestión completa de todos los cronogramas.
-   **Gestión Integral de Cronogramas (CRUD):**
    -   Creación, edición y eliminación de eventos de cronograma.
    -   Visualización clara y dinámica en un calendario interactivo (`FullCalendar.js`).
    -   Filtrado automático de eventos según los permisos del rol de usuario.
-   **Interfaz Moderna y Responsiva:** Diseño adaptable a diferentes dispositivos utilizando Bootstrap 5 y estilos personalizados.
-   **API RESTful Robusta:** Backend desarrollado con Flask que provee los endpoints necesarios para la interacción con los datos.

## Tecnologías Utilizadas

### Frontend (Interfaz de Usuario)

-   **HTML5:** Estructura semántica de las páginas web.
-   **CSS3:** Estilización y diseño visual.
    -   [Bootstrap 5](https://getbootstrap.com/): Framework CSS para diseño responsivo y componentes predefinidos.
    -   `styles.css`: Estilos personalizados para un tema visual único ("cyberpunk").
-   **JavaScript (Vanilla JS):** Lógica del lado del cliente e interactividad.
    -   [FullCalendar.js](https://fullcalendar.io/): Librería para la visualización de calendarios interactivos.
    -   `Workspace API`: Para la comunicación asíncrona con el backend.
    -   `LocalStorage`: Almacenamiento del token JWT en el navegador.

### Backend (API RESTful)

-   **Python 3:** Lenguaje de programación principal.
-   **Framework Web:**
    -   [Flask](https://flask.palletsprojects.com/): Microframework web ligero y extensible.
-   **Extensiones de Flask:**
    -   [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/): ORM (Object-Relational Mapper) para interactuar con la base de datos.
    -   [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/): Manejo de autenticación basada en JWT.
    -   [Flask-CORS](https://flask-cors.readthedocs.io/): Gestión de políticas Cross-Origin Resource Sharing.
    -   [Flask-Migrate](https://flask-migrate.readthedocs.io/): Manejo de migraciones de esquema de base de datos (usando Alembic).
-   **Seguridad:**
    -   `bcrypt`: Librería para el hasheo seguro de contraseñas.
-   **Variables de Entorno:**
    -   `python-dotenv`: Carga de variables de entorno desde un archivo `.env`.

### Base de Datos

-   **Desarrollo Local:** SQLite (configurado por defecto para facilidad de inicio).
-   **Producción:** Azure SQL Database (u otra base de datos relacional compatible con SQLAlchemy).

## Estructura del Proyecto

¡Entendido! Aquí tienes una versión actualizada del archivo README.md con los cambios solicitados:

Nombre del proyecto más formal.
Sección de estructura del proyecto con descripción de cada archivo.
Aclaración sobre el despliegue en Azure y la necesidad de la cadena de conexión en .env.
Markdown

# Sistema de Gestión de Cronogramas Académicos

Aplicación web diseñada para la gestión eficiente de cronogramas de actividades académicas (como parciales, entregas, etc.) en un entorno universitario. Permite a los usuarios con rol de 'Maestro' administrar sus propios cronogramas, mientras que los usuarios 'Coordinador' tienen visibilidad y control sobre todos los cronogramas registrados en el sistema.

## Características Principales

-   **Autenticación Segura:** Implementación de JSON Web Tokens (JWT) para la autenticación y autorización de usuarios.
-   **Roles de Usuario Diferenciados:**
    -   **Maestro:** Gestión exclusiva de sus cronogramas personales.
    -   **Coordinador:** Acceso y gestión completa de todos los cronogramas.
-   **Gestión Integral de Cronogramas (CRUD):**
    -   Creación, edición y eliminación de eventos de cronograma.
    -   Visualización clara y dinámica en un calendario interactivo (`FullCalendar.js`).
    -   Filtrado automático de eventos según los permisos del rol de usuario.
-   **Interfaz Moderna y Responsiva:** Diseño adaptable a diferentes dispositivos utilizando Bootstrap 5 y estilos personalizados.
-   **API RESTful Robusta:** Backend desarrollado con Flask que provee los endpoints necesarios para la interacción con los datos.

## Tecnologías Utilizadas

### Frontend (Interfaz de Usuario)

-   **HTML5:** Estructura semántica de las páginas web.
-   **CSS3:** Estilización y diseño visual.
    -   [Bootstrap 5](https://getbootstrap.com/): Framework CSS para diseño responsivo y componentes predefinidos.
    -   `styles.css`: Estilos personalizados para un tema visual único ("cyberpunk").
-   **JavaScript (Vanilla JS):** Lógica del lado del cliente e interactividad.
    -   [FullCalendar.js](https://fullcalendar.io/): Librería para la visualización de calendarios interactivos.
    -   `Workspace API`: Para la comunicación asíncrona con el backend.
    -   `LocalStorage`: Almacenamiento del token JWT en el navegador.

### Backend (API RESTful)

-   **Python 3:** Lenguaje de programación principal.
-   **Framework Web:**
    -   [Flask](https://flask.palletsprojects.com/): Microframework web ligero y extensible.
-   **Extensiones de Flask:**
    -   [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/): ORM (Object-Relational Mapper) para interactuar con la base de datos.
    -   [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/): Manejo de autenticación basada en JWT.
    -   [Flask-CORS](https://flask-cors.readthedocs.io/): Gestión de políticas Cross-Origin Resource Sharing.
    -   [Flask-Migrate](https://flask-migrate.readthedocs.io/): Manejo de migraciones de esquema de base de datos (usando Alembic).
-   **Seguridad:**
    -   `bcrypt`: Librería para el hasheo seguro de contraseñas.
-   **Variables de Entorno:**
    -   `python-dotenv`: Carga de variables de entorno desde un archivo `.env`.

### Base de Datos

-   **Desarrollo Local:** SQLite (configurado por defecto para facilidad de inicio).
-   **Producción:** Azure SQL Database (u otra base de datos relacional compatible con SQLAlchemy).

## Estructura del Proyecto

/
├── backend/                # Contiene el código de la API RESTful (Flask)
│   ├── app.py              # Punto de entrada principal de la aplicación Flask, configuración inicial y registro de Blueprints.
│   ├── models.py           # Define los modelos de datos SQLAlchemy (Usuario, Cronograma) y sus relaciones.
│   ├── routes.py           # Define los endpoints (rutas) de la API para autenticación y operaciones CRUD de cronogramas.
│   ├── auth.py             # Contiene la lógica específica para el registro, login y verificación de usuarios (JWT).
│   ├── database.py         # Inicializa la conexión con la base de datos (SQLAlchemy) y configura Flask-Migrate.
│   ├── config.py           # Carga la configuración de la aplicación (ej. claves secretas, URL de BD) desde variables de entorno (.env).
│   ├── requirements.txt    # Lista las dependencias de Python necesarias para el backend.
│   └── .env                # Archivo (NO versionado) para almacenar variables de entorno (claves secretas, URL de BD, etc.).
│
├── frontend/               # Contiene el código de la interfaz de usuario (cliente web)
│   ├── assets/             # (Opcional) Podría contener CSS adicional, imágenes, fuentes, etc.
│   ├── index.html          # Página de inicio de sesión (login) para los usuarios.
│   ├── register.html       # Página de registro para nuevos usuarios.
│   ├── dashboard.html      # Página principal de la aplicación donde se muestra el calendario y el formulario de gestión.
│   ├── api.js              # Módulo JavaScript para realizar llamadas a la API del backend (configura la URL base de la API).
│   ├── main.js             # Lógica principal de JavaScript del frontend (manejo de eventos, FullCalendar, interacción con API, lógica de UI).
│   └── styles.css          # Hoja de estilos CSS personalizada para la apariencia visual de la aplicación (tema "cyberpunk").
│
├── .gitignore              # Especifica qué archivos y directorios deben ser ignorados por el control de versiones Git.
└── README.md               # Este archivo de documentación.

## Instalación y Ejecución Local

### Requisitos Previos

-   Python 3.8 o superior instalado.
-   `pip` (gestor de paquetes de Python).
-   Un navegador web moderno (Chrome, Firefox, Edge, etc.).
-   Git (opcional, para clonar el repositorio).

### Configuración del Backend (API)

1.  **Clonar o descargar** el repositorio (si aplica).
2.  **Navegar** al directorio `backend/`:
    ```bash
    cd backend
    ```
3.  **Crear un entorno virtual** (recomendado):
    ```bash
    python -m venv env
    ```
4.  **Activar el entorno virtual:**
    * Windows (cmd/powershell): `env\Scripts\activate`
    * macOS/Linux (bash/zsh): `source env/bin/activate`
5.  **Instalar las dependencias** de Python:
    ```bash
    pip install -r requirements.txt
    ```
6.  **Configurar las variables de entorno:**
    * Crea un archivo llamado `.env` en el directorio `backend/` (puedes copiar y renombrar `.env.example` si existe).
    * Define las variables necesarias dentro del archivo `.env`, **especialmente `DATABASE_URL`**.
        * **Para desarrollo local con SQLite:** `DATABASE_URL=sqlite:///./instance/cronogramas.db` (o la ruta deseada). Asegúrate de que el directorio `instance` exista o se cree.
        * **Para producción (ej. Azure SQL):** `DATABASE_URL=postgresql+psycopg2://user:password@host:port/database` (o el formato adecuado para tu driver y base de datos: `mssql+pyodbc://...` para SQL Server/Azure SQL). **Esta cadena de conexión es crucial para conectar con la base de datos desplegada.**
    * Define también `JWT_SECRET_KEY` con una clave secreta segura.
7.  **(Opcional) Aplicar migraciones de base de datos:** Si usas Flask-Migrate y tienes migraciones:
    ```bash
    flask db upgrade
    ```
    (Si es la primera vez y no hay migraciones, la base de datos se creará al iniciar la app si se usa `db.create_all()` en `database.py` o `app.py`).
8.  **Iniciar el servidor Flask:**
    ```bash
    flask run
    ```
    La API estará disponible por defecto en `http://127.0.0.1:5000`.

### Ejecución del Frontend

1.  **Abrir el archivo** `frontend/index.html` directamente en tu navegador web.
2.  **Alternativa (Desarrollo):** Puedes usar un servidor de desarrollo local (como la extensión "Live Server" en VS Code) para servir los archivos del directorio `frontend/`. Esto ayuda con la recarga automática al hacer cambios.

**Importante:** El frontend (en `frontend/api.js`) está configurado para comunicarse con la API en una URL específica (actualmente `https://demo2-cronograma.azurewebsites.net`). Si ejecutas el backend localmente, necesitarás cambiar `API_URL` en `frontend/api.js` a `http://127.0.0.1:5000` (o la dirección donde se esté ejecutando tu backend local).

## Despliegue

-   **Backend (API):** La API Flask está preparada para ser desplegada en plataformas como **Azure Web Apps** (App Service). Requiere configurar las variables de entorno (especialmente `DATABASE_URL` apuntando a la base de datos de producción y `JWT_SECRET_KEY`) en el servicio de hosting. Se recomienda usar un servidor WSGI como Gunicorn en producción.
-   **Frontend:** Al ser archivos estáticos (HTML, CSS, JS), puede ser desplegado en cualquier servicio de hosting de sitios estáticos (Azure Static Web Apps, Netlify, Vercel, GitHub Pages, etc.) o servido junto con el backend si se configura adecuadamente.

## Endpoints Principales de la API

| Método | Ruta                 | Descripción                                         | Requiere Auth |
| :----- | :------------------- | :-------------------------------------------------- | :------------ |
| POST   | `/auth/register`     | Registra un nuevo usuario (Maestro o Coordinador).  | No            |
| POST   | `/auth/login`        | Autentica un usuario y devuelve un token JWT.       | No            |
| GET    | `/auth/me`           | Obtiene la información del usuario autenticado.     | Sí (JWT)      |
| GET    | `/auth/is-coordinator`| Verifica si el usuario autenticado es Coordinador. | Sí (JWT)      |
| GET    | `/cronogramas`       | Obtiene cronogramas (filtrados según rol).          | Sí (JWT)      |
| POST   | `/cronogramas`       | Crea un nuevo evento de cronograma.                 | Sí (JWT)      |
| PUT    | `/cronogramas/<id>` | Actualiza un evento de cronograma existente.        | Sí (JWT)      |
| DELETE | `/cronogramas/<id>` | Elimina un evento de cronograma existente.          | Sí (JWT)      |

## Licencia

Este proyecto es de código abierto y se distribuye bajo la [Licencia MIT](LICENSE). (Asegúrate de tener un archivo LICENSE si mencionas una).