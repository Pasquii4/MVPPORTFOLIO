/**
 * Positions View - Full CRUD functionality
 */

window.Views = window.Views || {};

window.Views.positions = function() {
  const mainContent = document.getElementById('main-content');
  const positions = AppState.get('positions') || [];
  let filteredPositions = [...positions];
  let searchTerm = '';

  const html = `
    <div class="page-container">
      <div class="page-header-actions">
        <div>
          <h1 class="page-title">📈 Posiciones</h1>
          <p class="page-subtitle">${positions.length} posiciones activas</p>
        </div>
      </div>
      
      <div class="view-controls mb-4">
        <input type="search" class="form-input" placeholder="Buscar por símbolo o nombre..." id="search-input">
        <button class="btn btn-primary" id="add-position-btn">+ Nueva Posición</button>
      </div>

      ${positions.length > 0 ? `
        <div class="card">
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
                  <th>%</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="positions-tbody">
                <!-- Rows will be populated by JS -->
              </tbody>
            </table>
          </div>
        </div>
      ` : `
        <div class="card" style="text-align: center; padding: 60px 20px;">
          <h3 style="color: var(--color-text-secondary); margin: 0 0 16px 0;">📭 Sin posiciones</h3>
          <p style="color: var(--color-text-secondary); margin: 0 0 24px 0;">Comienza agregando tu primera posición</p>
          <button class="btn btn-primary" id="add-position-btn-empty">+ Agregar Posición</button>
        </div>
      `}
    </div>

    <!-- Modal para agregar/editar posición -->
    <div id="position-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-title">Nueva Posición</h2>
          <button class="modal-close" id="modal-close">✕</button>
        </div>
        <div class="modal-body">
          <form id="position-form">
            <div class="form-group mb-3">
              <label class="form-label">Símbolo *</label>
              <input type="text" class="form-input" id="form-symbol" placeholder="Ej: IBEX, AAPL" required>
              <small style="color: var(--color-text-secondary);">Código de la acción o índice</small>
            </div>

            <div class="form-group mb-3">
              <label class="form-label">Nombre *</label>
              <input type="text" class="form-input" id="form-name" placeholder="Ej: Apple Inc." required>
              <small style="color: var(--color-text-secondary);">Nombre completo</small>
            </div>

            <div class="form-group mb-3">
              <label class="form-label">Cantidad *</label>
              <input type="number" class="form-input" id="form-quantity" placeholder="100" min="1" step="1" required>
              <small style="color: var(--color-text-secondary);">Número de acciones</small>
            </div>

            <div class="grid-2">
              <div class="form-group mb-3">
                <label class="form-label">Precio Entrada *</label>
                <input type="number" class="form-input" id="form-entry" placeholder="150.00" min="0.01" step="0.01" required>
                <small style="color: var(--color-text-secondary);">EUR</small>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Precio Actual *</label>
                <input type="number" class="form-input" id="form-current" placeholder="185.50" min="0.01" step="0.01" required>
                <small style="color: var(--color-text-secondary);">EUR</small>
              </div>
            </div>

            <div class="form-group mb-3">
              <label class="form-label">Notas</label>
              <textarea class="form-input" id="form-notes" placeholder="Notas sobre esta posición..." style="resize: vertical; min-height: 80px;"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="modal-cancel">Cancelar</button>
          <button class="btn btn-primary" id="modal-save">Guardar Posición</button>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;

  // Populate table after DOM is ready
  setTimeout(() => {
    populateTable();
    setupModalHandlers();
    setupSearchHandlers();
  }, 0);

  function populateTable() {
    const tbody = document.getElementById('positions-tbody');
    if (!tbody) return;

    tbody.innerHTML = filteredPositions.map(pos => {
      const gain = (pos.current - pos.entry) * pos.quantity;
      const gainPercent = pos.entry > 0 ? ((pos.current - pos.entry) / pos.entry * 100).toFixed(2) : 0;
      const trendClass = gain >= 0 ? 'positive' : 'negative';

      return `
        <tr data-id="${pos.id}">
          <td><strong>${pos.symbol}</strong></td>
          <td>${pos.name}</td>
          <td>${pos.quantity}</td>
          <td>${Formatters.currency(pos.entry)}</td>
          <td>${Formatters.currency(pos.current)}</td>
          <td class="trend-${trendClass}">${Formatters.currency(gain)}</td>
          <td class="trend-${trendClass}">${gainPercent}%</td>
          <td style="white-space: nowrap;">
            <button class="btn btn-sm btn-secondary" onclick="window.editPosition(${pos.id})" title="Editar">✏️</button>
            <button class="btn btn-sm btn-danger" onclick="window.deletePosition(${pos.id})" title="Eliminar">🗑️</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function setupSearchHandlers() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        filteredPositions = positions.filter(pos =>
          pos.symbol.toLowerCase().includes(searchTerm) ||
          pos.name.toLowerCase().includes(searchTerm)
        );
        populateTable();
      });
    }

    const addBtns = document.querySelectorAll('#add-position-btn, #add-position-btn-empty');
    addBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => openModal());
    });
  }

  function setupModalHandlers() {
    const modal = document.getElementById('position-modal');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    const saveBtn = document.getElementById('modal-save');

    closeBtn?.addEventListener('click', () => closeModal());
    cancelBtn?.addEventListener('click', () => closeModal());
    saveBtn?.addEventListener('click', () => savePosition());

    // Close on outside click
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
};

