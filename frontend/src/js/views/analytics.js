/**
 * Analytics View
 */

const Views = window.Views || {};

Views.analytics = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = AppState.get('portfolio');
  const positions = AppState.get('positions') || [];

  const html = `
    <div class="page-container">
      <h1 class="page-title">📉 Análisis</h1>
      
      <div class="card mb-4">
        <div class="card-header">
          <h2 class="card-title">Evolución del Portafolio</h2>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--color-text-secondary);">
              <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                <p>Gráfico en desarrollo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="card stat-card">
          <div class="stat-label">Posiciones Activas</div>
          <div class="stat-value">${positions.length}</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Valor Total</div>
          <div class="stat-value">${Formatters.currency(portfolio.currentValue)}</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Rentabilidad</div>
          <div class="stat-value trend-${portfolio.totalGainPercent >= 0 ? 'positive' : 'negative'}">
            ${Formatters.percent(portfolio.totalGainPercent)}%
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Ganancias</div>
          <div class="stat-value trend-${portfolio.totalGain >= 0 ? 'positive' : 'negative'}">
            ${Formatters.currency(portfolio.totalGain)}
          </div>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};

if (!window.Views) window.Views = {};
window.Views.analytics = Views.analytics;
