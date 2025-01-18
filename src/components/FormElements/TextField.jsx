import React from 'react';

const TextField = React.memo(({ label, value, onChange, error }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm mb-2">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
});

TextField.displayName = 'TextField';  // Add the displayName here

export default TextField;
