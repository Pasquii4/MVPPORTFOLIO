"""Rutas de educación financiera"""
from fastapi import APIRouter
from app.utils.constants import RATIOS, GLOSSARY

router = APIRouter(prefix="/api/education", tags=["education"])

@router.get("/ratios")
def get_ratios():
    """Obtener lista de ratios financieros"""
    return {
        "ratios": RATIOS,
        "count": len(RATIOS)
    }

@router.get("/ratios/{ratio}")
def get_ratio(ratio: str):
    """Obtener detalle de un ratio"""
    ratio_upper = ratio.upper()
    if ratio_upper not in RATIOS:
        return {"error": "Ratio not found"}
    return {ratio_upper: RATIOS[ratio_upper]}

@router.get("/glossary")
def get_glossary():
    """Obtener glosario completo"""
    return {
        "glossary": GLOSSARY,
        "count": len(GLOSSARY)
    }

@router.get("/glossary/{term}")
def get_glossary_term(term: str):
    """Obtener término específico"""
    term_lower = term.lower()
    if term_lower not in GLOSSARY:
        return {"error": "Term not found"}
    return {term_lower: GLOSSARY[term_lower]}

@router.get("/tips")
def get_daily_tips():
    """Tips educacionales"""
    return {
        "tips": [
            "🎉 La diversificación reduce riesgo pero puede limitar retorno",
            "🎆 El índice MSCI World es un buen benchmark para fondos globales",
            "💪 El margen de seguridad es clave en value investing",
            "🙋 El ratio deuda/equity debe ser <1 idealmente",
            "👀 Revisa el FCF (Free Cash Flow) de las empresas antes de invertir",
            "🔗 Compra empresas con ROE > 10% de forma sostenida",
        ]
    }
