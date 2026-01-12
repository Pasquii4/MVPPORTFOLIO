/**
 * Dashboard View
 */

const Views = window.Views || {};

Views.dashboard = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = AppState.get('portfolio');
  const positions = AppState.get('positions') || [];
  const recentPositions = positions.slice(0, 5);

  const html = `
    <div class="page-container">
      <h1 class="page-title">📊 Dashboard</h1>
      
      <!-- KPI Grid -->
      <div class="kpi-grid">
        <div class="card stat-card">
          <div class="stat-label">Total Invertido</div>
          <div class="stat-value">${Formatters.currency(portfolio.totalInvested)}</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Valor Actual</div>
          <div class="stat-value">${Formatters.currency(portfolio.currentValue)}</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Ganancias</div>
          <div class="stat-value trend-${portfolio.totalGain >= 0 ? 'positive' : 'negative'}">
            ${Formatters.currency(portfolio.totalGain)}
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Retorno %</div>
          <div class="stat-value trend-${portfolio.totalGainPercent >= 0 ? 'positive' : 'negative'}">
            ${Formatters.percent(portfolio.totalGainPercent)}%
          </div>
        </div>
      </div>

      <!-- Posiciones Recientes -->
      <div class="card mt-4">
        <div class="card-header">
          <h2 class="card-title">Posiciones Recientes</h2>
        </div>
        <div class="card-body">
          ${recentPositions.length > 0 ? `
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Símbolo</th>
                    <th>Entrada</th>
                    <th>Actual</th>
                    <th>Ganancia</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentPositions.map(pos => {
                    const gain = (pos.current - pos.entry) * pos.quantity;
                    const gainPercent = ((pos.current - pos.entry) / pos.entry * 100).toFixed(2);
                    return `
                      <tr>
                        <td><strong>${pos.symbol}</strong></td>
                        <td>${Formatters.currency(pos.entry)}</td>
                        <td>${Formatters.currency(pos.current)}</td>
                        <td class="trend-${gain >= 0 ? 'positive' : 'negative'}">${Formatters.currency(gain)}</td>
                        <td class="trend-${gainPercent >= 0 ? 'positive' : 'negative'}">${gainPercent}%</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <p style="text-align: center; color: var(--color-text-secondary);">
              No hay posiciones aún. <a href="#/positions" style="color: var(--color-accent);">Crear una</a>
            </p>
          `}
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};

if (!window.Views) window.Views = {};
window.Views.dashboard = Views.dashboard;
