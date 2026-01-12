/**
 * Notifications Component
 * Sistema de notificaciones
 */
class Notifications {
  /**
   * Crear notificación
   * @param {Object} options - Opciones
   * @param {string} options.message - Mensaje
   * @param {string} options.type - Tipo (success, error, warning, info)
   * @param {number} options.duration - Duración en ms (0 = manual)
   */
  static create(options = {}) {
    const {
      message = '',
      type = 'info',
      duration = 3000
    } = options;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Cerrar">×</button>
      </div>
    `;
    
    return notification;
  }

  /**
   * Mostrar notificación
   */
  static show(options = {}) {
    const { duration = 3000 } = options;
    const notification = this.create(options);
    
    const container = document.getElementById('notification-container');
    if (!container) return notification;
    
    container.appendChild(notification);
    
    // Agregar animación
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Cerrar con botón
    const closeBtn = notification.querySelector('.notification-close');
    const remove = () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    };
    closeBtn.addEventListener('click', remove);
    
    // Auto-close si tiene duración
    if (duration > 0) {
      setTimeout(remove, duration);
    }
    
    return notification;
  }

  /**
   * Notificación de éxito
   */
  static success(message, duration = 3000) {
    return this.show({ message, type: 'success', duration });
  }

  /**
   * Notificación de error
   */
  static error(message, duration = 5000) {
    return this.show({ message, type: 'error', duration });
  }

  /**
   * Notificación de advertencia
   */
  static warning(message, duration = 4000) {
    return this.show({ message, type: 'warning', duration });
  }

  /**
   * Notificación de información
   */
  static info(message, duration = 3000) {
    return this.show({ message, type: 'info', duration });
  }
}

window.Notifications = Notifications;