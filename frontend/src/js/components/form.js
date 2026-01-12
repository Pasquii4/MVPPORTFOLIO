/**
 * Form Component
 */

function createForm(fields = []) {
  const form = document.createElement('form');
  form.className = 'dynamic-form';
  
  fields.forEach(field => {
    const group = document.createElement('div');
    group.className = 'form-group';
    
    const label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = field.label;
    group.appendChild(label);
    
    const input = document.createElement('input');
    input.type = field.type || 'text';
    input.className = 'form-input';
    input.placeholder = field.placeholder || '';
    input.required = field.required || false;
    group.appendChild(input);
    
    form.appendChild(group);
  });
  
  return form;
}
