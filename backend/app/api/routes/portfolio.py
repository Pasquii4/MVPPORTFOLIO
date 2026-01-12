"""Rutas de portfolio"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.position_service import PositionService
from app.utils.calculations import PortfolioCalculations
from datetime import datetime

router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])

@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    """Dashboard principal con métricas"""
    try:
        positions = PositionService.get_all_positions(db)
        closed_positions = PositionService.get_closed_positions(db)
        
        metrics = PortfolioCalculations.calculate_portfolio_metrics(positions, closed_positions)
        total_value = metrics["total_value"]
        
        # Posiciones por peso
        weights = []
        for p in positions:
            weights.append({
                "ticker": p.ticker,
                "name": p.name,
                "quantity": p.quantity,
                "current_price": p.current_price,
                "current_value": round(p.current_value, 2),
                "weight": round(PortfolioCalculations.calculate_position_weight(p, total_value), 2),
                "pl": round(p.total_pl, 2),
                "pl_percentage": round(p.pl_percentage, 2),
            })
        
        return {
            "timestamp": datetime.now().isoformat(),
            "metrics": metrics,
            "positions_by_weight": sorted(weights, key=lambda x: x["weight"], reverse=True),
            "diversification_index": PortfolioCalculations.calculate_diversification_index(positions),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    """Resumen rápido del portfolio"""
    try:
        positions = PositionService.get_all_positions(db)
        closed_positions = PositionService.get_closed_positions(db)
        metrics = PortfolioCalculations.calculate_portfolio_metrics(positions, closed_positions)
        
        return {
            "total_invested": metrics["total_invested"],
            "total_value": metrics["total_value"],
            "total_pl": metrics["total_pl"],
            "pl_percentage": metrics["pl_percentage"],
            "num_open_positions": metrics["num_open_positions"],
            "num_closed_positions": metrics["num_closed_positions"],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/allocation")
def get_allocation(db: Session = Depends(get_db)):
    """Asignación de portfolio por tipo"""
    try:
        positions = PositionService.get_all_positions(db)
        total_value = sum(p.current_value for p in positions)
        
        allocation = {}
        for p in positions:
            pos_type = p.position_type.value
            if pos_type not in allocation:
                allocation[pos_type] = {"value": 0, "weight": 0, "count": 0}
            allocation[pos_type]["value"] += p.current_value
            allocation[pos_type]["count"] += 1
        
        for pos_type in allocation:
            allocation[pos_type]["value"] = round(allocation[pos_type]["value"], 2)
            allocation[pos_type]["weight"] = round(
                (allocation[pos_type]["value"] / total_value) * 100, 2
            ) if total_value > 0 else 0
        
        return allocation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
