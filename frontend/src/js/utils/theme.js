// === THEME MANAGEMENT ===
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.apply();
    console.log('✅ ThemeManager initialized');
  }

  apply() {
    if (this.currentTheme === 'dark') {
      document.documentElement.style.colorScheme = 'dark';
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.documentElement.style.colorScheme = 'light';
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }

    localStorage.setItem('theme', this.currentTheme);
  }

  toggle() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.apply();
    this.notifyChange();
  }

  set(theme) {
    if (['light', 'dark', 'auto'].includes(theme)) {
      this.currentTheme = theme;
      this.apply();
      this.notifyChange();
    }
  }

  get() {
    return this.currentTheme;
  }

  notifyChange() {
    const event = new CustomEvent('theme-changed', { detail: { theme: this.currentTheme } });
    document.dispatchEvent(event);
  }
}

window.themeManager = new ThemeManager();