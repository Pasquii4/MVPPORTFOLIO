# 💼 Portfolio Tracker MVP - Versión 1.1.0

**Estado**: ✅ Production Ready | **Versión**: 1.1.0 | **Última actualización**: 12/01/2026

## 🎯 ¿Qué es?

Portfolio Tracker es una **aplicación profesional de gestión de carteras de inversión** diseñada para inversores individuales que quieren:

- 📊 Monitorear sus posiciones abiertas
- 💹 Analizar retornos (ROI, P&L)
- 📈 Ver distribución del portfolio
- 📉 Gestionar posiciones cerradas
- 🎓 Aprender conceptos financieros

## ✨ Características Principales

### 📋 Gestión de Posiciones
- ✅ Crear, editar, eliminar posiciones
- ✅ Registrar precio de compra y actual
- ✅ Incluir dividendos
- ✅ Vender posiciones (mover a cerradas)
- ✅ Histórico completo

### 📊 Analytics
- ✅ Dashboard con métricas en tiempo real
- ✅ Gráficos de distribución
- ✅ ROI por posición
- ✅ P&L total
- ✅ Índice de diversificación
- ✅ Rentabilidad anualizada

### 🎓 Educación
- ✅ Ratios financieros explicados
- ✅ Glosario de términos
- ✅ Tips de inversión

### 💻 Tecnología
- ✅ Backend FastAPI moderno
- ✅ Frontend sin dependencias pesadas
- ✅ Base de datos SQLite
- ✅ API REST completamente documentada
- ✅ Docker ready

## 🚀 Quick Start (2 minutos)

### Opción 1: Local (Recomendado)

```bash
# Clonar
git clone https://github.com/Pasquii4/MVPPORTFOLIO.git
cd MVPPORTFOLIO

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Frontend (nueva terminal)
cd frontend/src
python -m http.server 8001

# Abrir navegador
open http://localhost:8001
```

### Opción 2: Docker

```bash
git clone https://github.com/Pasquii4/MVPPORTFOLIO.git
cd MVPPORTFOLIO
docker-compose up
open http://localhost:8001
```

## 📚 Documentación

| Documento | Contenido |
|-----------|----------|
| **[SETUP_GUIDE.md](SETUP_GUIDE.md)** | Setup paso a paso |
| **[AUDIT.md](AUDIT.md)** | Auditoría v1.1.0 |
| **[BEST_PRACTICES.md](BEST_PRACTICES.md)** | Guía de desarrollo |
| **[CHANGELOG.md](CHANGELOG.md)** | Historial de cambios |
| **Swagger UI** | http://localhost:8000/docs |
| **ReDoc** | http://localhost:8000/redoc |

## 🔗 Endpoints API

### Posiciones
- `GET /api/positions` - Obtener todas
- `GET /api/positions/{id}` - Obtener una
- `POST /api/positions` - Crear
- `PUT /api/positions/{id}` - Actualizar
- `DELETE /api/positions/{id}` - Eliminar
- `POST /api/positions/{id}/sell` - Vender

### Portfolio
- `GET /api/portfolio/metrics` - Métricas
- `GET /api/portfolio/distribution` - Distribución
- `GET /api/portfolio/analytics` - Analytics

### Educación
- `GET /api/education/ratios` - Ratios
- `GET /api/education/glossary` - Glosario
- `GET /api/education/tips` - Tips

## 💡 Ejemplos de Uso

### Crear una posición

```bash
curl -X POST http://localhost:8000/api/positions \\
  -H "Content-Type: application/json" \\
  -d "{
    \"ticker\": \"AAPL\",
    \"quantity\": 10,
    \"buy_price\": 150.0,
    \"buy_date\": \"2024-01-01\",
    \"current_price\": 180.0
  }"
```

### Obtener métricas

```bash
curl http://localhost:8000/api/portfolio/metrics
```

## 🧪 Testing

```bash
cd backend
pytest -v          # Todos los tests
pytest --cov=app   # Con coverage
```

## 🏗️ Estructura

```
MVPPORTFOLIO/
├── backend/           # FastAPI + SQLAlchemy
│   ├── app/
│   │   ├── models/    # ORM models
│   │   ├── schemas/   # Pydantic schemas
│   │   ├── services/  # Business logic
│   │   ├── api/       # Routes
│   │   └── utils/     # Helpers
│   ├── tests/         # Unit tests
│   └── requirements.txt
├── frontend/          # Vanilla JS
│   └── src/
│       ├── index.html
│       ├── js/
│       └── assets/
└── docker-compose.yml
```

## 📊 Versión 1.1.0 - Mejoras Principales

✅ **Validación exhaustiva** de datos  
✅ **API client con reintentos** automáticos  
✅ **Notificaciones toast** modernas  
✅ **Seguridad mejorada** (middleware)  
✅ **Exception handling** completo  
✅ **Health check endpoints**  
✅ **Type hints 100%**  
✅ **85%+ test coverage**  

Ver [AUDIT.md](AUDIT.md) para detalles completos.

## 🔒 Seguridad

- ✅ Validación en frontend + backend
- ✅ CORS restrictivo
- ✅ TrustedHostMiddleware
- ✅ Input sanitization
- ✅ SQL injection prevention
- ✅ Type hints (mypy ready)

## 📈 Performance

- ✅ Timeout en API (10s)
- ✅ Reintentos automáticos
- ✅ Notificaciones GPU-accelerated
- ✅ Sin dependencias pesadas
- ✅ Database optimizada

## 🚀 Roadmap

### v1.2.0
- [ ] Rate limiting
- [ ] JWT authentication
- [ ] Database transactions
- [ ] Full logging

### v1.3.0
- [ ] Redis caching
- [ ] Offline mode
- [ ] Service Worker
- [ ] Optimistic updates

### v2.0.0
- [ ] Multi-user
- [ ] Real-time prices
- [ ] ML predictions
- [ ] Mobile app

## 📝 Licencia

MIT License - Ver [LICENSE](LICENSE) file

## 🤝 Contribuciones

Pull requests bienvenidos. Para cambios mayores, abrir un issue primero.

## 📞 Soporte

- 📖 Leer [SETUP_GUIDE.md](SETUP_GUIDE.md)
- 🐛 Abrir [issue en GitHub](https://github.com/Pasquii4/MVPPORTFOLIO/issues)
- 💬 Contactar al autor

---

**Hecho con ❤️ para inversores**

🚀 **v1.1.0 - Production Ready!**
