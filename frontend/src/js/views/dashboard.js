/**
 * Vista Dashboard
 */

async function renderDashboardView(data) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Tarjetas de métricas -->
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p class="text-gray-400 text-sm mb-2">💵 Invertido</p>
                <p class="text-3xl font-bold text-white" id="total-invested">${Formatter.money(data.dashboard.metrics?.total_invested || 0)}</p>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p class="text-gray-400 text-sm mb-2">💸 Valor actual</p>
                <p class="text-3xl font-bold text-white" id="total-value">${Formatter.money(data.dashboard.metrics?.total_value || 0)}</p>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p class="text-gray-400 text-sm mb-2">P&L</p>
                <p class="text-3xl font-bold ${Formatter.colorClass(data.dashboard.metrics?.total_pl || 0)}" id="total-pl">
                    ${Formatter.money(data.dashboard.metrics?.total_pl || 0)}
                </p>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p class="text-gray-400 text-sm mb-2">ROI</p>
                <p class="text-3xl font-bold ${Formatter.colorClass(data.dashboard.metrics?.pl_percentage || 0)}" id="total-roi">
                    ${Formatter.percent(data.dashboard.metrics?.pl_percentage || 0)}
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <!-- Posiciones por peso -->
            <div class="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-bold mb-4">📊 Posiciones por peso</h3>
                <div class="overflow-x-auto">
                    ${createTable(
                        [
                            { label: 'Ticker', key: 'ticker' },
                            { label: 'Cant.', key: 'quantity' },
                            { label: 'Precio actual', key: 'current_price', render: (row) => Formatter.money(row.current_price) },
                            { label: 'Valor', key: 'current_value', render: (row) => Formatter.money(row.current_value) },
                            { label: 'Peso', key: 'weight', render: (row) => Formatter.percent(row.weight / 100) },
                            { label: 'P&L', key: 'pl', render: (row) => `<span class="${Formatter.colorClass(row.pl)}">${Formatter.money(row.pl)}</span>` },
                        ],
                        data.dashboard.positions_by_weight || []
                    )}
                </div>
            </div>

            <!-- Pie chart -->
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-bold mb-4">🜟 Distribución</h3>
                <canvas id="allocation-chart" style="max-height: 300px;"></canvas>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Info -->
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-bold mb-4">📊 Info</h3>
                <div class="space-y-2">
                    <p class="text-gray-300"><span class="text-gray-400">Posiciones abiertas:</span> ${data.dashboard.metrics?.num_open_positions || 0}</p>
                    <p class="text-gray-300"><span class="text-gray-400">Posiciones cerradas:</span> ${data.dashboard.metrics?.num_closed_positions || 0}</p>
                    <p class="text-gray-300"><span class="text-gray-400">Diversificación:</span> ${Formatter.percent(data.dashboard.diversification_index || 0)}</p>
                    <p class="text-gray-300"><span class="text-gray-400">Actualizado:</span> ${Formatter.datetime(data.dashboard.timestamp)}</p>
                </div>
            </div>

            <!-- Acciones rápidas -->
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-bold mb-4">퉪️ Acciones rápidas</h3>
                <div class="space-y-3">
                    <button onclick="location.hash='#/positions'" class="w-full px-4 py-2 bg-primary hover:bg-blue-600 rounded transition">💼 Añadir posición</button>
                    <button onclick="location.hash='#/analytics'" class="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">📈 Ver analytics</button>
                </div>
            </div>
        </div>
    `;

    // Renderizar gráfico de pie
    try {
        const allocation = data.dashboard.positions_by_weight || [];
        const labels = allocation.map(p => p.ticker);
        const values = allocation.map(p => p.current_value);
        createPieChart('allocation-chart', labels, values);
    } catch (e) {
        console.error('Error rendering chart:', e);
    }
}
