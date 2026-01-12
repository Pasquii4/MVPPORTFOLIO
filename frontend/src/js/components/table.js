/**
 * Table Component - Advanced data table with sorting, filtering, pagination
 * Usage: Table.create({ columns, data, options })
 */
class Table {
  static create(options = {}) {
    const {
      columns = [],
      data = [],
      sortable = true,
      filterable = true,
      paginated = true,
      selectable = true,
      rowsPerPage = 10,
      expandable = true,
      onRowClick = null,
      onSelectionChange = null,
    } = options;

    const container = document.createElement('div');
    container.className = 'table-container';
    container.data = {
      allData: [...data],
      filteredData: [...data],
      sortColumn: null,
      sortDirection: 'asc',
      currentPage: 1,
      selectedRows: new Set(),
    };

    // Header con controles
    const header = document.createElement('div');
    header.className = 'table-header';

    if (filterable) {
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Buscar...';
      searchInput.className = 'table-search';
      searchInput.addEventListener('input', (e) => {
        Table.filterData(container, e.target.value);
      });
      header.appendChild(searchInput);
    }

    const rowsControl = document.createElement('div');
    rowsControl.className = 'table-rows-control';
    
    const rowsLabel = document.createElement('span');
    rowsLabel.textContent = 'Filas:';
    
    const rowsSelect = document.createElement('select');
    rowsSelect.className = 'table-rows-select';
    [10, 25, 50, 100].forEach(n => {
      const opt = document.createElement('option');
      opt.value = n;
      opt.textContent = n;
      if (n === rowsPerPage) opt.selected = true;
      rowsSelect.appendChild(opt);
    });
    rowsSelect.addEventListener('change', (e) => {
      container.data.rowsPerPage = parseInt(e.target.value);
      container.data.currentPage = 1;
      Table.renderTable(container);
    });
    
    rowsControl.appendChild(rowsLabel);
    rowsControl.appendChild(rowsSelect);
    header.appendChild(rowsControl);
    container.appendChild(header);

    // Tabla
    const tableEl = document.createElement('table');
    tableEl.className = 'advanced-table';
    container.tableEl = tableEl;
    container.appendChild(tableEl);

    // Footer con paginación
    if (paginated) {
      const footer = document.createElement('div');
      footer.className = 'table-footer';
      container.footerEl = footer;
      container.appendChild(footer);
    }

    // Store configuration
    container.config = {
      columns,
      sortable,
      filterable,
      paginated,
      selectable,
      rowsPerPage,
      expandable,
      onRowClick,
      onSelectionChange,
    };

    Table.renderTable(container);
    return container;
  }

  static renderTable(container) {
    const { columns, sortable, selectable, rowsPerPage, paginated, expandable } = container.config;
    const { filteredData, sortColumn, sortDirection, currentPage } = container.data;
    const tableEl = container.tableEl;

    // Render thead
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    if (selectable) {
      const th = document.createElement('th');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', (e) => {
        Table.toggleAllRows(container, e.target.checked);
      });
      th.appendChild(checkbox);
      headerRow.appendChild(th);
    }

    columns.forEach(col => {
      const th = document.createElement('th');
      th.className = 'table-header-cell';
      
      const content = document.createElement('div');
      content.className = 'table-header-content';
      content.textContent = col.label;

      if (sortable && col.sortable !== false) {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
          Table.sortData(container, col.key);
        });
        
        if (sortColumn === col.key) {
          const arrow = document.createElement('span');
          arrow.className = 'sort-arrow';
          arrow.textContent = sortDirection === 'asc' ? ' ↑' : ' ↓';
          content.appendChild(arrow);
        }
      }

      th.appendChild(content);
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    tableEl.innerHTML = '';
    tableEl.appendChild(thead);

    // Render tbody
    const tbody = document.createElement('tbody');
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);

    pageData.forEach((row, index) => {
      const tr = document.createElement('tr');
      tr.className = 'table-row';
      tr.dataset.rowIndex = start + index;

      if (selectable) {
        const td = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = container.data.selectedRows.has(start + index);
        checkbox.addEventListener('change', (e) => {
          Table.toggleRow(container, start + index, e.target.checked);
        });
        td.appendChild(checkbox);
        tr.appendChild(td);
      }

      columns.forEach(col => {
        const td = document.createElement('td');
        const value = row[col.key];
        td.textContent = value || '-';
        tr.appendChild(td);
      });

      if (container.config.onRowClick) {
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => {
          container.config.onRowClick(row, start + index);
        });
      }

      tbody.appendChild(tr);
    });

    tableEl.appendChild(tbody);

    // Render pagination
    if (paginated && container.footerEl) {
      Table.renderPagination(container, filteredData.length);
    }
  }

  static renderPagination(container, totalItems) {
    const { rowsPerPage, currentPage } = container.data;
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const footer = container.footerEl;

    footer.innerHTML = '';

    const info = document.createElement('span');
    info.className = 'pagination-info';
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, totalItems);
    info.textContent = `Mostrando ${start}-${end} de ${totalItems}`;
    footer.appendChild(info);

    const nav = document.createElement('div');
    nav.className = 'pagination-nav';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        container.data.currentPage--;
        Table.renderTable(container);
      }
    });
    nav.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => {
          container.data.currentPage = i;
          Table.renderTable(container);
        });
        nav.appendChild(btn);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.className = 'pagination-dots';
        nav.appendChild(dots);
      }
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Siguiente →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        container.data.currentPage++;
        Table.renderTable(container);
      }
    });
    nav.appendChild(nextBtn);

    footer.appendChild(nav);
  }

  static sortData(container, columnKey) {
    const { sortColumn, sortDirection } = container.data;
    
    if (sortColumn === columnKey) {
      container.data.sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      container.data.sortColumn = columnKey;
      container.data.sortDirection = 'asc';
    }

    container.data.filteredData.sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === 'number') {
        return container.data.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return container.data.sortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    container.data.currentPage = 1;
    Table.renderTable(container);
  }

  static filterData(container, searchTerm) {
    const { allData } = container.data;
    const term = searchTerm.toLowerCase();

    container.data.filteredData = allData.filter(row => {
      return Object.values(row).some(val => 
        String(val).toLowerCase().includes(term)
      );
    });

    container.data.currentPage = 1;
    Table.renderTable(container);
  }

  static toggleRow(container, index, checked) {
    if (checked) {
      container.data.selectedRows.add(index);
    } else {
      container.data.selectedRows.delete(index);
    }
    
    if (container.config.onSelectionChange) {
      const selected = Array.from(container.data.selectedRows).map(i => 
        container.data.allData[i]
      );
      container.config.onSelectionChange(selected);
    }
  }

  static toggleAllRows(container, checked) {
    const { filteredData, currentPage } = container.data;
    const { rowsPerPage } = container.config;
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    for (let i = start; i < end && i < filteredData.length; i++) {
      if (checked) {
        container.data.selectedRows.add(i);
      } else {
        container.data.selectedRows.delete(i);
      }
    }

    Table.renderTable(container);
  }

  // Update data
  static setData(tableContainer, newData) {
    tableContainer.data.allData = [...newData];
    tableContainer.data.filteredData = [...newData];
    tableContainer.data.currentPage = 1;
    Table.renderTable(tableContainer);
  }

  // Get selected rows
  static getSelectedRows(tableContainer) {
    return Array.from(tableContainer.data.selectedRows).map(i => 
      tableContainer.data.allData[i]
    );
  }
}

export default Table;