import { useState, useMemo } from 'react';
import { useFormBuilder } from '../../hooks/useFormBuilder';
import TextField from '../FormElements/TextField';
import SelectField from '../FormElements/SelectField';
import RadioField from '../FormElements/RadioField';
import Alert from '../ui/Alert';
import Button from '../ui/Button';

const FormBuilder = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    formElements,
    formData,
    previewMode,
    setPreviewMode,
    addElement,
    removeElement,
    setFormData,
  } = useFormBuilder();

  const formSchema = useMemo(() => ({
    elements: formElements.map(({ id, type, label, options }) => ({
      id,
      type,
      label,
      options
    }))
  }), [formElements]);

  const handleDrop = (e) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('elementType');
    addElement({
      type: elementType,
      label: `New ${elementType} field`,
      required: true, 
      options: elementType === 'select' || elementType === 'radio' 
        ? [{ label: 'Option 1', value: '1' },{ label: 'Option 2', value: '2' }] 
        : undefined
    });
  };

  const renderFormElement = (element) => {
    const props = {
      label: element.label,
      value: formData[element.id] || '',
      onChange: (value) => setFormData({ ...formData, [element.id]: value }),
      error: errors[element.id],
      options: element.options,
      required: element.required // Pass required prop to form elements
    };

    switch (element.type) {
      case 'text':
        return <TextField {...props} />;
      case 'select':
        return <SelectField {...props} />;
      case 'radio':
        return <RadioField {...props} />;
      default:
        return null;
    }
  };

  const validateFormData = () => {
    const newErrors = {};
    let isValid = true;

    formElements.forEach(element => {
      if (element.required) {
        const value = formData[element.id];
        if (!value || value.trim() === '') {
          newErrors[element.id] = 'This field is required';
          isValid = false;
        }
      }
    });

    return { isValid, errors: newErrors };
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const { isValid, errors: validationErrors } = validateFormData();

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // Check if form is empty
    const hasEntries = Object.values(formData).some(value => 
      value && value.toString().trim() !== ''
    );

    if (!hasEntries) {
      setErrors({ form: 'Please fill in at least one field before submitting' });
      return;
    }

    // If validation passes, proceed with submission
    setIsFormSubmitted(true);
    setTimeout(() => setIsFormSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {isFormSubmitted && (
        <Alert variant="success">
          Form submitted successfully!
        </Alert>
      )}

      {(Object.keys(errors).length > 0) && (
        <Alert variant="error">
          {errors.form || 'Please fill out all required fields.'}
        </Alert>
      )}

      <div className="mb-4 flex justify-between">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {previewMode ? 'Edit Mode' : 'Preview Mode'}
        </button>
      </div>

      <form onSubmit={handleFormSubmit}> {/* Wrap in form element */}
        {!previewMode && (
          <div className="mb-4 flex space-x-2">
            {['text', 'select', 'radio'].map(type => (
              <div
                key={type}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('elementType', type)}
                className="p-2 border rounded cursor-move bg-gray-50"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            ))}
          </div>
        )}

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="min-h-[200px] border-2 border-dashed p-4 rounded"
        >
          {formElements.map((element) => (
            <div key={element.id} className="relative">
              {renderFormElement(element)}
              {!previewMode && (
                <button
                  type="button" // Specify button type
                  onClick={() => removeElement(element.id)}
                  className="absolute top-0 right-0 text-red-500"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {previewMode && (
          <Button
            type="submit"
            variant="success"
            className="mt-4"
          >
            Submit
          </Button>
        )}
      </form>

      {!previewMode && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-x-auto">
          {JSON.stringify(formSchema, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default FormBuilder;