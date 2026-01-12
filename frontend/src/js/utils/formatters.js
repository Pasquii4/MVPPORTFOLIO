/**
 * Formatters - Advanced formatting utilities for data display
 */

class Formatters {
  // Currency formatting
  static currency(value, symbol = '$', decimals = 2) {
    if (isNaN(value)) return `${symbol}0.00`;
    const formatted = parseFloat(value).toFixed(decimals);
    return `${symbol}${formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  // Percentage formatting
  static percentage(value, decimals = 2) {
    if (isNaN(value)) return '0.00%';
    const num = parseFloat(value);
    const sign = num >= 0 ? '' : '';
    return `${sign}${Math.abs(num).toFixed(decimals)}%`;
  }

  // Number formatting with commas
  static number(value, decimals = 0) {
    if (isNaN(value)) return '0';
    return parseFloat(value).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Date formatting
  static date(dateStr, format = 'DD/MM/YYYY') {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date)) return '-';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formats = {
      'DD/MM/YYYY': `${day}/${month}/${year}`,
      'MM/DD/YYYY': `${month}/${day}/${year}`,
      'YYYY-MM-DD': `${year}-${month}-${day}`,
      'DD/MM/YYYY HH:MM': `${day}/${month}/${year} ${hours}:${minutes}`,
    };

    return formats[format] || formats['DD/MM/YYYY'];
  }

  // Relative time (e.g., "2 hours ago")
  static relativeTime(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date)) return '-';

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: 'año', seconds: 31536000 },
      { label: 'mes', seconds: 2592000 },
      { label: 'semana', seconds: 604800 },
      { label: 'día', seconds: 86400 },
      { label: 'hora', seconds: 3600 },
      { label: 'minuto', seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `hace ${count} ${interval.label}${count > 1 ? 's' : ''}`;
      }
    }

    return 'hace unos segundos';
  }

  // Truncate text
  static truncate(text, length = 50, suffix = '...') {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length - suffix.length) + suffix;
  }

  // Capitalize string
  static capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Format P&L with color
  static pnl(value, percentage = false) {
    const num = parseFloat(value);
    const prefix = num > 0 ? '📈 +' : num < 0 ? '📉 ' : '';
    const formatted = percentage ? `${prefix}${num.toFixed(2)}%` : `${prefix}${this.currency(num)}`;
    return formatted;
  }

  // Format large numbers (e.g., 1.2M, 3.5K)
  static abbreviate(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';

    const abs = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    if (abs >= 1000000) {
      return `${sign}${(abs / 1000000).toFixed(1)}M`;
    }
    if (abs >= 1000) {
      return `${sign}${(abs / 1000).toFixed(1)}K`;
    }
    return `${sign}${num.toFixed(0)}`;
  }

  // Format investment status
  static status(status) {
    const statusMap = {
      'open': '🟢 Abierto',
      'closed': '⚫ Cerrado',
      'pending': '🟡 Pendiente',
      'error': '🔴 Error',
    };
    return statusMap[status] || status;
  }
}

export default Formatters;