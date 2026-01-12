/**
 * Portfolio View
 * Muestra resumen del portafolio y distribución de activos
 */

const Views = window.Views || {};

Views.portfolio = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = AppState.get('portfolio');
  const positions = AppState.get('positions');

  // Calcular distribución
  const totalValue = portfolio.currentValue || 0;
  const distribution = positions.map(pos => ({
    symbol: pos.symbol,
    value: (pos.current * pos.quantity),
    percent: ((pos.current * pos.quantity) / totalValue * 100).toFixed(2)
  }));

  const html = `
    <div class="page-container">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="page-title">🎯 Mi Portafolio</h1>
      </div>

      <!-- Portfolio Summary -->
      <div class="portfolio-summary">
        <div class="kpi-grid">
          <!-- Total Invertido -->
          <div class="card stat-card">
            <div class="stat-label">Total Invertido</div>
            <div class="stat-value">${Formatters.currency(portfolio.totalInvested)}</div>
            <div class="stat-unit">EUR</div>
          </div>

          <!-- Valor Actual -->
          <div class="card stat-card">
            <div class="stat-label">Valor Actual</div>
            <div class="stat-value">${Formatters.currency(portfolio.currentValue)}</div>
            <div class="stat-unit">EUR</div>
          </div>

          <!-- Ganancias -->
          <div class="card stat-card">
            <div class="stat-label">Ganancias</div>
            <div class="stat-value trend-${portfolio.totalGain >= 0 ? 'positive' : 'negative'}">
              ${Formatters.currency(portfolio.totalGain)}
            </div>
            <div class="stat-unit">${portfolio.totalGain >= 0 ? '+' : ''}${Formatters.percent(portfolio.totalGainPercent)}</div>
          </div>

          <!-- ROI -->
          <div class="card stat-card">
            <div class="stat-label">Retorno Total</div>
            <div class="stat-value trend-${portfolio.totalGainPercent >= 0 ? 'positive' : 'negative'}">
              ${Formatters.percent(portfolio.totalGainPercent)}%
            </div>
            <div class="stat-unit">Porcentaje</div>
          </div>
        </div>
      </div>

      <!-- Distribución -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Distribución de Activos</h2>
        </div>
        <div class="card-body">
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
        </div>
      </div>

      <!-- Acciones -->
      <div class="portfolio-actions mt-4">
        <div class="action-buttons">
          <button class="btn btn-primary" id="view-positions-btn">📊 Ver Posiciones</button>
          <button class="btn btn-secondary" id="export-btn">⬇️ Exportar</button>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;

  // Agregar listeners
  setTimeout(() => {
    const viewBtn = document.getElementById('view-positions-btn');
    const exportBtn = document.getElementById('export-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => window.location.hash = '#/positions');
    }
    if (exportBtn) {
      exportBtn.addEventListener('click', exportPortfolio);
    }
  }, 0);
};

function exportPortfolio() {
  const data = AppState.export();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  showNotification('Portafolio exportado correctamente', 'success');
}

// Hacer función global
window.exportPortfolio = exportPortfolio;

if (!window.Views) window.Views = {};
window.Views.portfolio = Views.portfolio;
