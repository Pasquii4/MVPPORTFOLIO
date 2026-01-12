# Portfolio Tracker Frontend

Frontend SPA vanilla JavaScript para Portfolio Tracker.

## Setup

```bash
# Servir localmente
cd frontend
python -m http.server 8001

# O con Node.js
npm install -g http-server
http-server src -p 8001
```

**Accede a**: http://localhost:8001

## Estructura

```
src/
├── index.html              # HTML principal
├── js/
│   ├── config.js           # Configuración
│   ├── app.js              # Router SPA
│   ├── api/                # Clientes API
│   ├── views/              # Vistas (componentes)
│   ├── components/         # Componentes UI
│   └── utils/              # Utilidades
└── assets/styles/          # CSS
```

## Características

- ✅ SPA Router con hash navigation
- ✅ CRUD completo de posiciones
- ✅ Dashboard con métricas en tiempo real
- ✅ Analytics con gráficos Chart.js
- ✅ Gestión de posiciones cerradas
- ✅ Educación financiera (ratios, glosario)
- ✅ Exportar datos a CSV
- ✅ Dark mode (por defecto)
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Modales interactivos

## Dependencias

- **Tailwind CSS** (CDN)
- **Chart.js** (CDN)
- **Vanilla JavaScript** (sin frameworks)

## API

Base URL configurada en `config.js`:

```javascript
CONFIG.API_BASE_URL = 'http://localhost:8000/api'
```

---

🚀 **Ready to use!**
