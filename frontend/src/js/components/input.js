/**
 * Input Component
 * Campos de entrada reutilizables
 */
class InputField {
  /**
   * Crear campo de entrada
   * @param {Object} options - Opciones
   * @param {string} options.type - Tipo (text, email, password, number, date)
   * @param {string} options.label - Etiqueta
   * @param {string} options.placeholder - Placeholder
   * @param {string} options.value - Valor inicial
   * @param {string} options.name - Nombre del campo
   * @param {string} options.id - ID del campo
   * @param {boolean} options.required - Requerido
   */
  static create(options = {}) {
    const {
      type = 'text',
      label = '',
      placeholder = '',
      value = '',
      name = '',
      id = '',
      required = false
    } = options;
    
    const container = document.createElement('div');
    container.className = 'form-group';
    
    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'form-label';
      if (id) labelEl.htmlFor = id;
      labelEl.textContent = label;
      if (required) labelEl.innerHTML += ' <span class="required">*</span>';
      container.appendChild(labelEl);
    }
    
    const input = document.createElement('input');
    input.type = type;
    input.className = 'form-input';
    input.placeholder = placeholder;
    input.value = value;
    if (name) input.name = name;
    if (id) input.id = id;
    if (required) input.required = true;
    
    container.appendChild(input);
    container._input = input; // Referencia directa
    
    return container;
  }

  /**
   * Crear textarea
   */
  static createTextarea(options = {}) {
    const {
      label = '',
      placeholder = '',
      value = '',
      name = '',
      id = '',
      rows = 4,
      required = false
    } = options;
    
    const container = document.createElement('div');
    container.className = 'form-group';
    
    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'form-label';
      if (id) labelEl.htmlFor = id;
      labelEl.textContent = label;
      if (required) labelEl.innerHTML += ' <span class="required">*</span>';
      container.appendChild(labelEl);
    }
    
    const textarea = document.createElement('textarea');
    textarea.className = 'form-input';
    textarea.placeholder = placeholder;
    textarea.value = value;
    textarea.rows = rows;
    if (name) textarea.name = name;
    if (id) textarea.id = id;
    if (required) textarea.required = true;
    
    container.appendChild(textarea);
    container._input = textarea;
    
    return container;
  }

  /**
   * Crear select
   */
  static createSelect(options = {}) {
    const {
      label = '',
      name = '',
      id = '',
      options: optionsList = [],
      value = '',
      required = false
    } = options;
    
    const container = document.createElement('div');
    container.className = 'form-group';
    
    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'form-label';
      if (id) labelEl.htmlFor = id;
      labelEl.textContent = label;
      if (required) labelEl.innerHTML += ' <span class="required">*</span>';
      container.appendChild(labelEl);
    }
    
    const select = document.createElement('select');
    select.className = 'form-input';
    if (name) select.name = name;
    if (id) select.id = id;
    if (required) select.required = true;
    
    optionsList.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      if (opt.value === value) option.selected = true;
      select.appendChild(option);
    });
    
    container.appendChild(select);
    container._input = select;
    
    return container;
  }
}

window.InputField = InputField;