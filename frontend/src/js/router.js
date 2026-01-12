/**
 * Router - SPA Navigation
 * Gestiona la navegación entre vistas
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.init();
  }

  // Inicializar router
  init() {
    window.addEventListener('hashchange', () => this.handleRouteChange());
    window.addEventListener('load', () => this.handleRouteChange());
  }

  // Registrar ruta
  register(path, handler) {
    this.routes[path] = handler;
  }

  // Navegar a ruta
  navigate(path) {
    window.location.hash = path;
  }

  // Manejar cambio de ruta
  handleRouteChange() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];
    
    // Normalizar rutas
    const normalizedPath = path === '/dashboard' ? '/' : path;
    
    const handler = this.routes[normalizedPath] || this.routes['/'];
    
    if (handler && typeof handler === 'function') {
      this.currentRoute = normalizedPath;
      
      // Obtener contenedor
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = '';
        handler();
      }

      // Actualizar navegación
      this.updateActiveNav(normalizedPath);
    } else {
      console.warn(`Ruta no encontrada: ${normalizedPath}`);
    }
  }

  // Actualizar navegación activa
  updateActiveNav(path) {
    // Remover clase active de todos
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Agregar a la ruta actual
    const normalizedForNav = path === '/' ? 'dashboard' : path.slice(1);
    const activeLink = document.querySelector(`[data-route="${path}"], [data-route="#${path}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // Obtener ruta actual
  getCurrentRoute() {
    return this.currentRoute;
  }
}

// Crear instancia global
const router = new Router();
