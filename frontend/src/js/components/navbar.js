/**
 * Navbar Component
 */

function renderNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const theme = AppState.get('theme');
  const themeIcon = theme === 'dark' ? '☀️' : '🌙';
  const user = AppState.get('user');

  navbar.innerHTML = `
    <div class="navbar-content">
      <div class="navbar-left">
        <button class="navbar-btn navbar-toggle" id="sidebar-toggle" style="display: none;">
          <span>☰</span>
        </button>
        <div class="navbar-title" id="navbar-title">Dashboard</div>
      </div>
      <div class="navbar-right">
        <button class="navbar-btn" id="theme-toggle" title="Cambiar tema">
          <span>${themeIcon}</span>
        </button>
        <div class="navbar-divider"></div>
        <div class="navbar-user">
          <div class="user-avatar">${user.name.charAt(0)}</div>
          <div class="user-name">${user.name}</div>
        </div>
      </div>
    </div>
  `;

  // Agregar listeners
  attachNavbarListeners();
}

function attachNavbarListeners() {
  const themeBtn = document.getElementById('theme-toggle');
  const sidebarToggle = document.getElementById('sidebar-toggle');

  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }
}

function toggleTheme() {
  const newTheme = themeManager.toggle();
  AppState.set('theme', newTheme);
  renderNavbar();
  showNotification(`Tema cambiado a ${newTheme}`, 'success');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('mobile-open');
  }
}

// Hacer funciones globales
window.toggleTheme = toggleTheme;
window.toggleSidebar = toggleSidebar;
