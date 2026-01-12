// === STATE MANAGEMENT ===
class AppState {
  constructor() {
    this.state = {
      positions: [],
      portfolio: {
        totalInvested: 0,
        currentValue: 0,
        profit: 0,
        profitPercent: 0
      },
      theme: localStorage.getItem('theme') || 'light',
      user: {
        name: 'Trader',
        email: ''
      },
      filters: {
        positionStatus: 'all',
        searchTerm: ''
      }
    };

    this.listeners = {};
    console.log('✅ AppState initialized');
  }

  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
  }

  set(key, value) {
    if (this.state[key] !== value) {
      this.state[key] = value;
      this.notifyListeners(key);
    }
  }

  get(key) {
    return this.state[key];
  }

  notifyListeners(key) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(this.state[key]));
    }
  }

  updatePortfolio(positions) {
    let totalInvested = 0;
    let currentValue = 0;

    positions.forEach(pos => {
      totalInvested += pos.quantity * pos.buyPrice;
      currentValue += pos.quantity * (pos.currentPrice || pos.buyPrice);
    });

    const profit = currentValue - totalInvested;
    const profitPercent = (profit / totalInvested * 100) || 0;

    this.state.portfolio = {
      totalInvested,
      currentValue,
      profit,
      profitPercent: profitPercent.toFixed(2)
    };

    this.notifyListeners('portfolio');
  }

  addPosition(position) {
    this.state.positions.push(position);
    this.updatePortfolio(this.state.positions);
    this.notifyListeners('positions');
  }

  removePosition(ticker) {
    this.state.positions = this.state.positions.filter(p => p.ticker !== ticker);
    this.updatePortfolio(this.state.positions);
    this.notifyListeners('positions');
  }
}

window.appState = new AppState();