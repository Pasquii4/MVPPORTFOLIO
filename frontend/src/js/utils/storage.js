/**
 * Storage Manager
 * Gestiona persistencia de datos en localStorage
 */
const StorageManager = {
  /**
   * Guardar datos
   * @param {string} key - Clave de almacenamiento
   * @param {*} value - Valor a guardar (se convierte a JSON)
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error al guardar en storage:', error);
      return false;
    }
  },

  /**
   * Obtener datos
   * @param {string} key - Clave de almacenamiento
   * @param {*} defaultValue - Valor por defecto si no existe
   * @returns {*} Valor recuperado o default
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error al leer storage:', error);
      return defaultValue;
    }
  },

  /**
   * Eliminar datos
   * @param {string} key - Clave a eliminar
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error al eliminar de storage:', error);
      return false;
    }
  },

  /**
   * Limpiar todo el storage
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error al limpiar storage:', error);
      return false;
    }
  },

  /**
   * Verificar si una clave existe
   * @param {string} key - Clave a verificar
   * @returns {boolean} True si existe
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },

  /**
   * Obtener todas las claves
   * @returns {string[]} Array de claves
   */
  keys() {
    return Object.keys(localStorage);
  }
};