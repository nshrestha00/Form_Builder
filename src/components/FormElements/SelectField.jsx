import React from "react";

const SelectField = React.memo(({ label, options, value, onChange, error }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm mb-2">{label}</label>
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
});

SelectField.displayName = 'SelectField';  

export default SelectField