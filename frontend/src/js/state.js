/**
 * App State Management
 * Gestión centralizada del estado
 */
const AppState = (() => {
  const state = {
    positions: [
      { symbol: 'AAPL', shares: 10, entryPrice: 150, currentPrice: 175 },
      { symbol: 'MSFT', shares: 5, entryPrice: 300, currentPrice: 380 },
      { symbol: 'GOOGL', shares: 3, entryPrice: 2800, currentPrice: 3100 }
    ],
    portfolio: {
      totalInvested: 15000,
      currentValue: 18500,
      totalGain: 3500
    },
    user: {
      name: 'Usuario',
      email: 'usuario@example.com'
    },
    theme: 'light',
    filters: {}
  };

  // Recuperar del storage
  const saved = StorageManager.get('appState');
  if (saved) {
    Object.assign(state, saved);
  }

  return {
    get(key, defaultValue = null) {
      return key ? (state[key] !== undefined ? state[key] : defaultValue) : state;
    },

    set(key, value) {
      state[key] = value;
      this.save();
      const event = new CustomEvent('stateChanged', { detail: { key, value } });
      document.dispatchEvent(event);
    },

    update(key, updates) {
      if (typeof state[key] === 'object' && state[key] !== null) {
        state[key] = { ...state[key], ...updates };
      } else {
        state[key] = updates;
      }
      this.save();
      const event = new CustomEvent('stateChanged', { detail: { key, value: state[key] } });
      document.dispatchEvent(event);
    },

    save() {
      StorageManager.set('appState', state);
    },

    reset() {
      Object.keys(state).forEach(key => {
        state[key] = null;
      });
      this.save();
    }
  };
})();