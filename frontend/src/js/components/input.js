/**
 * Input Component - Reusable input fields with validation states
 * Usage: Input.create({ type, placeholder, value, label, required, error })
 */
class Input {
  static create(options = {}) {
    const {
      type = 'text', // 'text', 'number', 'email', 'date', 'password', 'search'
      name = '',
      placeholder = '',
      value = '',
      label = '',
      required = false,
      error = null,
      disabled = false,
      icon = null,
      size = 'default', // 'small', 'default', 'large'
      onChange = null,
      onBlur = null,
      className = '',
      id = null,
    } = options;

    const container = document.createElement('div');
    container.className = `input-group input-group--${size}`;

    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'input-label';
      labelEl.textContent = label;
      if (required) labelEl.innerHTML += '<span class="required">*</span>';
      container.appendChild(labelEl);
    }

    const inputWrapper = document.createElement('div');
    inputWrapper.className = `input-wrapper ${error ? 'input-wrapper--error' : ''}`;

    if (icon) {
      const iconEl = document.createElement('span');
      iconEl.className = 'input-icon';
      iconEl.textContent = icon;
      inputWrapper.appendChild(iconEl);
    }

    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.className = 'form-input';
    input.placeholder = placeholder;
    input.value = value;
    input.disabled = disabled;

    if (id) input.id = id;
    if (required) input.required = true;

    if (onChange) {
      input.addEventListener('change', onChange);
      input.addEventListener('input', onChange);
    }
    if (onBlur) {
      input.addEventListener('blur', onBlur);
    }

    inputWrapper.appendChild(input);
    container.appendChild(inputWrapper);

    if (error) {
      const errorEl = document.createElement('p');
      errorEl.className = 'input-error';
      errorEl.textContent = error;
      container.appendChild(errorEl);
    }

    // Store reference to input for easy access
    container.input = input;
    container.getValue = () => input.value;
    container.setValue = (val) => { input.value = val; };
    container.setError = (err) => {
      if (err) {
        inputWrapper.classList.add('input-wrapper--error');
        let errorEl = container.querySelector('.input-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'input-error';
          container.appendChild(errorEl);
        }
        errorEl.textContent = err;
      } else {
        inputWrapper.classList.remove('input-wrapper--error');
        const errorEl = container.querySelector('.input-error');
        if (errorEl) errorEl.remove();
      }
    };

    return container;
  }

  // Text input
  static text(label, placeholder, onChange) {
    return this.create({ type: 'text', label, placeholder, onChange });
  }

  // Number input
  static number(label, placeholder, onChange) {
    return this.create({ type: 'number', label, placeholder, onChange });
  }

  // Email input
  static email(label, placeholder = 'email@example.com', onChange) {
    return this.create({ type: 'email', label, placeholder, onChange });
  }

  // Date input
  static date(label, onChange) {
    return this.create({ type: 'date', label, onChange });
  }

  // Search input
  static search(placeholder, onChange) {
    return this.create({ type: 'search', placeholder, onChange, icon: '🔍' });
  }

  // Password input
  static password(label, placeholder, onChange) {
    return this.create({ type: 'password', label, placeholder, onChange, icon: '🔒' });
  }
}

export default Input;