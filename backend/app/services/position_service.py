"""Servicio de gestión de posiciones"""
from sqlalchemy.orm import Session
from datetime import date
from app.models.position import Position
from app.models.closed_position import ClosedPosition
from app.schemas.position import PositionCreate, PositionUpdate
from app.utils.validators import validate_position_data, validate_sell_data

class PositionService:
    """Servicio de gestión de posiciones"""
    
    @staticmethod
    def create_position(db: Session, position_data: PositionCreate) -> Position:
        """Crear nueva posición"""
        validate_position_data(position_data)
        
        db_position = Position(
            ticker=position_data.ticker.upper(),
            name=position_data.name,
            position_type=position_data.position_type,
            quantity=position_data.quantity,
            buy_price=position_data.buy_price,
            buy_date=position_data.buy_date,
            current_price=position_data.current_price,
            dividends=position_data.dividends,
            notes=position_data.notes,
        )
        
        db.add(db_position)
        db.commit()
        db.refresh(db_position)
        return db_position
    
    @staticmethod
    def get_all_positions(db: Session) -> list:
        """Obtener todas las posiciones abiertas"""
        return db.query(Position).order_by(Position.ticker).all()
    
    @staticmethod
    def get_position_by_id(db: Session, position_id: int) -> Position:
        """Obtener posición por ID"""
        return db.query(Position).filter(Position.id == position_id).first()
    
    @staticmethod
    def update_position(db: Session, position_id: int, update_data: PositionUpdate) -> Position:
        """Actualizar posición"""
        db_position = PositionService.get_position_by_id(db, position_id)
        
        if not db_position:
            raise ValueError(f"Position {position_id} not found")
        
        update_dict = update_data.dict(exclude_unset=True)
        for key, value in update_dict.items():
            setattr(db_position, key, value)
        
        db.commit()
        db.refresh(db_position)
        return db_position
    
    @staticmethod
    def delete_position(db: Session, position_id: int) -> bool:
        """Eliminar posición"""
        db_position = PositionService.get_position_by_id(db, position_id)
        
        if not db_position:
            raise ValueError(f"Position {position_id} not found")
        
        db.delete(db_position)
        db.commit()
        return True
    
    @staticmethod
    def sell_position(db: Session, position_id: int, sell_price: float, sell_date: date) -> ClosedPosition:
        """Vender posición (pasar a cerrada)"""
        db_position = PositionService.get_position_by_id(db, position_id)
        
        if not db_position:
            raise ValueError(f"Position {position_id} not found")
        
        validate_sell_data(db_position.buy_price, sell_price, db_position.buy_date, sell_date)
        
        # Crear posición cerrada
        closed = ClosedPosition(
            ticker=db_position.ticker,
            name=db_position.name,
            position_type=db_position.position_type,
            quantity=db_position.quantity,
            buy_price=db_position.buy_price,
            buy_date=db_position.buy_date,
            sell_price=sell_price,
            sell_date=sell_date,
            dividends=db_position.dividends,
            notes=db_position.notes,
        )
        
        db.add(closed)
        db.delete(db_position)
        db.commit()
        db.refresh(closed)
        
        return closed
    
    @staticmethod
    def get_closed_positions(db: Session) -> list:
        """Obtener posiciones cerradas"""
        return db.query(ClosedPosition).order_by(ClosedPosition.sell_date.desc()).all()
    
    @staticmethod
    def get_positions_by_type(db: Session, position_type: str) -> list:
        """Obtener posiciones por tipo"""
        return db.query(Position).filter(Position.position_type == position_type).all()
