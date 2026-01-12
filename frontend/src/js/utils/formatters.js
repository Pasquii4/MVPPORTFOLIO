// === FORMATTERS ===
const Formatters = {
  // Currency
  currency: (value, symbol = '$') => {
    return symbol + parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Percentage
  percent: (value, decimals = 2) => {
    return parseFloat(value).toFixed(decimals) + '%';
  },

  // Date
  date: (dateStr, format = 'DD/MM/YYYY') => {
    const date = new Date(dateStr);
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return format.replace('DD', d).replace('MM', m).replace('YYYY', y);
  },

  // Trend arrow
  trendArrow: (value) => {
    return value >= 0 ? '📈 ↑' : '📉 ↓';
  },

  // Number
  number: (value, decimals = 2) => {
    return parseFloat(value).toFixed(decimals);
  },

  // K, M formatting
  shortNumber: (value) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value;
  }
};

window.Formatters = Formatters;