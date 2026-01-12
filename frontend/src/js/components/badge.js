/**
 * Badge Component
 */

function createBadge(options = {}) {
  const {
    text = 'Badge',
    type = 'primary',
    size = 'md'
  } = options;

  const badge = document.createElement('span');
  badge.className = `badge badge-${type} badge-${size}`;
  badge.textContent = text;
  
  return badge;
}
