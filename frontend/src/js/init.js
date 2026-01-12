/**
 * Application Initialization
 * Loads all modules and starts the application
 */

document.addEventListener('DOMContentLoaded', async () => {
  console.clear();
  console.log('🚀 Initializing Portfolio Tracker...');

  // Step 1: Initialize Database
  console.log('📦 Loading database...');
  if (window.DatabaseManager) {
    DatabaseManager.init();
  } else {
    console.error('❌ DatabaseManager not loaded');
    return;
  }

  // Step 2: Load initial state from database
  console.log('📊 Loading data...');
  try {
    const positions = DatabaseManager.getPositions();
    const portfolio = DatabaseManager.getPortfolio();
    const user = DatabaseManager.getUser();
    const settings = DatabaseManager.getSettings();

    AppState.set('positions', positions);
    AppState.set('portfolio', portfolio);
    AppState.set('user', user);
    AppState.set('theme', settings.theme);
    AppState.set('settings', settings);

    console.log(`✅ Loaded ${positions.length} positions`);
  } catch (error) {
    console.error('❌ Error loading data:', error);
  }

  // Step 3: Apply theme
  console.log('🎨 Applying theme...');
  const theme = AppState.get('theme') || 'light';
  themeManager.set(theme);

  // Step 4: Render static components
  console.log('🎯 Rendering components...');
  try {
    renderNavbar();
    renderSidebar();
  } catch (error) {
    console.error('❌ Error rendering components:', error);
  }

  // Step 5: Initialize router
  console.log('🛣️ Initializing router...');
  try {
    const router = new Router();
    router.registerRoute('/', Views.dashboard);
    router.registerRoute('/dashboard', Views.dashboard);
    router.registerRoute('/positions', Views.positions);
    router.registerRoute('/analytics', Views.analytics);
    router.registerRoute('/portfolio', Views.portfolio);
    router.registerRoute('/education', Views.education);
    router.registerRoute('/settings', Views.settings);

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      router.navigate(window.location.hash.slice(1));
    });

    // Navigate to initial route
    const initialRoute = window.location.hash.slice(1) || '/';
    router.navigate(initialRoute);

    console.log('✅ Router initialized');
  } catch (error) {
    console.error('❌ Error initializing router:', error);
  }

  // Step 6: Setup event listeners
  console.log('📡 Setting up listeners...');
  setupEventListeners();

  console.log('✨ Application ready!');
  console.log('📚 Commands: AppState.get(), DatabaseManager.getPositions(), router.navigate()');
});

// Global event listeners
function setupEventListeners() {
  // Sidebar navigation
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      window.location.hash = href;
    }
  });
}

// Global helper to refresh data from database
window.refreshData = () => {
  console.log('🔄 Refreshing data...');
  const positions = DatabaseManager.getPositions();
  const portfolio = DatabaseManager.getPortfolio();
  AppState.set('positions', positions);
  AppState.set('portfolio', portfolio);
  console.log('✅ Data refreshed');
};

// Global notification helper
window.showNotification = (message, type = 'info') => {
  console.log(`[${type.toUpperCase()}] ${message}`);
  // Trigger notification component if exists
  try {
    if (window.Notifications) {
      Notifications.show(message, type);
    }
  } catch (e) {
    // Notifications component may not be loaded
  }
};
