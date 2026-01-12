/**
 * Portfolio View
 */

const Views = window.Views || {};

Views.portfolio = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = AppState.get('portfolio') || {};
  const positions = AppState.get('positions') || [];

  const totalValue = portfolio.currentValue || 0;
  const distribution = positions.map(pos => ({
    symbol: pos.symbol,
    value: (pos.current * pos.quantity),
    percent: totalValue > 0 ? ((pos.current * pos.quantity) / totalValue * 100).toFixed(2) : 0
  }));

  const html = `
    <div class="page-container">
      <h1 class="page-title">🎯 Mi Portafolio</h1>

      <div class="kpi-grid">
        <div class="card stat-card">
          <div class="stat-label">Total Invertido</div>
          <div class="stat-value">${Formatters.currency(portfolio.totalInvested || 0)}</div>
          <div class="stat-unit">EUR</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Valor Actual</div>
          <div class="stat-value">${Formatters.currency(portfolio.currentValue || 0)}</div>
          <div class="stat-unit">EUR</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Ganancias</div>
          <div class="stat-value trend-${(portfolio.totalGain || 0) >= 0 ? 'positive' : 'negative'}">
            ${Formatters.currency(portfolio.totalGain || 0)}
          </div>
          <div class="stat-unit">${(portfolio.totalGainPercent || 0).toFixed(2)}%</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Retorno Total</div>
          <div class="stat-value trend-${(portfolio.totalGainPercent || 0) >= 0 ? 'positive' : 'negative'}">
            ${(portfolio.totalGainPercent || 0).toFixed(2)}%
          </div>
          <div class="stat-unit">ROI</div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h2 class="card-title">Distribución de Activos</h2>
        </div>
        <div class="card-body">
          ${distribution.length > 0 ? `
            <div class="portfolio-details">
              ${distribution.map(item => `
                <div class="detail-row">
                  <span class="detail-label">${item.symbol}</span>
                  <span class="detail-value">
                    ${Formatters.currency(item.value)} 
                    <span class="badge badge-primary badge-sm" style="margin-left: 10px;">${item.percent}%</span>
                  </span>
                </div>
              `).join('')}
            </div>
          ` : `
            <p style="text-align: center; color: var(--color-text-secondary);">Sin posiciones aún</p>
          `}
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};

if (!window.Views) window.Views = {};
window.Views.portfolio = Views.portfolio;
