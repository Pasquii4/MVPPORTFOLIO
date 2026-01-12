"""Tests de posiciones"""
import pytest
from datetime import date
from app.schemas.position import PositionCreate
from app.services.position_service import PositionService

def test_create_position(db):
    """Test crear posición"""
    position_data = PositionCreate(
        ticker="AAPL",
        name="Apple Inc.",
        quantity=10,
        buy_price=150.0,
        buy_date=date(2024, 1, 1),
        current_price=180.0,
        dividends=5.0,
    )
    
    position = PositionService.create_position(db, position_data)
    
    assert position.ticker == "AAPL"
    assert position.quantity == 10
    assert position.invested_amount == 1500.0
    assert position.current_value == 1800.0
    assert position.total_pl == 305.0

def test_get_all_positions(db, client):
    """Test obtener todas las posiciones"""
    response = client.get("/api/positions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_position(db):
    """Test actualizar posición"""
    # Crear posición
    position_data = PositionCreate(
        ticker="GOOGL",
        name="Google",
        quantity=5,
        buy_price=100.0,
        buy_date=date(2024, 1, 1),
        current_price=110.0,
    )
    position = PositionService.create_position(db, position_data)
    
    # Actualizar precio
    from app.schemas.position import PositionUpdate
    update_data = PositionUpdate(current_price=120.0)
    updated = PositionService.update_position(db, position.id, update_data)
    
    assert updated.current_price == 120.0
    assert updated.current_value == 600.0

def test_delete_position(db):
    """Test eliminar posición"""
    # Crear
    position_data = PositionCreate(
        ticker="MSFT",
        name="Microsoft",
        quantity=2,
        buy_price=300.0,
        buy_date=date(2024, 1, 1),
        current_price=320.0,
    )
    position = PositionService.create_position(db, position_data)
    
    # Eliminar
    result = PositionService.delete_position(db, position.id)
    assert result == True
    
    # Verificar
    deleted = PositionService.get_position_by_id(db, position.id)
    assert deleted is None
