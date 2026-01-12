/**
 * Componente Tabla HTML dinámica
 */

function createTable(columns, data) {
    let html = '<table class="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">';
    
    // Header
    html += '<thead class="bg-gray-700 border-b border-gray-600">';
    html += '<tr>';
    columns.forEach(col => {
        html += `<th class="px-6 py-3 text-left text-sm font-semibold text-gray-300">${col.label}</th>`;
    });
    html += '</tr>';
    html += '</thead>';
    
    // Body
    html += '<tbody class="divide-y divide-gray-700">';
    data.forEach(row => {
        html += '<tr class="hover:bg-gray-700 transition">';
        columns.forEach(col => {
            const value = col.render ? col.render(row) : (row[col.key] || '-');
            html += `<td class="px-6 py-4 text-sm text-gray-300">${value}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    
    return html;
}
