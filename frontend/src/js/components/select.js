/**
 * Select Component - Dropdown select element
 * Usage: Select.create({ name, label, options, value, onChange })
 */
class Select {
  static create(options = {}) {
    const {
      name = '',
      label = '',
      options: selectOptions = [],
      value = '',
      placeholder = 'Seleccionar...',
      disabled = false,
      required = false,
      onChange = null,
      onBlur = null,
      className = '',
      id = null,
      size = 'default',
    } = options;

    const container = document.createElement('div');
    container.className = `select-group select-group--${size}`;

    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'select-label';
      labelEl.textContent = label;
      if (required) labelEl.innerHTML += '<span class="required">*</span>';
      container.appendChild(labelEl);
    }

    const select = document.createElement('select');
    select.name = name;
    select.className = `form-select ${className}`;
    select.disabled = disabled;
    if (required) select.required = true;
    if (id) select.id = id;

    // Placeholder option
    if (placeholder) {
      const placeholderOpt = document.createElement('option');
      placeholderOpt.value = '';
      placeholderOpt.textContent = placeholder;
      select.appendChild(placeholderOpt);
    }

    // Add options
    selectOptions.forEach(opt => {
      if (typeof opt === 'string') {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      } else {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
      }
    });

    if (value) select.value = value;

    if (onChange) {
      select.addEventListener('change', onChange);
    }
    if (onBlur) {
      select.addEventListener('blur', onBlur);
    }

    container.appendChild(select);

    // Helper methods
    container.select = select;
    container.getValue = () => select.value;
    container.setValue = (val) => { select.value = val; };
    container.setOptions = (newOptions) => {
      select.innerHTML = '';
      newOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value || opt;
        option.textContent = opt.label || opt;
        select.appendChild(option);
      });
    };

    return container;
  }

  // Currency select
  static currency(onChange) {
    return this.create({
      name: 'currency',
      label: 'Moneda',
      options: [
        { value: 'USD', label: '$ USD' },
        { value: 'EUR', label: '€ EUR' },
        { value: 'GBP', label: '£ GBP' },
        { value: 'JPY', label: '¥ JPY' },
      ],
      onChange,
    });
  }

  // Timeframe select
  static timeframe(onChange) {
    return this.create({
      name: 'timeframe',
      label: 'Período',
      options: [
        { value: '1d', label: 'Último día' },
        { value: '1w', label: 'Última semana' },
        { value: '1m', label: 'Último mes' },
        { value: '3m', label: 'Últimos 3 meses' },
        { value: '1y', label: 'Último año' },
        { value: 'all', label: 'Todo el tiempo' },
      ],
      onChange,
    });
  }
}

export default Select;