/**
 * Vista Posiciones
 */

async function renderPositionsView(data) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="mb-8">
            <button class="px-6 py-3 bg-primary hover:bg-blue-600 rounded font-medium transition" onclick="openAddPositionModal()">
                \u2795 Añadir posición
            </button>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-x-auto">
            ${data.positions.length > 0 ? `
                ${createTable(
                    [
                        { label: 'Ticker', key: 'ticker' },
                        { label: 'Cantidad', key: 'quantity', render: (r) => Formatter.number(r.quantity) },
                        { label: 'Precio compra', key: 'buy_price', render: (r) => Formatter.money(r.buy_price) },
                        { label: 'Precio actual', key: 'current_price', render: (r) => Formatter.money(r.current_price) },
                        { label: 'Invertido', key: 'invested_amount', render: (r) => Formatter.money(r.invested_amount) },
                        { label: 'Valor', key: 'current_value', render: (r) => Formatter.money(r.current_value) },
                        { label: 'P&L', key: 'total_pl', render: (r) => `<span class="${Formatter.colorClass(r.total_pl)}">${Formatter.money(r.total_pl)}</span>` },
                        { label: 'ROI', key: 'pl_percentage', render: (r) => `<span class="${Formatter.colorClass(r.pl_percentage)}">${Formatter.percent(r.pl_percentage / 100)}</span>` },
                        { label: 'Acciones', key: 'id', render: (r) => `
                            <div class="flex gap-2">
                                <button onclick="openEditPositionModal(${r.id})" class="text-blue-400 hover:text-blue-300">🗒️</button>
                                <button onclick="openSellPositionModal(${r.id})" class="text-yellow-400 hover:text-yellow-300">🛍️</button>
                                <button onclick="deletePosition(${r.id})" class="text-red-400 hover:text-red-300">🗑️</button>
                            </div>
                        ` },
                    ],
                    data.positions
                )}
            ` : '<p class="text-gray-400 text-center py-8">Sin posiciones aún. 👀 ¡Añade una!</p>'}
        </div>
    `;
}

async function openAddPositionModal() {
    createModal(
        '💼 Añadir posición',
        `
            <form id="add-position-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Ticker</label>
                    <input type="text" id="ticker" placeholder="AAPL" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Cantidad</label>
                    <input type="number" id="quantity" placeholder="10" step="0.01" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Precio compra (${CONFIG.CURRENCY})</label>
                    <input type="number" id="buy_price" placeholder="150.00" step="0.01" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Fecha compra</label>
                    <input type="date" id="buy_date" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Precio actual (${CONFIG.CURRENCY})</label>
                    <input type="number" id="current_price" placeholder="180.00" step="0.01" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                </div>
            </form>
        `,
        [
            {
                label: 'Crear',
                class: 'px-4 py-2 bg-primary hover:bg-blue-600 rounded text-sm font-medium',
                callback: async () => {
                    const form = document.getElementById('add-position-form');
                    const data = {
                        ticker: document.getElementById('ticker').value,
                        quantity: parseFloat(document.getElementById('quantity').value),
                        buy_price: parseFloat(document.getElementById('buy_price').value),
                        buy_date: document.getElementById('buy_date').value,
                        current_price: parseFloat(document.getElementById('current_price').value),
                    };
                    
                    try {
                        showLoading('Creando posición...');
                        await PositionsAPI.create(data);
                        hideLoading();
                        showNotification('🌟 Posición creada correctamente', 'success');
                        document.getElementById('btn-refresh').click();
                    } catch (e) {
                        hideLoading();
                        showNotification('Error: ' + e.message, 'error');
                    }
                }
            },
        ]
    );
}

async function deletePosition(id) {
    if (confirm('⚠️ ¿Eliminar posición?')) {
        try {
            showLoading('Eliminando...');
            await PositionsAPI.delete(id);
            hideLoading();
            showNotification('🗑️ Posición eliminada', 'success');
            document.getElementById('btn-refresh').click();
        } catch (e) {
            hideLoading();
            showNotification('Error: ' + e.message, 'error');
        }
    }
}
