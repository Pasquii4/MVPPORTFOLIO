/**
 * Formatters Utility
 * Funciones para formatear datos a presentación amigable
 */
const Formatters = {
  /**
   * Formato de moneda
   * @param {number} value - Valor numérico
   * @param {string} currency - Código de moneda (default: USD)
   * @returns {string} Valor formateado como moneda
   */
  currency(value, currency = 'USD') {
    try {
      const formatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return formatter.format(value);
    } catch (error) {
      console.error('Error formateando moneda:', error);
      return `${value.toFixed(2)}`;
    }
  },

  /**
   * Formato de porcentaje
   * @param {number} value - Valor numérico (0-100)
   * @param {number} decimals - Decimales a mostrar
   * @returns {string} Valor formateado como porcentaje
   */
  percent(value, decimals = 2) {
    try {
      return `${parseFloat(value).toFixed(decimals)}%`;
    } catch (error) {
      console.error('Error formateando porcentaje:', error);
      return '0%';
    }
  },

  /**
   * Formato de número con separadores
   * @param {number} value - Valor numérico
   * @param {number} decimals - Decimales a mostrar
   * @returns {string} Número formateado
   */
  number(value, decimals = 2) {
    try {
      const formatter = new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      return formatter.format(value);
    } catch (error) {
      console.error('Error formateando número:', error);
      return value.toString();
    }
  },

  /**
   * Formato de número acortado (1.2M, 3.4K, etc)
   * @param {number} value - Valor numérico
   * @returns {string} Número acortado
   */
  shortNumber(value) {
    try {
      if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
      if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
      return value.toString();
    } catch (error) {
      console.error('Error formateando número acortado:', error);
      return value.toString();
    }
  },

  /**
   * Formato de fecha
   * @param {string|Date} date - Fecha
   * @param {string} format - Formato (default: DD/MM/YYYY)
   * @returns {string} Fecha formateada
   */
  date(date, format = 'DD/MM/YYYY') {
    try {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      
      if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
      if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
      if (format === 'MM/DD/YYYY') return `${month}/${day}/${year}`;
      
      return d.toLocaleDateString('es-ES');
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return 'Invalid Date';
    }
  },

  /**
   * Flecha de tendencia
   * @param {number} value - Valor de cambio
   * @returns {string} Flecha con emoji
   */
  trendArrow(value) {
    if (value > 0) return '📈 ↑';
    if (value < 0) return '📉 ↓';
    return '➡️ —';
  },

  /**
   * Formato de clase CSS para trend
   * @param {number} value - Valor de cambio
   * @returns {string} Clase CSS
   */
  trendClass(value) {
    if (value > 0) return 'trend-positive';
    if (value < 0) return 'trend-negative';
    return 'trend-neutral';
  }
};