// Modal functions
window.currentEditingId = null;

window.openModal = (id = null) => {
  window.currentEditingId = id;
  const modal = document.getElementById('position-modal');
  const form = document.getElementById('position-form');
  const title = document.getElementById('modal-title');

  if (id) {
    const position = DatabaseManager.getPosition(id);
    if (position) {
      title.textContent = `Editar: ${position.symbol}`;
      document.getElementById('form-symbol').value = position.symbol;
      document.getElementById('form-name').value = position.name;
      document.getElementById('form-quantity').value = position.quantity;
      document.getElementById('form-entry').value = position.entry;
      document.getElementById('form-current').value = position.current;
      document.getElementById('form-notes').value = position.notes || '';
    }
  } else {
    title.textContent = 'Nueva Posición';
    form.reset();
  }

  modal.style.display = 'flex';
};

window.closeModal = () => {
  const modal = document.getElementById('position-modal');
  modal.style.display = 'none';
  window.currentEditingId = null;
};

window.savePosition = () => {
  try {
    const form = document.getElementById('position-form');
    if (!form.checkValidity()) {
      showNotification('Por favor completa todos los campos requeridos', 'error');
      return;
    }

    const data = {
      symbol: document.getElementById('form-symbol').value.trim().toUpperCase(),
      name: document.getElementById('form-name').value.trim(),
      quantity: parseInt(document.getElementById('form-quantity').value),
      entry: parseFloat(document.getElementById('form-entry').value),
      current: parseFloat(document.getElementById('form-current').value),
      notes: document.getElementById('form-notes').value.trim()
    };

    if (window.currentEditingId) {
      DatabaseManager.updatePosition(window.currentEditingId, data);
      showNotification('Posición actualizada ✅', 'success');
    } else {
      DatabaseManager.addPosition(data);
      showNotification('Posición creada ✅', 'success');
    }

    window.refreshData();
    window.Views.positions();
    window.closeModal();
  } catch (error) {
    showNotification(`Error: ${error.message}`, 'error');
  }
};

window.editPosition = (id) => {
  window.openModal(id);
};

window.deletePosition = (id) => {
  const position = DatabaseManager.getPosition(id);
  if (!position) return;

  if (confirm(`¿Eliminar posición de ${position.symbol}?`)) {
    try {
      DatabaseManager.deletePosition(id);
      showNotification('Posición eliminada ✅', 'success');
      window.refreshData();
      window.Views.positions();
    } catch (error) {
      showNotification(`Error: ${error.message}`, 'error');
    }
  }
};
