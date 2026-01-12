/**
 * Validadores de datos
 */

const Validators = {
    /**
     * Validar ticker
     */
    ticker: (value) => {
        if (!value || value.length === 0) return false;
        return /^[A-Z0-9]{1,10}$/.test(value.toUpperCase());
    },

    /**
     * Validar precio
     */
    price: (value) => {
        return value > 0;
    },

    /**
     * Validar cantidad
     */
    quantity: (value) => {
        return value > 0;
    },

    /**
     * Validar fecha
     */
    date: (value) => {
        if (!value) return false;
        const date = new Date(value);
        return date instanceof Date && !isNaN(date);
    },

    /**
     * Validar email
     */
    email: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
};
