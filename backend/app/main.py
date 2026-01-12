"""Aplicación FastAPI principal mejorada"""
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.database import engine, Base
from app.api.routes import positions, portfolio, closed_positions, education
from app.config import settings

# Crear tablas de base de datos
Base.metadata.create_all(bind=engine)

# Inicializar app
app = FastAPI(
    title="Portfolio Tracker API",
    description="API para gestión profesional de carteras de inversión",
    version="1.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Middleware de seguridad: Trusted Host
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "localhost:3000", "localhost:8000", "localhost:8001"],
)

# CORS mejorado
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS or [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost:8001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["health"])
def root():
    """Endpoint de verificación de salud"""
    return {
        "message": "Portfolio Tracker API",
        "version": "1.1.0",
        "status": "online",
    }


@app.get("/health", tags=["health"])
def health_check():
    """Health check para monitoreo"""
    return {"status": "healthy", "version": "1.1.0"}


@app.get("/api/status", tags=["health"])
def api_status():
    """Status de la API"""
    return {
        "api": "online",
        "database": "connected",
        "version": "1.1.0",
    }


# Incluir rutas
app.include_router(positions.router, prefix="/api")
app.include_router(portfolio.router, prefix="/api")
app.include_router(closed_positions.router, prefix="/api")
app.include_router(education.router, prefix="/api")


# Manejador global de excepciones
@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return {
        "detail": f"Internal server error: {str(exc)}",
        "status_code": 500,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
    )
