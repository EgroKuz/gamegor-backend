import React from 'react';

const FormInput = ({ id, label, type = 'text', error, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full bg-gray-800/50 border ${
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-neon-teal'
        } rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neon-teal transition-colors`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
