from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional
from app.models.position import PositionType

class PositionBase(BaseModel):
    """Base de posición"""
    ticker: str = Field(..., min_length=1, max_length=20)
    name: Optional[str] = None
    position_type: PositionType = PositionType.STOCK
    quantity: float = Field(..., gt=0)
    buy_price: float = Field(..., gt=0)
    buy_date: date
    current_price: float = Field(..., gt=0)
    dividends: float = Field(default=0, ge=0)
    notes: Optional[str] = None

class PositionCreate(PositionBase):
    """Schema para crear posición"""
    pass

class PositionUpdate(BaseModel):
    """Schema para actualizar posición"""
    current_price: Optional[float] = Field(None, gt=0)
    dividends: Optional[float] = None
    notes: Optional[str] = None

class PositionResponse(PositionBase):
    """Schema de respuesta"""
    id: int
    invested_amount: float
    current_value: float
    unrealized_pl: float
    total_pl: float
    pl_percentage: float
    current_price_updated_at: datetime
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class ClosedPositionResponse(BaseModel):
    """Respuesta de posición cerrada"""
    id: int
    ticker: str
    name: Optional[str]
    position_type: PositionType
    quantity: float
    buy_price: float
    buy_date: date
    sell_price: float
    sell_date: date
    dividends: float
    invested_amount: float
    sold_amount: float
    total_pl: float
    pl_percentage: float
    days_held: int
    notes: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True
