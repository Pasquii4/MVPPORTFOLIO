/**
 * Button Component - Reusable button element with variants
 * Usage: Button.create({ label, type, size, disabled, onClick, loading })
 */
class Button {
  static create(options = {}) {
    const {
      label = 'Button',
      type = 'primary', // 'primary', 'secondary', 'danger', 'ghost'
      size = 'default', // 'small', 'default', 'large'
      disabled = false,
      onClick = null,
      loading = false,
      icon = null,
      className = '',
      id = null,
    } = options;

    const button = document.createElement('button');
    button.className = `btn btn--${type} btn--${size} ${className}`;
    button.disabled = disabled || loading;

    if (id) button.id = id;

    const iconHTML = icon ? `<span class="btn__icon">${icon}</span>` : '';
    const loadingHTML = loading ? '<span class="btn__spinner"></span>' : '';
    const labelHTML = `<span class="btn__label">${label}</span>`;

    button.innerHTML = `${loadingHTML}${iconHTML}${labelHTML}`;

    if (onClick && !disabled) {
      button.addEventListener('click', onClick);
    }

    // Store reference to loading state
    button._loading = loading;

    return button;
  }

  // Predefined variants
  static primary(label, onClick) {
    return this.create({ label, type: 'primary', onClick });
  }

  static secondary(label, onClick) {
    return this.create({ label, type: 'secondary', onClick });
  }

  static danger(label, onClick) {
    return this.create({ label, type: 'danger', onClick });
  }

  static ghost(label, onClick) {
    return this.create({ label, type: 'ghost', onClick });
  }

  // Action buttons
  static save(onClick) {
    return this.create({ label: 'Guardar', type: 'primary', onClick, icon: '💾' });
  }

  static cancel(onClick) {
    return this.create({ label: 'Cancelar', type: 'ghost', onClick });
  }

  static delete(onClick) {
    return this.create({ label: 'Eliminar', type: 'danger', onClick, icon: '🗑️' });
  }

  static add(onClick) {
    return this.create({ label: 'Agregar', type: 'primary', onClick, icon: '➕' });
  }

  // Update loading state
  static setLoading(buttonElement, loading = true) {
    buttonElement._loading = loading;
    buttonElement.disabled = loading;
    buttonElement.classList.toggle('btn--loading', loading);
  }
}

export default Button;