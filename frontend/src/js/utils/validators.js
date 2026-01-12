/**
 * Validators
 * Validaciones de formularios y datos
 */

const Validators = {
  // Validar email
  isEmail: function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validar número
  isNumber: function(value) {
    return !isNaN(value) && value !== '';
  },

  // Validar que no esté vacío
  isRequired: function(value) {
    return value && value.trim() !== '';
  },

  // Validar longitud mínima
  minLength: function(value, min) {
    return value && value.length >= min;
  },

  // Validar longitud máxima
  maxLength: function(value, max) {
    return value && value.length <= max;
  },

  // Validar rango de números
  inRange: function(value, min, max) {
    return value >= min && value <= max;
  },

  // Validar forma de formulario
  validateForm: function(form, rules) {
    const errors = {};
    
    for (const field in rules) {
      const input = form.querySelector(`[name="${field}"]`);
      if (!input) continue;
      
      const value = input.value;
      const fieldRules = rules[field];
      
      for (const rule in fieldRules) {
        const valid = this[rule](value, fieldRules[rule]);
        if (!valid) {
          errors[field] = `${field} es inválido`;
          break;
        }
      }
    }
    
    return Object.keys(errors).length === 0 ? null : errors;
  }
};
