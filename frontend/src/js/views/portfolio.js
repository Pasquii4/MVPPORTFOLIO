/**
 * Portfolio View
 * Resumen del portfolio
 */
Views.portfolio = function() {
  const container = document.getElementById('app-view');
  container.innerHTML = '';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = '🎯 Portfolio';
  container.appendChild(title);
  
  const portfolio = AppState.get('portfolio') || {
    totalInvested: 15000,
    currentValue: 18500,
    totalGain: 3500
  };
  
  // Resumen principal
  const summary = document.createElement('section');
  summary.className = 'portfolio-summary';
  
  const summaryCard = Card.create({
    title: 'Resumen del Portfolio',
    content: `
      <div class="portfolio-details">
        <div class="detail-row">
          <span class="detail-label">Total Invertido:</span>
          <span class="detail-value">${Formatters.currency(portfolio.totalInvested)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Valor Actual:</span>
          <span class="detail-value">${Formatters.currency(portfolio.currentValue)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Ganancias/Pérdidas:</span>
          <span class="detail-value ${portfolio.totalGain >= 0 ? 'text-success' : 'text-error'}">
            ${Formatters.currency(portfolio.totalGain)}
          </span>
        </div>
        <div class="detail-row">
          <span class="detail-label">ROI:</span>
          <span class="detail-value">
            ${Formatters.percent(((portfolio.totalGain / portfolio.totalInvested) * 100).toFixed(2))}
          </span>
        </div>
      </div>
    `
  });
  
  summary.appendChild(summaryCard);
  container.appendChild(summary);
  
  // Acciones
  const actions = document.createElement('section');
  actions.className = 'portfolio-actions';
  
  const actionsTitle = document.createElement('h2');
  actionsTitle.textContent = 'Acciones';
  actions.appendChild(actionsTitle);
  
  const actionBtns = document.createElement('div');
  actionBtns.className = 'action-buttons';
  
  const btn1 = Button.create({
    text: '💰 Agregar Fondos',
    type: 'primary',
    onClick: () => Notifications.info('En desarrollo')
  });
  
  const btn2 = Button.create({
    text: '📊 Ver Reportes',
    type: 'secondary',
    onClick: () => Notifications.info('En desarrollo')
  });
  
  const btn3 = Button.create({
    text: '💺 Rebalancear',
    type: 'secondary',
    onClick: () => Notifications.info('En desarrollo')
  });
  
  actionBtns.appendChild(btn1);
  actionBtns.appendChild(btn2);
  actionBtns.appendChild(btn3);
  
  actions.appendChild(actionBtns);
  container.appendChild(actions);
  
  if (navbarComponent) {
    navbarComponent.setTitle('🎯 Portfolio');
  }
  
  if (sidebarComponent) {
    sidebarComponent.updateActive('portfolio');
  }
};