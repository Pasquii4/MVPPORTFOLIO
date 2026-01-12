/**
 * Notifications Component
 */

function showNotification(message, type = 'info') {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  notification.innerHTML = `
    <div class="notification-content">
      <span>${icons[type] || icons.info}</span>
      <div class="notification-message">${message}</div>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Auto-eliminar después de 4 segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}
