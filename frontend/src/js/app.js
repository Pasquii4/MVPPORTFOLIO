/**
 * SPA Router y gestor principal de la aplicación
 */

class PortfolioApp {
    constructor() {
        this.currentView = 'dashboard';
        this.data = {
            positions: [],
            closed_positions: [],
            dashboard: {},
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupRouting();
        this.loadInitialData();
    }
    
    setupEventListeners() {
        // Menú navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                this.navigateTo(href);
            });
        });
        
        // Refresh button
        document.getElementById('btn-refresh').addEventListener('click', () => {
            this.loadInitialData();
        });
        
        // Export button
        document.getElementById('btn-export').addEventListener('click', () => {
            this.exportData();
        });
    }
    
    setupRouting() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(2) || 'dashboard';
            this.navigateTo('#/' + hash);
        });
    }
    
    navigateTo(path) {
        const view = path.split('/')[1] || 'dashboard';
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('border-primary', 'bg-gray-700');
            link.classList.add('border-transparent');
        });
        
        const activeLink = document.querySelector(`[href="#/${view}"]`);
        if (activeLink) {
            activeLink.classList.add('border-primary', 'bg-gray-700');
        }
        
        // Render view
        switch(view) {
            case 'positions':
                renderPositionsView(this.data);
                document.getElementById('page-title').textContent = '💼 Mis Posiciones';
                break;
            case 'analytics':
                renderAnalyticsView(this.data);
                document.getElementById('page-title').textContent = '📈 Analytics';
                break;
            case 'closed':
                renderClosedView(this.data);
                document.getElementById('page-title').textContent = '🏁 Posiciones Cerradas';
                break;
            case 'education':
                renderEducationView();
                document.getElementById('page-title').textContent = '📚 Educación';
                break;
            case 'settings':
                renderSettingsView();
                document.getElementById('page-title').textContent = '⚙️ Configuración';
                break;
            default:
                renderDashboardView(this.data);
                document.getElementById('page-title').textContent = '🏠 Dashboard';
        }
    }
    
    async loadInitialData() {
        try {
            showLoading('Cargando datos...');
            
            // Cargar datos en paralelo
            const [dashboard, positions] = await Promise.all([
                PortfolioAPI.getDashboard(),
                PositionsAPI.getAll(),
            ]);
            
            this.data.dashboard = dashboard;
            this.data.positions = positions;
            
            // Cargar posiciones cerradas
            const closed = await PositionsAPI.getClosed();
            this.data.closed_positions = closed;
            
            hideLoading();
            
            // Re-render current view
            this.navigateTo(window.location.hash || '#/');
            
            showNotification('🚀 Datos cargados correctamente', 'success', 3000);
        } catch (error) {
            hideLoading();
            showNotification('⚠️ Error cargando datos: ' + error.message, 'error', 5000);
            console.error(error);
        }
    }
    
    exportData() {
        const csv = this.generateCSV();
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `portfolio-${new Date().toISOString().split('T')[0]}.csv`);
        link.click();
        
        showNotification('📥 Datos exportados', 'success', 3000);
    }
    
    generateCSV() {
        let csv = 'TICKER,CANTIDAD,PRECIO_COMPRA,PRECIO_ACTUAL,INVERTIDO,VALOR_ACTUAL,P&L,P&L%\n';
        
        this.data.positions.forEach(pos => {
            csv += `${pos.ticker},${pos.quantity},${pos.buy_price},${pos.current_price},${pos.invested_amount},${pos.current_value},${pos.total_pl},${pos.pl_percentage}\n`;
        });
        
        return csv;
    }
}

/**
 * Utilidades globales
 */

async function openEditPositionModal(id) {
    const pos = app.data.positions.find(p => p.id === id);
    if (!pos) return;
    
    createModal(
        '🗒️ Editar posición',
        `
            <form id="edit-position-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Precio actual (${CONFIG.CURRENCY})</label>
                    <input type="number" id="current_price" value="${pos.current_price}" step="0.01" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Dividendos (${CONFIG.CURRENCY})</label>
                    <input type="number" id="dividends" value="${pos.dividends || 0}" step="0.01" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Notas</label>
                    <textarea id="notes" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" rows="3">${pos.notes || ''}</textarea>
                </div>
            </form>
        `,
        [
            {
                label: 'Guardar',
                class: 'px-4 py-2 bg-primary hover:bg-blue-600 rounded text-sm font-medium',
                callback: async () => {
                    const data = {
                        current_price: parseFloat(document.getElementById('current_price').value),
                        dividends: parseFloat(document.getElementById('dividends').value) || 0,
                        notes: document.getElementById('notes').value,
                    };
                    
                    try {
                        showLoading('Actualizando...');
                        await PositionsAPI.update(id, data);
                        hideLoading();
                        showNotification('🌟 Posición actualizada', 'success');
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

async function openSellPositionModal(id) {
    const pos = app.data.positions.find(p => p.id === id);
    if (!pos) return;
    
    createModal(
        '🛍️ Vender posición',
        `
            <form id="sell-position-form" class="space-y-4">
                <p class="text-sm text-gray-400"><strong>${pos.ticker}</strong> x${pos.quantity}</p>
                <div>
                    <label class="block text-sm font-medium mb-1">Precio venta (${CONFIG.CURRENCY})</label>
                    <input type="number" id="sell_price" placeholder="${pos.current_price}" step="0.01" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Fecha venta</label>
                    <input type="date" id="sell_date" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                </div>
            </form>
        `,
        [
            {
                label: 'Vender',
                class: 'px-4 py-2 bg-warning hover:bg-yellow-600 rounded text-sm font-medium',
                callback: async () => {
                    try {
                        showLoading('Vendiendo...');
                        const sell_price = document.getElementById('sell_price').value;
                        const sell_date = document.getElementById('sell_date').value;
                        await PositionsAPI.sell(id, sell_price, sell_date);
                        hideLoading();
                        showNotification('🛍️ Posición vendida', 'success');
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

function renderSettingsView() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="max-w-2xl">
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-bold mb-4">⚙️ Configuración</h3>
                <div class="space-y-4">
                    <div>
                        <p class="text-gray-400 text-sm">Aplicación</p>
                        <p class="text-white font-semibold">${CONFIG.APP_NAME}</p>
                        <p class="text-gray-500 text-xs">v${CONFIG.APP_VERSION}</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-sm">API Base URL</p>
                        <p class="text-white font-mono text-sm">${CONFIG.API_BASE_URL}</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-sm">Moneda</p>
                        <p class="text-white font-semibold">${CONFIG.CURRENCY}</p>
                    </div>
                    <div class="pt-4 border-t border-gray-700">
                        <button onclick="if(confirm('\u26a0️ \u00bfLimpiar todos los datos de localStorage?')) { Storage.clear(); location.reload(); }" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium">🗑️ Limpiar localStorage</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Inicializar app
const app = new PortfolioApp();
