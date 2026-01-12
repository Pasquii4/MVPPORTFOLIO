/**
 * Theme Manager - Handle Dark/Light mode
 */

class ThemeManager {
  static LIGHT = 'light';
  static DARK = 'dark';
  static AUTO = 'auto';
  static STORAGE_KEY = 'portfolio_theme';
  static MEDIA_QUERY = '(prefers-color-scheme: dark)';

  static init() {
    // Check stored preference
    const stored = localStorage.getItem(this.STORAGE_KEY);
    
    if (stored) {
      this.set(stored);
    } else {
      // Use system preference
      this.setAuto();
    }

    // Listen to system theme changes
    window.matchMedia(this.MEDIA_QUERY).addEventListener('change', () => {
      const current = this.get();
      if (current === this.AUTO) {
        this.applyTheme(this.getSystemTheme());
      }
    });
  }

  static set(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    if (theme === this.AUTO) {
      this.applyTheme(this.getSystemTheme());
    } else {
      this.applyTheme(theme);
    }
  }

  static setAuto() {
    this.set(this.AUTO);
  }

  static setLight() {
    this.set(this.LIGHT);
  }

  static setDark() {
    this.set(this.DARK);
  }

  static toggle() {
    const current = this.getActiveTheme();
    this.set(current === this.LIGHT ? this.DARK : this.LIGHT);
  }

  static get() {
    return localStorage.getItem(this.STORAGE_KEY) || this.AUTO;
  }

  static getActiveTheme() {
    const preference = this.get();
    if (preference === this.AUTO) {
      return this.getSystemTheme();
    }
    return preference;
  }

  static getSystemTheme() {
    return window.matchMedia(this.MEDIA_QUERY).matches ? this.DARK : this.LIGHT;
  }

  static applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === this.DARK) {
      root.classList.remove(this.LIGHT);
      root.classList.add(this.DARK);
      root.setAttribute('data-theme', this.DARK);
    } else {
      root.classList.remove(this.DARK);
      root.classList.add(this.LIGHT);
      root.setAttribute('data-theme', this.LIGHT);
    }
  }

  static isDark() {
    return this.getActiveTheme() === this.DARK;
  }

  static isLight() {
    return this.getActiveTheme() === this.LIGHT;
  }
}

export default ThemeManager;