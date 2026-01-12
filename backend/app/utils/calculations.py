"""Cálculos financieros mejorados y optimizados"""
from datetime import date, datetime
from typing import List
from app.models.position import Position
from app.models.closed_position import ClosedPosition

class PortfolioCalculations:
    """Cálculos financieros del portfolio con seguridad mejorada"""
    
    @staticmethod
    def calculate_total_invested(positions: List[Position], closed_positions: List[ClosedPosition]) -> float:
        """Total invertido (posiciones abiertas + cerradas)"""
        try:
            open_invested = sum(max(0, p.invested_amount) for p in positions) if positions else 0
            closed_invested = sum(max(0, cp.invested_amount) for cp in closed_positions) if closed_positions else 0
            return round(open_invested + closed_invested, 2)
        except (TypeError, AttributeError):
            return 0.0
    
    @staticmethod
    def calculate_total_value(positions: List[Position]) -> float:
        """Valor total actual del portfolio"""
        try:
            return round(sum(max(0, p.current_value) for p in positions) if positions else 0, 2)
        except (TypeError, AttributeError):
            return 0.0
    
    @staticmethod
    def calculate_total_pl(positions: List[Position], closed_positions: List[ClosedPosition]) -> float:
        """P&L total (abierto + cerrado)"""
        try:
            open_pl = sum(p.total_pl for p in positions) if positions else 0
            closed_pl = sum(cp.total_pl for cp in closed_positions) if closed_positions else 0
            return round(open_pl + closed_pl, 2)
        except (TypeError, AttributeError):
            return 0.0
    
    @staticmethod
    def calculate_portfolio_metrics(positions: List[Position], closed_positions: List[ClosedPosition]) -> dict:
        """Métricas completas del portfolio"""
        try:
            total_invested = PortfolioCalculations.calculate_total_invested(positions, closed_positions)
            total_value = PortfolioCalculations.calculate_total_value(positions)
            total_pl = PortfolioCalculations.calculate_total_pl(positions, closed_positions)
            
            if total_invested == 0:
                pl_percentage = 0
            else:
                pl_percentage = (total_pl / total_invested) * 100
            
            return {
                "total_invested": total_invested,
                "total_value": total_value,
                "total_pl": total_pl,
                "pl_percentage": round(pl_percentage, 2),
                "num_open_positions": len(positions) if positions else 0,
                "num_closed_positions": len(closed_positions) if closed_positions else 0,
            }
        except Exception as e:
            return {
                "total_invested": 0,
                "total_value": 0,
                "total_pl": 0,
                "pl_percentage": 0,
                "num_open_positions": 0,
                "num_closed_positions": 0,
            }
    
    @staticmethod
    def calculate_position_weight(position: Position, total_value: float) -> float:
        """Peso de una posición en el portfolio"""
        try:
            if total_value <= 0 or not position:
                return 0.0
            weight = (max(0, position.current_value) / total_value) * 100
            return round(weight, 2)
        except (TypeError, AttributeError, ZeroDivisionError):
            return 0.0
    
    @staticmethod
    def calculate_diversification_index(positions: List[Position]) -> float:
        """Índice de diversificación (0-1, donde 1 es perfecta diversificación)"""
        try:
            if not positions or len(positions) == 0:
                return 0.0
            
            total_value = sum(max(0, p.current_value) for p in positions)
            if total_value == 0:
                return 0.0
            
            weights = [max(0, p.current_value) / total_value for p in positions]
            herfindahl = sum(w**2 for w in weights)
            
            diversification = max(0, min(1, 1 - herfindahl))
            return round(diversification, 2)
        except (TypeError, AttributeError, ValueError):
            return 0.0
    
    @staticmethod
    def calculate_annualized_return(total_pl: float, total_invested: float, days_held: int) -> float:
        """Retorno anualizado"""
        try:
            if total_invested == 0 or days_held <= 0:
                return 0.0
            
            roi_percentage = (total_pl / total_invested) * 100
            annualized = roi_percentage * (365 / days_held)
            return round(annualized, 2)
        except (TypeError, ZeroDivisionError, ValueError):
            return 0.0
    
    @staticmethod
    def calculate_concentration(positions: List[Position]) -> dict:
        """Calcular concentración de portfolio (top 3 posiciones)"""
        try:
            if not positions:
                return {"top_3_weight": 0, "top_3_positions": []}
            
            total_value = sum(max(0, p.current_value) for p in positions)
            if total_value == 0:
                return {"top_3_weight": 0, "top_3_positions": []}
            
            sorted_positions = sorted(
                positions,
                key=lambda p: max(0, p.current_value),
                reverse=True
            )[:3]
            
            top_3_weight = sum(
                (max(0, p.current_value) / total_value) * 100
                for p in sorted_positions
            )
            
            return {
                "top_3_weight": round(top_3_weight, 2),
                "top_3_positions": [
                    {
                        "ticker": p.ticker,
                        "weight": round((max(0, p.current_value) / total_value) * 100, 2),
                    }
                    for p in sorted_positions
                ],
            }
        except (TypeError, AttributeError, ValueError):
            return {"top_3_weight": 0, "top_3_positions": []}
    
    @staticmethod
    def validate_metrics(metrics: dict) -> dict:
        """Validar que todas las métricas sean números válidos"""
        try:
            return {
                "total_invested": float(metrics.get("total_invested", 0)),
                "total_value": float(metrics.get("total_value", 0)),
                "total_pl": float(metrics.get("total_pl", 0)),
                "pl_percentage": float(metrics.get("pl_percentage", 0)),
                "num_open_positions": int(metrics.get("num_open_positions", 0)),
                "num_closed_positions": int(metrics.get("num_closed_positions", 0)),
            }
        except (TypeError, ValueError):
            return {
                "total_invested": 0.0,
                "total_value": 0.0,
                "total_pl": 0.0,
                "pl_percentage": 0.0,
                "num_open_positions": 0,
                "num_closed_positions": 0,
            }
