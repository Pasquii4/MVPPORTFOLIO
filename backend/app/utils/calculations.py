"""Cálculos financieros del portfolio"""
from datetime import date, datetime
from typing import List
from app.models.position import Position
from app.models.closed_position import ClosedPosition

class PortfolioCalculations:
    """Cálculos financieros del portfolio"""
    
    @staticmethod
    def calculate_total_invested(positions: List[Position], closed_positions: List[ClosedPosition]) -> float:
        """Total invertido (posiciones abiertas + cerradas)"""
        open_invested = sum(p.invested_amount for p in positions)
        closed_invested = sum(cp.invested_amount for cp in closed_positions)
        return open_invested + closed_invested
    
    @staticmethod
    def calculate_total_value(positions: List[Position]) -> float:
        """Valor total actual del portfolio"""
        return sum(p.current_value for p in positions)
    
    @staticmethod
    def calculate_total_pl(positions: List[Position], closed_positions: List[ClosedPosition]) -> float:
        """P&L total (abierto + cerrado)"""
        open_pl = sum(p.total_pl for p in positions)
        closed_pl = sum(cp.total_pl for cp in closed_positions)
        return open_pl + closed_pl
    
    @staticmethod
    def calculate_portfolio_metrics(positions: List[Position], closed_positions: List[ClosedPosition]) -> dict:
        """Métricas completas del portfolio"""
        total_invested = PortfolioCalculations.calculate_total_invested(positions, closed_positions)
        total_value = PortfolioCalculations.calculate_total_value(positions)
        total_pl = PortfolioCalculations.calculate_total_pl(positions, closed_positions)
        
        if total_invested == 0:
            pl_percentage = 0
        else:
            pl_percentage = (total_pl / total_invested) * 100
        
        return {
            "total_invested": round(total_invested, 2),
            "total_value": round(total_value, 2),
            "total_pl": round(total_pl, 2),
            "pl_percentage": round(pl_percentage, 2),
            "num_open_positions": len(positions),
            "num_closed_positions": len(closed_positions),
        }
    
    @staticmethod
    def calculate_position_weight(position: Position, total_value: float) -> float:
        """Peso de una posición en el portfolio"""
        if total_value == 0:
            return 0
        return (position.current_value / total_value) * 100
    
    @staticmethod
    def calculate_diversification_index(positions: List[Position]) -> float:
        """Indice de diversificación (0-1, donde 1 es perfecta diversificación)"""
        if not positions:
            return 0
        
        total_value = sum(p.current_value for p in positions)
        if total_value == 0:
            return 0
        
        weights = [p.current_value / total_value for p in positions]
        herfindahl = sum(w**2 for w in weights)
        
        # Normalizar a 0-1
        diversification = 1 - herfindahl
        return round(diversification, 2)
    
    @staticmethod
    def calculate_annualized_return(total_pl: float, total_invested: float, days_held: int) -> float:
        """Retorno anualizado"""
        if total_invested == 0 or days_held == 0:
            return 0
        
        roi_percentage = (total_pl / total_invested) * 100
        annualized = roi_percentage * (365 / days_held)
        return round(annualized, 2)
