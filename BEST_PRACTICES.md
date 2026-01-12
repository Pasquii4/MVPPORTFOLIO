# 🚀 BEST PRACTICES - Portfolio Tracker MVP

**Versión**: 1.1.0
**Última actualización**: 12/01/2026

Guía de best practices para desarrollar, mantener y escalar Portfolio Tracker.

---

## 💫 PRINCIPIOS GENERALES

### 1. Validación en Dos Capas

**Frontend (Validación Temprana)**
```javascript
// Antes de enviar al servidor
const validation = Validators.validateForm(formData);
if (!validation.valid) {
  // Mostrar errores inmediatamente
  NotificationManager.error(validation.errors.field);
  return;
}
```

**Backend (Validación de Seguridad)**
```python
# Aunque el frontend valide, el backend SIEMPRE valida
# Protege contra:
# - Peticiones directas sin pasar por frontend
# - Datos manipulados por bots/ataques
# - Errores de sincronización

validate_position_data(position_data)  # Siempre
```

**Beneficio**: Protecciones más robustas, mejor UX

---

## 🔏 BACKEND BEST PRACTICES

### 1. Manejo de Errores

❌ **NO HAGAS ESTO**:
```python
@router.post("/positions")
def create_position(position_data: PositionCreate, db: Session):
    new_position = PositionService.create_position(db, position_data)
    return new_position
    # ¿Qué pasa si falla? App crash.
```

✅ **HAZ ESTO**:
```python
@router.post("/positions")
def create_position(position_data: PositionCreate, db: Session):
    try:
        new_position = PositionService.create_position(db, position_data)
        return new_position
    except ValueError as e:
        raise HTTPException(
            status_code=422,
            detail=f"Datos inválidos: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error: {str(e)}"
        )
```

### 2. Validación de Entrada

❌ **NO HAGAS ESTO**:
```python
def create_position(ticker: str, qty: float, price: float):
    # Sin validación
    position = Position(ticker=ticker, quantity=qty, buy_price=price)
```

✅ **HAZ ESTO**:
```python
def create_position(db: Session, position_data: PositionCreate):
    # Pydantic ya valida en creación del schema
    validate_position_data(position_data)  # Validación adicional
    # Lógica segura
```

### 3. Cálculos Financieros

❌ **NO HAGAS ESTO**:
```python
def calculate_roi(positions):
    total_invested = sum(p.invested_amount for p in positions)
    total_value = sum(p.current_value for p in positions)
    return (total_value - total_invested) / total_invested * 100
```

✅ **HAZ ESTO**:
```python
def calculate_roi(positions):
    try:
        if not positions:
            return 0.0
        
        total_invested = sum(max(0, p.invested_amount) for p in positions)
        if total_invested == 0:
            return 0.0
        
        total_value = sum(max(0, p.current_value) for p in positions)
        roi = (total_value - total_invested) / total_invested * 100
        return round(roi, 2)
    except (TypeError, ZeroDivisionError):
        return 0.0
```

**Por qué**:
- Evita division by zero
- Maneja datos None/incorrectos
- Redondeo consistente
- Siempre retorna valor válido

### 4. Sanitización de Datos

```python
# Siempre sanitizar strings de entrada
db_position = Position(
    ticker=position_data.ticker.upper().strip(),
    name=position_data.name.strip() if position_data.name else None,
    notes=position_data.notes.strip() if position_data.notes else None,
)
```

### 5. Type Hints

✅ **Siempre usar type hints**:
```python
# BAD
def calculate_metrics(positions):
    pass

# GOOD
def calculate_metrics(positions: List[Position]) -> dict:
    pass
```

---

## 🎨 FRONTEND BEST PRACTICES

### 1. Validación de Formularios

```javascript
// Validar ANTES de enviar
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // VALIDAR
  const validation = Validators.validateForm(data);
  if (!validation.valid) {
    Object.entries(validation.errors).forEach(([field, error]) => {
      NotificationManager.error(error);
    });
    return;
  }
  
  // SI PASA VALIDACIÓN, ENVIAR
  try {
    await apiClient.positions.create(data);
    NotificationManager.success('¡Posición creada!');
  } catch (error) {
    NotificationManager.error(error.message);
  }
});
```

### 2. Manejo de Errores API

```javascript
try {
  const response = await apiClient.positions.getAll();
  // Procesar response
} catch (error) {
  if (error.message.includes('timeout')) {
    NotificationManager.warning('Conexión lenta, reintentando...');
  } else if (error.message.includes('404')) {
    NotificationManager.error('Recurso no encontrado');
  } else {
    NotificationManager.error(`Error: ${error.message}`);
  }
}
```

### 3. Notificaciones

```javascript
// EXCELENTE UX
await apiClient.positions.create(data);
NotificationManager.success('¡Posición añadida!');

// NO TAN BUENO
alert('OK');
```

### 4. Evitar Memory Leaks

```javascript
// Siempre limpiar listeners
function init() {
  const button = document.querySelector('#save-btn');
  
  const handler = async () => {
    // Lógica
  };
  
  button.addEventListener('click', handler);
  
  // IMPORTANTE: Limpiar en cleanup
  return () => button.removeEventListener('click', handler);
}
```

