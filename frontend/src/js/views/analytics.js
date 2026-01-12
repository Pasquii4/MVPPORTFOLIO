/**
 * Analytics View
 */

window.Views = window.Views || {};

window.Views.analytics = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = AppState.get('portfolio') || {};

  const html = `
    <div class="page-container">
      <h1 class="page-title">📉 Analytics</h1>
      
      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Desempeño</h2>
          </div>
          <div class="card-body">
            <div class="chart-placeholder" style="height: 300px; background: var(--color-secondary); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <p style="color: var(--color-text-secondary);">Gráfico de líneas (placeholder)</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Estadísticas</h2>
          </div>
          <div class="card-body">
            <div class="stat-row">
              <span>Total Invertido</span>
              <strong>${Formatters.currency(portfolio.totalInvested || 0)}</strong>
            </div>
            <div class="stat-row">
              <span>Valor Actual</span>
              <strong>${Formatters.currency(portfolio.currentValue || 0)}</strong>
            </div>
            <div class="stat-row">
              <span>Ganancias</span>
              <strong class="trend-${(portfolio.totalGain || 0) >= 0 ? 'positive' : 'negative'}">
                ${Formatters.currency(portfolio.totalGain || 0)}
              </strong>
            </div>
            <div class="stat-row">
              <span>Retorno %</span>
              <strong class="trend-${(portfolio.totalGainPercent || 0) >= 0 ? 'positive' : 'negative'}">
                ${(portfolio.totalGainPercent || 0).toFixed(2)}%
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};
