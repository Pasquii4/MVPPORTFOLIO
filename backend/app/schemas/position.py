"""Schemas mejorados de validación para posiciones"""
from pydantic import BaseModel, Field, validator
from datetime import date
from typing import Optional


class PositionBase(BaseModel):
    """Base schema para posiciones"""
    ticker: str = Field(..., min_length=1, max_length=20)
    name: Optional[str] = Field(None, max_length=255)
    position_type: str = Field(default="stock")
    quantity: float = Field(..., gt=0, le=1000000)
    buy_price: float = Field(..., gt=0, le=1000000)
    buy_date: date
    current_price: float = Field(..., gt=0, le=1000000)
    dividends: float = Field(default=0, ge=0)
    notes: Optional[str] = Field(None, max_length=1000)

    @validator('ticker')
    def validate_ticker(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('ticker no puede estar vacío')
        if not v.replace('-', '').replace('.', '').isalnum():
            raise ValueError('ticker solo puede contener letras, números, guiones y puntos')
        return v.upper().strip()

    @validator('buy_date')
    def validate_buy_date(cls, v):
        if v > date.today():
            raise ValueError('buy_date no puede ser en el futuro')
        return v

    @validator('name', 'notes', pre=True, always=True)
    def strip_strings(cls, v):
        if isinstance(v, str):
            return v.strip()
        return v


class PositionCreate(PositionBase):
    """Schema para crear posición"""
    pass


class PositionUpdate(BaseModel):
    """Schema para actualizar posición"""
    current_price: Optional[float] = Field(None, gt=0, le=1000000)
    dividends: Optional[float] = Field(None, ge=0)
    notes: Optional[str] = Field(None, max_length=1000)
    name: Optional[str] = Field(None, max_length=255)


class PositionResponse(PositionBase):
    """Schema de respuesta para posición"""
    id: int

    class Config:
        from_attributes = True


class SellPositionRequest(BaseModel):
    """Schema para vender posición"""
    sell_price: float = Field(..., gt=0, le=1000000)
    sell_date: date

    @validator('sell_date')
    def validate_sell_date(cls, v):
        if v > date.today():
            raise ValueError('sell_date no puede ser en el futuro')
        return v
