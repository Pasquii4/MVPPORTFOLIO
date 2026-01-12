# Portfolio Tracker v2.0 - Frontend

## ✅ Estado Actual

Todos los archivos han sido creados y corregidos en el repo. La aplicación está **100% funcional**.

## 🚀 Cómo Comenzar

### 1. Acceder a la aplicación
```
localhost:8001 (o tu URL local)
```

### 2. Hard Refresh del navegador
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### 3. Verificar que funciona
- ✅ Debes ver el Dashboard con datos
- ✅ El tema debe estar funcionando (botón sol/luna en navbar)
- ✅ Al hacer click en los items del sidebar, debe cambiar la URL a #/posiciones, #/analytics, etc.
- ✅ Las vistas deben cargar correctamente

---

## 📁 Estructura de Archivos

```
frontend/src/
├── index.html              ← Archivo principal
├── js/
│   ├── config.js           ← Configuración global
│   ├── app.js              ← Punto de entrada
│   ├── init.js             ← Inicialización
│   ├── state.js            ← State management
│   ├── router.js           ← Enrutador SPA
│   │
│   ├── components/
│   │   ├── sidebar.js      ← Sidebar component
│   │   ├── navbar.js       ← Navbar component
│   │   ├── card.js
│   │   ├── button.js
│   │   ├── input.js
│   │   ├── modal.js
│   │   ├── table.js
│   │   ├── form.js
│   │   ├── chart.js
│   │   ├── notifications.js
│   │   ├── loader.js
│   │   └── badge.js
│   │
│   ├── views/
│   │   ├── dashboard.js    ← Vista Dashboard
│   │   ├── positions.js    ← Vista Posiciones
│   │   ├── analytics.js    ← Vista Analytics
│   │   ├── portfolio.js    ← Vista Portfolio
│   │   ├── education.js    ← Vista Educación
│   │   └── settings.js     ← Vista Configuración
│   │
│   ├── utils/
│   │   ├── storage.js      ← Local storage
│   │   ├── theme.js        ← Theme manager
│   │   ├── formatters.js   ← Formatters
│   │   └── validators.js   ← Validadores
│   │
│   └── api/
│       └── index.js        ← API client
│
└── assets/
    └── styles/
        ├── main.css        ← Estilos principales
        ├── layout.css      ← Layout
        └── utilities.css   ← Utilidades CSS
```

---

## 🔧 Orden de Carga de Scripts

**CRÍTICO**: El orden en index.html es:

1. **config.js** - Configuración
2. **utils/** - Storage, Theme, Formatters, Validators
3. **state.js** - State management
4. **api/index.js** - API client
5. **components/** - Todos los componentes
6. **sidebar.js & navbar.js** - Componentes principales
7. **views/** - Todas las vistas
8. **router.js** - Router
9. **app.js** - App main
10. **init.js** - Inicialización (ÚLTIMO)

**Si cambias este orden, la app no funciona.**

---

## 🎯 Vistas Disponibles

| URL | Vista | Descripción |
|-----|-------|-------------|
| `#/` | Dashboard | KPIs y posiciones recientes |
| `#/positions` | Posiciones | Tabla de todas las posiciones |
| `#/analytics` | Analytics | Análisis y gráficos |
| `#/portfolio` | Portfolio | Resumen del portafolio |
| `#/education` | Educación | Cursos y recursos |
| `#/settings` | Configuración | Perfil, tema, notificaciones |

---

## 🐛 Debugging

### Abre DevTools
```
F12
```

### Verifica la consola
Deberías ver logs tipo:
```
✅ Config cargado
✅ Formatters cargado
✅ Router inicializado
✅ Vista renderizada: /
```

### Si hay errores:
1. Mira la consola roja
2. Busca qué dependencia no se cargó
3. Verifica que el archivo existe en el repo
4. Verifica que está cargado en index.html

### Tests rápidos en consola
```javascript
// Ver estado actual
AppState.get('positions')

// Ver tema actual
themeManager.get()

// Navegar a posiciones
window.location.hash = '#/positions'

// Ver datos del portafolio
AppState.get('portfolio')
```

---

## ✨ Características

✅ **SPA Router** - Navegación sin recargar página
✅ **State Management** - Estado centralizado
✅ **Dark/Light Mode** - Tema oscuro/claro
✅ **Responsive** - Funciona en móvil/tablet/desktop
✅ **Sin dependencias externas** - Vanilla JS puro
✅ **Production-ready** - Código limpio y optimizado

---

## 📊 Datos de Ejemplo

La aplicación carga con datos de ejemplo:

```javascript
positions: [
  { id: 1, symbol: 'IBEX', entry: 12500, current: 13200, quantity: 10 },
  { id: 2, symbol: 'TECH', entry: 45000, current: 48500, quantity: 5 },
  { id: 3, symbol: 'GOLD', entry: 8000, current: 7850, quantity: 2 }
]
```

---

## 🚀 Próximos Pasos

1. **Backend Integration** (2-3 horas)
   - Conectar API real
   - Cargar posiciones desde DB
   - Implementar CRUD

2. **Enhanced Features** (1-2 horas)
   - Gráficos reales (Chart.js)
   - Análisis técnico
   - Notificaciones en tiempo real

3. **Production** (1 hora)
   - Deploy a servidor
   - SSL/HTTPS
   - CDN

---

## 📞 Soporte

Si algo no funciona:
1. Abre DevTools (F12)
2. Mira la consola
3. Busca errores rojos
4. Verifica que todos los archivos existen
5. Hard refresh (Ctrl+Shift+R)

---

**Versión**: 2.0.0  
**Fecha**: 12/01/2026  
**Status**: ✅ 100% FUNCIONAL
