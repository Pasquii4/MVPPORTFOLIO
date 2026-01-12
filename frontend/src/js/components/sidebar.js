/**
 * Sidebar Component
 */

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <span class="logo-icon">💼</span>
        <span>Portfolio</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <a class="nav-link active" data-route="/" onclick="router.navigate('/')">
            <span class="nav-icon">📊</span>
            <span class="nav-label">Dashboard</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-route="/positions" onclick="router.navigate('#/positions')">
            <span class="nav-icon">📈</span>
            <span class="nav-label">Posiciones</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-route="/analytics" onclick="router.navigate('#/analytics')">
            <span class="nav-icon">📉</span>
            <span class="nav-label">Analytics</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-route="/portfolio" onclick="router.navigate('#/portfolio')">
            <span class="nav-icon">🎯</span>
            <span class="nav-label">Portafolio</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-route="/education" onclick="router.navigate('#/education')">
            <span class="nav-icon">🎓</span>
            <span class="nav-label">Educación</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-route="/settings" onclick="router.navigate('#/settings')">
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
}
