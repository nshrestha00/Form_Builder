import { useState, useCallback } from 'react';

export const useFormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  const addElement = useCallback((element) => {
    setFormElements(prev => [...prev, {
      id: Date.now().toString(),
      ...element
    }]);
  }, []);

  const removeElement = useCallback((elementId) => {
    setFormElements(prev => prev.filter(el => el.id !== elementId));
  }, []);

  const updateElement = useCallback((elementId, updates) => {
    setFormElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    formElements.forEach(element => {
      const value = formData[element.id];
      if (element.required && !value) {
        newErrors[element.id] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formElements, formData]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      return true;
    }
    return false;
  }, [validateForm, formData]);

  return {
    formElements,
    formData,
    errors,
    previewMode,
    setPreviewMode,
    addElement,
    removeElement,
    updateElement,
    setFormData,
    handleSubmit,
    validateForm
  };
};