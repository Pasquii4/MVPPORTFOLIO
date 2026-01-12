/**
 * Positions View
 */

const Views = window.Views || {};

Views.positions = function() {
  const mainContent = document.getElementById('main-content');
  const positions = AppState.get('positions') || [];

  const html = `
    <div class="page-container">
      <h1 class="page-title">📈 Posiciones</h1>
      
      <div class="view-controls mb-4">
        <input type="search" class="form-input" placeholder="Buscar..." id="search-input">
        <button class="btn btn-primary" id="add-position-btn">+ Nueva Posición</button>
      </div>

      <div class="card">
        ${positions.length > 0 ? `
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Símbolo</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Entrada</th>
                  <th>Actual</th>
                  <th>Ganancia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${positions.map(pos => {
                  const gain = (pos.current - pos.entry) * pos.quantity;
                  return `
                    <tr>
                      <td><strong>${pos.symbol}</strong></td>
                      <td>${pos.name}</td>
                      <td>${pos.quantity}</td>
                      <td>${Formatters.currency(pos.entry)}</td>
                      <td>${Formatters.currency(pos.current)}</td>
                      <td class="trend-${gain >= 0 ? 'positive' : 'negative'}">${Formatters.currency(gain)}</td>
                      <td>
                        <button class="btn btn-sm btn-secondary" onclick="editPosition(${pos.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deletePosition(${pos.id})">Eliminar</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="card-body" style="text-align: center;">
            <p style="color: var(--color-text-secondary); margin: 20px 0;">
              No hay posiciones aún. <a href="#/" style="color: var(--color-accent);">Volver al dashboard</a>
            </p>
          </div>
        `}
      </div>
    </div>
  `;

  mainContent.innerHTML = html;

  // Agregar listeners
  setTimeout(() => {
    const addBtn = document.getElementById('add-position-btn');
    if (addBtn) {
      addBtn.addEventListener('click', addNewPosition);
    }
  }, 0);
};

function addNewPosition() {
  showNotification('Función de agregar posición en desarrollo', 'info');
}

function editPosition(id) {
  showNotification('Función de editar en desarrollo', 'info');
}

function deletePosition(id) {
  if (confirm('¿Está seguro de eliminar esta posición?')) {
    AppState.deletePosition(id);
    Views.positions();
    showNotification('Posición eliminada', 'success');
  }
}

// Hacer funciones globales
window.addNewPosition = addNewPosition;
window.editPosition = editPosition;
window.deletePosition = deletePosition;

if (!window.Views) window.Views = {};
window.Views.positions = Views.positions;
