from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    """Configuración de la aplicación"""
    
    # App
    APP_NAME: str = "Portfolio Tracker"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    
    # CORS
    ALLOWED_ORIGINS: list = ["http://localhost:3000", "http://localhost:8000", "http://localhost:8001"]
    
    # Paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
