/**
 * Chart Component
 * Gráficos dinámicos (con Chart.js)
 */
class Chart {
  /**
   * Crear gráfico de línea
   */
  static createLineChart(options = {}) {
    const {
      id = 'chart-' + Math.random().toString(36).substr(2, 9),
      labels = [],
      datasets = [],
      title = 'Gráfico de Línea'
    } = options;
    
    const container = document.createElement('div');
    container.className = 'chart-container';
    
    const canvas = document.createElement('canvas');
    canvas.id = id;
    container.appendChild(canvas);
    
    // Esperar a que Chart.js esté disponible
    if (typeof window.Chart !== 'undefined') {
      const ctx = canvas.getContext('2d');
      
      const colors = [
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(249, 115, 22)',
        'rgb(168, 85, 247)'
      ];
      
      const formattedDatasets = datasets.map((dataset, idx) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: colors[idx % colors.length],
        backgroundColor: colors[idx % colors.length].replace('rgb', 'rgba').replace(')', ', 0.1)'),
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }));
      
      new window.Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: formattedDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: !!title,
              text: title
            },
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      canvas.textContent = 'Chart.js no disponible';
    }
    
    return container;
  }

  /**
   * Crear gráfico de barras
   */
  static createBarChart(options = {}) {
    const {
      id = 'chart-' + Math.random().toString(36).substr(2, 9),
      labels = [],
      datasets = [],
      title = 'Gráfico de Barras'
    } = options;
    
    const container = document.createElement('div');
    container.className = 'chart-container';
    
    const canvas = document.createElement('canvas');
    canvas.id = id;
    container.appendChild(canvas);
    
    if (typeof window.Chart !== 'undefined') {
      const ctx = canvas.getContext('2d');
      
      const colors = [
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(249, 115, 22)',
        'rgb(168, 85, 247)'
      ];
      
      const formattedDatasets = datasets.map((dataset, idx) => ({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: colors[idx % colors.length],
        borderColor: colors[idx % colors.length],
        borderWidth: 1
      }));
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: formattedDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: !!title,
              text: title
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      canvas.textContent = 'Chart.js no disponible';
    }
    
    return container;
  }

  /**
   * Crear gráfico de pastel
   */
  static createPieChart(options = {}) {
    const {
      id = 'chart-' + Math.random().toString(36).substr(2, 9),
      labels = [],
      data = [],
      title = 'Gráfico de Pastel'
    } = options;
    
    const container = document.createElement('div');
    container.className = 'chart-container';
    
    const canvas = document.createElement('canvas');
    canvas.id = id;
    container.appendChild(canvas);
    
    if (typeof window.Chart !== 'undefined') {
      const ctx = canvas.getContext('2d');
      
      const colors = [
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(249, 115, 22)',
        'rgb(168, 85, 247)',
        'rgb(236, 72, 153)'
      ];
      
      new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: colors.slice(0, data.length),
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: !!title,
              text: title
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    } else {
      canvas.textContent = 'Chart.js no disponible';
    }
    
    return container;
  }
}

window.Chart = window.Chart || {}; // No sobrescribir Chart.js
window.ChartComponent = Chart;