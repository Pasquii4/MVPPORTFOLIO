// === ROUTER SYSTEM ===
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.init();
  }

  register(path, callback) {
    this.routes[path] = callback;
    console.log(`✅ Route registered: ${path}`);
  }

  init() {
    window.addEventListener('hashchange', () => this.navigate());
    this.navigate();
  }

  navigate() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0] || '/';

    if (this.currentRoute === path) return;
    this.currentRoute = path;

    const route = this.routes[path] || this.routes['/404'];
    if (!route) {
      console.error(`❌ Route not found: ${path}`);
      return;
    }

    // Limpiar contenido anterior
    const mainContent = document.querySelector('#main-content');
    if (mainContent) mainContent.innerHTML = '';

    // Ejecutar vista
    try {
      route();
      this.updateActiveNavigation();
    } catch (error) {
      console.error(`❌ Error rendering route ${path}:`, error);
    }
  }

  updateActiveNavigation() {
    // Actualizar sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href').slice(1) || '/';
      if (href === this.currentRoute) {
        item.classList.add('active');
      }
    });
  }

  go(path) {
    window.location.hash = path;
  }
}

window.Router = Router;