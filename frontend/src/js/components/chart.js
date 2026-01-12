/**
 * Chart Wrapper Component - Simple chart rendering (requires Chart.js)
 * Usage: Chart.create({ type, data, options })
 * Note: Requires Chart.js library - add to HTML: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
 */
class ChartComponent {
  static create(options = {}) {
    const {
      id = `chart-${Math.random().toString(36).substr(2, 9)}`,
      type = 'pie', // 'pie', 'line', 'bar', 'doughnut', 'area'
      title = '',
      data = {},
      chartOptions = {},
      responsive = true,
      height = 300,
      className = '',
    } = options;

    const container = document.createElement('div');
    container.className = `chart-container ${className}`;

    if (title) {
      const titleEl = document.createElement('h3');
      titleEl.className = 'chart-title';
      titleEl.textContent = title;
      container.appendChild(titleEl);
    }

    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'chart-canvas-wrapper';
    canvasContainer.style.position = 'relative';
    canvasContainer.style.height = `${height}px`;

    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvasContainer.appendChild(canvas);
    container.appendChild(canvasContainer);

    // Chart instance placeholder
    container.chartInstance = null;
    container.data = data;

    // Initialize on demand
    container.render = function() {
      if (typeof Chart === 'undefined') {
        console.warn('Chart.js no está cargado. Agrega <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>');
        return;
      }

      const ctx = canvas.getContext('2d');
      const finalOptions = {
        responsive: responsive,
        maintainAspectRatio: false,
        ...chartOptions,
      };

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, {
        type,
        data,
        options: finalOptions,
      });
    };

    return container;
  }

  // Pie chart
  static pie(data, options = {}) {
    return this.create({
      type: 'pie',
      data,
      chartOptions: options,
      ...options,
    });
  }

  // Doughnut chart
  static doughnut(data, options = {}) {
    return this.create({
      type: 'doughnut',
      data,
      chartOptions: options,
      ...options,
    });
  }

  // Line chart
  static line(data, options = {}) {
    return this.create({
      type: 'line',
      data,
      chartOptions: {
        plugins: {
          filler: {
            propagate: true,
          },
        },
        ...options,
      },
      ...options,
    });
  }

  // Bar chart
  static bar(data, options = {}) {
    return this.create({
      type: 'bar',
      data,
      chartOptions: options,
      ...options,
    });
  }

  // Portfolio Distribution - Pie chart
  static portfolioDistribution(holdings = []) {
    const labels = holdings.map(h => h.ticker);
    const values = holdings.map(h => h.value);
    const colors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
      '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
    ];

    return this.pie({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 2,
        },
      ],
    }, {
      title: 'Distribución del Portfolio',
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    });
  }

  // Performance Over Time - Line chart
  static performanceOverTime(dates = [], values = []) {
    return this.line({
      labels: dates,
      datasets: [
        {
          label: 'Valor del Portfolio',
          data: values,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
        },
      ],
    }, {
      title: 'Performance a lo Largo del Tiempo',
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    });
  }

  // Holdings Comparison - Bar chart
  static holdingsComparison(holdings = []) {
    const labels = holdings.map(h => h.ticker);
    const gained = holdings.map(h => (h.current - h.bought) > 0 ? h.current - h.bought : 0);
    const lost = holdings.map(h => (h.current - h.bought) < 0 ? Math.abs(h.current - h.bought) : 0);

    return this.bar({
      labels,
      datasets: [
        {
          label: 'Ganancia',
          data: gained,
          backgroundColor: '#10b981',
        },
        {
          label: 'Pérdida',
          data: lost,
          backgroundColor: '#ef4444',
        },
      ],
    }, {
      title: 'Comparación de Holdings',
      indexAxis: 'y',
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });
  }

  // Risk vs Return scatter
  static riskReturn(data = []) {
    // data format: [{ ticker: 'AAPL', risk: 0.15, return: 0.25 }, ...]
    return this.create({
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Holdings',
            data: data.map(d => ({
              x: d.risk * 100,
              y: d.return * 100,
              r: Math.sqrt(d.value || 1000) / 10,
            })),
            backgroundColor: '#3b82f6',
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
      },
      chartOptions: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Riesgo (%)',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Retorno (%)',
            },
          },
        },
      },
    });
  }

  // Update chart data
  static update(chartComponent, newData) {
    if (!chartComponent.chartInstance) return;
    chartComponent.chartInstance.data = newData;
    chartComponent.chartInstance.update();
  }

  // Export chart as image
  static exportAsImage(chartComponent, filename = 'chart.png') {
    if (!chartComponent.chartInstance) return;
    const url = chartComponent.chartInstance.canvas.toDataURL();
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }
}

export default ChartComponent;