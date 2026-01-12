# 📊 Portfolio Tracker - MVP Profesional

Gestiona tu cartera de inversiones con análisis profesional, seguimiento de P&L, cálculos automáticos y educación financiera.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green?logo=fastapi)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Inicio Rápido

### Opción 1: Local (Recomendado para desarrollo)

```bash
# Clonar repositorio
git clone https://github.com/Pasquii4/MVPPORTFOLIO.git
cd MVPPORTFOLIO

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
# → http://localhost:8000 (API)
# → http://localhost:8000/docs (Swagger UI)

# Frontend (en otra terminal)
cd frontend
python -m http.server 8001
# → http://localhost:8001
```

### Opción 2: Docker Compose (Recomendado para producción)

```bash
cd MVPPORTFOLIO
docker-compose up

# Backend: http://localhost:8000
# Frontend: http://localhost:8001
```

## 📋 Características

### Backend (FastAPI)
- ✅ CRUD completo de posiciones
- ✅ Cálculo automático P&L, ROI, ratios
- ✅ Gestión de posiciones cerradas
- ✅ Historial de portfolio
- ✅ API REST con documentación Swagger
- ✅ Validación robusta con Pydantic
- ✅ SQLAlchemy ORM moderno
- ✅ Tests con pytest
- ✅ CORS habilitado

### Frontend (Vanilla JS)
- ✅ SPA Router sin frameworks
- ✅ Dashboard con métricas en tiempo real
- ✅ Tablas dinámicas con ordenamiento
- ✅ Gráficos con Chart.js (Pie, Bar, Line)
- ✅ CRUD de posiciones con modales
- ✅ Gestión de posiciones cerradas
- ✅ Educación: Ratios financieros, glosario, tips
- ✅ Exportar a CSV
- ✅ Dark mode (por defecto)
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Tailwind CSS

## 🏗️ Arquitectura

```
MVPPORTFOLIO/
├── backend/
│   ├── app/
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic validation
│   │   ├── services/        # Business logic
│   │   ├── api/routes/      # REST endpoints
│   │   ├── utils/           # Calculations, validators
│   │   ├── config.py        # Settings
│   │   ├── database.py      # DB setup
│   │   └── main.py          # FastAPI app
│   ├── tests/               # Unit tests
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── index.html       # Entry point
│   │   ├── js/
│   │   │   ├── config.js    # App config
│   │   │   ├── app.js       # SPA router
│   │   │   ├── api/         # API clients
│   │   │   ├── views/       # Views (pages)
│   │   │   ├── components/  # UI components
│   │   │   └── utils/       # Helpers
│   │   └── assets/styles/   # CSS
│   └── README.md
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Posiciones
```bash
GET    /api/positions/              # Todas las posiciones
GET    /api/positions/{id}          # Posición específica
POST   /api/positions/              # Crear posición
PUT    /api/positions/{id}          # Actualizar posición
DELETE /api/positions/{id}          # Eliminar posición
POST   /api/positions/{id}/sell     # Vender posición
GET    /api/positions/closed/all    # Posiciones cerradas
```

### Portfolio
```bash
GET /api/portfolio/dashboard        # Dashboard completo
GET /api/portfolio/summary          # Resumen rápido
GET /api/portfolio/allocation       # Asignación por tipo
```

### Educación
```bash
GET /api/education/ratios           # Todos los ratios
GET /api/education/ratios/{ratio}   # Ratio específico
GET /api/education/glossary         # Glosario completo
GET /api/education/glossary/{term}  # Término específico
GET /api/education/tips             # Tips educacionales
```

## 💾 Base de Datos

### Modelos
- **Position**: Posiciones abiertas
  - ticker, quantity, buy_price, buy_date, current_price
  - dividends, notes
  - Cálculos: invested_amount, current_value, pl, roi

- **ClosedPosition**: Posiciones vendidas
  - Idem + sell_price, sell_date, days_held

- **PortfolioHistory**: Historial diario
  - date, total_value, total_invested, total_pl

## 🧪 Testing

```bash
cd backend
pytest                              # Todos los tests
pytest tests/ -v                    # Verbose
pytest tests/test_positions.py -v  # Test específico
pytest --cov=app                    # Con coverage
```

## ⚙️ Configuración

### Backend (.env)
```bash
DEBUG=False
APP_NAME="Portfolio Tracker"
APP_VERSION="1.0.0"
DATABASE_URL="sqlite:///./portfolio.db"
ALLOWED_ORIGINS=["http://localhost:3000","http://localhost:8000","http://localhost:8001"]
```

### Frontend (js/config.js)
```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:8000/api',
    APP_NAME: 'Portfolio Tracker',
    CURRENCY: '€',
};
```

## 📊 Cálculos Disponibles

### Por posición
- **Invested Amount** = quantity × buy_price
- **Current Value** = quantity × current_price
- **Unrealized P&L** = current_value - invested_amount
- **Total P&L** = unrealized_pl + dividends
- **ROI (%)** = (total_pl / invested_amount) × 100

### Portfolio
- **Total Invested** = suma de invested_amount (abierto + cerrado)
- **Total Value** = suma de current_value
- **Total P&L** = suma de total_pl
- **Portfolio ROI** = (total_pl / total_invested) × 100
- **Diversification Index** = 1 - Σ(weight²)

## 🎓 Educación Incluida

### Ratios Financieros
- PER (Price to Earnings)
- ROE (Return on Equity)
- FCF (Free Cash Flow)
- Debt to Equity
- Dividend Yield

### Glosario
- Ticker, ETF, Long/Short, P&L, ROI, Diversificación, Volatilidad, etc.

### Tips Diarios
- Consejos de inversión y value investing

## 🚀 Roadmap (Futuro)

- [ ] Autenticación JWT
- [ ] Multi-usuario
- [ ] Histórico de precios (integración API)
- [ ] Alertas automáticas
- [ ] Dashboard de análisis técnico
- [ ] Simulador de trading
- [ ] Mobile app
- [ ] Exportar a PDF con reportes
- [ ] Integración con brokers reales (API)

## 🛠️ Tech Stack

### Backend
- **FastAPI** 0.104 - Web framework moderno
- **SQLAlchemy** 2.0 - ORM robusto
- **Pydantic** 2.5 - Validación de datos
- **SQLite** - Base de datos ligera
- **Pytest** - Testing
- **Python** 3.11+

### Frontend
- **Vanilla JavaScript** - Sin frameworks
- **Tailwind CSS** - Styling
- **Chart.js** - Gráficos
- **HTML5** - Markup

## 📝 Documentación

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [API Docs](http://localhost:8000/docs) (Swagger UI)

## 🔒 Seguridad

- ✅ Validación en entrada (Pydantic)
- ✅ Sanitización de datos
- ✅ CORS configurado
- ✅ Error handling robusto
- TODO: Autenticación JWT
- TODO: Rate limiting

## 📄 Licencia

MIT License - ver LICENSE file

## 👨‍💻 Autor

**Pasquii** - [@Pasquii4](https://github.com/Pasquii4)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios mayores:

1. Fork el proyecto
2. Crea un branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

## 💡 Support

Si encuentras problemas:
1. Revisa los [Issues](https://github.com/Pasquii4/MVPPORTFOLIO/issues)
2. Abre un nuevo issue con detalles
3. Incluye logs y pasos para reproducir

---

**¡Hecho con ❤️ para inversores!**

🌟 Si te fue útil, ¡dale una star! ⭐
