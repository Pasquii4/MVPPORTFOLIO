/**
 * Modal Component
 * Diálogos modales reutilizables
 */
class Modal {
  /**
   * Crear modal
   * @param {Object} options - Opciones
   * @param {string} options.title - Título
   * @param {string} options.content - Contenido HTML
   * @param {Array} options.buttons - Array de botones {text, type, onClick}
   */
  static create(options = {}) {
    const {
      title = '',
      content = '',
      buttons = []
    } = options;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">${title}</h2>
            <button class="modal-close" aria-label="Cerrar">&times;</button>
          </div>
          <div class="modal-body">${content}</div>
          <div class="modal-footer">
            <!-- Buttons will be added here -->
          </div>
        </div>
      </div>
    `;
    
    // Agregar botones
    const footer = modal.querySelector('.modal-footer');
    buttons.forEach(btn => {
      const button = Button.create({
        text: btn.text,
        type: btn.type || 'primary',
        onClick: btn.onClick,
        className: 'modal-btn'
      });
      footer.appendChild(button);
    });
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    const closeModal = () => {
      modal.classList.add('closing');
      setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // ESC para cerrar
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    
    modal._closeModal = closeModal;
    
    return modal;
  }

  /**
   * Mostrar modal
   */
  static show(options = {}) {
    const modal = this.create(options);
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    return modal;
  }
}

window.Modal = Modal;