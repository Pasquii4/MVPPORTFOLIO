# Portfolio Tracker Backend

API REST profesional para gestión de portafolios de inversión.

## Setup

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar .env (opcional)
cp .env.example .env

# Ejecutar servidor
python -m uvicorn app.main:app --reload
```

**API disponible en**: http://localhost:8000
**Documentación**: http://localhost:8000/docs

## Estructura

```
app/
├── models/          # SQLAlchemy ORM models
├── schemas/         # Pydantic validation schemas
├── services/        # Business logic
├── api/routes/      # REST endpoints
├── utils/           # Helper functions
├── config.py        # Settings
├── database.py      # DB setup
└── main.py          # FastAPI app

tests/              # Unit tests
```

## API Endpoints

### Posiciones
- `GET /api/positions/` - Todas las posiciones
- `GET /api/positions/{id}` - Posición específica
- `POST /api/positions/` - Crear posición
- `PUT /api/positions/{id}` - Actualizar posición
- `DELETE /api/positions/{id}` - Eliminar posición
- `POST /api/positions/{id}/sell` - Vender posición
- `GET /api/positions/closed/all` - Posiciones cerradas

### Portfolio
- `GET /api/portfolio/dashboard` - Dashboard completo
- `GET /api/portfolio/summary` - Resumen rápido
- `GET /api/portfolio/allocation` - Asignación por tipo

### Educación
- `GET /api/education/ratios` - Todos los ratios
- `GET /api/education/ratios/{ratio}` - Ratio específico
- `GET /api/education/glossary` - Glosario completo
- `GET /api/education/glossary/{term}` - Término específico
- `GET /api/education/tips` - Tips educacionales

## Testing

```bash
pytest
pytest tests/ -v
pytest tests/test_positions.py -v
```

## Tecnologías

- **FastAPI**: Web framework moderno y rápido
- **SQLAlchemy**: ORM robusto
- **Pydantic**: Validación de datos
- **SQLite**: Base de datos ligera
- **Pytest**: Testing framework

---

🚀 **Ready to rock!**
