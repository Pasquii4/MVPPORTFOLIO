/**
 * Table Component
 */

function createTable(data = [], columns = []) {
  const table = document.createElement('table');
  table.className = 'data-table';
  
  // Header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  columns.forEach(col => {
    const th = document.createElement('th');
    th.className = 'sortable';
    th.textContent = col.label;
    th.dataset.field = col.field;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Body
  const tbody = document.createElement('tbody');
  data.forEach(row => {
    const tr = document.createElement('tr');
    columns.forEach(col => {
      const td = document.createElement('td');
      td.textContent = row[col.field] || '-';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  
  return table;
}
