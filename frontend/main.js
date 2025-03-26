/**
 * Lógica principal para el cronograma universitario
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación en páginas protegidas
    if (window.location.pathname.includes('dashboard.html')) {
        checkAuth();
        setupDashboard();
    }

    // Setup de los botones de logout si existen
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

/**
 * Verificar autenticación
 */
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // Verificar token en el backend
    api.getUserInfo()
        .catch(error => {
            console.error('Error de autenticación:', error);
            logout();
        });
}

/**
 * Cerrar sesión
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = 'index.html';
}

/**
 * Configurar dashboard
 */
function setupDashboard() {
    // Cargar información del usuario
    loadUserInfo();
    
    // Setup del calendario
    setupCalendar();
    
    // Setup del formulario
    setupForm();
}

/**
 * Cargar información del usuario en el navbar
 */
function loadUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    const userName = document.getElementById('user-name');
    const userRole = document.getElementById('user-role');
    
    if (userName && userInfo.nombre) {
        userName.textContent = userInfo.nombre;
    }
    
    if (userRole && userInfo.rol) {
        const rolText = userInfo.rol === 'coordinador' ? 'Coordinador' : 'Maestro';
        userRole.textContent = `Rol: ${rolText}`;
    }
}

/**
 * Configurar el calendario
 */
function setupCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        locale: 'es',
        height: 'auto',
        selectable: true,
        navLinks: true,
        editable: false,
        dayMaxEvents: true,
        events: function(info, successCallback, failureCallback) {
            api.getCronogramas()
                .then(cronogramas => {
                    successCallback(cronogramas);
                })
                .catch(error => {
                    console.error('Error al cargar cronogramas:', error);
                    failureCallback(error);
                });
        },
        eventClick: function(info) {
            showEventDetails(info.event);
        },
        select: function(info) {
            // Al seleccionar un rango de fechas, llenar el formulario
            clearForm();
            document.getElementById('fecha-inicio').value = formatDatetimeLocal(info.start);
            document.getElementById('fecha-fin').value = formatDatetimeLocal(info.end);
        }
    });
    
    calendar.render();
    
    // Guardar referencia al calendario para usarlo posteriormente
    window.calendar = calendar;
}

/**
 * Configurar el formulario
 */
function setupForm() {
    const form = document.getElementById('cronograma-form');
    const btnLimpiar = document.getElementById('btn-limpiar');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', clearForm);
    }
    
    // Setup de botones del modal
    const btnEditar = document.getElementById('btn-editar');
    const btnEliminar = document.getElementById('btn-eliminar');
    
    if (btnEditar) {
        btnEditar.addEventListener('click', editEvent);
    }
    
    if (btnEliminar) {
        btnEliminar.addEventListener('click', deleteEvent);
    }
}

/**
 * Manejar envío del formulario de cronograma
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const cronogramaId = document.getElementById('cronograma-id').value;
    
    // Crear objeto con los datos del formulario
    const cronogramaData = {
        titulo: document.getElementById('titulo').value,
        materia: document.getElementById('materia').value,
        fecha_inicio: document.getElementById('fecha-inicio').value,
        fecha_fin: document.getElementById('fecha-fin').value,
        color: document.getElementById('color').value,
        descripcion: document.getElementById('descripcion').value
    };
    
    try {
        let response;
        
        if (cronogramaId) {
            // Actualizar cronograma existente
            response = await api.updateCronograma(cronogramaId, cronogramaData);
        } else {
            // Crear nuevo cronograma
            response = await api.createCronograma(cronogramaData);
        }
        
        // Actualizar calendario
        window.calendar.refetchEvents();
        
        // Limpiar formulario
        clearForm();
        
        // Cerrar modal si está abierto
        const eventModal = bootstrap.Modal.getInstance(document.getElementById('event-modal'));
        if (eventModal) {
            eventModal.hide();
        }
        
    } catch (error) {
        console.error('Error al guardar cronograma:', error);
        alert('Error al guardar el cronograma: ' + error.message);
    }
}

/**
 * Limpiar formulario
 */
function clearForm() {
    document.getElementById('cronograma-id').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('materia').value = '';
    document.getElementById('fecha-inicio').value = '';
    document.getElementById('fecha-fin').value = '';
    document.getElementById('color').value = '#3788d8';
    document.getElementById('descripcion').value = '';
}

/**
 * Mostrar detalles del evento en el modal
 */
function showEventDetails(event) {
    const eventData = event.extendedProps;
    
    // Guardar ID del evento actual
    currentEventId = event.id;
    
    // Llenar modal con datos del evento
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-materia').textContent = eventData.materia || '';
    document.getElementById('event-start').textContent = formatDateTime(event.start);
    document.getElementById('event-end').textContent = formatDateTime(event.end);
    document.getElementById('event-description').textContent = eventData.description || 'Sin descripción';
    
    // Verificar permisos de edición/eliminación
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const isCoordinator = userInfo.rol === 'coordinador';
    const isOwner = eventData.usuario_id === userInfo.id;
    
    const btnEditar = document.getElementById('btn-editar');
    const btnEliminar = document.getElementById('btn-eliminar');
    
    if (btnEditar) {
        btnEditar.style.display = (isCoordinator || isOwner) ? 'block' : 'none';
    }
    
    if (btnEliminar) {
        btnEliminar.style.display = (isCoordinator || isOwner) ? 'block' : 'none';
    }
    
    // Mostrar modal
    const eventModal = new bootstrap.Modal(document.getElementById('event-modal'));
    eventModal.show();
}

// Variable para almacenar el ID del evento actual en el modal
let currentEventId = null;

/**
 * Editar evento
 */
function editEvent() {
    const event = window.calendar.getEventById(currentEventId);
    if (!event) return;
    
    // Llenar formulario con datos del evento
    document.getElementById('cronograma-id').value = event.id;
    document.getElementById('titulo').value = event.title;
    document.getElementById('materia').value = event.extendedProps.materia || '';
    document.getElementById('fecha-inicio').value = formatDatetimeLocal(event.start);
    document.getElementById('fecha-fin').value = formatDatetimeLocal(event.end);
    document.getElementById('color').value = event.backgroundColor || '#3788d8';
    document.getElementById('descripcion').value = event.extendedProps.description || '';
    
    // Cerrar modal
    const eventModal = bootstrap.Modal.getInstance(document.getElementById('event-modal'));
    eventModal.hide();
    
    // Hacer scroll al formulario
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Eliminar evento
 */
async function deleteEvent() {
    if (!currentEventId) return;
    
    if (!confirm('¿Está seguro de eliminar este cronograma?')) return;
    
    try {
        await api.deleteCronograma(currentEventId);
        
        // Actualizar calendario
        window.calendar.refetchEvents();
        
        // Cerrar modal
        const eventModal = bootstrap.Modal.getInstance(document.getElementById('event-modal'));
        eventModal.hide();
        
    } catch (error) {
        console.error('Error al eliminar cronograma:', error);
        alert('Error al eliminar el cronograma: ' + error.message);
    }
}

/**
 * Formatear fecha para mostrar
 */
function formatDateTime(date) {
    if (!date) return '';
    
    return new Date(date).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formatear fecha para input datetime-local
 */
function formatDatetimeLocal(date) {
    if (!date) return '';
    
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
} 