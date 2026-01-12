/**
 * Vista Posiciones Cerradas
 */

async function renderClosedView(data) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-x-auto">
            ${data.closed_positions?.length > 0 ? `
                ${createTable(
                    [
                        { label: 'Ticker', key: 'ticker' },
                        { label: 'Cantidad', key: 'quantity', render: (r) => Formatter.number(r.quantity) },
                        { label: 'Precio compra', key: 'buy_price', render: (r) => Formatter.money(r.buy_price) },
                        { label: 'Precio venta', key: 'sell_price', render: (r) => Formatter.money(r.sell_price) },
                        { label: 'Días', key: 'days_held' },
                        { label: 'P&L', key: 'total_pl', render: (r) => `<span class="${Formatter.colorClass(r.total_pl)}">${Formatter.money(r.total_pl)}</span>` },
                        { label: 'ROI', key: 'pl_percentage', render: (r) => `<span class="${Formatter.colorClass(r.pl_percentage)}">${Formatter.percent(r.pl_percentage / 100)}</span>` },
                    ],
                    data.closed_positions
                )}
            ` : '<p class="text-gray-400 text-center py-8">Sin posiciones cerradas.</p>'}
        </div>
    `;
}