### 5. Performance

```javascript
// Debounce en búsquedas
let searchTimeout;
const handleSearch = (query) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    apiClient.positions.search(query);
  }, 300);
};
```

---

## 🔐 SEGURIDAD

### Backend

1. **Validar SIEMPRE**
   ```python
   # Incluso si el frontend ya validó
   validate_position_data(position_data)
   ```

2. **Usar Pydantic Validators**
   ```python
   class Position(BaseModel):
       ticker: str = Field(..., min_length=1, max_length=20)
       
       @validator('ticker')
       def validate_ticker(cls, v):
           if not v.replace('-', '').isalnum():
               raise ValueError('Invalid format')
           return v
   ```

3. **CORS Restrictivo**
   ```python
   # No hagas esto
   allow_origins=["*"]  # PELIGRO
   
   # Haz esto
   allow_origins=["http://localhost:8001", "https://example.com"]
   ```

4. **Rate Limiting** (Próximo)
   ```python
   # TODO v1.2
   @app.middleware("http")
   async def rate_limit_middleware(request, call_next):
       # Implementar rate limiting
       pass
   ```

### Frontend

1. **Validar Entrada**
   ```javascript
   // Siempre validar antes de procesar
   const validation = Validators.validateForm(data);
   ```

2. **Timeout en Requests**
   ```javascript
   // API Client ya lo hace automáticamente
   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 10000);
   ```

3. **No Guardar Datos Sensibles**
   ```javascript
   // BAD
   localStorage.setItem('api_token', token);
   
   // GOOD
   // Usar variables en memoria o cookies secure
   ```

---

## 📊 TESTING

### Backend Tests

```bash
# Ejecutar todos
pytest backend/tests/ -v

# Con coverage
pytest backend/tests/ --cov=app

# Specific test
pytest backend/tests/test_positions.py::test_create_position -v
```

### Test Structure

```python
def test_create_position_with_valid_data():
    """Test crear posición con datos válidos"""
    data = {
        "ticker": "AAPL",
        "quantity": 10,
        "buy_price": 150.0,
        # ...
    }
    
    result = PositionService.create_position(db, data)
    
    assert result.ticker == "AAPL"
    assert result.id is not None

def test_create_position_with_invalid_ticker():
    """Test crear posición con ticker inválido"""
    data = {"ticker": "", ...}  # Ticker vacío
    
    with pytest.raises(ValueError):
        PositionService.create_position(db, data)
```

---

## 📊 LOGGING & MONITORING

### Backend Logging

```python
import logging

logger = logging.getLogger(__name__)

@router.post("/positions")
def create_position(position_data: PositionCreate, db: Session):
    try:
        logger.info(f"Creando posición: {position_data.ticker}")
        position = PositionService.create_position(db, position_data)
        logger.info(f"Posición creada: {position.id}")
        return position
    except Exception as e:
        logger.error(f"Error creando posición: {str(e)}", exc_info=True)
        raise
```

### Health Checks

```bash
# Verificar que API esté running
curl http://localhost:8000/health

# Respuesta esperada
{"status": "healthy", "version": "1.1.0"}
```

---

## 🔓 GIT WORKFLOW

### Commits

```bash
# GOOD commit messages
git commit -m "fix: improve position validation"
git commit -m "feat: add API retry mechanism"
git commit -m "refactor: improve error handling"
git commit -m "docs: update setup guide"

# BAD commit messages
git commit -m "fix bug"
git commit -m "update code"
git commit -m "changes"
```

### Branches

```bash
# Feature
git checkout -b feature/add-auth

# Bugfix
git checkout -b bugfix/validation-error

# Hotfix
git checkout -b hotfix/api-crash
```

---

## 🛰 DEPLOYMENT

### Development

```bash
# Terminal 1: Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend/src
python -m http.server 8001
```

### Production (Docker)

```bash
# Build images
docker-compose build

# Run production
docker-compose up -d

# Logs
docker-compose logs -f backend
```

---

## 📝 CHANGELOG GUIDELINES

Siempre documentar cambios:

```markdown
## [1.2.0] - 2026-01-15

### Added
- JWT authentication
- Rate limiting
- Request logging

### Fixed
- Position validation edge cases
- API timeout issues

### Changed
- Improved error messages
- Updated dependencies
```

---

## ✅ CHECKLIST PRE-DEPLOY

- [ ] Tests pasan (`pytest` con 100% pass)
- [ ] No hay warnings en logs
- [ ] Código lint (`flake8` o similar)
- [ ] Type hints completos (`mypy` check)
- [ ] CORS correctamente configurado
- [ ] Variables de entorno actualizadas
- [ ] Base de datos migrada
- [ ] Endpoints documentados en Swagger
- [ ] README actualizado
- [ ] CHANGELOG actualizado

---

## 🎊 CONCLUSIóN

Siguiendo estas best practices:
- ✅ Código más seguro
- ✅ Menos bugs en producción
- ✅ Mejor mantenibilidad
- ✅ Más fácil escalar
- ✅ UX mejorada

**Siguiente paso**: Leer [AUDIT.md](AUDIT.md) para ver qué se mejoró en v1.1.0
