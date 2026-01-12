/**
 * Theme Manager - Handle light/dark mode
 */

const themeManager = {
  // Get current theme
  get: function() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  },

  // Set theme
  set: function(theme) {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      root.style.colorScheme = 'dark';
      body.setAttribute('data-color-scheme', 'dark');
    } else {
      root.style.colorScheme = 'light';
      body.setAttribute('data-color-scheme', 'light');
    }
    
    localStorage.setItem('theme', theme);
    return theme;
  },

  // Toggle between light/dark
  toggle: function() {
    const current = this.get();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    return this.set(newTheme);
  }
};
