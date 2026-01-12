/**
 * Modal Component - Advanced modal/dialog component
 * Usage: Modal.create({ title, content, buttons, size, closeButton })
 */
class Modal {
  static create(options = {}) {
    const {
      id = `modal-${Math.random().toString(36).substr(2, 9)}`,
      title = '',
      content = '',
      buttons = [],
      size = 'default', // 'small', 'default', 'large', 'fullscreen'
      closeButton = true,
      onClose = null,
      backdropClose = true,
      className = '',
    } = options;

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = `modal-backdrop modal-backdrop--${size}`;
    backdrop.id = `${id}-backdrop`;
    backdrop.dataset.modalId = id;

    if (backdropClose) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          Modal.close(id);
          if (onClose) onClose();
        }
      });
    }

    // Modal
    const modal = document.createElement('div');
    modal.className = `modal modal--${size} ${className}`;
    modal.id = id;
    modal.role = 'dialog';
    modal.setAttribute('aria-labelledby', `${id}-title`);

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';

    if (title) {
      const titleEl = document.createElement('h2');
      titleEl.className = 'modal-title';
      titleEl.id = `${id}-title`;
      titleEl.textContent = title;
      header.appendChild(titleEl);
    }

    if (closeButton) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'modal-close-btn';
      closeBtn.innerHTML = '&times;';
      closeBtn.setAttribute('aria-label', 'Cerrar');
      closeBtn.addEventListener('click', () => {
        Modal.close(id);
        if (onClose) onClose();
      });
      header.appendChild(closeBtn);
    }

    modal.appendChild(header);

    // Body
    const body = document.createElement('div');
    body.className = 'modal-body';

    if (typeof content === 'string') {
      body.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      body.appendChild(content);
    }

    modal.appendChild(body);

    // Footer con botones
    if (buttons.length > 0) {
      const footer = document.createElement('div');
      footer.className = 'modal-footer';

      buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.label;
        button.className = `btn btn--${btn.type || 'secondary'}`;

        if (btn.onClick) {
          button.addEventListener('click', (e) => {
            btn.onClick(e);
            if (btn.closeOnClick !== false) {
              Modal.close(id);
              if (onClose) onClose();
            }
          });
        } else {
          button.addEventListener('click', () => {
            Modal.close(id);
            if (onClose) onClose();
          });
        }

        footer.appendChild(button);
      });

      modal.appendChild(footer);
    }

    backdrop.appendChild(modal);

    // Store reference
    Modal.instances = Modal.instances || {};
    Modal.instances[id] = {
      backdrop,
      modal,
      options,
    };

    return backdrop;
  }

  static open(modalId, parentEl = document.body) {
    const instance = Modal.instances[modalId];
    if (!instance) return;

    const { backdrop } = instance;
    parentEl.appendChild(backdrop);
    backdrop.classList.add('modal-backdrop--active');
    backdrop.querySelector('.modal').classList.add('modal--active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  static close(modalId) {
    const instance = Modal.instances[modalId];
    if (!instance) return;

    const { backdrop, modal } = instance;
    modal.classList.remove('modal--active');
    backdrop.classList.remove('modal-backdrop--active');

    setTimeout(() => {
      if (backdrop.parentElement) {
        backdrop.remove();
      }
      document.body.style.overflow = '';
    }, 300);
  }

  static closeAll() {
    Object.keys(Modal.instances || {}).forEach(id => {
      Modal.close(id);
    });
  }

  // Predefined modals
  static alert(title, message, onClose) {
    const modal = this.create({
      title,
      content: message,
      buttons: [
        { label: 'OK', type: 'primary' }
      ],
      onClose,
    });
    this.open(modal.id);
    return modal.id;
  }

  static confirm(title, message, onConfirm, onCancel) {
    const modal = this.create({
      title,
      content: message,
      buttons: [
        { label: 'Cancelar', type: 'ghost', onClick: onCancel || (() => {}) },
        { label: 'Confirmar', type: 'primary', onClick: onConfirm || (() => {}) }
      ],
    });
    this.open(modal.id);
    return modal.id;
  }

  static success(title, message, onClose) {
    const content = `
      <div style="text-align: center; padding: 20px;">
        <span style="font-size: 48px;">✅</span>
        <p>${message}</p>
      </div>
    `;
    return this.alert(title, content, onClose);
  }

  static error(title, message, onClose) {
    const content = `
      <div style="text-align: center; padding: 20px;">
        <span style="font-size: 48px;">❌</span>
        <p>${message}</p>
      </div>
    `;
    return this.alert(title, content, onClose);
  }

  static loading(title = 'Cargando...') {
    const modal = this.create({
      title,
      content: '<div class="spinner spinner--default" style="margin: 20px auto;"></div>',
      closeButton: false,
      backdropClose: false,
      size: 'small',
    });
    this.open(modal.id);
    return modal.id;
  }
}

export default Modal;