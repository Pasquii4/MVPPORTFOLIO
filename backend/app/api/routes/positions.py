"""Rutas de posiciones"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.position import PositionCreate, PositionUpdate, PositionResponse, ClosedPositionResponse
from app.services.position_service import PositionService
from typing import List
from datetime import date

router = APIRouter(prefix="/api/positions", tags=["positions"])

@router.get("/", response_model=List[PositionResponse])
def get_all_positions(db: Session = Depends(get_db)):
    """Obtener todas las posiciones abiertas"""
    try:
        positions = PositionService.get_all_positions(db)
        return positions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{position_id}", response_model=PositionResponse)
def get_position(position_id: int, db: Session = Depends(get_db)):
    """Obtener posición por ID"""
    position = PositionService.get_position_by_id(db, position_id)
    if not position:
        raise HTTPException(status_code=404, detail="Position not found")
    return position

@router.post("/", response_model=PositionResponse)
def create_position(position: PositionCreate, db: Session = Depends(get_db)):
    """Crear nueva posición"""
    try:
        return PositionService.create_position(db, position)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{position_id}", response_model=PositionResponse)
def update_position(position_id: int, position_update: PositionUpdate, db: Session = Depends(get_db)):
    """Actualizar posición (normalmente precio actual)"""
    try:
        return PositionService.update_position(db, position_id, position_update)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{position_id}")
def delete_position(position_id: int, db: Session = Depends(get_db)):
    """Eliminar posición (sin vender)"""
    try:
        PositionService.delete_position(db, position_id)
        return {"message": "Position deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{position_id}/sell")
def sell_position(position_id: int, sell_price: float, sell_date: str, db: Session = Depends(get_db)):
    """Vender posición (pasar a cerrada)"""
    try:
        sell_date_obj = date.fromisoformat(sell_date)
        closed = PositionService.sell_position(db, position_id, sell_price, sell_date_obj)
        return {
            "message": "Position sold successfully",
            "closed_position": {
                "id": closed.id,
                "ticker": closed.ticker,
                "pl": closed.total_pl,
                "pl_percentage": closed.pl_percentage,
            }
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/closed/all", response_model=List[ClosedPositionResponse])
def get_closed_positions(db: Session = Depends(get_db)):
    """Obtener posiciones cerradas"""
    try:
        positions = PositionService.get_closed_positions(db)
        return positions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
