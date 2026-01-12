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
    window.addEventListener('DOMContentLoaded', () => this.handleRouteChange());
    console.log('✅ Router inicializado');
  }

  // Registrar ruta
  register(path, handler) {
    this.routes[path] = handler;
    console.log(`✅ Ruta registrada: ${path}`);
  }

  // Navegar a ruta
  navigate(path) {
    // Normalizar path
    if (!path.startsWith('#')) {
      path = '#' + path;
    }
    window.location.hash = path;
  }

  // Manejar cambio de ruta
  handleRouteChange() {
    let hash = window.location.hash.slice(1) || '/';
    
    // Limpiar query params
    hash = hash.split('?')[0];
    
    // Normalizar rutas
    if (hash === '' || hash === '/dashboard') {
      hash = '/';
    }
    
    console.log(`🔗 Navegando a: ${hash}`);
    
    const handler = this.routes[hash] || this.routes['/'];
    
    if (handler && typeof handler === 'function') {
      this.currentRoute = hash;
      
      // Actualizar navegación
      this.updateActiveNav(hash);
      
      // Obtener contenedor
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        try {
          // Limpiar contenido anterior
          mainContent.innerHTML = '';
          
          // Renderizar nueva vista
          handler();
          
          console.log(`✅ Vista renderizada: ${hash}`);
        } catch (error) {
          console.error(`❌ Error renderizando vista ${hash}:`, error);
          mainContent.innerHTML = `<div class="page-container"><p style="color: var(--color-error); padding: 20px;">Error cargando página: ${error.message}</p></div>`;
        }
      } else {
        console.error('❌ No se encontró #main-content');
      }
    } else {
      console.warn(`⚠️ Ruta no registrada: ${hash}`);
    }
  }

  // Actualizar navegación activa
  updateActiveNav(path) {
    // Remover clase active de todos
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Agregar a la ruta actual
    let navPath = path === '/' ? '/' : '/' + path;
    const activeLink = document.querySelector(`[data-route="${navPath}"]`);
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

// Hacer disponible en window
window.router = router;
