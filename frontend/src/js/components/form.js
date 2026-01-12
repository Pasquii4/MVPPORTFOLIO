/**
 * Form Component
 * Formularios dinámicos con validación
 */
class DynamicForm {
  constructor(options = {}) {
    this.fields = options.fields || [];
    this.submitText = options.submitText || 'Enviar';
    this.onSubmit = options.onSubmit || null;
    this.element = null;
  }

  /**
   * Renderizar formulario
   */
  render() {
    const form = document.createElement('form');
    form.className = 'dynamic-form';
    
    // Campos
    this.fields.forEach(field => {
      let fieldEl;
      
      if (field.type === 'textarea') {
        fieldEl = InputField.createTextarea({
          label: field.label,
          placeholder: field.placeholder,
          name: field.name,
          id: field.name,
          rows: field.rows || 4,
          value: field.value || '',
          required: field.required
        });
      } else if (field.type === 'select') {
        fieldEl = InputField.createSelect({
          label: field.label,
          name: field.name,
          id: field.name,
          options: field.options || [],
          value: field.value || '',
          required: field.required
        });
      } else {
        fieldEl = InputField.create({
          type: field.type || 'text',
          label: field.label,
          placeholder: field.placeholder,
          name: field.name,
          id: field.name,
          value: field.value || '',
          required: field.required
        });
      }
      
      form.appendChild(fieldEl);
    });
    
    // Botón submit
    const submitBtn = Button.create({
      text: this.submitText,
      type: 'primary',
      className: 'form-submit'
    });
    form.appendChild(submitBtn);
    
    form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    this.element = form;
    return form;
  }

  /**
   * Manejar submit
   */
  handleSubmit(e) {
    e.preventDefault();
    
    // Validar
    if (!this.validate()) {
      Notifications.error('Por favor completa todos los campos requeridos');
      return;
    }
    
    // Obtener datos
    const formData = this.getValues();
    
    // Callback
    if (this.onSubmit && typeof this.onSubmit === 'function') {
      this.onSubmit(formData);
    }
  }

  /**
   * Validar formulario
   */
  validate() {
    const inputs = this.element.querySelectorAll('.form-input');
    let isValid = true;
    
    inputs.forEach(input => {
      if (input.required && !input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }
    });
    
    return isValid;
  }

  /**
   * Obtener valores
   */
  getValues() {
    const values = {};
    const inputs = this.element.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
      if (input.name) {
        values[input.name] = input.value;
      }
    });
    
    return values;
  }

  /**
   * Establecer valores
   */
  setValues(values) {
    const inputs = this.element.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
      if (input.name && values.hasOwnProperty(input.name)) {
        input.value = values[input.name];
      }
    });
  }

  /**
   * Limpiar formulario
   */
  reset() {
    if (this.element) {
      this.element.reset();
      this.element.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
      });
    }
  }
}

window.DynamicForm = DynamicForm;