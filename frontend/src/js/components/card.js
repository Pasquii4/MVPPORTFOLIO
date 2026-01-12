/**
 * Card Component
 */

function createCard(content, className = '') {
  const card = document.createElement('div');
  card.className = 'card ' + className;
  card.innerHTML = content;
  return card;
}
