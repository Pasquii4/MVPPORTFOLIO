/**
 * Form Builder Component - Build forms dynamically with validation
 * Usage: Form.create({ fields, onSubmit, onReset, validation })
 */
import Input from './input.js';
import Select from './select.js';
import Button from './button.js';

class Form {
  static create(options = {}) {
    const {
      id = `form-${Math.random().toString(36).substr(2, 9)}`,
      fields = [],
      onSubmit = null,
      onReset = null,
      submitLabel = 'Enviar',
      resetLabel = 'Limpiar',
      validation = true,
      className = '',
      layout = 'vertical', // 'vertical', 'horizontal', 'grid'
    } = options;

    const form = document.createElement('form');
    form.id = id;
    form.className = `form form--${layout} ${className}`;
    form.fieldElements = {};

    // Render fields
    fields.forEach(field => {
      let fieldEl;

      if (field.type === 'select') {
        fieldEl = Select.create({
          name: field.name,
          label: field.label,
          options: field.options || [],
          required: field.required,
          disabled: field.disabled,
          onChange: field.onChange,
          id: field.id,
          size: field.size,
        });
      } else if (field.type === 'textarea') {
        const container = document.createElement('div');
        container.className = 'textarea-group';

        if (field.label) {
          const label = document.createElement('label');
          label.className = 'textarea-label';
          label.textContent = field.label;
          if (field.required) label.innerHTML += '<span class="required">*</span>';
          container.appendChild(label);
        }

        const textarea = document.createElement('textarea');
        textarea.name = field.name;
        textarea.placeholder = field.placeholder || '';
        textarea.className = 'form-textarea';
        textarea.required = field.required || false;
        textarea.disabled = field.disabled || false;
        textarea.value = field.value || '';

        if (field.onChange) {
          textarea.addEventListener('change', field.onChange);
        }

        container.appendChild(textarea);
        fieldEl = container;
      } else {
        // Default to Input
        fieldEl = Input.create({
          type: field.type || 'text',
          name: field.name,
          label: field.label,
          placeholder: field.placeholder,
          value: field.value,
          required: field.required,
          disabled: field.disabled,
          icon: field.icon,
          size: field.size,
          onChange: field.onChange,
          onBlur: field.onBlur,
          id: field.id,
        });
      }

      form.fieldElements[field.name] = fieldEl;
      form.appendChild(fieldEl);
    });

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'form-buttons';

    const submitBtn = Button.create({
      label: submitLabel,
      type: 'primary',
      onClick: (e) => {
        e.preventDefault();
        if (validation && !Form.validate(form)) {
          return;
        }
        if (onSubmit) {
          const data = Form.getData(form);
          onSubmit(data);
        }
      },
    });
    buttonsContainer.appendChild(submitBtn);

    if (onReset) {
      const resetBtn = Button.create({
        label: resetLabel,
        type: 'ghost',
        onClick: (e) => {
          e.preventDefault();
          form.reset();
          Object.values(form.fieldElements).forEach(el => {
            const errorEl = el.querySelector?.('.input-error');
            if (errorEl) errorEl.remove();
          });
          if (onReset) onReset();
        },
      });
      buttonsContainer.appendChild(resetBtn);
    }

    form.appendChild(buttonsContainer);

    form.fieldNames = fields.map(f => f.name);
    return form;
  }

  static getData(form) {
    const data = {};

    form.fieldNames.forEach(name => {
      const fieldEl = form.fieldElements[name];
      
      if (fieldEl.querySelector) {
        const input = fieldEl.querySelector('input, select, textarea');
        if (input) {
          data[name] = input.value;
        } else if (fieldEl.getValue) {
          data[name] = fieldEl.getValue();
        }
      } else if (fieldEl.getValue) {
        data[name] = fieldEl.getValue();
      }
    });

    return data;
  }

  static validate(form) {
    let isValid = true;

    form.fieldNames.forEach(name => {
      const fieldEl = form.fieldElements[name];
      const input = fieldEl.querySelector ? fieldEl.querySelector('input, select, textarea') : null;

      if (input && input.required && !input.value.trim()) {
        if (fieldEl.setError) {
          fieldEl.setError('Este campo es requerido');
        } else {
          const errorEl = fieldEl.querySelector('.input-error');
          if (!errorEl) {
            const err = document.createElement('p');
            err.className = 'input-error';
            err.textContent = 'Este campo es requerido';
            fieldEl.appendChild(err);
          }
        }
        isValid = false;
      } else if (fieldEl.setError) {
        fieldEl.setError(null);
      }
    });

    return isValid;
  }

  static reset(form) {
    form.reset();
    form.fieldNames.forEach(name => {
      const fieldEl = form.fieldElements[name];
      if (fieldEl.setError) {
        fieldEl.setError(null);
      }
    });
  }

  static setValues(form, values) {
    Object.entries(values).forEach(([name, value]) => {
      const fieldEl = form.fieldElements[name];
      if (fieldEl.setValue) {
        fieldEl.setValue(value);
      } else {
        const input = fieldEl.querySelector('input, select, textarea');
        if (input) {
          input.value = value;
        }
      }
    });
  }

  static getValues(form) {
    return Form.getData(form);
  }

  static setFieldError(form, fieldName, error) {
    const fieldEl = form.fieldElements[fieldName];
    if (fieldEl.setError) {
      fieldEl.setError(error);
    }
  }

  static disableField(form, fieldName) {
    const fieldEl = form.fieldElements[fieldName];
    const input = fieldEl.querySelector('input, select, textarea');
    if (input) input.disabled = true;
  }

  static enableField(form, fieldName) {
    const fieldEl = form.fieldElements[fieldName];
    const input = fieldEl.querySelector('input, select, textarea');
    if (input) input.disabled = false;
  }
}

export default Form;