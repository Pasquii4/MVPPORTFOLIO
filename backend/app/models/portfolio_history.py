from sqlalchemy import Column, Integer, Date, Float, DateTime
from sqlalchemy.sql import func
from datetime import datetime
from app.database import Base

class PortfolioHistory(Base):
    """Historial diario de patrimonio total"""
    __tablename__ = "portfolio_history"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False, unique=True, index=True)
    total_value = Column(Float, nullable=False)
    total_invested = Column(Float, nullable=False)
    total_pl = Column(Float, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    
    @property
    def pl_percentage(self):
        if self.total_invested == 0:
            return 0
        return (self.total_pl / self.total_invested) * 100
