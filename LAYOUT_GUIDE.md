# 🎨 Layout & Navigation Guide - Portfolio Tracker v2.0

**Fase 3: Layouts & Navigation** ✅ **EN PROGRESO**

---

## 📐 Componentes de Layout

### 1. **Sidebar Navigation** ✅ COMPLETO

Sidebar collapsible con soporte para navegación, iconos y estados activos.

```javascript
import Sidebar from './src/js/components/sidebar.js';

const sidebar = Sidebar.create({
  collapsible: true,
  collapsed: false,
  width: '280px',
  miniWidth: '80px',
  items: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      href: '#/',
      active: true,
    },
    {
      id: 'positions',
      label: 'Posiciones',
      icon: '📈',
      href: '#/positions',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📉',
      href: '#/analytics',
    },
    {
      id: 'education',
      label: 'Educación',
      icon: '🎓',
      href: '#/education',
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: '⚙️',
      href: '#/settings',
    },
  ],
  onItemClick: (item, event) => {
    console.log('Navegando a:', item.label);
  },
});

// Agregar a DOM
document.body.appendChild(sidebar.getElement());

// Métodos útiles
Sidebar.setActiveItem(sidebar, 'positions'); // Cambiar item activo
sidebar.addItem({ id: 'reports', label: 'Reportes', icon: '📋', href: '#/reports' });
sidebar.removeItem('education');
sidebar.toggle(); // Contraer/expandir
```

**Características:**
- ✅ Estado collapsible con animación suave
- ✅ Iconos + labels
- ✅ Indicador de página activa
- ✅ Hover effects profesionales
- ✅ Mini mode (solo iconos)
- ✅ Ancho personalizable
- ✅ User menu en footer
- ✅ Responsive (se convierte a modal en mobile)

---

### 2. **Top Navbar** ✅ COMPLETO

Navbar sticky con search, notificaciones, user menu y theme toggle.

```javascript
import Navbar from './src/js/components/navbar.js';

const navbar = Navbar.create({
  sticky: true,
  searchable: true,
  notificationsCount: 3,
  userName: 'Juan Pérez',
  onSearch: (query) => {
    console.log('Buscando:', query);
    // Implementar lógica de búsqueda
  },
  onNotifications: () => {
    console.log('Abrir panel de notificaciones');
  },
  onSettings: () => {
    console.log('Abrir configuración');
  },
  onLogout: () => {
    console.log('Cerrar sesión');
    // Implementar logout
  },
  onThemeToggle: (isDarkMode) => {
    console.log('Tema:', isDarkMode ? 'dark' : 'light');
  },
});

// Agregar a DOM
document.body.appendChild(navbar.getElement());

// Métodos útiles
navbar.setNotificationsCount(5); // Actualizar badge
navbar.setUserName('María García'); // Cambiar nombre de usuario
navbar.toggleTheme(); // Cambiar tema
```

**Características:**
- ✅ Sticky header
- ✅ Search bar funcional
- ✅ Notifications bell con badge
- ✅ User profile dropdown
- ✅ Theme toggle (Dark/Light)
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Settings y logout options

---

## 🏗️ Layout Structure

### HTML Principal

```html
<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Tracker v2.0</title>
  
  <!-- Estilos -->
  <link rel="stylesheet" href="src/assets/styles/main.css">
  <link rel="stylesheet" href="src/assets/styles/components.css">
  <link rel="stylesheet" href="src/assets/styles/advanced-components.css">
  <link rel="stylesheet" href="src/assets/styles/layout.css">
</head>
<body>
  <!-- Layout principal -->
  <div class="app-layout">
    <!-- Sidebar -->
    <aside id="sidebar"></aside>
    
    <!-- Main content -->
    <div class="main-content">
      <!-- Navbar -->
      <nav id="navbar" class="app-navbar"></nav>
      
      <!-- Body content -->
      <div id="app-body" class="app-body">
        <!-- Las vistas se renderizan aquí -->
      </div>
    </div>
  </div>

  <!-- Chart.js para gráficos -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <!-- App -->
  <script type="module" src="src/js/app.js"></script>
</body>
</html>
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .sidebar { width: 280px; }
  .main-content { flex: 1; }
}

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  .navbar-search { max-width: 250px; }
  .sidebar { position: fixed; }
}

/* Mobile (640px - 768px) */
@media (max-width: 768px) {
  .sidebar { 
    position: fixed;
    transform: translateX(-100%);
  }
  .navbar { padding: 0 12px; }
}

/* Small mobile (<640px) */
@media (max-width: 640px) {
  .navbar { height: 56px; }
  .navbar-search { max-width: 200px; }
}
```

---

## 🎨 CSS Variables Layout

```css
:root {
  /* Tamaños */
  --sidebar-width: 280px;        /* Ancho sidebar normal */
  --sidebar-mini-width: 80px;    /* Ancho sidebar colapsado */
  --navbar-height: 64px;         /* Alto navbar */
  --sidebar-transition: 0.3s ease; /* Animación sidebar */
  
  /* Colores (heredados de main.css) */
  --color-surface: #FFFFFF;
  --color-border: #E5E7EB;
  --color-text: #1F2937;
  --color-text-secondary: #6B7280;
  --color-background: #F8FAFB;
  --color-secondary: #F3F4F6;
  --color-secondary-hover: #E5E7EB;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #1E293B;
    --color-border: #334155;
    --color-text: #F1F5F9;
    --color-text-secondary: #CBD5E1;
    --color-background: #0F172A;
    --color-secondary: #1E293B;
    --color-secondary-hover: #334155;
  }
}
```

