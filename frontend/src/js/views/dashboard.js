/**
 * Dashboard View
 * Vista principal con KPIs y resumen
 */
const Views = {};

Views.dashboard = function() {
  const container = document.getElementById('app-view');
  container.innerHTML = '';
  
  // Título
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = '📊 Dashboard';
  container.appendChild(title);
  
  // Obtener datos del state
  const positions = AppState.get('positions') || [];
  const portfolio = AppState.get('portfolio') || {
    totalInvested: 15000,
    currentValue: 18500,
    totalGain: 3500
  };
  
  const totalGainPercent = portfolio.totalInvested ? 
    ((portfolio.totalGain / portfolio.totalInvested) * 100) : 0;
  
  // KPI Cards
  const kpiContainer = document.createElement('div');
  kpiContainer.className = 'kpi-grid';
  
  const kpis = [
    {
      label: 'Total Invertido',
      value: Formatters.currency(portfolio.totalInvested),
      unit: 'USD',
      change: 0
    },
    {
      label: 'Valor Actual',
      value: Formatters.currency(portfolio.currentValue),
      unit: 'USD',
      change: 5
    },
    {
      label: 'Ganancias',
      value: Formatters.currency(portfolio.totalGain),
      unit: 'USD',
      change: totalGainPercent
    },
    {
      label: 'ROI',
      value: Formatters.percent(totalGainPercent),
      unit: '',
      change: totalGainPercent
    }
  ];
  
  kpis.forEach(kpi => {
    const card = Card.createStatCard(kpi);
    kpiContainer.appendChild(card);
  });
  
  container.appendChild(kpiContainer);
  
  // Sección de posiciones recientes
  const posSection = document.createElement('section');
  posSection.className = 'dashboard-section';
  
  const posTitle = document.createElement('h2');
  posTitle.textContent = 'Posiciones Recientes';
  posSection.appendChild(posTitle);
  
  if (positions.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-center text-muted';
    empty.textContent = 'No hay posiciones registradas';
    posSection.appendChild(empty);
  } else {
    const table = new DataTable({
      columns: [
        { key: 'symbol', label: 'Símbolo', sortable: true },
        { key: 'shares', label: 'Cantidad', sortable: true },
        { key: 'entryPrice', label: 'Entrada', sortable: true, format: (v) => Formatters.currency(v) },
        { key: 'currentPrice', label: 'Actual', sortable: true, format: (v) => Formatters.currency(v) },
        { key: 'gain', label: 'Ganancia', sortable: true, format: (v, row) => {
          const gain = (row.currentPrice - row.entryPrice) * row.shares;
          return `<span class="${gain >= 0 ? 'text-success' : 'text-error'}">
            ${Formatters.currency(gain)}
          </span>`;
        }}
      ],
      data: positions.slice(0, 5), // Solo las últimas 5
      paginated: false
    });
    
    posSection.appendChild(table.render());
  }
  
  container.appendChild(posSection);
  
  // Actualizar barra de navegación
  if (navbarComponent) {
    navbarComponent.setTitle('📊 Dashboard');
  }
  
  // Actualizar sidebar
  if (sidebarComponent) {
    sidebarComponent.updateActive('dashboard');
  }
};