"""Rutas de posiciones cerradas"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.position_service import PositionService
from app.schemas.position import ClosedPositionResponse

router = APIRouter(prefix="/closed-positions", tags=["closed-positions"])


@router.get("/", response_model=list[ClosedPositionResponse])
def get_closed_positions(db: Session = Depends(get_db)):
    """Obtener todas las posiciones cerradas"""
    try:
        closed_positions = PositionService.get_closed_positions(db)
        return closed_positions
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener posiciones cerradas: {str(e)}",
        )


@router.get("/stats")
def get_closed_positions_stats(db: Session = Depends(get_db)):
    """Obtener estadísticas de posiciones cerradas"""
    try:
        closed_positions = PositionService.get_closed_positions(db)
        
        if not closed_positions:
            return {
                "total_closed": 0,
                "total_pl": 0.0,
                "average_roi": 0.0,
                "best_trade": None,
                "worst_trade": None,
            }
        
        total_pl = sum(cp.total_pl for cp in closed_positions)
        total_invested = sum(cp.invested_amount for cp in closed_positions)
        
        average_roi = (
            (total_pl / total_invested * 100) if total_invested > 0 else 0
        )
        
        best_trade = max(closed_positions, key=lambda cp: cp.total_pl)
        worst_trade = min(closed_positions, key=lambda cp: cp.total_pl)
        
        return {
            "total_closed": len(closed_positions),
            "total_pl": round(total_pl, 2),
            "average_roi": round(average_roi, 2),
            "best_trade": {
                "ticker": best_trade.ticker,
                "pl": round(best_trade.total_pl, 2),
            },
            "worst_trade": {
                "ticker": worst_trade.ticker,
                "pl": round(worst_trade.total_pl, 2),
            },
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al calcular estadísticas: {str(e)}",
        )
