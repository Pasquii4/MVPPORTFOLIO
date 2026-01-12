/**
 * Settings View
 */

const Views = window.Views || {};

Views.settings = function() {
  const mainContent = document.getElementById('main-content');
  const user = AppState.get('user') || { name: 'Usuario', email: 'user@example.com', joinDate: new Date() };
  const currentTheme = AppState.get('theme') || 'light';

  const html = `
    <div class="page-container">
      <h1 class="page-title">⚙️ Configuración</h1>

      <div style="max-width: 600px;">
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
      darkToggle.addEventListener('change', () => {
        const newTheme = darkToggle.checked ? 'dark' : 'light';
        themeManager.set(newTheme);
        AppState.set('theme', newTheme);
        renderNavbar();
        showNotification(`Tema cambiado a ${newTheme}`, 'success');
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        
        if (!name || !email) {
          showNotification('Por favor completa todos los campos', 'error');
          return;
        }
        
        const currentUser = AppState.get('user') || {};
        AppState.set('user', { ...currentUser, name, email });
        renderNavbar();
        showNotification('Perfil actualizado correctamente', 'success');
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro? Esta acción eliminará todos tus datos.')) {
          StorageManager.clear();
          showNotification('Datos eliminados correctamente', 'success');
          setTimeout(() => window.location.hash = '#/', 1000);
        }
      });
    }
  }, 0);
};

if (!window.Views) window.Views = {};
window.Views.settings = Views.settings;
