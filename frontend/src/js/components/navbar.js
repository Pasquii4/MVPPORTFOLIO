/**
 * Navbar Component
 * Barra de navegación superior
 */
class Navbar {
  constructor() {
    this.element = null;
  }

  /**
   * Renderizar navbar
   */
  render() {
    const theme = ThemeManager.get();
    const html = `
      <div class="navbar-content">
        <div class="navbar-left">
          <button id="navbar-menu-toggle" class="navbar-toggle d-lg-none">
            <span>☰</span>
          </button>
          <span class="navbar-title">Portfolio Tracker</span>
        </div>

        <div class="navbar-right">
          <button id="navbar-theme-toggle" class="navbar-btn" title="Toggle tema">
            <span class="theme-icon">${theme === 'light' ? '🌙' : '☀️'}</span>
          </button>
          <div class="navbar-divider"></div>
          <div class="navbar-user">
            <span class="user-avatar">👤</span>
            <span class="user-name">Usuario</span>
          </div>
        </div>
      </div>
    `;

    this.element = document.getElementById('navbar');
    this.element.innerHTML = html;
    this.element.classList.add('navbar');
    
    this.attachEvents();
  }

  /**
   * Adjuntar eventos
   */
  attachEvents() {
    // Toggle tema
    const themeBtn = this.element.querySelector('#navbar-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const newTheme = ThemeManager.toggle();
        const icon = themeBtn.querySelector('.theme-icon');
        icon.textContent = newTheme === 'light' ? '🌙' : '☀️';
      });
    }

    // Toggle menu mobile
    const menuToggle = this.element.querySelector('#navbar-menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        sidebarComponent.toggleMobile();
      });
    }
  }

  /**
   * Actualizar título del navbar
   */
  setTitle(title) {
    const titleElement = this.element.querySelector('.navbar-title');
    if (titleElement) {
      titleElement.textContent = title;
    }
  }
}

// Crear instancia global
const navbarComponent = new Navbar();