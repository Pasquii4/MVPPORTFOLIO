/**
 * App Configuration
 * Configuración central de la aplicación
 */
const AppConfig = {
  appName: 'Portfolio Tracker',
  appVersion: '2.0.0',
  apiEndpoint: 'http://localhost:8000/api',
  
  // Temas
  themes: {
    light: {
      bg: '#F8FAFB',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
      accent: '#3B82F6',
      success: '#10B981',
      error: '#EF4444'
    },
    dark: {
      bg: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#CBD5E1',
      accent: '#3B82F6',
      success: '#10B981',
      error: '#EF4444'
    }
  },

  // Datos por defecto
  defaults: {
    pageSize: 10,
    dateFormat: 'DD/MM/YYYY',
    currency: 'USD'
  }
};