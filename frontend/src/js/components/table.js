/**
 * Table Component
 * Tabla dinámica con sorting y búsqueda
 */
class DataTable {
  constructor(options = {}) {
    this.columns = options.columns || [];
    this.data = options.data || [];
    this.searchable = options.searchable !== false;
    this.sortable = options.sortable !== false;
    this.paginated = options.paginated !== false;
    this.pageSize = options.pageSize || 10;
    this.currentPage = 0;
    this.sortColumn = null;
    this.sortDirection = 'asc';
    this.filteredData = [...this.data];
  }

  /**
   * Renderizar tabla
   */
  render() {
    const container = document.createElement('div');
    container.className = 'table-container';
    
    let html = '<table class="data-table">';
    
    // Header
    html += '<thead><tr>';
    this.columns.forEach(col => {
      const sortable = this.sortable && col.sortable !== false;
      const sortIcon = this.sortColumn === col.key ? 
        (this.sortDirection === 'asc' ? ' ↑' : ' ↓') : '';
      
      html += `<th class="${sortable ? 'sortable' : ''}" data-column="${col.key}">
        ${col.label}${sortIcon}
      </th>`;
    });
    html += '</tr></thead>';
    
    // Body
    html += '<tbody>';
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const pageData = this.filteredData.slice(start, end);
    
    pageData.forEach((row, idx) => {
      html += '<tr class="table-row" data-index="' + idx + '">';
      this.columns.forEach(col => {
        const value = row[col.key];
        const formatted = col.format ? col.format(value, row) : value;
        html += `<td>${formatted}</td>`;
      });
      html += '</tr>';
    });
    
    if (pageData.length === 0) {
      html += `<tr><td colspan="${this.columns.length}" class="text-center">Sin datos</td></tr>`;
    }
    
    html += '</tbody>';
    html += '</table>';
    
    // Paginación
    if (this.paginated) {
      const totalPages = Math.ceil(this.filteredData.length / this.pageSize);
      html += this.renderPagination(totalPages);
    }
    
    container.innerHTML = html;
    this.attachEvents(container);
    
    return container;
  }

  /**
   * Renderizar paginación
   */
  renderPagination(totalPages) {
    let html = '<div class="table-pagination">';
    
    // Anterior
    if (this.currentPage > 0) {
      html += `<button class="pagination-btn pagination-prev" data-page="${this.currentPage - 1}">Anterior</button>`;
    } else {
      html += '<button class="pagination-btn" disabled>Anterior</button>';
    }
    
    // Páginas
    for (let i = 0; i < totalPages; i++) {
      const active = i === this.currentPage ? 'active' : '';
      html += `<button class="pagination-btn ${active}" data-page="${i}">${i + 1}</button>`;
    }
    
    // Siguiente
    if (this.currentPage < totalPages - 1) {
      html += `<button class="pagination-btn pagination-next" data-page="${this.currentPage + 1}">Siguiente</button>`;
    } else {
      html += '<button class="pagination-btn" disabled>Siguiente</button>';
    }
    
    html += '</div>';
    return html;
  }

  /**
   * Adjuntar eventos
   */
  attachEvents(container) {
    // Sorting
    if (this.sortable) {
      container.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', (e) => {
          const column = th.dataset.column;
          this.sort(column);
        });
      });
    }
    
    // Paginación
    if (this.paginated) {
      container.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.currentPage = parseInt(e.target.dataset.page);
          const newTable = this.render();
          container.replaceWith(newTable);
        });
      });
    }
  }

  /**
   * Ordenar datos
   */
  sort(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.filteredData.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];
      
      if (typeof aVal === 'number') {
        return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const comparison = String(aVal).localeCompare(String(bVal));
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    this.currentPage = 0;
  }

  /**
   * Búsqueda
   */
  search(query) {
    if (!query) {
      this.filteredData = [...this.data];
      return;
    }
    
    const q = query.toLowerCase();
    this.filteredData = this.data.filter(row => {
      return this.columns.some(col => {
        const value = String(row[col.key]).toLowerCase();
        return value.includes(q);
      });
    });
    
    this.currentPage = 0;
  }

  /**
   * Actualizar datos
   */
  updateData(data) {
    this.data = data;
    this.filteredData = [...data];
    this.currentPage = 0;
  }
}

window.DataTable = DataTable;