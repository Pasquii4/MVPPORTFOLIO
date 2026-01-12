/**
 * Form Validators
 * Funciones para validación de datos
 */
const Validators = {
  /**
   * Validar email
   */
  isEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Validar que no esté vacío
   */
  isNotEmpty(value) {
    return value && value.toString().trim().length > 0;
  },

  /**
   * Validar número
   */
  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  /**
   * Validar número positivo
   */
  isPositive(value) {
    return this.isNumber(value) && parseFloat(value) > 0;
  },

  /**
   * Validar longitud mínima
   */
  minLength(value, min) {
    return value && value.toString().length >= min;
  },

  /**
   * Validar longitud máxima
   */
  maxLength(value, max) {
    return !value || value.toString().length <= max;
  },

  /**
   * Validar fecha
   */
  isDate(date) {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  },

  /**
   * Validar símbolo de bolsa (formato simple)
   */
  isStockSymbol(symbol) {
    const regex = /^[A-Z]{1,5}$/;
    return regex.test(symbol);
  }
};