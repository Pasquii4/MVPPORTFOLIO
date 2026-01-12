/**
 * Analytics View
 * Gráficos y análisis
 */
Views.analytics = function() {
  const container = document.getElementById('app-view');
  container.innerHTML = '';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = '📉 Analytics';
  container.appendChild(title);
  
  // Gráfico de rendimiento
  const chartSection = document.createElement('section');
  chartSection.className = 'analytics-section';
  
  const chartTitle = document.createElement('h2');
  chartTitle.textContent = 'Rendimiento del Portfolio';
  chartSection.appendChild(chartTitle);
  
  const lineChart = ChartComponent.createLineChart({
    title: 'Valor del Portfolio (Últimos 30 días)',
    labels: [
      'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom',
      'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'
    ],
    datasets: [
      {
        label: 'Valor Portfolio',
        data: [16000, 16500, 16800, 16200, 17000, 17500, 18000,
                18200, 18500, 18100, 18800, 19000, 18600, 18500]
      }
    ]
  });
  
  chartSection.appendChild(lineChart);
  container.appendChild(chartSection);
  
  // Distribución por sector
  const distSection = document.createElement('section');
  distSection.className = 'analytics-section';
  
  const distTitle = document.createElement('h2');
  distTitle.textContent = 'Distribución del Portfolio';
  distSection.appendChild(distTitle);
  
  const pieChart = ChartComponent.createPieChart({
    title: 'Por Sector',
    labels: ['Tecnología', 'Finanzas', 'Salud', 'Energía'],
    data: [45, 25, 20, 10]
  });
  
  distSection.appendChild(pieChart);
  container.appendChild(distSection);
  
  // Estadísticas
  const statsSection = document.createElement('section');
  statsSection.className = 'analytics-section';
  
  const statsTitle = document.createElement('h2');
  statsTitle.textContent = 'Estadísticas';
  statsSection.appendChild(statsTitle);
  
  const statsGrid = document.createElement('div');
  statsGrid.className = 'stats-grid';
  
  const stats = [
    { label: 'Mejor Posición', value: '+28.5%' },
    { label: 'Peor Posición', value: '-5.2%' },
    { label: 'Volatilidad', value: '12.3%' },
    { label: 'Sharp Ratio', value: '1.45' }
  ];
  
  stats.forEach(stat => {
    const statCard = Card.create({
      content: `
        <div class="stat-item">
          <div class="stat-label">${stat.label}</div>
          <div class="stat-value">${stat.value}</div>
        </div>
      `
    });
    statsGrid.appendChild(statCard);
  });
  
  statsSection.appendChild(statsGrid);
  container.appendChild(statsSection);
  
  if (navbarComponent) {
    navbarComponent.setTitle('📉 Analytics');
  }
  
  if (sidebarComponent) {
    sidebarComponent.updateActive('analytics');
  }
};