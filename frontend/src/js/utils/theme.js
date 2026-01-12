/**
 * Theme Manager
 * Gestiona el tema de la aplicación (dark/light)
 */

const themeManager = {
  current: 'light',

  // Inicializar
  init: function() {
    this.current = localStorage.getItem('portfolio_theme') || 'light';
    this.apply(this.current);
  },

  // Obtener tema actual
  get: function() {
    return this.current;
  },

  // Establecer tema
  set: function(theme) {
    if (theme === 'dark' || theme === 'light') {
      this.current = theme;
      this.apply(theme);
      localStorage.setItem('portfolio_theme', theme);
      console.log(`🎨 Tema: ${theme}`);
    }
  },

  // Aplicar tema
  apply: function(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.setAttribute('data-color-scheme', 'dark');
      document.body.style.colorScheme = 'dark';
    } else {
      html.setAttribute('data-color-scheme', 'light');
      document.body.style.colorScheme = 'light';
    }
  },

  // Toggle tema
  toggle: function() {
    const newTheme = this.current === 'dark' ? 'light' : 'dark';
    this.set(newTheme);
    return newTheme;
  }
};

// Inicializar tema
themeManager.init();
