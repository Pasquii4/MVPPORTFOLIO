/**
 * Dashboard View
 */

const Views = window.Views || {};

Views.dashboard = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = AppState.get('portfolio') || {};
  const positions = AppState.get('positions') || [];

  const html = `
    <div class="page-container">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="page-title">📊 Dashboard</h1>
        <p class="page-subtitle">Bienvenido a tu portal de inversiones</p>
      </div>

      <!-- KPI Cards -->
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
          <div class="stat-unit">EUR</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Retorno</div>
          <div class="stat-value trend-${(portfolio.totalGainPercent || 0) >= 0 ? 'positive' : 'negative'}">
            ${(portfolio.totalGainPercent || 0).toFixed(2)}%
          </div>
          <div class="stat-unit">ROI</div>
        </div>
      </div>

      <!-- Recent Positions -->
      <div class="card mt-4">
        <div class="card-header">
          <h2 class="card-title">Posiciones Recientes</h2>
          <a href="#/positions" class="link-secondary">Ver todas →</a>
        </div>
        <div class="card-body">
          ${positions.length > 0 ? `
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Símbolo</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Entrada</th>
                    <th>Actual</th>
                    <th>Ganancia</th>
                  </tr>
                </thead>
                <tbody>
                  ${positions.slice(0, 5).map(pos => {
                    const gain = (pos.current - pos.entry) * pos.quantity;
                    return `
                      <tr>
                        <td><strong>${pos.symbol}</strong></td>
                        <td>${pos.name}</td>
                        <td>${pos.quantity}</td>
                        <td>${Formatters.currency(pos.entry)}</td>
                        <td>${Formatters.currency(pos.current)}</td>
                        <td class="trend-${gain >= 0 ? 'positive' : 'negative'}">${Formatters.currency(gain)}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <p style="text-align: center; color: var(--color-text-secondary); padding: 40px 0;">
              No hay posiciones. <a href="#/positions">Agrega una aquí</a>
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
