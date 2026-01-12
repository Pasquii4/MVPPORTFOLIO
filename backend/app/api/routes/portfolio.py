"""Rutas mejoradas del portfolio con cálculos seguros"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.position_service import PositionService
from app.utils.calculations import PortfolioCalculations

router = APIRouter(prefix="/portfolio", tags=["portfolio"])


@router.get("/metrics")
def get_portfolio_metrics(db: Session = Depends(get_db)):
    """Obtener métricas del portfolio"""
    try:
        positions = PositionService.get_all_positions(db)
        closed_positions = PositionService.get_closed_positions(db)

        metrics = PortfolioCalculations.calculate_portfolio_metrics(positions, closed_positions)
        metrics = PortfolioCalculations.validate_metrics(metrics)

        return metrics
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al calcular métricas: {str(e)}",
        )


@router.get("/distribution")
def get_portfolio_distribution(db: Session = Depends(get_db)):
    """Obtener distribución del portfolio por ticker"""
    try:
        positions = PositionService.get_all_positions(db)
        total_value = PortfolioCalculations.calculate_total_value(positions)

        if total_value == 0:
            return {"distribution": [], "total_value": 0}

        distribution = []
        for position in positions:
            weight = PortfolioCalculations.calculate_position_weight(position, total_value)
            distribution.append(
                {
                    "ticker": position.ticker,
                    "value": max(0, position.current_value),
                    "weight": weight,
                    "name": position.name or position.ticker,
                }
            )

        return {
            "distribution": sorted(distribution, key=lambda x: x["weight"], reverse=True),
            "total_value": total_value,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al calcular distribución: {str(e)}",
        )


@router.get("/analytics")
def get_portfolio_analytics(db: Session = Depends(get_db)):
    """Obtener analytics avanzados del portfolio"""
    try:
        positions = PositionService.get_all_positions(db)
        closed_positions = PositionService.get_closed_positions(db)
        total_value = PortfolioCalculations.calculate_total_value(positions)

        return {
            "diversification_index": PortfolioCalculations.calculate_diversification_index(
                positions
            ),
            "concentration": PortfolioCalculations.calculate_concentration(positions),
            "metrics": PortfolioCalculations.calculate_portfolio_metrics(
                positions, closed_positions
            ),
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al calcular analytics: {str(e)}",
        )
