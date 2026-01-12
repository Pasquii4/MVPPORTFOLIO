/**
 * Button Component
 * Botones reutilizables
 */
class Button {
  /**
   * Crear botón
   * @param {Object} options - Opciones del botón
   * @param {string} options.text - Texto del botón
   * @param {string} options.type - Tipo (primary, secondary, danger, success)
   * @param {Function} options.onClick - Callback al hacer click
   * @param {string} options.className - Clases adicionales
   * @param {boolean} options.disabled - Deshabilitado
   */
  static create(options = {}) {
    const {
      text = 'Botón',
      type = 'primary',
      onClick = null,
      className = '',
      disabled = false
    } = options;
    
    const button = document.createElement('button');
    button.className = `btn btn-${type} ${className}`;
    button.textContent = text;
    button.disabled = disabled;
    
    if (onClick && typeof onClick === 'function') {
      button.addEventListener('click', onClick);
    }
    
    return button;
  }

  /**
   * Crear botón de icono
   */
  static createIconButton(options = {}) {
    const { icon = '•', title = '', onClick = null, className = '' } = options;
    
    const button = document.createElement('button');
    button.className = `btn-icon ${className}`;
    button.innerHTML = icon;
    button.title = title;
    
    if (onClick && typeof onClick === 'function') {
      button.addEventListener('click', onClick);
    }
    
    return button;
  }
}

window.Button = Button;