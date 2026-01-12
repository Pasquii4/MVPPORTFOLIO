/**
 * App Initialization
 * Sistema de inicialización completo de la aplicación
 * ESTE ARCHIVO DEBE SER EL ÚTIMO EN CARGAR
 */

(function initApp() {
  // Verificar que todos los componentes estén cargados
  const requiredComponents = [
    { name: 'ThemeManager', type: 'object' },
    { name: 'StorageManager', type: 'object' },
    { name: 'Formatters', type: 'object' },
    { name: 'Validators', type: 'object' },
    { name: 'AppState', type: 'object' },
    { name: 'router', type: 'object' },
    { name: 'sidebarComponent', type: 'object' },
    { name: 'navbarComponent', type: 'object' },
    { name: 'Views', type: 'object' }
  ];

  let missingComponents = [];
  requiredComponents.forEach(comp => {
    if (typeof window[comp.name] === 'undefined') {
      missingComponents.push(comp.name);
    }
  });

  if (missingComponents.length > 0) {
    console.error('❌ Componentes faltantes:', missingComponents);
    console.error('Por favor verifica que todos los archivos se están cargando en el orden correcto');
    alert('Error: La aplicación no se pudo inicializar. Verifica la consola.');
    return;
  }

  console.log('✓ Todos los componentes cargados correctamente');

  // Esperar a que el DOM esté listo
  if (document.readyState !== 'loading') {
    startApp();
  } else {
    document.addEventListener('DOMContentLoaded', startApp);
  }

  function startApp() {
    console.log('🚀 Iniciando aplicación...');

    // 1. Inicializar tema
    ThemeManager.init();
    console.log('✓ Tema inicializado:', ThemeManager.get());

    // 2. Renderizar sidebar
    sidebarComponent.render();
    console.log('✓ Sidebar renderizado');

    // 3. Renderizar navbar
    navbarComponent.render();
    console.log('✓ Navbar renderizado');

    // 4. Registrar rutas en el router
    registerRoutes();
    console.log('✓ Rutas registradas');

    // 5. Inicializar router
    router.init();
    console.log('✓ Router inicializado');

    // 6. Cargar vista inicial (dashboard)
    router.handleRoute();
    console.log('✓ Vista inicial cargada');

    // 7. Setup de listeners globales
    setupGlobalListeners();
    console.log('✓ Listeners globales configurados');

    // 8. Mensaje de éxito
    console.log('✅ Aplicación lista para usar');
    console.log(`Portfolio Tracker v${AppConfig.appVersion}`);
  }

  /**
   * Registrar todas las rutas
   */
  function registerRoutes() {
    router.register('/', Views.dashboard);
    router.register('/dashboard', Views.dashboard);
    router.register('/positions', Views.positions);
    router.register('/analytics', Views.analytics);
    router.register('/portfolio', Views.portfolio);
    router.register('/education', Views.education);
    router.register('/settings', Views.settings);
  }

  /**
   * Configurar listeners globales
   */
  function setupGlobalListeners() {
    // Escuchar cambios en el tema
    document.addEventListener('themeChanged', (e) => {
      console.log('Tema cambiado a:', e.detail.theme);
      // Regenerar navbar para actualizar icono
      navbarComponent.render();
    });

    // Escuchar cambios en el estado
    document.addEventListener('stateChanged', (e) => {
      console.log('Estado actualizado:', e.detail.key, e.detail.value);
    });

    // Navegación por teclado (Alt + n para siguiente vista)
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        // Navegar a siguiente ruta (desarrollo futuro)
      }
    });

    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
      // Ajustar layout responsivo si es necesario
    });
  }
})();

// Log de debug en consola
console.log(`
%c📊 Portfolio Tracker v${AppConfig.appVersion}
%cAplicación cargada correctamente
`,
  'color: #3B82F6; font-size: 16px; font-weight: bold;',
  'color: #10B981; font-size: 12px;'
);