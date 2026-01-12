/**
 * Card Component - Reusable container for displaying data
 * Usage: Card.create({ title, value, icon, trend, trendDirection, onClick })
 */
class Card {
  static create(options = {}) {
    const {
      title = '',
      value = '',
      icon = '📊',
      trend = '',
      trendDirection = 'neutral', // 'up', 'down', 'neutral'
      onClick = null,
      loading = false,
      className = '',
      size = 'default', // 'small', 'default', 'large'
    } = options;

    const card = document.createElement('div');
    card.className = `card card--${size} ${className}`;
    if (onClick) card.style.cursor = 'pointer';

    const trendClass = trend ? `card__trend card__trend--${trendDirection}` : '';
    const trendIcon = trendDirection === 'up' ? '📈' : trendDirection === 'down' ? '📉' : '';

    card.innerHTML = `
      <div class="card__inner">
        <div class="card__header">
          <span class="card__icon">${icon}</span>
          <span class="card__title">${title}</span>
        </div>
        <div class="card__content">
          ${loading ? '<div class="skeleton skeleton--text"></div>' : `
            <div class="card__value">${value}</div>
            ${trend ? `<div class="${trendClass}">${trendIcon} ${trend}</div>` : ''}
          `}
        </div>
      </div>
    `;

    if (onClick) {
      card.addEventListener('click', onClick);
    }

    return card;
  }

  // Variantes predefinidas
  static totalInvested(value, trend) {
    return this.create({
      title: 'Total Invertido',
      value,
      icon: '💰',
      trend,
      trendDirection: trend?.includes('-') ? 'down' : 'up',
    });
  }

  static currentValue(value, trend) {
    return this.create({
      title: 'Valor Actual',
      value,
      icon: '📊',
      trend,
      trendDirection: trend?.includes('-') ? 'down' : 'up',
    });
  }

  static profitLoss(value) {
    const trend = value.includes('-') ? 'down' : 'up';
    return this.create({
      title: 'Ganancia/Pérdida',
      value,
      icon: trend === 'down' ? '📉' : '📈',
      trendDirection: trend,
    });
  }

  static roi(value) {
    return this.create({
      title: 'ROI %',
      value,
      icon: '🎯',
      trendDirection: value.includes('-') ? 'down' : 'up',
    });
  }

  // Update card content
  static update(cardElement, options) {
    if (options.value) {
      const valueEl = cardElement.querySelector('.card__value');
      if (valueEl) valueEl.textContent = options.value;
    }
    if (options.trend) {
      const trendEl = cardElement.querySelector('.card__trend');
      if (trendEl) trendEl.textContent = options.trend;
    }
    if (options.loading === false) {
      const skeleton = cardElement.querySelector('.skeleton');
      if (skeleton) skeleton.remove();
    }
  }
}

export default Card;