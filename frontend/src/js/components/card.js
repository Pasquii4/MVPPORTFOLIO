/**
 * Card Component
 */

function createCard(options = {}) {
  const {
    title = '',
    content = '',
    footer = '',
    className = ''
  } = options;

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
