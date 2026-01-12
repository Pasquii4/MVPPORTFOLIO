"""Validadores de datos"""
from datetime import date
from app.schemas.position import PositionCreate, PositionUpdate

def validate_position_data(position_data: PositionCreate) -> None:
    """Validar datos de posición"""
    if position_data.buy_date > date.today():
        raise ValueError("buy_date no puede ser en el futuro")
    
    if position_data.buy_price <= 0:
        raise ValueError("buy_price debe ser mayor a 0")
    
    if position_data.quantity <= 0:
        raise ValueError("quantity debe ser mayor a 0")
    
    if position_data.current_price <= 0:
        raise ValueError("current_price debe ser mayor a 0")

def validate_sell_data(buy_price: float, sell_price: float, buy_date: date, sell_date: date) -> None:
    """Validar datos de venta"""
    if sell_price <= 0:
        raise ValueError("sell_price debe ser mayor a 0")
    
    if sell_date < buy_date:
        raise ValueError("sell_date debe ser posterior a buy_date")
    
    if sell_date > date.today():
        raise ValueError("sell_date no puede ser en el futuro")
