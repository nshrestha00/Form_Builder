const validationRules = {
    required: (value) => ({
      isValid: value !== undefined && value !== null && 
        (typeof value === 'string' ? value.trim() !== '' : true),
      message: 'This field is required'
    }),
  
    email: (value) => ({
      isValid: !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address'
    }),
  
    minLength: (value, length) => ({
      isValid: !value || value.length >= length,
      message: `Must be at least ${length} characters`
    }),
  
    maxLength: (value, length) => ({
      isValid: !value || value.length <= length,
      message: `Must be no more than ${length} characters`
    }),
  
    pattern: (value, pattern) => ({
      isValid: !value || new RegExp(pattern).test(value),
      message: 'Please enter a valid value'
    })
  };
  
  export const validateField = (value, validations = [], fieldType = 'text') => {
    // Handle empty values for non-required fields
    if (!validations.some(v => v.type === 'required') && 
        (value === undefined || value === null || value === '')) {
      return null;
    }
  
    // Process value based on field type
    let processedValue = value;
    switch (fieldType) {
      case 'select':
      case 'radio':
        processedValue = value || '';
        break;
      default:
        processedValue = value;
    }
  
    for (const validation of validations) {
      const { type, params, message } = validation;
      const rule = validationRules[type];
  
      if (rule) {
        const result = rule(processedValue, params);
        if (!result.isValid) {
          return message || result.message;
        }
      }
    }
  
    return null;
  };
  
  export const validateForm = (formData, formElements) => {
    const errors = {};
    let isFormEmpty = true;
  
    formElements.forEach(element => {
      const value = formData[element.id];
      
      // Check if the form has any non-empty values
      if (value !== undefined && value !== null && value !== '') {
        isFormEmpty = false;
      }
  
      // Only validate if the element has validations
      if (element.validations) {
        const error = validateField(value, element.validations, element.type);
        if (error) {
          errors[element.id] = error;
        }
      }
    });
  
    // Add form-level validation for empty form
    if (isFormEmpty) {
      errors._form = 'Please fill in at least one field';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      isFormEmpty
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