/**
 * Theme Manager
 * Gestiona temas dark/light de la aplicación
 */
const ThemeManager = {
  LIGHT: 'light',
  DARK: 'dark',
  STORAGE_KEY: 'app_theme',

  /**
   * Inicializar tema basado en preferencias del sistema
   */
  init() {
    // Recuperar del storage o usar preferencia del sistema
    const saved = StorageManager.get(this.STORAGE_KEY);
    let theme = saved;
    
    if (!theme) {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? this.DARK : this.LIGHT;
    }
    
    this.set(theme);
  },

  /**
   * Obtener tema actual
   * @returns {string} Tema actual ('light' o 'dark')
   */
  get() {
    return document.documentElement.getAttribute('data-color-scheme') || this.LIGHT;
  },

  /**
   * Establecer tema
   * @param {string} theme - Tema a establecer ('light' o 'dark')
   */
  set(theme) {
    if (![this.LIGHT, this.DARK].includes(theme)) {
      console.warn(`Tema inválido: ${theme}. Usando 'light'`);
      theme = this.LIGHT;
    }

    document.documentElement.setAttribute('data-color-scheme', theme);
    StorageManager.set(this.STORAGE_KEY, theme);
    
    // Disparar evento de cambio
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(event);
  },

  /**
   * Toggle entre temas
   */
  toggle() {
    const current = this.get();
    const next = current === this.LIGHT ? this.DARK : this.LIGHT;
    this.set(next);
    return next;
  },

  /**
   * Obtener variable CSS del tema actual
   * @param {string} varName - Nombre de la variable
   * @returns {string} Valor de la variable
   */
  getVar(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
};