import React, { useState } from "react";
import FormInput from "./FormInput";

const PasswordInput = ({ id, label = "Password", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <FormInput
        id={id}
        label={label}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className={`absolute right-3 text-gray-400 hover:text-white transition-colors focus:outline-none ${
          props.error ? "top-[34px]" : "top-[34px]" // Keep consistent position, assuming label height is consistent
        }`}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
  );
};

export default PasswordInput;
