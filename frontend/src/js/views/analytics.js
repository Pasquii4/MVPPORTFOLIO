/**
 * Analytics View - Advanced portfolio analytics
 */

window.Views = window.Views || {};

window.Views.analytics = function() {
  const mainContent = document.getElementById('main-content');
  const portfolio = DatabaseManager.getPortfolio();
  const positions = DatabaseManager.getPositions();
  const stats = DatabaseManager.getStats();

  // Calculate performance metrics
  const topGainer = positions.reduce((max, pos) => {
    const gainPercent = pos.entry > 0 ? ((pos.current - pos.entry) / pos.entry) * 100 : 0;
    const maxGain = max.entry > 0 ? ((max.current - max.entry) / max.entry) * 100 : 0;
    return gainPercent > maxGain ? pos : max;
  }, positions[0] || {});

  const topLoser = positions.reduce((min, pos) => {
    const lossPercent = pos.entry > 0 ? ((pos.current - pos.entry) / pos.entry) * 100 : 0;
    const minLoss = min.entry > 0 ? ((min.current - min.entry) / min.entry) * 100 : 0;
    return lossPercent < minLoss ? pos : min;
  }, positions[0] || {});

  const html = `
    <div class="page-container">
      <h1 class="page-title">📊 Analytics Avanzado</h1>
      <p class="page-subtitle">Análisis detallado de tu cartera de inversiones</p>
      
      <!-- Main Metrics -->
      <div class="kpi-grid mb-4">
        <div class="card stat-card">
          <div class="stat-label">Valor Total</div>
          <div class="stat-value">${Formatters.currency(portfolio.currentValue)}</div>
          <div class="stat-unit">EUR</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Rentabilidad</div>
          <div class="stat-value trend-${portfolio.totalGainPercent >= 0 ? 'positive' : 'negative'}">
            ${portfolio.totalGainPercent.toFixed(2)}%
          </div>
          <div class="stat-unit">${Formatters.currency(portfolio.totalGain)}</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">Win Rate</div>
          <div class="stat-value">${stats.winRate}%</div>
          <div class="stat-unit">${stats.winningPositions}/${stats.totalPositions}</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label">ROI Promedio</div>
          <div class="stat-value">${positions.length > 0 ? ((stats.totalProfitPercent / positions.length).toFixed(2)) : '0.00'}%</div>
          <div class="stat-unit">Por posición</div>
        </div>
      </div>

      <!-- Performance Breakdown -->
      <div class="grid-2 mb-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">📈 Performance</h3>
          </div>
          <div class="card-body">
            <div class="stat-row">
              <span>Total Invertido</span>
              <strong>${Formatters.currency(portfolio.totalInvested)}</strong>
            </div>
            <div class="stat-row">
              <span>Valor Actual</span>
              <strong>${Formatters.currency(portfolio.currentValue)}</strong>
            </div>
            <div class="stat-row">
              <span>Ganancia Total</span>
              <strong class="trend-${portfolio.totalGain >= 0 ? 'positive' : 'negative'}">${Formatters.currency(portfolio.totalGain)}</strong>
            </div>
            <div class="stat-row">
              <span>Ganancia %</span>
              <strong class="trend-${portfolio.totalGainPercent >= 0 ? 'positive' : 'negative'}">${portfolio.totalGainPercent.toFixed(2)}%</strong>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">📊 Posiciones</h3>
          </div>
          <div class="card-body">
            <div class="stat-row">
              <span>Total de Posiciones</span>
              <strong>${stats.totalPositions}</strong>
            </div>
            <div class="stat-row">
              <span>Ganadoras</span>
              <strong class="trend-positive">${stats.winningPositions}</strong>
            </div>
            <div class="stat-row">
              <span>Perdedoras</span>
              <strong class="trend-negative">${stats.losingPositions}</strong>
            </div>
            <div class="stat-row">
              <span>Break Even</span>
              <strong>${stats.breakevenPositions}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performers -->
      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🏆 Mayor Ganancia</h3>
          </div>
          <div class="card-body">
            ${topGainer.symbol ? `
              <div class="stat-row">
                <span>${topGainer.symbol}</span>
                <strong>${topGainer.name}</strong>
              </div>
              <div class="stat-row">
                <span>Cantidad</span>
                <strong>${topGainer.quantity}</strong>
              </div>
              <div class="stat-row">
                <span>Ganancia</span>
                <strong class="trend-positive">
                  ${Formatters.currency((topGainer.current - topGainer.entry) * topGainer.quantity)}
                  (${(((topGainer.current - topGainer.entry) / topGainer.entry) * 100).toFixed(2)}%)
                </strong>
              </div>
            ` : `
              <p style="color: var(--color-text-secondary); margin: 0;">Sin datos</p>
            `}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">📉 Mayor Pérdida</h3>
          </div>
          <div class="card-body">
            ${topLoser.symbol ? `
              <div class="stat-row">
                <span>${topLoser.symbol}</span>
                <strong>${topLoser.name}</strong>
              </div>
              <div class="stat-row">
                <span>Cantidad</span>
                <strong>${topLoser.quantity}</strong>
              </div>
              <div class="stat-row">
                <span>Pérdida</span>
                <strong class="trend-negative">
                  ${Formatters.currency((topLoser.current - topLoser.entry) * topLoser.quantity)}
                  (${(((topLoser.current - topLoser.entry) / topLoser.entry) * 100).toFixed(2)}%)
                </strong>
              </div>
            ` : `
              <p style="color: var(--color-text-secondary); margin: 0;">Sin datos</p>
            `}
          </div>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};
