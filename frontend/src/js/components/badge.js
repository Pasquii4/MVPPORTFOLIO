/**
 * Badge Component - Display tags, status labels, etc
 * Usage: Badge.create({ label, variant, size })
 */
class Badge {
  static create(options = {}) {
    const {
      label = 'Badge',
      variant = 'default', // 'default', 'success', 'warning', 'error', 'info', 'secondary'
      size = 'default', // 'small', 'default', 'large'
      icon = null,
      className = '',
    } = options;

    const badge = document.createElement('span');
    badge.className = `badge badge--${variant} badge--${size} ${className}`;
    
    const iconHTML = icon ? `<span class="badge__icon">${icon}</span>` : '';
    badge.innerHTML = `${iconHTML}<span class="badge__label">${label}</span>`;

    return badge;
  }

  // Predefined variants
  static success(label) {
    return this.create({ label, variant: 'success', icon: '✅' });
  }

  static warning(label) {
    return this.create({ label, variant: 'warning', icon: '⚠️' });
  }

  static error(label) {
    return this.create({ label, variant: 'error', icon: '❌' });
  }

  static info(label) {
    return this.create({ label, variant: 'info', icon: 'ℹ️' });
  }

  // Status badges
  static status(status) {
    const statusMap = {
      'open': { label: 'Abierto', variant: 'info' },
      'closed': { label: 'Cerrado', variant: 'success' },
      'pending': { label: 'Pendiente', variant: 'warning' },
      'error': { label: 'Error', variant: 'error' },
    };
    const config = statusMap[status] || { label: status, variant: 'default' };
    return this.create(config);
  }

  // Trend badges
  static trend(direction) {
    if (direction === 'up' || direction > 0) {
      return this.create({ label: '📈 Arriba', variant: 'success' });
    } else if (direction === 'down' || direction < 0) {
      return this.create({ label: '📉 Abajo', variant: 'error' });
    }
    return this.create({ label: '➡️ Neutral', variant: 'info' });
  }
}

export default Badge;