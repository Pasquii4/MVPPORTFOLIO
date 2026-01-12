/**
 * Sistema mejorado de notificaciones con mejor UX
 */

const NotificationManager = (() => {
  const container = document.querySelector('.notifications-container') || createContainer();

  function createContainer() {
    const div = document.createElement('div');
    div.className = 'notifications-container';
    div.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(div);
    return div;
  }

  function createNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };

    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
    };

    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      background: white;
      border-left: 4px solid ${colors[type]};
      padding: 16px;
      margin-bottom: 10px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 400px;
      animation: slideInRight 0.3s ease-out;
      pointer-events: auto;
      cursor: pointer;
    `;

    const icon = document.createElement('span');
    icon.textContent = icons[type];
    icon.style.cssText = `
      color: ${colors[type]};
      font-weight: bold;
      font-size: 18px;
      flex-shrink: 0;
    `;

    const text = document.createElement('span');
    text.textContent = message;
    text.style.cssText = `
      color: #1f2937;
      font-size: 14px;
      flex-grow: 1;
    `;

    notification.appendChild(icon);
    notification.appendChild(text);

    // Click para cerrar
    notification.addEventListener('click', () => removeNotification(notification));

    container.appendChild(notification);

    // Auto-close
    if (duration > 0) {
      setTimeout(() => removeNotification(notification), duration);
    }

    return notification;
  }

  function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }

  return {
    success: (msg, duration = 5000) => createNotification(msg, 'success', duration),
    error: (msg, duration = 7000) => createNotification(msg, 'error', duration),
    warning: (msg, duration = 5000) => createNotification(msg, 'warning', duration),
    info: (msg, duration = 5000) => createNotification(msg, 'info', duration),
    loading: (msg) => createNotification(msg, 'info', 0),
  };
})();

// Agregar estilos de animación
if (!document.querySelector('style[data-notifications]')) {
  const style = document.createElement('style');
  style.setAttribute('data-notifications', 'true');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
