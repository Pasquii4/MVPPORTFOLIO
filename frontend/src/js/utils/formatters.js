/**
 * Formatters
 * Funciones para formatear datos
 */

const Formatters = {
  // Formatear moneda
  currency: function(value) {
    if (typeof value !== 'number') return '€0.00';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  },

  // Formatear porcentaje
  percent: function(value) {
    if (typeof value !== 'number') return '0.00';
    return value.toFixed(2);
  },

  // Formatear fecha
  date: function(dateString) {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES').format(date);
    } catch (e) {
      return dateString;
    }
  },

  // Formatear número
  number: function(value) {
    if (typeof value !== 'number') return '0';
    return value.toLocaleString('es-ES');
  },

  // Formatear número corto (1.2M, 5.3K)
  shortNumber: function(value) {
    if (typeof value !== 'number') return '0';
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value.toFixed(0);
  },

  // Flecha de tendencia
  trendArrow: function(value) {
    if (value > 0) return '📈';
    if (value < 0) return '📉';
    return '➡️';
  }
};
