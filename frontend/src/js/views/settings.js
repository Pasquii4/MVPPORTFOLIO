/**
 * Settings View - Full configuration and preferences
 */

window.Views = window.Views || {};

window.Views.settings = function() {
  const mainContent = document.getElementById('main-content');
  const user = DatabaseManager.getUser();
  const settings = DatabaseManager.getSettings();
  const currentTheme = settings.theme || 'light';

  const html = `
    <div class="page-container">
      <h1 class="page-title">⚙️ Configuración</h1>

      <div style="max-width: 700px;">
        <!-- Appearance Settings -->
        <div class="settings-section mb-4">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px; color: var(--color-text);">🎨 Apariencia</h2>
          
          <div class="card">
            <div class="card-body">
              <div class="settings-option" style="display: flex; align-items: center; gap: 12px; padding: 12px 0;">
                <input type="checkbox" id="dark-mode-toggle" ${currentTheme === 'dark' ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;">
                <div style="flex: 1;">
                  <div class="option-title" style="font-weight: 500; margin-bottom: 4px;">Modo Oscuro</div>
                  <div class="option-description" style="color: var(--color-text-secondary); font-size: 0.9rem;">Activa el tema oscuro para reducir fatiga ocular</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div class="settings-section mb-4">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px; color: var(--color-text);">🔔 Notificaciones</h2>
          
          <div class="card">
            <div class="card-body">
              <div class="settings-option" style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--color-border);">
                <input type="checkbox" id="notifications-toggle" ${settings.notifications ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;">
                <div style="flex: 1;">
                  <div class="option-title" style="font-weight: 500; margin-bottom: 4px;">Notificaciones del App</div>
                  <div class="option-description" style="color: var(--color-text-secondary); font-size: 0.9rem;">Recibe notificaciones dentro de la aplicación</div>
                </div>
              </div>
              <div class="settings-option" style="display: flex; align-items: center; gap: 12px; padding: 12px 0;">
                <input type="checkbox" id="email-notifications-toggle" ${settings.emailNotifications ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;">
                <div style="flex: 1;">
                  <div class="option-title" style="font-weight: 500; margin-bottom: 4px;">Notificaciones por Email</div>
                  <div class="option-description" style="color: var(--color-text-secondary); font-size: 0.9rem;">Recibe alertas importantes por correo electrónico</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Settings -->
        <div class="settings-section mb-4">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px; color: var(--color-text);">👤 Perfil</h2>
          
          <div class="card">
            <div class="card-body">
              <div class="form-group mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-input" id="user-name" value="${user.name}">
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="user-email" value="${user.email}">
              </div>
              <div class="form-group">
                <label class="form-label">Miembro desde</label>
                <input type="text" class="form-input" value="${Formatters.date(new Date(user.joinDate))}" disabled style="background: var(--color-secondary); cursor: not-allowed;">
              </div>
            </div>
          </div>
        </div>

        <!-- Data Settings -->
        <div class="settings-section mb-4">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px; color: var(--color-text);">💾 Datos</h2>
          
          <div class="card">
            <div class="card-body" style="display: flex; flex-direction: column; gap: 12px;">
              <button class="btn btn-outline" id="export-btn" style="justify-content: center;">
                📤 Exportar Datos
              </button>
              <button class="btn btn-outline" id="import-btn" style="justify-content: center;">
                📥 Importar Datos
              </button>
              <input type="file" id="import-file" accept=".json" style="display: none;">
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="settings-section">
          <h2 style="font-size: 1.1rem; margin-bottom: 16px; color: var(--color-error);">⚠️ Zona de Peligro</h2>
          
          <div class="card" style="border-left: 3px solid var(--color-error);">
            <div class="card-body">
              <p style="color: var(--color-text-secondary); margin-bottom: 16px;">
                Estas acciones son irreversibles. Úsalas con cuidado.
              </p>
              <button class="btn btn-outline" id="reset-btn" style="color: var(--color-error); border-color: var(--color-error); justify-content: center;">
                🗑️ Limpiar Todos los Datos
              </button>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div style="margin-top: 24px;">
          <button class="btn btn-primary btn-full-width" id="save-settings-btn" style="padding: 12px;">
            💾 Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;

  // Attach event listeners after DOM is ready
  setTimeout(() => {
    setupSettingsHandlers();
  }, 0);
};

function setupSettingsHandlers() {
  // Dark mode toggle
  const darkToggle = document.getElementById('dark-mode-toggle');
  if (darkToggle) {
    darkToggle.addEventListener('change', () => {
      const newTheme = darkToggle.checked ? 'dark' : 'light';
      themeManager.set(newTheme);
      AppState.set('theme', newTheme);
      DatabaseManager.updateSettings({ theme: newTheme });
    });
  }

  // Notifications toggles
  const notificationsToggle = document.getElementById('notifications-toggle');
  const emailToggle = document.getElementById('email-notifications-toggle');

  notificationsToggle?.addEventListener('change', () => {
    DatabaseManager.updateSettings({ notifications: notificationsToggle.checked });
  });
  emailToggle?.addEventListener('change', () => {
    DatabaseManager.updateSettings({ emailNotifications: emailToggle.checked });
  });

  // Save profile
  const saveBtn = document.getElementById('save-settings-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      try {
        const name = document.getElementById('user-name').value.trim();
        const email = document.getElementById('user-email').value.trim();

        if (!name || !email) {
          showNotification('Por favor completa todos los campos', 'error');
          return;
        }

        DatabaseManager.updateUser({ name, email });
        showNotification('Perfil actualizado ✅', 'success');
      } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
      }
    });
  }

  // Export data
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      try {
        const data = DatabaseManager.exportData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        showNotification('Datos exportados ✅', 'success');
      } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
      }
    });
  }

  // Import data
  const importBtn = document.getElementById('import-btn');
  const importFile = document.getElementById('import-file');

  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (confirm('¿Importar datos? Esto sobrescribirá los datos actuales.')) {
            DatabaseManager.importData(data);
            window.refreshData();
            showNotification('Datos importados ✅', 'success');
            setTimeout(() => window.location.hash = '#/', 1000);
          }
        } catch (error) {
          showNotification(`Error al importar: ${error.message}`, 'error');
        }
      };
      reader.readAsText(file);
    });
  }

  // Reset data
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('⚠️ ¿Estás seguro? Esta acción eliminará TODOS tus datos y NO se puede deshacer.')) {
        if (confirm('última confirmación: ¿Eliminar todo?')) {
          try {
            DatabaseManager.clearAllData();
            DatabaseManager.seedSampleData();
            window.refreshData();
            showNotification('Datos reiniciados ✅', 'success');
            window.Views.settings();
          } catch (error) {
            showNotification(`Error: ${error.message}`, 'error');
          }
        }
      }
    });
  }
}
