/**
 * Chart Component (Placeholder)
 */

function createChart(options = {}) {
  const {
    type = 'line',
    data = [],
    labels = []
  } = options;

  const container = document.createElement('div');
  container.className = 'chart-container';
  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--color-text-secondary);">
      <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
        <p>Gráfico de ${type}</p>
        <small>Implementación de Chart.js próximamente</small>
      </div>
    </div>
  `;
  
  return container;
}
