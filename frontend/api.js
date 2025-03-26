/**
 * API para comunicarse con el backend
 */
const API_URL = 'http://localhost:5000'; // Cambiar a la URL de producción cuando se despliega

const api = {
    /**
     * Obtener el token de autenticación
     */
    getToken() {
        return localStorage.getItem('token');
    },

    /**
     * Realizar una petición a la API
     */
    async fetchAPI(endpoint, options = {}) {
        // Configuración por defecto
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Si hay token, añadirlo a los headers
        const token = this.getToken();
        if (token) {
            defaultOptions.headers['Authorization'] = `Bearer ${token}`;
        }

        // Combinar opciones
        const fetchOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);
            const data = await response.json();

            // Si el status es de error, lanzar excepción
            if (!response.ok) {
                throw new Error(data.error || 'Error en la petición');
            }

            return data;
        } catch (error) {
            console.error('Error en API:', error);
            throw error;
        }
    },

    /**
     * Iniciar sesión
     */
    async login(email, password) {
        return this.fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },

    /**
     * Registrar usuario
     */
    async register(nombre, email, password, rol) {
        return this.fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ nombre, email, password, rol })
        });
    },

    /**
     * Obtener información del usuario actual
     */
    async getUserInfo() {
        return this.fetchAPI('/auth/me');
    },

    /**
     * Verificar si el usuario es coordinador
     */
    async checkIsCoordinator() {
        return this.fetchAPI('/auth/is-coordinator');
    },

    /**
     * Obtener todos los cronogramas
     */
    async getCronogramas() {
        return this.fetchAPI('/cronogramas');
    },

    /**
     * Crear un cronograma
     */
    async createCronograma(cronograma) {
        return this.fetchAPI('/cronogramas', {
            method: 'POST',
            body: JSON.stringify(cronograma)
        });
    },

    /**
     * Actualizar un cronograma
     */
    async updateCronograma(id, cronograma) {
        return this.fetchAPI(`/cronogramas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(cronograma)
        });
    },

    /**
     * Eliminar un cronograma
     */
    async deleteCronograma(id) {
        return this.fetchAPI(`/cronogramas/${id}`, {
            method: 'DELETE'
        });
    }
}; 