import React from "react";

const RadioField = React.memo(({ label, options, value, onChange, error }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm mb-2">{label}</label>
        {options.map((option) => (
          <div key={option.value} className="flex items-center mb-2">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="mr-2"
            />
            <span>{option.label}</span>
          </div>
        ))}
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
});

RadioField.displayName = 'RadioField';

export default RadioField
