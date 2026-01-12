/**
 * Application Initialization Script
 * Monta todos los componentes en el DOM e inicializa la app
 * 
 * IMPORTANTE: Este script debe ser el ÚLTIMO en cargar
 */

function initializeApp() {
    console.log('🚀 [INIT] Starting Portfolio Tracker App initialization...');
    
    try {
        // 1. Verificar que existen las clases
        console.log('🔍 [INIT] Verifying dependencies...');
        if (typeof Sidebar === 'undefined') {
            throw new Error('Sidebar class not found. Make sure sidebar.js is loaded.');
        }
        if (typeof Navbar === 'undefined') {
            throw new Error('Navbar class not found. Make sure navbar.js is loaded.');
        }
        console.log('✅ [INIT] All dependencies loaded');
        
        // 2. Inicializar tema
        console.log('🎨 [INIT] Setting up theme...');
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-color-scheme', savedTheme);
        console.log('✅ [INIT] Theme set to:', savedTheme);
        
        // 3. Crear instancia del Sidebar
        console.log('📊 [INIT] Mounting Sidebar...');
        const sidebarContainer = document.getElementById('sidebar');
        if (!sidebarContainer) {
            throw new Error('Sidebar container (#sidebar) not found in HTML');
        }
        
        const sidebarItems = [
            { id: 'dashboard', icon: '📊', label: 'Dashboard', href: '#/', active: true },
            { id: 'positions', icon: '📈', label: 'Posiciones', href: '#/positions' },
            { id: 'analytics', icon: '📉', label: 'Analytics', href: '#/analytics' },
            { id: 'education', icon: '🎓', label: 'Educación', href: '#/education' },
        ];
        
        const sidebar = Sidebar.create({
            items: sidebarItems,
            onItemClick: (item) => {
                console.log('🔗 [SIDEBAR] Navigated to:', item.id);
                // Navegar aquí
            },
        });
        
        if (!sidebar || !sidebar.getElement) {
            throw new Error('Sidebar.create() did not return a valid sidebar instance');
        }
        
        sidebarContainer.innerHTML = ''; // Limpiar
        sidebarContainer.appendChild(sidebar.getElement());
        window.sidebarInstance = sidebar;
        console.log('✅ [INIT] Sidebar mounted successfully');
        
        // 4. Crear instancia del Navbar
        console.log('🔗 [INIT] Mounting Navbar...');
        const navbarContainer = document.getElementById('navbar');
        if (!navbarContainer) {
            throw new Error('Navbar container (#navbar) not found in HTML');
        }
        
        const navbar = Navbar.create({
            userName: 'Trader',
            notificationsCount: 0,
            onThemeToggle: () => {
                const currentTheme = document.body.getAttribute('data-color-scheme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                document.body.setAttribute('data-color-scheme', newTheme);
                localStorage.setItem('theme', newTheme);
                console.log('🌙 [NAVBAR] Theme switched to:', newTheme);
            },
            onSearch: (query) => {
                console.log('🔍 [NAVBAR] Search query:', query);
            },
            onNotifications: () => {
                console.log('🔔 [NAVBAR] Notifications clicked');
            },
        });
        
        if (!navbar || !navbar.getElement) {
            throw new Error('Navbar.create() did not return a valid navbar instance');
        }
        
        navbarContainer.innerHTML = ''; // Limpiar
        navbarContainer.appendChild(navbar.getElement());
        window.navbarInstance = navbar;
        console.log('✅ [INIT] Navbar mounted successfully');
        
        // 5. Renderizar contenido inicial (Dashboard)
        console.log('🏠 [INIT] Loading initial content...');
        const contentArea = document.getElementById('app-view');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="dashboard-container" style="padding: 20px;">
                    <h1 style="color: var(--text-primary); margin-bottom: 20px;">📊 Dashboard</h1>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div style="background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <p style="color: var(--text-secondary); margin: 0 0 10px 0; font-size: 14px;">💰 Total Invertido</p>
                            <p style="color: var(--text-primary); margin: 0; font-size: 28px; font-weight: bold;">$0.00</p>
                        </div>
                        <div style="background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <p style="color: var(--text-secondary); margin: 0 0 10px 0; font-size: 14px;">💹 Valor Actual</p>
                            <p style="color: var(--text-primary); margin: 0; font-size: 28px; font-weight: bold;">$0.00</p>
                        </div>
                        <div style="background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <p style="color: var(--text-secondary); margin: 0 0 10px 0; font-size: 14px;">📈 P&L</p>
                            <p style="color: var(--text-primary); margin: 0; font-size: 28px; font-weight: bold;">$0.00</p>
                        </div>
                        <div style="background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <p style="color: var(--text-secondary); margin: 0 0 10px 0; font-size: 14px;">🎯 ROI %</p>
                            <p style="color: var(--text-primary); margin: 0; font-size: 28px; font-weight: bold;">0.00%</p>
                        </div>
                    </div>
                    <div style="margin-top: 30px; padding: 20px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px;">
                        <p style="color: var(--text-secondary); margin: 0 0 10px 0; font-size: 14px;">📊 Portfolio Status</p>
                        <p style="color: var(--text-primary); margin: 0;">No hay posiciones cargadas. Conecta con el backend para cargar datos.</p>
                    </div>
                </div>
            `;
            console.log('✅ [INIT] Dashboard content rendered');
        }
        
        console.log('🎉 [INIT] Application initialization complete!');
        console.log('✨ App is ready! Open DevTools (F12) to see more info.');
        
    } catch (error) {
        console.error('❌ [INIT] CRITICAL ERROR:', error);
        console.error('Stack:', error.stack);
        
        // Mostrar error en la página
        const contentArea = document.getElementById('app-view');
        if (contentArea) {
            contentArea.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #ef4444;">
                    <h1>❌ Error Initializing App</h1>
                    <p>${error.message}</p>
                    <p style="font-family: monospace; font-size: 12px; color: #6b7280; margin-top: 20px; text-align: left; background: #f3f4f6; padding: 10px; border-radius: 4px; overflow: auto;">
                        ${error.stack}
                    </p>
                </div>
            `;
        }
    }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    console.log('⏳ [INIT] Waiting for DOM to load...');
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    console.log('⚡ [INIT] DOM already loaded, initializing...');
    initializeApp();
}

// Global error handlers
window.addEventListener('error', (event) => {
    console.error('❌ [GLOBAL] Uncaught error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ [GLOBAL] Unhandled promise rejection:', event.reason);
});

console.log('📝 [INIT] init.js loaded successfully');
