"""Dependencias de inyección"""
from app.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends

def get_database() -> Session:
    """Obtener sesión de base de datos"""
    return get_db()
