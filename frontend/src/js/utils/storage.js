/**
 * Storage Manager
 * Gestiona el almacenamiento en localStorage
 */

const StorageManager = {
  prefix: 'portfolio_',

  // Establecer valor
  set: function(key, value) {
    try {
      const json = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, json);
      console.log(`💾 ${key} guardado`);
      return true;
    } catch (e) {
      console.error(`Error guardando ${key}:`, e);
      return false;
    }
  },

  // Obtener valor
  get: function(key, defaultValue = null) {
    try {
      const json = localStorage.getItem(this.prefix + key);
      if (!json) return defaultValue;
      return JSON.parse(json);
    } catch (e) {
      console.error(`Error obteniendo ${key}:`, e);
      return defaultValue;
    }
  },

  // Eliminar valor
  remove: function(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      console.log(`🗑️ ${key} eliminado`);
      return true;
    } catch (e) {
      console.error(`Error eliminando ${key}:`, e);
      return false;
    }
  },

  // Limpiar todo
  clear: function() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      console.log('🧹 Almacenamiento limpio');
      return true;
    } catch (e) {
      console.error('Error limpiando storage:', e);
      return false;
    }
  }
};
