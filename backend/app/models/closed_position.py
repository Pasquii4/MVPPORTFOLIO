from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Enum, Text
from sqlalchemy.sql import func
from datetime import datetime
from app.database import Base
from app.models.position import PositionType

class ClosedPosition(Base):
    """Modelo de posición cerrada (vendida)"""
    __tablename__ = "closed_positions"
    
    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String(20), nullable=False, index=True)
    name = Column(String(255), nullable=True)
    position_type = Column(Enum(PositionType), default=PositionType.STOCK)
    
    # Datos compra
    quantity = Column(Float, nullable=False)
    buy_price = Column(Float, nullable=False)
    buy_date = Column(Date, nullable=False)
    
    # Datos venta
    sell_price = Column(Float, nullable=False)
    sell_date = Column(Date, nullable=False)
    
    # Rendimiento
    dividends = Column(Float, default=0)
    
    # Extras
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    
    @property
    def invested_amount(self):
        return self.quantity * self.buy_price
    
    @property
    def sold_amount(self):
        return self.quantity * self.sell_price
    
    @property
    def unrealized_pl(self):
        return self.sold_amount - self.invested_amount
    
    @property
    def total_pl(self):
        return self.unrealized_pl + self.dividends
    
    @property
    def pl_percentage(self):
        if self.invested_amount == 0:
            return 0
        return (self.total_pl / self.invested_amount) * 100
    
    @property
    def days_held(self):
        """Días que se mantuvo la posición"""
        delta = self.sell_date - self.buy_date
        return delta.days
