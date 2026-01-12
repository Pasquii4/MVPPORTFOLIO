/**
 * Input Component
 */

function createInput(options = {}) {
  const {
    type = 'text',
    placeholder = '',
    value = '',
    label = '',
    required = false
  } = options;

  const group = document.createElement('div');
  group.className = 'form-group';
  
  let html = '';
  if (label) {
    html += `<label class="form-label">${label}${required ? '<span class="required">*</span>' : ''}</label>`;
  }
  html += `<input type="${type}" class="form-input" placeholder="${placeholder}" value="${value}" ${required ? 'required' : ''}>`;
  
  group.innerHTML = html;
  return group;
}
