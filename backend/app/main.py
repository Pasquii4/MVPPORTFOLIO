"""Entry point de FastAPI"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.config import settings
from app.api.routes import positions, portfolio, education

# Inicializar DB
init_db()

# Crear app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Portfolio Tracker profesional para gestión de inversiones",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(positions.router)
app.include_router(portfolio.router)
app.include_router(education.router)

@app.get("/")
def root():
    return {
        "message": "Portfolio Tracker API",
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": settings.APP_VERSION}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=settings.DEBUG)
