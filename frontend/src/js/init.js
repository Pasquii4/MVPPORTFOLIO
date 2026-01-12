/**
 * Init - Application Bootstrap
 * Inicializa la aplicación cargando componentes y vistas
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Iniciando Portfolio Tracker v2.0...');

  // Verificar que todas las dependencias están cargadas
  const dependencies = [
    { name: 'Formatters', check: () => typeof Formatters !== 'undefined' },
    { name: 'StorageManager', check: () => typeof StorageManager !== 'undefined' },
    { name: 'themeManager', check: () => typeof themeManager !== 'undefined' },
    { name: 'AppState', check: () => typeof AppState !== 'undefined' },
    { name: 'Views', check: () => typeof Views !== 'undefined' }
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
    return;
  }

  // Aplicar tema guardado
  const savedTheme = StorageManager.get('theme', 'light');
  themeManager.set(savedTheme);
  console.log(`🎨 Tema aplicado: ${savedTheme}`);

  // Cargar posiciones desde almacenamiento
  const savedPositions = StorageManager.get('positions');
  if (savedPositions) {
    AppState.data.positions = savedPositions;
    console.log(`📊 ${savedPositions.length} posiciones cargadas`);
  }

  // Renderizar navbar
  if (typeof renderNavbar === 'function') {
    renderNavbar();
    console.log('✅ Navbar renderizado');
  }

  // Renderizar sidebar
  if (typeof renderSidebar === 'function') {
    renderSidebar();
    console.log('✅ Sidebar renderizado');
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
      router.navigate('/');
    }, 100);
  }

  console.log('✅ Aplicación iniciada correctamente');
});
