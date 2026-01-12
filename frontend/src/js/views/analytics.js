/**
 * Vista Analytics
 */

async function renderAnalyticsView(data) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-bold mb-4">📈 Tipo de posición</h3>
                <canvas id="types-chart" style="max-height: 300px;"></canvas>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-bold mb-4">📊 Rentabilidad</h3>
                <canvas id="profitability-chart" style="max-height: 300px;"></canvas>
            </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 class="text-lg font-bold mb-4">🌟 Top 10 mejor rendimiento</h3>
            <div class="overflow-x-auto">
                ${createTable(
                    [
                        { label: 'Ticker', key: 'ticker' },
                        { label: 'Rentabilidad', key: 'pl_percentage', render: (r) => `<span class="${Formatter.colorClass(r.pl_percentage)}">${Formatter.percent(r.pl_percentage / 100)}</span>` },
                        { label: 'P&L', key: 'total_pl', render: (r) => `<span class="${Formatter.colorClass(r.total_pl)}">${Formatter.money(r.total_pl)}</span>` },
                    ],
                    (data.positions || []).sort((a, b) => b.pl_percentage - a.pl_percentage).slice(0, 10)
                )}
            </div>
        </div>
    `;

    // Gráficos
    try {
        const positions = data.positions || [];
        
        // Por tipos
        const typeMap = {};
        positions.forEach(p => {
            typeMap[p.position_type] = (typeMap[p.position_type] || 0) + p.current_value;
        });
        const types = Object.keys(typeMap);
        const typeValues = Object.values(typeMap);
        createPieChart('types-chart', types, typeValues);

        // Rentabilidad
        const topPositions = positions.sort((a, b) => b.pl_percentage - a.pl_percentage).slice(0, 10);
        createBarChart('profitability-chart', 
            topPositions.map(p => p.ticker),
            [{
                label: 'Rentabilidad %',
                data: topPositions.map(p => p.pl_percentage),
                backgroundColor: topPositions.map(p => p.pl_percentage > 0 ? '#10b981' : '#ef4444'),
            }]
        );
    } catch (e) {
        console.error('Error rendering charts:', e);
    }
}
