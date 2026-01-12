/**
 * Input Component
 */

function createInput(name, options = {}) {
  const input = document.createElement('input');
  input.type = options.type || 'text';
  input.name = name;
  input.className = 'form-input ' + (options.className || '');
  input.placeholder = options.placeholder || '';
  input.value = options.value || '';
  
  if (options.required) {
    input.required = true;
  }
  
  return input;
}
