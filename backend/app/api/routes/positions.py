"""Rutas mejoradas de gestión de posiciones con mejor manejo de errores"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date
from app.database import get_db
from app.schemas.position import (
    PositionCreate,
    PositionUpdate,
    PositionResponse,
    SellPositionRequest,
)
from app.services.position_service import PositionService

router = APIRouter(prefix="/positions", tags=["positions"])


@router.get("/", response_model=list[PositionResponse])
def get_positions(db: Session = Depends(get_db)):
    """Obtener todas las posiciones abiertas"""
    try:
        positions = PositionService.get_all_positions(db)
        return positions
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener posiciones: {str(e)}",
        )


@router.get("/{position_id}", response_model=PositionResponse)
def get_position(position_id: int, db: Session = Depends(get_db)):
    """Obtener posición por ID"""
    try:
        if position_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="position_id debe ser mayor a 0",
            )

        position = PositionService.get_position_by_id(db, position_id)
        if not position:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Posición {position_id} no encontrada",
            )
        return position
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener posición: {str(e)}",
        )


@router.post("/", response_model=PositionResponse, status_code=status.HTTP_201_CREATED)
def create_position(position_data: PositionCreate, db: Session = Depends(get_db)):
    """Crear nueva posición"""
    try:
        new_position = PositionService.create_position(db, position_data)
        return new_position
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Datos inválidos: {str(e)}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear posición: {str(e)}",
        )


@router.put("/{position_id}", response_model=PositionResponse)
def update_position(
    position_id: int, update_data: PositionUpdate, db: Session = Depends(get_db)
):
    """Actualizar posición existente"""
    try:
        if position_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="position_id debe ser mayor a 0",
            )

        updated_position = PositionService.update_position(db, position_id, update_data)
        return updated_position
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Datos inválidos: {str(e)}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar posición: {str(e)}",
        )


@router.delete("/{position_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_position(position_id: int, db: Session = Depends(get_db)):
    """Eliminar posición"""
    try:
        if position_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="position_id debe ser mayor a 0",
            )

        PositionService.delete_position(db, position_id)
        return None
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Error: {str(e)}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al eliminar posición: {str(e)}",
        )


@router.post("/{position_id}/sell", response_model=dict)
def sell_position(
    position_id: int, sell_data: SellPositionRequest, db: Session = Depends(get_db)
):
    """Vender posición (mover a cerradas)"""
    try:
        if position_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="position_id debe ser mayor a 0",
            )

        closed_position = PositionService.sell_position(
            db, position_id, sell_data.sell_price, sell_data.sell_date
        )
        return {
            "message": "Posición vendida exitosamente",
            "closed_position": {
                "id": closed_position.id,
                "ticker": closed_position.ticker,
                "pnl": closed_position.total_pl,
            },
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Datos inválidos: {str(e)}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al vender posición: {str(e)}",
        )
