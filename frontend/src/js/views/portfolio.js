/**
 * Portfolio View - Complete portfolio overview with distribution
 */

window.Views = window.Views || {};

window.Views.portfolio = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = DatabaseManager.getPortfolio();
  const positions = DatabaseManager.getPositions();

  // Calculate distribution
  const totalValue = portfolio.currentValue || 1; // Avoid division by zero
  const distribution = positions.map(pos => ({
    symbol: pos.symbol,
    name: pos.name,
    quantity: pos.quantity,
    value: (pos.current * pos.quantity),
    percent: totalValue > 0 ? ((pos.current * pos.quantity) / totalValue * 100).toFixed(2) : 0,
    investedValue: (pos.entry * pos.quantity),
    gain: ((pos.current - pos.entry) * pos.quantity),
    gainPercent: pos.entry > 0 ? (((pos.current - pos.entry) / pos.entry) * 100).toFixed(2) : 0
  }));

  // Sort by value
  distribution.sort((a, b) => b.value - a.value);

  const html = `
    <div class="page-container">
      <h1 class="page-title">🎯 Mi Portafolio</h1>
      <p class="page-subtitle">Resumen completo de tu cartera de inversiones</p>

      <!-- Summary KPIs -->
      <div class="kpi-grid mb-4">
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
          <div class="stat-label">Ganancias</div>
          <div class="stat-value trend-${portfolio.totalGain >= 0 ? 'positive' : 'negative'}">
            ${Formatters.currency(portfolio.totalGain)}
          </div>
          <div class="stat-unit">${portfolio.totalGainPercent.toFixed(2)}%</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Posiciones</div>
          <div class="stat-value">${positions.length}</div>
          <div class="stat-unit">Activas</div>
        </div>
      </div>

      <!-- Distribution & Details -->
      <div class="grid-2 mb-4">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">📈 Distribución por Activo</h2>
          </div>
          <div class="card-body">
            ${distribution.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 12px;">
                ${distribution.map((item, index) => `
                  <div style="padding: 12px; background: var(--color-secondary); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-weight: 600;">${item.symbol}</span>
                      <span style="font-weight: 600;">${item.percent}%</span>
                    </div>
                    <div style="background: var(--color-border); height: 8px; border-radius: 4px; overflow: hidden;">
                      <div style="background: var(--color-primary); height: 100%; width: ${item.percent}%; border-radius: 4px; transition: width 0.3s ease;"></div>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--color-text-secondary); margin-top: 8px;">
                      ${Formatters.currency(item.value)}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p style="text-align: center; color: var(--color-text-secondary);">Sin posiciones</p>
            `}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Resumen de Activos</h2>
          </div>
          <div class="card-body">
            ${distribution.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 10px; max-height: 400px; overflow-y: auto;">
                ${distribution.map(item => `
                  <div style="padding: 10px; border-bottom: 1px solid var(--color-border);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <strong>${item.symbol}</strong>
                      <span class="trend-${item.gain >= 0 ? 'positive' : 'negative'}">${item.gainPercent}%</span>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--color-text-secondary);">
                      ${item.quantity} @ ${Formatters.currency(item.value / item.quantity)}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p style="text-align: center; color: var(--color-text-secondary);">Sin datos</p>
            `}
          </div>
        </div>
      </div>

      <!-- Detailed Table -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Detalles Completos</h2>
        </div>
        <div class="card-body">
          ${distribution.length > 0 ? `
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Símbolo</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Invertido</th>
                    <th>Valor Actual</th>
                    <th>Ganancia</th>
                    <th>%</th>
                    <th>Del Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${distribution.map(item => `
                    <tr>
                      <td><strong>${item.symbol}</strong></td>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>${Formatters.currency(item.investedValue)}</td>
                      <td>${Formatters.currency(item.value)}</td>
                      <td class="trend-${item.gain >= 0 ? 'positive' : 'negative'}">${Formatters.currency(item.gain)}</td>
                      <td class="trend-${item.gainPercent >= 0 ? 'positive' : 'negative'}">${item.gainPercent}%</td>
                      <td><span class="badge badge-primary">${item.percent}%</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <p style="text-align: center; color: var(--color-text-secondary);">Sin posiciones</p>
          `}
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};
