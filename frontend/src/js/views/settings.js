/**
 * Settings View
 * Configuración de la aplicación
 */
Views.settings = function() {
  const container = document.getElementById('app-view');
  container.innerHTML = '';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = '⚙️ Configuración';
  container.appendChild(title);
  
  // Sección de Tema
  const themeSection = document.createElement('section');
  themeSection.className = 'settings-section';
  
  const themeTitle = document.createElement('h2');
  themeTitle.textContent = 'Tema';
  themeSection.appendChild(themeTitle);
  
  const currentTheme = ThemeManager.get();
  const themeLabel = document.createElement('label');
  themeLabel.className = 'settings-option';
  
  const themeToggle = document.createElement('input');
  themeToggle.type = 'checkbox';
  themeToggle.checked = currentTheme === 'dark';
  themeToggle.addEventListener('change', () => {
    ThemeManager.toggle();
    const newTheme = ThemeManager.get();
    themeToggle.checked = newTheme === 'dark';
    Notifications.success('Tema actualizado');
  });
  
  themeLabel.appendChild(themeToggle);
  themeLabel.innerHTML += `
    <div class="option-content">
      <span class="option-title">Modo Oscuro</span>
      <span class="option-description">Activa el modo oscuro para proteger tus ojos</span>
    </div>
  `;
  
  themeSection.appendChild(themeLabel);
  container.appendChild(themeSection);
  
  // Sección de Perfil
  const profileSection = document.createElement('section');
  profileSection.className = 'settings-section';
  
  const profileTitle = document.createElement('h2');
  profileTitle.textContent = 'Perfil';
  profileSection.appendChild(profileTitle);
  
  const form = new DynamicForm({
    fields: [
      {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Tu nombre',
        value: 'Usuario',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'tu@email.com',
        value: 'usuario@example.com',
        required: true
      },
      {
        name: 'phone',
        label: 'Teléfono',
        type: 'tel',
        placeholder: '+34 666 666 666',
        required: false
      }
    ],
    submitText: 'Guardar Cambios',
    onSubmit: (data) => {
      AppState.set('user', data);
      Notifications.success('Perfil actualizado correctamente');
      console.log('Datos guardados:', data);
    }
  });
  
  profileSection.appendChild(form.render());
  container.appendChild(profileSection);
  
  // Sección de Notificaciones
  const notifSection = document.createElement('section');
  notifSection.className = 'settings-section';
  
  const notifTitle = document.createElement('h2');
  notifTitle.textContent = 'Notificaciones';
  notifSection.appendChild(notifTitle);
  
  const notifOptions = [
    { id: 'email_alerts', label: 'Alertas por Email', description: 'Recibe alertas de cambios importantes' },
    { id: 'price_updates', label: 'Actualizaciones de Precio', description: 'Notificaciones de cambios de precio' }
  ];
  
  notifOptions.forEach(opt => {
    const optLabel = document.createElement('label');
    optLabel.className = 'settings-option';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    
    optLabel.appendChild(checkbox);
    optLabel.innerHTML += `
      <div class="option-content">
        <span class="option-title">${opt.label}</span>
        <span class="option-description">${opt.description}</span>
      </div>
    `;
    
    notifSection.appendChild(optLabel);
  });
  
  container.appendChild(notifSection);
  
  if (navbarComponent) {
    navbarComponent.setTitle('⚙️ Configuración');
  }
  
  if (sidebarComponent) {
    sidebarComponent.updateActive('settings');
  }
};