/**
 * Sidebar Component
 * Navegación principal de la aplicación
 */
class Sidebar {
  constructor() {
    this.element = null;
    this.isOpen = false;
  }

  /**
   * Renderizar sidebar
   */
  render() {
    const currentTheme = ThemeManager.get();
    const html = `
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">📊</div>
          <span class="logo-text">Portfolio</span>
        </div>
        <button class="sidebar-toggle-mobile" id="sidebar-close">
          <span>✕</span>
        </button>
      </div>

      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#/" class="nav-link active" data-route="dashboard">
              <span class="nav-icon">📊</span>
              <span class="nav-label">Dashboard</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#/positions" class="nav-link" data-route="positions">
              <span class="nav-icon">📈</span>
              <span class="nav-label">Posiciones</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#/analytics" class="nav-link" data-route="analytics">
              <span class="nav-icon">📉</span>
              <span class="nav-label">Analytics</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#/portfolio" class="nav-link" data-route="portfolio">
              <span class="nav-icon">🎯</span>
              <span class="nav-label">Portfolio</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#/education" class="nav-link" data-route="education">
              <span class="nav-icon">🎓</span>
              <span class="nav-label">Educación</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#/settings" class="nav-link" data-route="settings">
              <span class="nav-icon">⚙️</span>
              <span class="nav-label">Configuración</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <p class="app-version">v2.0.0</p>
      </div>
    `;

    this.element = document.getElementById('sidebar');
    this.element.innerHTML = html;
    this.element.classList.add('sidebar');
    
    this.attachEvents();
  }

  /**
   * Adjuntar eventos
   */
  attachEvents() {
    // Links de navegación
    const navLinks = this.element.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.setActive(link);
        // Cerrar sidebar en mobile
        if (window.innerWidth < 1024) {
          this.toggleMobile();
        }
      });
    });

    // Botón cerrar (mobile)
    const closeBtn = this.element.querySelector('#sidebar-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.toggleMobile());
    }
  }

  /**
   * Establecer link activo
   */
  setActive(link) {
    this.element.querySelectorAll('.nav-link').forEach(l => {
      l.classList.remove('active');
    });
    link.classList.add('active');
  }

  /**
   * Toggle sidebar en mobile
   */
  toggleMobile() {
    this.isOpen = !this.isOpen;
    this.element.classList.toggle('mobile-open');
  }

  /**
   * Actualizar ruta activa según URL actual
   */
  updateActive(route) {
    const link = this.element.querySelector(`[data-route="${route}"]`);
    if (link) {
      this.setActive(link);
    }
  }
}

// Crear instancia global
const sidebarComponent = new Sidebar();