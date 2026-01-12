/**
 * Manejo de localStorage
 */

const Storage = {
    /**
     * Guardar dato
     */
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage error:', e);
        }
    },

    /**
     * Obtener dato
     */
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },

    /**
     * Eliminar dato
     */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage error:', e);
        }
    },

    /**
     * Limpiar todo
     */
    clear: () => {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Storage error:', e);
        }
    },
};
