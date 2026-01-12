/**
 * Card Component
 * Tarjeta de contenedor reutilizable
 */
class Card {
  /**
   * Crear tarjeta
   * @param {Object} options - Opciones de la tarjeta
   * @param {string} options.title - Título
   * @param {string} options.content - Contenido HTML
   * @param {string} options.footer - Pie de página
   * @param {string} options.className - Clases adicionales
   */
  static create(options = {}) {
    const { title = '', content = '', footer = '', className = '' } = options;
    
    const card = document.createElement('div');
    card.className = `card ${className}`;
    
    let html = '';
    
    if (title) {
      html += `<div class="card-header"><h3 class="card-title">${title}</h3></div>`;
    }
    
    html += `<div class="card-body">${content}</div>`;
    
    if (footer) {
      html += `<div class="card-footer">${footer}</div>`;
    }
    
    card.innerHTML = html;
    return card;
  }

  /**
   * Crear tarjeta de estadística
   * @param {Object} stat - Estadística
   * @param {string} stat.label - Etiqueta
   * @param {string} stat.value - Valor
   * @param {string} stat.unit - Unidad
   * @param {number} stat.change - Cambio porcentual
   */
  static createStatCard(stat) {
    const trendClass = Formatters.trendClass(stat.change || 0);
    const trendArrow = Formatters.trendArrow(stat.change || 0);
    
    const card = document.createElement('div');
    card.className = `card stat-card ${trendClass}`;
    
    card.innerHTML = `
      <div class="card-body">
        <div class="stat-label">${stat.label}</div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-unit">${stat.unit || ''}</div>
        ${stat.change !== undefined ? `
          <div class="stat-change ${trendClass}">
            ${trendArrow} ${Formatters.percent(Math.abs(stat.change))}
          </div>
        ` : ''}
      </div>
    `;
    
    return card;
  }
}

// Component aliases para facilitar uso
window.Card = Card;