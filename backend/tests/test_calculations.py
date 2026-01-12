"""Tests de cálculos"""
from datetime import date
from app.schemas.position import PositionCreate
from app.services.position_service import PositionService
from app.utils.calculations import PortfolioCalculations

def test_portfolio_metrics(db):
    """Test cálculos de métricas del portfolio"""
    # Crear varias posiciones
    p1 = PositionService.create_position(
        db,
        PositionCreate(
            ticker="AAPL",
            quantity=10,
            buy_price=150.0,
            buy_date=date(2024, 1, 1),
            current_price=180.0,
        )
    )
    
    p2 = PositionService.create_position(
        db,
        PositionCreate(
            ticker="GOOGL",
            quantity=5,
            buy_price=100.0,
            buy_date=date(2024, 1, 1),
            current_price=120.0,
        )
    )
    
    positions = PositionService.get_all_positions(db)
    closed = PositionService.get_closed_positions(db)
    
    metrics = PortfolioCalculations.calculate_portfolio_metrics(positions, closed)
    
    assert metrics["total_invested"] == 2000.0
    assert metrics["total_value"] == 2400.0
    assert metrics["total_pl"] == 400.0
    assert metrics["pl_percentage"] == 20.0
    assert metrics["num_open_positions"] == 2

def test_diversification_index(db):
    """Test índice de diversificación"""
    # Dos posiciones iguales = perfecta diversificación
    PositionService.create_position(
        db,
        PositionCreate(
            ticker="AAPL",
            quantity=10,
            buy_price=100.0,
            buy_date=date(2024, 1, 1),
            current_price=100.0,
        )
    )
    
    PositionService.create_position(
        db,
        PositionCreate(
            ticker="GOOGL",
            quantity=10,
            buy_price=100.0,
            buy_date=date(2024, 1, 1),
            current_price=100.0,
        )
    )
    
    positions = PositionService.get_all_positions(db)
    div_index = PortfolioCalculations.calculate_diversification_index(positions)
    
    # Con dos posiciones iguales: diversification = 1 - (0.5^2 + 0.5^2) = 0.5
    assert div_index == 0.5
