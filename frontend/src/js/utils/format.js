/**
 * Utilidades de formateo
 */

const Formatter = {
    /**
     * Formatear número como moneda
     */
    money: (value) => {
        if (value === null || value === undefined) return '€0.00';
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    },

    /**
     * Formatear porcentaje
     */
    percent: (value, decimals = 2) => {
        if (value === null || value === undefined) return '0.00%';
        return (Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals) + '%';
    },

    /**
     * Formatear número
     */
    number: (value, decimals = 2) => {
        if (value === null || value === undefined) return '0';
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value);
    },

    /**
     * Formatear fecha
     */
    date: (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    },

    /**
     * Formatear fecha y hora
     */
    datetime: (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES');
    },

    /**
     * Colorear según positivo/negativo
     */
    colorClass: (value) => {
        if (value > 0) return 'text-green-400';
        if (value < 0) return 'text-red-400';
        return 'text-gray-400';
    },

    /**
     * Icono según positivo/negativo
     */
    icon: (value) => {
        if (value > 0) return '📈';
        if (value < 0) return '📉';
        return '➖';
    },
};
