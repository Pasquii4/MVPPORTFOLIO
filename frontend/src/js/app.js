/**
 * App Main
 * Lógica principal de la aplicación
 */

const app = {
  /**
   * Inicializar aplicación
   */
  init: function() {
    console.log('App iniciado');
  },

  /**
   * Obtener estado actual
   */
  getState: function() {
    return AppState.get();
  },

  /**
   * Navegar a una vista
   */
  navigate: function(path) {
    router.navigate(path);
  },

  /**
   * Mostrar notificación
   */
  notify: function(message, type = 'info') {
    Notifications.show({ message, type });
  },

  /**
   * Cargar datos desde API
   */
  loadDataFromAPI: async function() {
    try {
      // Cargar posiciones
      const positionsRes = await ApiClient.getPositions();
      if (positionsRes.success) {
        AppState.set('positions', positionsRes.data.positions);
      }

      // Cargar portfolio
      const portfolioRes = await ApiClient.getPortfolio();
      if (portfolioRes.success) {
        AppState.set('portfolio', portfolioRes.data);
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  }
};

// Exportar como global
window.app = app;