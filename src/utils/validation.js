const validationRules = {
    required: (value) => ({
      isValid: !!value && value.trim() !== '',
      message: 'This field is required'
    }),
  
    email: (value) => ({
      isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address'
    }),
  
    minLength: (value, length) => ({
      isValid: value.length >= length,
      message: `Must be at least ${length} characters`
    }),
  
    maxLength: (value, length) => ({
      isValid: value.length <= length,
      message: `Must be no more than ${length} characters`
    }),
  
    pattern: (value, pattern) => ({
      isValid: new RegExp(pattern).test(value),
      message: 'Please enter a valid value'
    })
  };
  
  export const validateField = (value, validations = []) => {
    for (const validation of validations) {
      const { type, params, message } = validation;
      const rule = validationRules[type];
      
      if (rule) {
        const result = rule(value, params);
        if (!result.isValid) {
          return message || result.message;
        }
      }
    }
    
    return null;
  };
  
  export const validateForm = (formData, formElements) => {
    const errors = {};
    
    formElements.forEach(element => {
      if (element.validations) {
        const error = validateField(formData[element.id], element.validations);
        if (error) {
          errors[element.id] = error;
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  export const createValidation = (type, params, message) => ({
    type,
    params,
    message
  });
  
  export default {
    validateField,
    validateForm,
    createValidation
  };