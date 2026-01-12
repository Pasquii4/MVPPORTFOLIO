"""Servicio de gestión de posiciones mejorado"""
from sqlalchemy.orm import Session
from datetime import date
from app.models.position import Position
from app.models.closed_position import ClosedPosition
from app.schemas.position import PositionCreate, PositionUpdate
from app.utils.validators import validate_position_data, validate_sell_data, validate_update_data, ValidationError

class PositionService:
    """Servicio de gestión de posiciones con validaciones mejoradas"""
    
    @staticmethod
    def create_position(db: Session, position_data: PositionCreate) -> Position:
        """Crear nueva posición con validaciones exhaustivas"""
        try:
            validate_position_data(position_data)
        except ValidationError as e:
            raise ValueError(str(e))
        
        # Verificar si ya existe posición similar
        existing = db.query(Position).filter(
            Position.ticker == position_data.ticker.upper()
        ).first()
        
        db_position = Position(
            ticker=position_data.ticker.upper().strip(),
            name=position_data.name.strip() if position_data.name else None,
            position_type=position_data.position_type,
            quantity=position_data.quantity,
            buy_price=position_data.buy_price,
            buy_date=position_data.buy_date,
            current_price=position_data.current_price,
            dividends=position_data.dividends,
            notes=position_data.notes.strip() if position_data.notes else None,
        )
        
        db.add(db_position)
        db.commit()
        db.refresh(db_position)
        return db_position
    
    @staticmethod
    def get_all_positions(db: Session) -> list:
        """Obtener todas las posiciones abiertas ordenadas"""
        return db.query(Position).order_by(Position.ticker).all()
    
    @staticmethod
    def get_position_by_id(db: Session, position_id: int) -> Position:
        """Obtener posición por ID"""
        if position_id <= 0:
            raise ValueError("position_id debe ser mayor a 0")
        return db.query(Position).filter(Position.id == position_id).first()
    
    @staticmethod
    def update_position(db: Session, position_id: int, update_data: PositionUpdate) -> Position:
        """Actualizar posición con validaciones"""
        if position_id <= 0:
            raise ValueError("position_id debe ser mayor a 0")
        
        db_position = PositionService.get_position_by_id(db, position_id)
        if not db_position:
            raise ValueError(f"Position {position_id} not found")
        
        # Validar datos de actualización
        if update_data.current_price:
            try:
                validate_update_data(update_data.current_price, update_data.dividends)
            except ValidationError as e:
                raise ValueError(str(e))
        
        update_dict = update_data.dict(exclude_unset=True)
        
        # Sanitizar strings
        if 'notes' in update_dict and update_dict['notes']:
            update_dict['notes'] = update_dict['notes'].strip()
        
        for key, value in update_dict.items():
            if value is not None:
                setattr(db_position, key, value)
        
        db.commit()
        db.refresh(db_position)
        return db_position
    
    @staticmethod
    def delete_position(db: Session, position_id: int) -> bool:
        """Eliminar posición"""
        if position_id <= 0:
            raise ValueError("position_id debe ser mayor a 0")
        
        db_position = PositionService.get_position_by_id(db, position_id)
        if not db_position:
            raise ValueError(f"Position {position_id} not found")
        
        db.delete(db_position)
        db.commit()
        return True
    
    @staticmethod
    def sell_position(db: Session, position_id: int, sell_price: float, sell_date: date) -> ClosedPosition:
        """Vender posición con validaciones exhaustivas"""
        if position_id <= 0:
            raise ValueError("position_id debe ser mayor a 0")
        
        db_position = PositionService.get_position_by_id(db, position_id)
        if not db_position:
            raise ValueError(f"Position {position_id} not found")
        
        try:
            validate_sell_data(db_position.buy_price, sell_price, db_position.buy_date, sell_date)
        except ValidationError as e:
            raise ValueError(str(e))
        
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
        if not position_type:
            raise ValueError("position_type no puede estar vacío")
        return db.query(Position).filter(Position.position_type == position_type).all()
    
    @staticmethod
    def get_position_by_ticker(db: Session, ticker: str) -> list:
        """Obtener todas las posiciones de un ticker"""
        if not ticker:
            raise ValueError("ticker no puede estar vacío")
        return db.query(Position).filter(Position.ticker == ticker.upper()).all()
