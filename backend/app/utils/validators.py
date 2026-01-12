"""Validadores de datos mejorados"""
from datetime import date
from app.schemas.position import PositionCreate, PositionUpdate

class ValidationError(Exception):
    """Excepción personalizada para validación"""
    pass

def validate_position_data(position_data: PositionCreate) -> None:
    """Validar datos de posición con validaciones exhaustivas"""
    
    # Validar ticker
    if not position_data.ticker or len(position_data.ticker.strip()) == 0:
        raise ValidationError("ticker no puede estar vacío")
    if len(position_data.ticker) > 20:
        raise ValidationError("ticker no puede exceder 20 caracteres")
    if not position_data.ticker.replace('-', '').replace('.', '').isalnum():
        raise ValidationError("ticker solo puede contener letras, números, guiones y puntos")
    
    # Validar cantidad
    if position_data.quantity <= 0:
        raise ValidationError("quantity debe ser mayor a 0")
    if position_data.quantity > 1000000:
        raise ValidationError("quantity no puede exceder 1,000,000")
    
    # Validar precios
    if position_data.buy_price <= 0:
        raise ValidationError("buy_price debe ser mayor a 0")
    if position_data.current_price <= 0:
        raise ValidationError("current_price debe ser mayor a 0")
    if position_data.buy_price > 1000000:
        raise ValidationError("buy_price no puede exceder 1,000,000")
    if position_data.current_price > 1000000:
        raise ValidationError("current_price no puede exceder 1,000,000")
    
    # Validar fecha
    if position_data.buy_date > date.today():
        raise ValidationError("buy_date no puede ser en el futuro")
    
    # Validar dividendos
    if position_data.dividends < 0:
        raise ValidationError("dividends no puede ser negativo")
    if position_data.dividends > position_data.quantity * position_data.buy_price * 10:
        raise ValidationError("dividends parece ser demasiado alto")
    
    # Validar nombre (opcional)
    if position_data.name and len(position_data.name) > 255:
        raise ValidationError("name no puede exceder 255 caracteres")
    
    # Validar notes (opcional)
    if position_data.notes and len(position_data.notes) > 1000:
        raise ValidationError("notes no puede exceder 1000 caracteres")

def validate_sell_data(buy_price: float, sell_price: float, buy_date: date, sell_date: date) -> None:
    """Validar datos de venta"""
    if sell_price <= 0:
        raise ValidationError("sell_price debe ser mayor a 0")
    if sell_price > 1000000:
        raise ValidationError("sell_price no puede exceder 1,000,000")
    if sell_date < buy_date:
        raise ValidationError("sell_date debe ser posterior a buy_date")
    if sell_date > date.today():
        raise ValidationError("sell_date no puede ser en el futuro")

def validate_update_data(current_price: float, dividends: float) -> None:
    """Validar datos de actualización"""
    if current_price and current_price <= 0:
        raise ValidationError("current_price debe ser mayor a 0")
    if current_price and current_price > 1000000:
        raise ValidationError("current_price no puede exceder 1,000,000")
    if dividends is not None and dividends < 0:
        raise ValidationError("dividends no puede ser negativo")
