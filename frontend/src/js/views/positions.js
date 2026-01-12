/**
 * Positions View
 * Listado completo de posiciones
 */
Views.positions = function() {
  const container = document.getElementById('app-view');
  container.innerHTML = '';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = '📈 Posiciones';
  container.appendChild(title);
  
  // Controles
  const controls = document.createElement('div');
  controls.className = 'view-controls';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Buscar por símbolo...';
  searchInput.className = 'form-input';
  controls.appendChild(searchInput);
  
  const addBtn = Button.create({
    text: '✚ Añadir Posición',
    type: 'primary',
    onClick: () => {
      // TODO: Abrir modal para agregar posición
      Notifications.info('Funcionalidad en desarrollo');
    }
  });
  controls.appendChild(addBtn);
  
  container.appendChild(controls);
  
  // Tabla
  const positions = AppState.get('positions') || [
    { symbol: 'AAPL', shares: 10, entryPrice: 150, currentPrice: 175 },
    { symbol: 'MSFT', shares: 5, entryPrice: 300, currentPrice: 380 },
    { symbol: 'GOOGL', shares: 3, entryPrice: 2800, currentPrice: 3100 }
  ];
  
  const table = new DataTable({
    columns: [
      { key: 'symbol', label: 'Símbolo', sortable: true },
      { key: 'shares', label: 'Cantidad', sortable: true },
      { key: 'entryPrice', label: 'Precio Entrada', sortable: true, format: (v) => Formatters.currency(v) },
      { key: 'currentPrice', label: 'Precio Actual', sortable: true, format: (v) => Formatters.currency(v) },
      { key: 'gain', label: 'Ganancia', sortable: true, format: (v, row) => {
        const gain = (row.currentPrice - row.entryPrice) * row.shares;
        const gainPercent = ((gain / (row.entryPrice * row.shares)) * 100).toFixed(2);
        return `<span class="${gain >= 0 ? 'text-success' : 'text-error'}">
          ${Formatters.currency(gain)} (${gainPercent}%)
        </span>`;
      }},
      { key: 'actions', label: 'Acciones', sortable: false, format: (v, row) => {
        return '<button class="btn-sm btn-outline">Ver</button>';
      }}
    ],
    data: positions,
    pageSize: 10,
    paginated: true
  });
  
  container.appendChild(table.render());
  
  // Búsqueda en tiempo real
  searchInput.addEventListener('input', (e) => {
    table.search(e.target.value);
    container.replaceChild(table.render(), container.querySelector('.table-container'));
  });
  
  if (navbarComponent) {
    navbarComponent.setTitle('📈 Posiciones');
  }
  
  if (sidebarComponent) {
    sidebarComponent.updateActive('positions');
  }
};