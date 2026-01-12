/**
 * Button Component
 */

function createButton(options = {}) {
  const {
    text = 'Button',
    type = 'primary',
    size = 'md',
    onClick = null,
    disabled = false
  } = options;

  const button = document.createElement('button');
  button.className = `btn btn-${type} btn-${size}`;
  button.textContent = text;
  button.disabled = disabled;
  
  if (onClick && typeof onClick === 'function') {
    button.addEventListener('click', onClick);
  }
  
  return button;
}
