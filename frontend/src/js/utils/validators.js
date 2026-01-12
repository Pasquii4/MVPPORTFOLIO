/**
 * Validadores mejorados para el frontend
 */

const Validators = {
  /**
   * Validar ticker
   */
  ticker: (value) => {
    if (!value || value.trim().length === 0) {
      return { valid: false, error: 'Ticker no puede estar vacío' };
    }
    if (value.length > 20) {
      return { valid: false, error: 'Ticker no puede exceder 20 caracteres' };
    }
    if (!/^[A-Za-z0-9.\-]+$/.test(value)) {
      return { valid: false, error: 'Ticker solo puede contener letras, números, guiones y puntos' };
    }
    return { valid: true };
  },

  /**
   * Validar cantidad
   */
  quantity: (value) => {
    if (!value || value === '') {
      return { valid: false, error: 'Cantidad no puede estar vacía' };
    }
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      return { valid: false, error: 'Cantidad debe ser mayor a 0' };
    }
    if (num > 1000000) {
      return { valid: false, error: 'Cantidad no puede exceder 1,000,000' };
    }
    return { valid: true };
  },

  /**
   * Validar precio
   */
  price: (value, fieldName = 'Precio') => {
    if (!value || value === '') {
      return { valid: false, error: `${fieldName} no puede estar vacío` };
    }
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      return { valid: false, error: `${fieldName} debe ser mayor a 0` };
    }
    if (num > 1000000) {
      return { valid: false, error: `${fieldName} no puede exceder 1,000,000` };
    }
    return { valid: true };
  },

  /**
   * Validar fecha
   */
  date: (value, fieldName = 'Fecha', allowFuture = false) => {
    if (!value) {
      return { valid: false, error: `${fieldName} no puede estar vacía` };
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { valid: false, error: `${fieldName} no es válida` };
    }
    if (!allowFuture && date > new Date()) {
      return { valid: false, error: `${fieldName} no puede ser en el futuro` };
    }
    return { valid: true };
  },

  /**
   * Validar dividendos
   */
  dividends: (value) => {
    if (value === '' || value === null) {
      return { valid: true }; // Opcional
    }
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      return { valid: false, error: 'Dividendos no puede ser negativo' };
    }
    return { valid: true };
  },

  /**
   * Validar formulario completo
   */
  validateForm: (formData) => {
    const errors = {};

    // Validar ticker
    const tickerCheck = Validators.ticker(formData.ticker);
    if (!tickerCheck.valid) errors.ticker = tickerCheck.error;

    // Validar cantidad
    const quantityCheck = Validators.quantity(formData.quantity);
    if (!quantityCheck.valid) errors.quantity = quantityCheck.error;

    // Validar precio de compra
    const buyPriceCheck = Validators.price(formData.buy_price, 'Precio de compra');
    if (!buyPriceCheck.valid) errors.buy_price = buyPriceCheck.error;

    // Validar precio actual
    const currentPriceCheck = Validators.price(formData.current_price, 'Precio actual');
    if (!currentPriceCheck.valid) errors.current_price = currentPriceCheck.error;

    // Validar fecha
    const dateCheck = Validators.date(formData.buy_date, 'Fecha de compra');
    if (!dateCheck.valid) errors.buy_date = dateCheck.error;

    // Validar dividendos
    const dividendsCheck = Validators.dividends(formData.dividends);
    if (!dividendsCheck.valid) errors.dividends = dividendsCheck.error;

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
