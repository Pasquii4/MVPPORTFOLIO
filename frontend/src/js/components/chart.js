/**
 * Chart Component (placeholder)
 */

function createChart(containerId, type, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `
    <div style="height: 300px; background: var(--color-secondary); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
      <p style="color: var(--color-text-secondary);">Gráfico de ${type} (placeholder)</p>
    </div>
  `;
}
