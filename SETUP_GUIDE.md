# 🚀 Guía de Setup - Portfolio Tracker MVP

## Prerequisitos

- Python 3.11+ ([descargar](https://www.python.org/downloads/))
- Git ([descargar](https://git-scm.com/))
- Un navegador moderno (Chrome, Firefox, Safari, Edge)

**Opcional:**
- Docker + Docker Compose (para contenedores)
- Node.js 16+ (alternativa para servir frontend)

---

## 💻 Setup Local (RECOMENDADO)

### 1₷️₸ Clonar repositorio

```bash
git clone https://github.com/Pasquii4/MVPPORTFOLIO.git
cd MVPPORTFOLIO
```

### 2️₸ Backend Setup

#### 2.1 Crear entorno virtual

```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 2.2 Instalar dependencias

```bash
pip install -r requirements.txt
```

Verifica la instalación:

```bash
pip list
# Deberías ver: fastapi, uvicorn, sqlalchemy, pydantic, etc.
```

#### 2.3 Configuración (opcional)

```bash
# Copiar .env.example a .env
cp .env.example .env

# Editar .env si es necesario
# nano .env  # o abre en tu editor favorito
```

#### 2.4 Iniciar servidor Backend

```bash
python -m uvicorn app.main:app --reload

# Output esperado:
# INFO:     Uvicorn running on http://127.0.0.1:8000
# INFO:     Application startup complete
```

**API disponible en**: http://localhost:8000
**Documentación (Swagger)**: http://localhost:8000/docs
**ReDoc**: http://localhost:8000/redoc

### 3️₸ Frontend Setup

**Abre UNA NUEVA TERMINAL** (sin cerrar la del backend)

```bash
# Desde la raíz del proyecto
cd frontend/src

# Opción 1: Python (incluido en casi todos lados)
python -m http.server 8001

# Opción 2: Node.js (si lo tienes instalado)
npx http-server -p 8001

# Opción 3: npm (si tienes http-server instalado)
http-server -p 8001
```

**Frontend disponible en**: http://localhost:8001

### 4️₸ ¡Listo! 🌟

Abre tu navegador en: http://localhost:8001

Deberías ver el Dashboard de Portfolio Tracker con interfaz oscura profesional.

---

## 📦 Docker Setup (OPCIÓN ALTERNATIVA)

Si prefieres usar Docker:

```bash
cd MVPPORTFOLIO

# Asegura que Docker Desktop esté ejecutándose
# Luego:
docker-compose up

# Espera a que ambos servicios estén listos
# Verás:
# backend_1  | INFO:     Uvicorn running on http://0.0.0.0:8000
# frontend_1 | Serving HTTP on 0.0.0.0 port 8001
```

**URLs:**
- Backend: http://localhost:8000
- Frontend: http://localhost:8001

**Para detener:**
```bash
docker-compose down
```

---

## 🤏 Primer uso

### Crear una posición

1. **Ir a** "Posiciones" en el menú lateral
2. **Clickear** el botón "➕ Añadir posición"
3. **Rellenar:**
   - Ticker: `AAPL` (o tu empresa favorita)
   - Cantidad: `10`
   - Precio compra: `150.00`
   - Fecha compra: `2024-01-01`
   - Precio actual: `180.00`
4. **Clickear** "Crear"

### Ver Dashboard

1. **Ir a** "Dashboard"
2. Verás métricas en tiempo real:
   - Total invertido
   - Valor actual
   - P&L (ganancias/pérdidas)
   - ROI%
   - Gráfico de distribución

### Actualizar precios

1. **Ir a** "Posiciones"
2. **Clickear** el icono de edición (🗒️) en la posición
3. **Cambiar** "Precio actual"
4. **Guardar**

### Ver Analytics

1. **Ir a** "Analytics"
2. Ver:
   - Gráfico de tipos de posición
   - Rentabilidad por posición
   - Top 10 mejor rendimiento

### Aprender

1. **Ir a** "Educación"
2. Ver:
   - Ratios financieros explicados
   - Glosario de términos
   - Tips de inversión

---

## 🔢 Testing

```bash
cd backend

# Ejecutar todos los tests
pytest

# Con salida detallada
pytest -v

# Test específico
pytest tests/test_positions.py -v

# Con coverage
pytest --cov=app
```

Esperado: **Todos los tests deben pasar** ✅

---

## 🗣️ Troubleshooting

### Backend no inicia

```bash
# Problema: "Port 8000 already in use"
# Solución: Cambiar puerto
python -m uvicorn app.main:app --reload --port 8080

# Problema: "ModuleNotFoundError: No module named 'fastapi'"
# Solución: Asegurar venv activado e instalar dependencias
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt
```

### Frontend no carga

```bash
# Problema: "Connection refused" a http://localhost:8001
# Solución: Asegurar que http.server está corriendo
python -m http.server 8001

# Problema: CORS error en consola
# Solución: El backend debe estar corriendo en http://localhost:8000
```

### Base de datos corrupta

```bash
# Eliminar base de datos y recrear
rm portfolio.db
python -m uvicorn app.main:app --reload

# Se recreará automáticamente
```

### Limpiar todo

```bash
cd backend

# Desactivar venv
deactivate

# Eliminar venv
rm -rf venv  # o rmdir /s venv en Windows

# Empezar desde cero
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 📄 Variables de entorno

Editar `backend/.env` si necesitas cambiar:

```bash
# Debug mode
DEBUG=False                # Cambiar a True para desarrollo

# Database
DATABASE_URL="sqlite:///./portfolio.db"

# CORS (agregar más URLs si lo necesitas)
ALLOWED_ORIGINS=["http://localhost:3000","http://localhost:8000","http://localhost:8001"]
```

---

## 📁 Estructura de archivos

Ahora tendrás esta estructura:

```
MVPPORTFOLIO/
├─ backend/
│  ├─ app/
│  │  ├─ models/
│  │  ├─ schemas/
│  │  ├─ services/
│  │  ├─ api/
│  │  ├─ utils/
│  │  ├─ main.py
│  │  └─ database.py
│  ├─ tests/
│  ├─ venv/  (creado automáticamente)
│  ├─ portfolio.db  (creado automáticamente)
│  ├─ requirements.txt
│  └─ README.md
├─ frontend/
│  ├─ src/
│  │  ├─ index.html
│  │  ├─ js/
│  │  └─ assets/
│  └─ README.md
├─ docker-compose.yml
├─ README.md
└─ SETUP_GUIDE.md
```

---

## 🌟 Próximos pasos

- [ ] Crear tus primeras posiciones
- [ ] Experimentar con analytics
- [ ] Aprender los conceptos en Educación
- [ ] Exportar tus datos a CSV
- [ ] Leer el [README principal](README.md)
- [ ] Explorar la [API Swagger](http://localhost:8000/docs)
- [ ] Leer [Backend README](backend/README.md)
- [ ] Leer [Frontend README](frontend/README.md)

---

## 📈 Recursos

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **SQLAlchemy Docs**: https://docs.sqlalchemy.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **Chart.js**: https://www.chartjs.org/

---

## 📞 Soporte

Si tienes problemas:

1. Revisa [Troubleshooting](#-troubleshooting) arriba
2. Abre un [Issue en GitHub](https://github.com/Pasquii4/MVPPORTFOLIO/issues)
3. Incluye:
   - Tu sistema operativo
   - Versión de Python
   - El error completo
   - Pasos para reproducir

---

**¡Hecho con ❤️ para inversores!**

🚀 ¡Ahora a invertir inteligentemente!
