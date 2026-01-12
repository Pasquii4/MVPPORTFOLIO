/**
 * Badge Component
 */

function createBadge(text, type = 'primary') {
  const badge = document.createElement('span');
  badge.className = `badge badge-${type}`;
  badge.textContent = text;
  return badge;
}
