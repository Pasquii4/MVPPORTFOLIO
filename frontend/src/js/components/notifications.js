/**
 * Notifications Component
 */

function showNotification(message, type = 'info', duration = 3000) {
  const container = document.getElementById('notification-container');
  if (!container) return;
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  container.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('notification-show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('notification-show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}
