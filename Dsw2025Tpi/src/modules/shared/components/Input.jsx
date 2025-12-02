import { useState } from "react";

function Input({ messageError, inputProps, label }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = inputProps?.type === "password";
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    return (
      <div className="flex flex-col gap-1 justify-start items-start">
        <label htmlFor={label}>{label}</label>
        <div className="relative w-full">
          <input 
            className="w-full h-8 border-2 border-gray-300 rounded-md shadow-md pr-10" 
            id={label} 
            {...inputProps}
            type={isPasswordField && showPassword ? "text" : inputProps?.type}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          )}
        </div>
        {messageError && (
          <div className="flex justify-center items-center">
            <span className="text-sm text-red-500">{messageError}</span>
          </div>
        )}
      </div>
    );
}

export { Input };