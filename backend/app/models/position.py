from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Enum, Text
from sqlalchemy.sql import func
from datetime import datetime
from app.database import Base
import enum

class PositionType(str, enum.Enum):
    STOCK = "stock"
    ETF = "etf"
    CRYPTO = "crypto"
    CURRENCY = "currency"

class Position(Base):
    """Modelo de posición abierta"""
    __tablename__ = "positions"
    
    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String(20), nullable=False, index=True)
    name = Column(String(255), nullable=True)
    position_type = Column(Enum(PositionType), default=PositionType.STOCK)
    
    # Datos de compra
    quantity = Column(Float, nullable=False)
    buy_price = Column(Float, nullable=False)
    buy_date = Column(Date, nullable=False)
    
    # Datos actuales
    current_price = Column(Float, nullable=False)
    current_price_updated_at = Column(DateTime, default=datetime.utcnow)
    
    # Rendimiento
    dividends = Column(Float, default=0)
    notes = Column(Text, nullable=True)
    
    # Control
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    def __repr__(self):
        return f"<Position {self.ticker} x{self.quantity}>"
    
    @property
    def invested_amount(self):
        """Total invertido"""
        return self.quantity * self.buy_price
    
    @property
    def current_value(self):
        """Valor actual"""
        return self.quantity * self.current_price
    
    @property
    def unrealized_pl(self):
        """P&L no realizado (sin incluir dividendos)"""
        return self.current_value - self.invested_amount
    
    @property
    def total_pl(self):
        """P&L total (incluye dividendos)"""
        return self.unrealized_pl + self.dividends
    
    @property
    def pl_percentage(self):
        """P&L en porcentaje"""
        if self.invested_amount == 0:
            return 0
        return (self.total_pl / self.invested_amount) * 100
    
    @property
    def roi(self):
        """Retorno sobre inversión (ROI)"""
        return self.pl_percentage
