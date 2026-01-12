/**
 * Database Manager
 * Centralizes all data operations (localStorage based)
 * Easy to migrate to IndexedDB or backend API in the future
 */

window.DatabaseManager = {
  // Keys
  KEYS: {
    POSITIONS: 'portfolio_positions',
    PORTFOLIO: 'portfolio_data',
    USER: 'user_profile',
    SETTINGS: 'user_settings',
  },

  // Initialize database with sample data if empty
  init() {
    if (!this.hasData()) {
      this.seedSampleData();
    }
    console.log('✅ Database initialized');
  },

  // Check if data exists
  hasData() {
    return localStorage.getItem(this.KEYS.POSITIONS) !== null;
  },

  // Seed sample data for first load
  seedSampleData() {
    const samplePositions = [
      {
        id: 1,
        symbol: 'IBEX',
        name: 'Ibex 35 Index',
        quantity: 100,
        entry: 10500,
        current: 10750,
        date: new Date('2025-12-01').getTime(),
        notes: 'Posición en el índice principal español'
      },
      {
        id: 2,
        symbol: 'BBVA',
        name: 'BBVA',
        quantity: 50,
        entry: 7.50,
        current: 8.25,
        date: new Date('2025-11-15').getTime(),
        notes: 'Banco español'
      },
      {
        id: 3,
        symbol: 'AAPL',
        name: 'Apple Inc.',
        quantity: 25,
        entry: 150.00,
        current: 185.50,
        date: new Date('2025-10-01').getTime(),
        notes: 'Tech americana'
      },
      {
        id: 4,
        symbol: 'MSFT',
        name: 'Microsoft',
        quantity: 15,
        entry: 380.00,
        current: 420.75,
        date: new Date('2025-09-20').getTime(),
        notes: 'Tech americana'
      },
      {
        id: 5,
        symbol: 'TSLA',
        name: 'Tesla',
        quantity: 10,
        entry: 250.00,
        current: 285.00,
        date: new Date('2025-08-10').getTime(),
        notes: 'Automoción'
      }
    ];

    // Calculate portfolio stats
    const portfolio = this.calculatePortfolio(samplePositions);

    const user = {
      id: 1,
      name: 'Trader Expert',
      email: 'trader@portfolio.app',
      joinDate: new Date().getTime(),
      avatar: '👤'
    };

    const settings = {
      theme: 'light',
      notifications: true,
      emailNotifications: false,
      language: 'es',
      currency: 'EUR'
    };

    // Save to localStorage
    this.savePositions(samplePositions);
    this.savePortfolio(portfolio);
    this.saveUser(user);
    this.saveSettings(settings);
  },

  // POSITIONS CRUD
  getPositions() {
    try {
      const data = localStorage.getItem(this.KEYS.POSITIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting positions:', error);
      return [];
    }
  },

  getPosition(id) {
    const positions = this.getPositions();
    return positions.find(p => p.id === id);
  },

  addPosition(position) {
    try {
      const positions = this.getPositions();
      
      // Validation
      if (!position.symbol || !position.name) {
        throw new Error('Symbol y Name son requeridos');
      }
      if (position.quantity <= 0 || position.entry <= 0) {
        throw new Error('Cantidad y Entrada deben ser mayores que 0');
      }

      // Generate ID
      const newPosition = {
        id: positions.length > 0 ? Math.max(...positions.map(p => p.id)) + 1 : 1,
        date: new Date().getTime(),
        current: position.entry, // Start with entry price
        notes: '',
        ...position
      };

      positions.push(newPosition);
      this.savePositions(positions);
      this.updatePortfolio();
      
      return newPosition;
    } catch (error) {
      console.error('Error adding position:', error);
      throw error;
    }
  },

  updatePosition(id, updates) {
    try {
      const positions = this.getPositions();
      const index = positions.findIndex(p => p.id === id);
      
      if (index === -1) {
        throw new Error('Posición no encontrada');
      }

      // Validation
      if (updates.quantity !== undefined && updates.quantity <= 0) {
        throw new Error('Cantidad debe ser mayor que 0');
      }
      if (updates.entry !== undefined && updates.entry <= 0) {
        throw new Error('Precio de entrada debe ser mayor que 0');
      }
      if (updates.current !== undefined && updates.current <= 0) {
        throw new Error('Precio actual debe ser mayor que 0');
      }

      positions[index] = { ...positions[index], ...updates };
      this.savePositions(positions);
      this.updatePortfolio();
      
      return positions[index];
    } catch (error) {
      console.error('Error updating position:', error);
      throw error;
    }
  },

  deletePosition(id) {
    try {
      let positions = this.getPositions();
      const index = positions.findIndex(p => p.id === id);
      
      if (index === -1) {
        throw new Error('Posición no encontrada');
      }

      positions.splice(index, 1);
      this.savePositions(positions);
      this.updatePortfolio();
      
      return true;
    } catch (error) {
      console.error('Error deleting position:', error);
      throw error;
    }
  },

  savePositions(positions) {
    try {
      localStorage.setItem(this.KEYS.POSITIONS, JSON.stringify(positions));
    } catch (error) {
      console.error('Error saving positions:', error);
      throw error;
    }
  },

  // PORTFOLIO CALCULATIONS
  calculatePortfolio(positions = null) {
    if (!positions) {
      positions = this.getPositions();
    }

    let totalInvested = 0;
    let totalCurrentValue = 0;

    positions.forEach(pos => {
      const invested = pos.entry * pos.quantity;
      const current = pos.current * pos.quantity;
      totalInvested += invested;
      totalCurrentValue += current;
    });

    const totalGain = totalCurrentValue - totalInvested;
    const totalGainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

    return {
      totalInvested: Math.round(totalInvested * 100) / 100,
      currentValue: Math.round(totalCurrentValue * 100) / 100,
      totalGain: Math.round(totalGain * 100) / 100,
      totalGainPercent: Math.round(totalGainPercent * 100) / 100,
      positionCount: positions.length,
      lastUpdate: new Date().getTime()
    };
  },

  getPortfolio() {
    try {
      const data = localStorage.getItem(this.KEYS.PORTFOLIO);
      return data ? JSON.parse(data) : this.calculatePortfolio();
    } catch (error) {
      console.error('Error getting portfolio:', error);
      return this.calculatePortfolio();
    }
  },

  updatePortfolio() {
    const portfolio = this.calculatePortfolio();
    this.savePortfolio(portfolio);
    return portfolio;
  },

  savePortfolio(portfolio) {
    try {
      localStorage.setItem(this.KEYS.PORTFOLIO, JSON.stringify(portfolio));
    } catch (error) {
      console.error('Error saving portfolio:', error);
      throw error;
    }
  },

  // USER PROFILE
  getUser() {
    try {
      const data = localStorage.getItem(this.KEYS.USER);
      return data ? JSON.parse(data) : {
        id: 1,
        name: 'Usuario',
        email: 'user@example.com',
        joinDate: new Date().getTime(),
        avatar: '👤'
      };
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  updateUser(updates) {
    try {
      const user = this.getUser();
      const updated = { ...user, ...updates };
      this.saveUser(updated);
      return updated;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  saveUser(user) {
    try {
      localStorage.setItem(this.KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  // SETTINGS
  getSettings() {
    try {
      const data = localStorage.getItem(this.KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        theme: 'light',
        notifications: true,
        emailNotifications: false,
        language: 'es',
        currency: 'EUR'
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  },

  updateSettings(updates) {
    try {
      const settings = this.getSettings();
      const updated = { ...settings, ...updates };
      this.saveSettings(updated);
      return updated;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  },

  // BULK OPERATIONS
  exportData() {
    try {
      return {
        positions: this.getPositions(),
        portfolio: this.getPortfolio(),
        user: this.getUser(),
        settings: this.getSettings(),
        exportDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  },

  importData(data) {
    try {
      if (data.positions) this.savePositions(data.positions);
      if (data.portfolio) this.savePortfolio(data.portfolio);
      if (data.user) this.saveUser(data.user);
      if (data.settings) this.saveSettings(data.settings);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  },

  clearAllData() {
    try {
      localStorage.removeItem(this.KEYS.POSITIONS);
      localStorage.removeItem(this.KEYS.PORTFOLIO);
      localStorage.removeItem(this.KEYS.USER);
      localStorage.removeItem(this.KEYS.SETTINGS);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },

  // STATS
  getStats() {
    const positions = this.getPositions();
    const portfolio = this.getPortfolio();

    const winners = positions.filter(p => p.current > p.entry).length;
    const losers = positions.filter(p => p.current < p.entry).length;
    const breakeven = positions.filter(p => p.current === p.entry).length;

    return {
      totalPositions: positions.length,
      winningPositions: winners,
      losingPositions: losers,
      breakevenPositions: breakeven,
      winRate: positions.length > 0 ? ((winners / positions.length) * 100).toFixed(2) : 0,
      totalInvested: portfolio.totalInvested,
      currentValue: portfolio.currentValue,
      totalProfit: portfolio.totalGain,
      totalProfitPercent: portfolio.totalGainPercent
    };
  }
};

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatabaseManager;
}
