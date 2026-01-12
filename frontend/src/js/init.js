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
      { name: 'renderSidebar', check: () => typeof renderSidebar === 'function' },
      { name: 'renderNavbar', check: () => typeof renderNavbar === 'function' },
      { name: 'router', check: () => typeof router !== 'undefined' }
    ];

    let allLoaded = true;
    const missingDeps = [];
    
    dependencies.forEach(dep => {
      if (dep.check()) {
        console.log(`✅ ${dep.name} cargado`);
      } else {
        console.error(`❌ ${dep.name} NO cargado`);
        allLoaded = false;
        missingDeps.push(dep.name);
      }
    });

    if (!allLoaded) {
      console.error('❌ Dependencias faltantes:', missingDeps);
      document.getElementById('main-content').innerHTML = `<div style="padding: 20px; color: red;">Error: Faltan dependencias: ${missingDeps.join(', ')}</div>`;
      return;
    }

    console.log('✅ Todas las dependencias cargadas correctamente');

    // Inicializar tema
    try {
      const savedTheme = StorageManager.get('theme', 'light');
      themeManager.set(savedTheme);
      console.log(`🎨 Tema aplicado: ${savedTheme}`);
    } catch (e) {
      console.error('Error al aplicar tema:', e);
    }

    // Inicializar state
    try {
      const savedPositions = StorageManager.get('positions');
      if (savedPositions && Array.isArray(savedPositions)) {
        AppState.data.positions = savedPositions;
        AppState.recalculatePortfolio();
        console.log(`📊 ${savedPositions.length} posiciones cargadas`);
      }
    } catch (e) {
      console.error('Error al cargar posiciones:', e);
    }

    // Renderizar componentes fijos
    try {
      renderSidebar();
      console.log('✅ Sidebar renderizado');
    } catch (e) {
      console.error('Error en sidebar:', e);
    }

    try {
      renderNavbar();
      console.log('✅ Navbar renderizado');
    } catch (e) {
      console.error('Error en navbar:', e);
    }

    // Registrar todas las rutas
    try {
      if (typeof Views === 'undefined') {
        console.warn('⚠️ Views no está definido, creando objeto vacío');
        window.Views = {};
      }

      // Esperar un poco para que todas las vistas se carguen
      setTimeout(() => {
        router.register('/', Views.dashboard || function() { document.getElementById('main-content').innerHTML = '<p>Dashboard no cargado</p>'; });
        router.register('/dashboard', Views.dashboard || function() {});
        router.register('/positions', Views.positions || function() {});
        router.register('/analytics', Views.analytics || function() {});
        router.register('/portfolio', Views.portfolio || function() {});
        router.register('/education', Views.education || function() {});
        router.register('/settings', Views.settings || function() {});
        
        console.log('✅ Rutas registradas');

        // Navegar a dashboard por defecto
        if (!window.location.hash) {
          window.location.hash = '#/';
        } else {
          router.handleRouteChange();
        }
        
        console.log('✅ Aplicación iniciada correctamente');
      }, 100);
    } catch (e) {
      console.error('Error registrando rutas:', e);
    }
  }, 800);
});
