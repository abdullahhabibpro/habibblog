import React from 'react';

function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;