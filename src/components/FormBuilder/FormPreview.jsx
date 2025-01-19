import RadioField from "../FormElements/RadioField";
import SelectField from "../FormElements/SelectField";
import TextField from "../FormElements/TextField";

const FormPreview = ({ formElements, formData, errors, onSubmit, onChange }) => {
  const renderFormElement = (element) => {
    const props = {
      label: element.label,
      value: formData[element.id] || '',
      onChange: (value) => onChange(element.id, value),
      error: errors[element.id],
      options: element.options,
      required: element.required
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
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        {formElements.map((element) => (
          <div key={element.id} className="mb-4">
            {renderFormElement(element)}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;