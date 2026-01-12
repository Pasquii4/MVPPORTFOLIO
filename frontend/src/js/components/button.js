/**
 * Button Component
 */

function createButton(text, options = {}) {
  const btn = document.createElement('button');
  btn.className = `btn ${options.className || 'btn-primary'}`;
  btn.textContent = text;
  
  if (options.onClick) {
    btn.addEventListener('click', options.onClick);
  }
  
  if (options.disabled) {
    btn.disabled = true;
  }
  
  return btn;
}
