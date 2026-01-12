/**
 * Form Component
 */

function createForm(fields) {
  const form = document.createElement('form');
  form.className = 'form';
  
  fields.forEach(field => {
    const group = document.createElement('div');
    group.className = 'form-group';
    
    const label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = field.label;
    label.htmlFor = field.name;
    
    const input = document.createElement('input');
    input.type = field.type || 'text';
    input.name = field.name;
    input.id = field.name;
    input.className = 'form-input';
    input.placeholder = field.placeholder || '';
    
    if (field.required) input.required = true;
    
    group.appendChild(label);
    group.appendChild(input);
    form.appendChild(group);
  });
  
  return form;
}