---

## 🚀 Ejemplo Completo: App.js

```javascript
import Sidebar from './components/sidebar.js';
import Navbar from './components/navbar.js';

class App {
  constructor() {
    this.currentView = 'dashboard';
    this.sidebar = null;
    this.navbar = null;
  }

  init() {
    // Crear sidebar
    this.sidebar = Sidebar.create({
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '#/', active: true },
        { id: 'positions', label: 'Posiciones', icon: '📈', href: '#/positions' },
        { id: 'analytics', label: 'Analytics', icon: '📉', href: '#/analytics' },
        { id: 'settings', label: 'Configuración', icon: '⚙️', href: '#/settings' },
      ],
      onItemClick: (item) => this.navigateTo(item.id),
    });

    // Crear navbar
    this.navbar = Navbar.create({
      userName: 'Juan Pérez',
      onSearch: (query) => this.handleSearch(query),
      onLogout: () => this.logout(),
      onThemeToggle: (isDark) => this.setTheme(isDark ? 'dark' : 'light'),
    });

    // Insertar en DOM
    const sidebarContainer = document.getElementById('sidebar');
    const navbarContainer = document.getElementById('navbar');
    
    sidebarContainer.appendChild(this.sidebar.getElement());
    navbarContainer.appendChild(this.navbar.getElement());

    // Restaurar tema
    this.restoreTheme();
  }

  navigateTo(viewId) {
    this.currentView = viewId;
    this.sidebar.setActiveItem(viewId);
    this.loadView(viewId);
  }

  loadView(viewId) {
    const body = document.getElementById('app-body');
    body.innerHTML = `<p>Cargando ${viewId}...</p>`;
    // Aquí se cargarían las vistas reales
  }

  handleSearch(query) {
    if (!query.trim()) return;
    console.log('Searching for:', query);
    // Implementar lógica de búsqueda
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  restoreTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    this.setTheme(saved);
  }

  logout() {
    console.log('Cerrando sesión...');
    // Implementar logout
  }
}

// Inicializar app cuando esté lista
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
```

---

## 📊 Estructura del Layout

```
┌─────────────────────────────────────────────────────┐
│                    NAVBAR (64px)                     │
│  [Search.....................] 🔔 🌙 [User ▼]      │
├──────────────┬────────────────────────────────────────┤
│              │                                        │
│   SIDEBAR    │         MAIN CONTENT (app-body)       │
│  (280px)     │                                        │
│              │  ┌────────────────────────────────┐  │
│  📊 Active   │  │  Dashboard / Positions / etc   │  │
│  📈          │  │                                │  │
│  📉          │  │  [Views se renderizan aquí]    │  │
│  🎓          │  │                                │  │
│  ⚙️           │  │  (Overflow: auto para scroll)  │  │
│              │  │                                │  │
│              │  └────────────────────────────────┘  │
│──────────────│                                        │
│ [User]       │                                        │
└──────────────┴────────────────────────────────────────┘
```

---

## 🎯 Estado Actual - Fase 3

### ✅ Completado
- Sidebar component con todas sus features
- Navbar component con todas sus features
- Layout CSS (main layout, responsive)
- Estructura HTML lista

### 📝 Por Hacer
- [ ] Integración completa en index.html
- [ ] Responsive testing en todos los breakpoints
- [ ] Demo HTML funcional
- [ ] Layout system utilities (spacing, grid)
- [ ] Animaciones de transición

---

## 🔄 Dark/Light Mode

El sistema ya soporta ambos temas:

```javascript
// Usuario puede cambiar tema
navbar.toggleTheme();

// Se guarda en localStorage
localStorage.setItem('theme', 'dark');

// Se aplica en HTML
document.documentElement.setAttribute('data-theme', 'dark');

// CSS responde automáticamente
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #1E293B;
    --color-text: #F1F5F9;
    /* ... más variables ... */
  }
}
```

---

## 📱 Mobile Responsiveness

**Desktop (1024px+)**
- Sidebar visible (280px)
- Navbar full-width
- Search bar expandido

**Tablet (768px - 1024px)**
- Sidebar puede colapsarse
- Navbar adaptado
- Search bar reducido

**Mobile (640px - 768px)**
- Sidebar oculto (modal)
- Navbar comprimido (56px)
- Search bar minimal

**Small Mobile (<640px)**
- Todo adaptado al máximo
- Botones y elementos optimizados para touch

---

## 🚀 Próximos Pasos (Fase 4)

1. **Dashboard View** - KPI cards, charts, performance
2. **Positions Manager** - Table avanzada, CRUD operations
3. **Analytics View** - Gráficos complejos, análisis
4. **Settings Page** - Preferencias de usuario

---

**Versión**: 3.0.0 Layout  
**Fecha**: 12/01/2026  
**Status**: ✅ LISTA PARA INTEGRACIÓN
