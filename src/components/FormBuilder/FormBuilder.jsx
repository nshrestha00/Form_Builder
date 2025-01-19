import  { useMemo } from 'react';
import { useFormBuilder } from '../../hooks/useFormBuilder';
import TextField from '../FormElements/TextField';
import SelectField from '../FormElements/SelectField';
import RadioField from '../FormElements/RadioField';

const FormBuilder = () => {
  const {
    formElements,
    formData,
    errors,
    previewMode,
    setPreviewMode,
    addElement,
    removeElement,
    setFormData,
    handleSubmit
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
      required: false,
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
      options: element.options
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {previewMode ? 'Edit Mode' : 'Preview Mode'}
        </button>
      </div>

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
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      )}

      {!previewMode && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-x-auto">
          {JSON.stringify(formSchema, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default FormBuilder