/**
 * State Management
 * Gestiona el estado global de la aplicación
 */

const AppState = {
  data: {
    positions: [
      {
        id: 1,
        symbol: 'IBEX',
        name: 'IBEX 35',
        entry: 12500,
        current: 13200,
        quantity: 10,
        date: '2026-01-05',
        status: 'active'
      },
      {
        id: 2,
        symbol: 'TECH',
        name: 'Tech Fund',
        entry: 45000,
        current: 48500,
        quantity: 5,
        date: '2025-12-20',
        status: 'active'
      },
      {
        id: 3,
        symbol: 'GOLD',
        name: 'Gold ETF',
        entry: 8000,
        current: 7850,
        quantity: 2,
        date: '2025-11-15',
        status: 'active'
      }
    ],
    portfolio: {
      totalInvested: 65500,
      currentValue: 69550,
      totalGain: 4050,
      totalGainPercent: 6.18,
      currency: 'EUR'
    },
    user: {
      name: 'Usuario',
      email: 'usuario@example.com',
      joinDate: '2024-01-15'
    },
    theme: 'light',
    filters: {
      searchTerm: '',
      status: 'all'
    },
    notifications: []
  },

  listeners: {},

  // Obtener datos
  get(key) {
    const keys = key.split('.');
    let value = this.data;
    for (let k of keys) {
      value = value[k];
      if (value === undefined) return undefined;
    }
    return value;
  },

  // Establecer datos
  set(key, value) {
    const keys = key.split('.');
    let obj = this.data;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.notify(key, value);
  },

  // Escuchar cambios
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
  },

  // Notificar cambios
  notify(key, value) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(value));
    }
  },

  // Agregar posición
  addPosition(position) {
    position.id = Math.max(...this.data.positions.map(p => p.id), 0) + 1;
    this.data.positions.push(position);
    this.notify('positions', this.data.positions);
  },

  // Actualizar posición
  updatePosition(id, updates) {
    const pos = this.data.positions.find(p => p.id === id);
    if (pos) {
      Object.assign(pos, updates);
      this.notify('positions', this.data.positions);
    }
  },

  // Eliminar posición
  deletePosition(id) {
    this.data.positions = this.data.positions.filter(p => p.id !== id);
    this.notify('positions', this.data.positions);
  },

  // Recalcular portfolio
  recalculatePortfolio() {
    const total = this.data.positions.reduce((sum, pos) => {
      return sum + (pos.entry * pos.quantity);
    }, 0);
    const current = this.data.positions.reduce((sum, pos) => {
      return sum + (pos.current * pos.quantity);
    }, 0);
    const gain = current - total;
    this.data.portfolio = {
      totalInvested: total,
      currentValue: current,
      totalGain: gain,
      totalGainPercent: (gain / total) * 100,
      currency: 'EUR'
    };
    this.notify('portfolio', this.data.portfolio);
  },

  // Importar datos desde JSON
  import(data) {
    this.data = { ...this.data, ...data };
    this.notify('*', this.data);
  },

  // Exportar datos
  export() {
    return JSON.stringify(this.data, null, 2);
  },

  // Reset a estado inicial
  reset() {
    this.data = {
      positions: [],
      portfolio: { totalInvested: 0, currentValue: 0, totalGain: 0, totalGainPercent: 0 },
      user: this.data.user,
      theme: 'light',
      filters: { searchTerm: '', status: 'all' },
      notifications: []
    };
    this.notify('*', this.data);
  }
};
