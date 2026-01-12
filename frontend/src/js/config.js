/**
 * Configuración global de la aplicación
 */

const CONFIG = {
    API_BASE_URL: 'http://localhost:8000/api',
    APP_NAME: 'Portfolio Tracker',
    APP_VERSION: '1.0.0',
    DEBUG: false,
    CURRENCY: '€',
    CURRENCY_SYMBOL: '€',
    DECIMAL_PLACES: 2,
};

// Log config en desarrollo
if (CONFIG.DEBUG) {
    console.log('🔧 Config:', CONFIG);
}
