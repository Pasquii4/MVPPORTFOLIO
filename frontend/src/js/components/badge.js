/**
 * Badge Component
 * Etiquetas reutilizables
 */
class Badge {
  /**
   * Crear badge
   * @param {Object} options - Opciones
   * @param {string} options.text - Texto
   * @param {string} options.type - Tipo (success, error, warning, info, primary)
   * @param {string} options.size - Tamaño (sm, md, lg)
   */
  static create(options = {}) {
    const {
      text = '',
      type = 'primary',
      size = 'md'
    } = options;
    
    const badge = document.createElement('span');
    badge.className = `badge badge-${type} badge-${size}`;
    badge.textContent = text;
    
    return badge;
  }

  /**
   * Crear badge de estado
   */
  static createStatus(status) {
    const statusMap = {
      'active': { text: 'Activo', type: 'success' },
      'inactive': { text: 'Inactivo', type: 'error' },
      'pending': { text: 'Pendiente', type: 'warning' },
      'completed': { text: 'Completado', type: 'success' }
    };
    
    const config = statusMap[status] || { text: status, type: 'info' };
    return this.create({ text: config.text, type: config.type });
  }
}

window.Badge = Badge;