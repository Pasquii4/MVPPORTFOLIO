/**
 * Init - Application Bootstrap
 * Inicializa la aplicación cargando componentes y vistas
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Iniciando Portfolio Tracker v2.0...');

  // Pequeña pausa para asegurar que todos los scripts están cargados
  setTimeout(function() {
    // Verificar que todas las dependencias están cargadas
    const dependencies = [
      { name: 'Config', check: () => typeof Config !== 'undefined' },
      { name: 'Formatters', check: () => typeof Formatters !== 'undefined' },
      { name: 'Validators', check: () => typeof Validators !== 'undefined' },
      { name: 'StorageManager', check: () => typeof StorageManager !== 'undefined' },
      { name: 'themeManager', check: () => typeof themeManager !== 'undefined' },
      { name: 'AppState', check: () => typeof AppState !== 'undefined' },
      { name: 'Views', check: () => typeof Views !== 'undefined' },
      { name: 'router', check: () => typeof router !== 'undefined' }
    ];

    let allLoaded = true;
    dependencies.forEach(dep => {
      if (dep.check()) {
        console.log(`✅ ${dep.name} cargado`);
      } else {
        console.error(`❌ ${dep.name} NO cargado`);
        allLoaded = false;
      }
    });

    if (!allLoaded) {
      console.error('❌ No todas las dependencias se cargaron correctamente');
      document.getElementById('main-content').innerHTML = '<div style="padding: 20px; color: red;">Error: No se cargaron todas las dependencias</div>';
      return;
    }

    // Aplicar tema guardado
    const savedTheme = StorageManager.get('theme', 'light');
    themeManager.set(savedTheme);
    console.log(`🎨 Tema aplicado: ${savedTheme}`);

    // Cargar posiciones desde almacenamiento
    const savedPositions = StorageManager.get('positions');
    if (savedPositions && Array.isArray(savedPositions)) {
      AppState.data.positions = savedPositions;
      console.log(`📊 ${savedPositions.length} posiciones cargadas`);
    }

    // Renderizar navbar
    try {
      if (typeof renderNavbar === 'function') {
        renderNavbar();
        console.log('✅ Navbar renderizado');
      }
    } catch (e) {
      console.error('Error en navbar:', e);
    }

    // Renderizar sidebar
    try {
      if (typeof renderSidebar === 'function') {
        renderSidebar();
        console.log('✅ Sidebar renderizado');
      }
    } catch (e) {
      console.error('Error en sidebar:', e);
    }

    // Registrar rutas
    if (typeof router !== 'undefined') {
      router.register('/', Views.dashboard);
      router.register('/dashboard', Views.dashboard);
      router.register('/positions', Views.positions);
      router.register('/analytics', Views.analytics);
      router.register('/portfolio', Views.portfolio);
      router.register('/education', Views.education);
      router.register('/settings', Views.settings);
      console.log('✅ Rutas registradas');

      // Navegar a dashboard por defecto
      setTimeout(() => {
        if (!window.location.hash) {
          window.location.hash = '#/';
        } else {
          // Trigger route change si ya hay hash
          router.handleRouteChange();
        }
      }, 100);
    }

    console.log('✅ Aplicación iniciada correctamente');
  }, 500);
});
