/**
 * Loader Component - Loading spinners and skeleton screens
 * Usage: Loader.spinner(), Loader.skeleton(), Loader.skeleton({ rows: 5 })
 */
class Loader {
  // Spinner component
  static spinner(options = {}) {
    const {
      size = 'default', // 'small', 'default', 'large'
      text = '',
      centered = true,
      className = '',
    } = options;

    const container = document.createElement('div');
    container.className = `loader ${centered ? 'loader--centered' : ''} ${className}`;

    const spinner = document.createElement('div');
    spinner.className = `spinner spinner--${size}`;

    container.appendChild(spinner);

    if (text) {
      const textEl = document.createElement('p');
      textEl.className = 'loader__text';
      textEl.textContent = text;
      container.appendChild(textEl);
    }

    return container;
  }

  // Skeleton loader
  static skeleton(options = {}) {
    const {
      rows = 3,
      columns = 1,
      type = 'text', // 'text', 'card', 'table', 'lines'
    } = options;

    const container = document.createElement('div');
    container.className = 'skeleton-loader';

    if (type === 'text') {
      for (let i = 0; i < rows; i++) {
        const line = document.createElement('div');
        line.className = 'skeleton skeleton--text';
        if (i === rows - 1) line.style.width = '70%';
        container.appendChild(line);
      }
    } else if (type === 'card') {
      const card = document.createElement('div');
      card.className = 'skeleton-card';
      card.innerHTML = `
        <div class="skeleton skeleton--avatar"></div>
        <div class="skeleton skeleton--text"></div>
        <div class="skeleton skeleton--text" style="width: 70%;"></div>
      `;
      container.appendChild(card);
    } else if (type === 'table') {
      const table = document.createElement('div');
      table.className = 'skeleton-table';
      for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'skeleton-table__row';
        for (let j = 0; j < columns; j++) {
          const cell = document.createElement('div');
          cell.className = 'skeleton skeleton--text';
          row.appendChild(cell);
        }
        table.appendChild(row);
      }
      container.appendChild(table);
    }

    return container;
  }

  // Progress bar
  static progressBar(options = {}) {
    const {
      value = 0, // 0-100
      max = 100,
      showLabel = true,
      color = 'primary', // 'primary', 'success', 'warning', 'error'
      size = 'default', // 'small', 'default', 'large'
    } = options;

    const container = document.createElement('div');
    container.className = `progress-container progress-container--${size}`;

    const bar = document.createElement('div');
    bar.className = `progress-bar progress-bar--${color}`;
    const percentage = (value / max) * 100;
    bar.style.width = `${percentage}%`;

    container.appendChild(bar);

    if (showLabel) {
      const label = document.createElement('span');
      label.className = 'progress-label';
      label.textContent = `${Math.round(percentage)}%`;
      container.appendChild(label);
    }

    return container;
  }

  // Pulse animation
  static pulse(options = {}) {
    const {
      size = '40px',
      duration = '2s',
    } = options;

    const el = document.createElement('div');
    el.className = 'pulse';
    el.style.width = size;
    el.style.height = size;
    el.style.animationDuration = duration;
    return el;
  }
}

export default Loader;