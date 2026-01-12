/**
 * Application Initialization Script
 * Monta todos los componentes en el DOM y inicializa la app
 * 
 * Ejecución: PRIMERO carga todos los scripts, LUEGO este archivo se ejecuta
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Portfolio Tracker App...');
    
    // 1. Inicializar tema
    console.log('📝 Setting up theme...');
    const theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-color-scheme', theme);
    
    // 2. Crear instancia del Sidebar
    console.log('📊 Mounting Sidebar...');
    const sidebarContainer = document.getElementById('sidebar');
    if (sidebarContainer) {
        const sidebarItems = [
            { id: 'dashboard', icon: '📊', label: 'Dashboard', href: '#/' },
            { id: 'positions', icon: '📈', label: 'Posiciones', href: '#/positions' },
            { id: 'analytics', icon: '📉', label: 'Analytics', href: '#/analytics' },
            { id: 'education', icon: '🎓', label: 'Educación', href: '#/education' },
        ];
        
        const sidebar = Sidebar.create({
            items: sidebarItems,
            onItemClick: (item) => {
                console.log('📍 Navigating to:', item.id);
                if (app) {
                    app.navigateTo(item.href);
                }
            },
        });
        
        sidebarContainer.appendChild(sidebar.getElement());
        window.sidebarInstance = sidebar; // Guardar referencia global
        console.log('✅ Sidebar mounted');
    } else {
        console.warn('⚠️ Sidebar container not found');
    }
    
    // 3. Crear instancia del Navbar
    console.log('🔝 Mounting Navbar...');
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
        const navbar = Navbar.create({
            onThemeToggle: () => {
                const currentTheme = document.body.getAttribute('data-color-scheme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                document.body.setAttribute('data-color-scheme', newTheme);
                localStorage.setItem('theme', newTheme);
                console.log('🌓 Theme switched to:', newTheme);
            },
            onSearch: (query) => {
                console.log('🔍 Search query:', query);
            },
        });
        
        navbarContainer.appendChild(navbar.getElement());
        window.navbarInstance = navbar;
        console.log('✅ Navbar mounted');
    } else {
        console.warn('⚠️ Navbar container not found');
    }
    
    // 4. Inicializar la aplicación principal
    console.log('🎯 Initializing main app...');
    if (typeof PortfolioApp !== 'undefined') {
        window.app = new PortfolioApp();
        console.log('✅ App initialized');
    } else {
        console.error('❌ PortfolioApp class not found');
    }
    
    // 5. Setup routing
    console.log('🔀 Setting up routing...');
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || '/';
        console.log('📍 Route changed:', hash);
        if (window.app) {
            window.app.navigateTo('#' + hash);
        }
    });
    
    // 6. Initial navigation
    const initialRoute = window.location.hash || '#/';
    console.log('🏠 Loading initial route:', initialRoute);
    if (window.app) {
        window.app.navigateTo(initialRoute);
    }
    
    console.log('🎉 App initialization complete!');
});

// Error handling global
window.addEventListener('error', (e) => {
    console.error('❌ Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Unhandled promise rejection:', e.reason);
});
