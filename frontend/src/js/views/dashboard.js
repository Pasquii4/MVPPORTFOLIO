/**
 * Dashboard View - Overview with real data
 */

window.Views = window.Views || {};

window.Views.dashboard = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = DatabaseManager.getPortfolio();
  const positions = DatabaseManager.getPositions();
  const stats = DatabaseManager.getStats();

  const html = `
    <div class="page-container">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="page-title">📊 Dashboard</h1>
        <p class="page-subtitle">Resumen de tu cartera de inversiones</p>
      </div>

      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="card stat-card">
          <div class="stat-label">Total Invertido</div>
          <div class="stat-value">${Formatters.currency(portfolio.totalInvested)}</div>
          <div class="stat-unit">EUR</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Valor Actual</div>
          <div class="stat-value">${Formatters.currency(portfolio.currentValue)}</div>
          <div class="stat-unit">EUR</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Ganancia Total</div>
          <div class="stat-value trend-${portfolio.totalGain >= 0 ? 'positive' : 'negative'}">
            ${Formatters.currency(portfolio.totalGain)}
          </div>
          <div class="stat-unit">${portfolio.totalGainPercent.toFixed(2)}%</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Posiciones</div>
          <div class="stat-value">${stats.totalPositions}</div>
          <div class="stat-unit" style="font-size: 0.9rem; color: var(--color-text-secondary);">
            ${stats.winningPositions} 📈 / ${stats.losingPositions} 📉
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid-2 mt-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">📈 Estadísticas</h3>
          </div>
          <div class="card-body">
            <div class="stat-row">
              <span>Win Rate</span>
              <strong>${stats.winRate}%</strong>
            </div>
            <div class="stat-row">
              <span>Posiciones Ganadoras</span>
              <strong class="trend-positive">${stats.winningPositions}</strong>
            </div>
            <div class="stat-row">
              <span>Posiciones Perdedoras</span>
              <strong class="trend-negative">${stats.losingPositions}</strong>
            </div>
            <div class="stat-row">
              <span>Break Even</span>
              <strong>${stats.breakevenPositions}</strong>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">⚡ Acciones Rápidas</h3>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn btn-primary btn-full-width" onclick="window.location.hash = '#/positions'">
              ➕ Nueva Posición
            </button>
            <button class="btn btn-outline btn-full-width" onclick="window.location.hash = '#/analytics'">
              📊 Ver Analytics
            </button>
            <button class="btn btn-outline btn-full-width" onclick="window.exportData()">
              💾 Exportar Datos
            </button>
          </div>
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
              📭 Sin posiciones. <a href="#/positions" style="color: var(--color-accent);">Crea tu primera posición</a>
            </p>
          `}
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};

// Global export function
window.exportData = () => {
  try {
    const data = DatabaseManager.exportData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showNotification('Datos exportados ✅', 'success');
  } catch (error) {
    showNotification(`Error al exportar: ${error.message}`, 'error');
  }
};
