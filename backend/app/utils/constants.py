"""Constantes de la aplicación"""

POSITION_TYPES = ["stock", "etf", "crypto", "currency"]

RATIOS = {
    "PER": {
        "name": "Price to Earnings Ratio",
        "description": "Cuántas veces estás pagando los beneficios anuales de una empresa",
        "ideal_value": "<15 para estables / <20 con crecimiento",
        "example": "PER 20 = tardarías 20 años en recuperar inversión",
    },
    "ROE": {
        "name": "Return on Equity",
        "description": "Rentabilidad que genera la empresa sobre capital aportado",
        "ideal_value": ">10% sostenido",
        "example": "Microsoft tiene ROE >35% (excelente)",
    },
    "FCF": {
        "name": "Free Cash Flow",
        "description": "Dinero libre que genera la empresa después de inversiones",
        "ideal_value": "Positivo y creciente",
        "example": "Apple: FCF creciente desde 10+ años",
    },
    "DEBT_TO_EQUITY": {
        "name": "Debt to Equity Ratio",
        "description": "Relación entre deuda y capital propio",
        "ideal_value": "<1 (más confiable)",
        "example": "0.5 = deuda = 50% del capital propio",
    },
    "DIVIDEND_YIELD": {
        "name": "Dividend Yield",
        "description": "Rendimiento de dividendos sobre precio de acción",
        "ideal_value": ">2% (para ingreso)",
        "example": "Si paga 2€ de dividendo en acción de 100€ = 2%",
    },
}

GLOSSARY = {
    "ticker": "Código único de una empresa en bolsa (ej: AAPL para Apple)",
    "etf": "Fondo cotizado que replica un índice (ej: SWDA para MSCI World)",
    "long_position": "Comprar un activo esperando que suba",
    "short_position": "Vender un activo esperando que baje",
    "p&l": "Profit & Loss (Pérdidas y Ganancias)",
    "roi": "Return on Investment (Retorno sobre Inversión)",
    "diversification": "Repartir inversión entre diferentes activos para reducir riesgo",
    "volatility": "Variabilidad del precio de un activo (a mayor volatilidad, mayor riesgo)",
    "dividend": "Parte de ganancias que distribuye la empresa a accionistas",
    "allocation": "Distribución del dinero entre diferentes activos",
}
