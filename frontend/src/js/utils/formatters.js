/**
 * Formatters - Format data for display
 */

const Formatters = {
  currency: function(value) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value || 0);
  },

  percent: function(value) {
    return (value || 0).toFixed(2) + '%';
  },

  number: function(value) {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value || 0);
  },

  date: function(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-ES').format(date);
  },

  shortNumber: function(value) {
    const num = value || 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toFixed(0);
  },

  trendArrow: function(value) {
    if (value > 0) return '📈';
    if (value < 0) return '📉';
    return '➡️';
  }
};
