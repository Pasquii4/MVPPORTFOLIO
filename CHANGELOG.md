# Changelog - Portfolio Tracker MVP

Todos los cambios notables en este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/) y sigue [Semantic Versioning](https://semver.org/).

---

## [1.0.0] - 2026-01-12

### 🚀 Inicial Release - MVP Completo

#### Añadido

**Backend (FastAPI)**
- ✅ API REST completa con FastAPI 0.104
- ✅ ORM SQLAlchemy 2.0 con modelos:
  - Position (posiciones abiertas)
  - ClosedPosition (posiciones vendidas)
  - PortfolioHistory (historial diario)
- ✅ Schemas Pydantic 2.5 para validación
- ✅ Services layer con lógica de negocio
- ✅ Rutas API organizadas:
  - /api/positions/* (CRUD de posiciones)
  - /api/portfolio/* (métricas del portfolio)
  - /api/education/* (contenido educativo)
- ✅ Cálculos financieros:
  - P&L (ganancias/pérdidas)
  - ROI
  - Diversification index
  - Annualized returns
- ✅ Base de datos SQLite integrada
- ✅ CORS configurado para desarrollo
- ✅ Tests con pytest:
  - Tests de posiciones
  - Tests de cálculos
  - Fixtures y configuración
- ✅ Documentación automática:
  - Swagger UI (/docs)
  - ReDoc (/redoc)
- ✅ Manejo robusto de errores
- ✅ Validación de datos en entrada

**Frontend (Vanilla JS)**
- ✅ SPA Router sin frameworks
- ✅ Interfaz oscura profesional con Tailwind CSS
- ✅ Vistas implementadas:
  - Dashboard (métricas en tiempo real)
  - Posiciones (CRUD completo)
  - Analytics (gráficos con Chart.js)
  - Posiciones Cerradas
  - Educación (ratios, glosario, tips)
  - Configuración
- ✅ Componentes UI reutilizables:
  - Modales interactivos
  - Toast notifications
  - Tablas dinámicas
  - Gráficos (Pie, Bar, Line)
- ✅ Clientes API:
  - APIClient (HTTP wrapper)
  - PositionsAPI
  - PortfolioAPI
  - EducationAPI
- ✅ Utilidades:
  - Formatter (moneda, porcentajes, fechas)
  - Storage (localStorage)
  - Validators (datos)
- ✅ Funcionalidades:
  - Crear/Editar/Eliminar posiciones
  - Vender posiciones
  - Exportar a CSV
  - Actualizar precios en tiempo real
  - Responsive design
- ✅ Dark mode por defecto
- ✅ Carga dinámica de datos

**Infraestructura**
- ✅ Docker + Docker Compose
- ✅ Dockerfile para backend
- ✅ Requirements.txt con dependencias
- ✅ .env.example para configuración
- ✅ .gitignore completo

**Documentación**
- ✅ README.md con overview completo
- ✅ SETUP_GUIDE.md con instrucciones paso a paso
- ✅ Backend README.md
- ✅ Frontend README.md
- ✅ CHANGELOG.md (este archivo)
- ✅ Comentarios en código

#### Tecnologías

**Backend**
- Python 3.11+
- FastAPI 0.104.1
- SQLAlchemy 2.0.23
- Pydantic 2.5.0
- Uvicorn 0.24.0
- Pytest 7.4.3

**Frontend**
- Vanilla JavaScript (ES6+)
- HTML5
- Tailwind CSS 3
- Chart.js 4

**Infraestructura**
- SQLite 3
- Docker
- Docker Compose

---

## Roadmap Futuro

### [1.1.0] - Planeado
- [ ] Autenticación JWT
- [ ] Multi-usuario
- [ ] Persistencia de preferencias
- [ ] Tema claro
- [ ] Exportar a PDF

### [1.2.0] - Planeado
- [ ] Integración API de precios en tiempo real
- [ ] Alertas automáticas
- [ ] Notificaciones por email
- [ ] Comparación con índices (IBEX35, SP500, etc)

### [2.0.0] - Planeado
- [ ] Mobile app (React Native)
- [ ] Dashboard de análisis técnico
- [ ] Simulador de trading
- [ ] Integración con brokers (API)
- [ ] Machine Learning para predicciones
- [ ] Base de datos PostgreSQL
- [ ] Caché con Redis

---

## Cómo contribuir

Ver [README.md](README.md) sección "Contribuciones"

## Licencia

MIT License - Ver LICENSE file

---

**Nota**: Este es el MVP (Minimum Viable Product) completamente funcional. Todas las características core están implementadas y testeadas.
