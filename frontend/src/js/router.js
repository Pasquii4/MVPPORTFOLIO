/**
 * Router SPA
 * Enrutador de página única
 */
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
  }

  /**
   * Registrar una ruta
   * @param {string} path - Ruta (ej: '/', '/positions')
   * @param {Function} handler - Función que renderiza la vista
   */
  register(path, handler) {
    this.routes.set(path, handler);
  }

  /**
   * Navegar a una ruta
   * @param {string} path - Ruta a navegar
   */
  navigate(path) {
    if (!path.startsWith('#')) {
      path = '#' + path;
    }
    window.location.hash = path;
  }

  /**
   * Obtener ruta actual del hash
   */
  getCurrentRoute() {
    const hash = window.location.hash.slice(1) || '/';
    return hash.startsWith('/') ? hash : '/' + hash;
  }

  /**
   * Ejecutar
   */
  handleRoute() {
    const path = this.getCurrentRoute();
    const route = this.routes.get(path) || this.routes.get('/');

    if (route && typeof route === 'function') {
      try {
        route();
        this.currentRoute = path;
      } catch (error) {
        console.error('Error al renderizar ruta:', error);
        Notifications.error('Error al cargar la página');
      }
    }
  }

  /**
   * Inicializar router con listeners
   */
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }
}

// Crear instancia global
const router = new Router();