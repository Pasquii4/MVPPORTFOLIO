/**
 * Settings View
 * Gestiona configuración de usuario, tema y notificaciones
 */

const Views = window.Views || {};

Views.settings = function() {
  const mainContent = document.getElementById('main-content');
  const user = AppState.get('user');
  const currentTheme = AppState.get('theme');

  const html = `
    <div class="page-container">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="page-title">⚙️ Configuración</h1>
      </div>

      <!-- Settings Grid -->
      <div style="max-width: 600px;">
        <!-- Tema -->
        <div class="settings-section mb-4">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px;">Apariencia</h2>
          
          <div class="settings-option">
            <input type="checkbox" id="dark-mode-toggle" ${currentTheme === 'dark' ? 'checked' : ''}>
            <div class="option-content" style="flex: 1;">
              <div class="option-title">Modo Oscuro</div>
              <div class="option-description">Activa el tema oscuro para reducir fatiga ocular</div>
            </div>
          </div>
        </div>

        <!-- Perfil -->
        <div class="settings-section mb-4">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px;">Perfil</h2>
          
          <div class="card">
            <div class="card-body">
              <div class="form-group mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-input" value="${user.name}" id="user-name">
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" value="${user.email}" id="user-email">
              </div>
              <div class="form-group">
                <label class="form-label">Fecha de Registro</label>
                <input type="text" class="form-input" value="${Formatters.date(user.joinDate)}" disabled>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" id="save-settings-btn">💾 Guardar Cambios</button>
            </div>
          </div>
        </div>

        <!-- Notificaciones -->
        <div class="settings-section mb-4">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px;">Notificaciones</h2>
          
          <div class="settings-option">
            <input type="checkbox" checked>
            <div class="option-content" style="flex: 1;">
              <div class="option-title">Alertas de Precio</div>
              <div class="option-description">Recibe notificaciones cuando alcanzas objetivos de precio</div>
            </div>
          </div>
          <div class="settings-option">
            <input type="checkbox" checked>
            <div class="option-content" style="flex: 1;">
              <div class="option-title">Resumen Diario</div>
              <div class="option-description">Recibe resumen de tu portafolio cada día</div>
            </div>
          </div>
          <div class="settings-option">
            <input type="checkbox">
            <div class="option-content" style="flex: 1;">
              <div class="option-title">Noticias de Mercado</div>
              <div class="option-description">Recibe actualizaciones de noticias financieras</div>
            </div>
          </div>
        </div>

        <!-- Acciones Peligrosas -->
        <div class="settings-section mb-4">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px; color: var(--color-error);">Zona de Peligro</h2>
          
          <div class="card" style="border-left: 3px solid var(--color-error);">
            <div class="card-body">
              <p style="color: var(--color-text-secondary); margin-bottom: 16px;">
                Estas acciones son irreversibles. Úsalas con cuidado.
              </p>
              <button class="btn btn-outline" id="reset-btn" style="color: var(--color-error); border-color: var(--color-error);">
                🗑️ Limpiar Datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;

  // Agregar listeners
  setTimeout(() => {
    const darkToggle = document.getElementById('dark-mode-toggle');
    const saveBtn = document.getElementById('save-settings-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (darkToggle) {
      darkToggle.addEventListener('change', toggleThemeSettings);
    }
    if (saveBtn) {
      saveBtn.addEventListener('click', saveUserSettings);
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', resetData);
    }
  }, 0);
};

function toggleThemeSettings() {
  const toggle = document.getElementById('dark-mode-toggle');
  const newTheme = toggle.checked ? 'dark' : 'light';
  themeManager.set(newTheme);
  AppState.set('theme', newTheme);
  renderNavbar();
  showNotification(`Tema cambiado a ${newTheme}`, 'success');
}

function saveUserSettings() {
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  
  if (!name || !email) {
    showNotification('Por favor completa todos los campos', 'error');
    return;
  }
  
  AppState.set('user.name', name);
  AppState.set('user.email', email);
  renderNavbar();
  showNotification('Perfil actualizado correctamente', 'success');
}

function resetData() {
  if (confirm('¿Estás seguro? Esta acción eliminará todos tus datos.')) {
    AppState.reset();
    showNotification('Datos eliminados correctamente', 'success');
    setTimeout(() => window.location.hash = '#/', 1000);
  }
}

// Hacer funciones globales
window.toggleThemeSettings = toggleThemeSettings;
window.saveUserSettings = saveUserSettings;
window.resetData = resetData;

if (!window.Views) window.Views = {};
window.Views.settings = Views.settings;
