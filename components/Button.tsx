
import React from 'react';

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({ value, onClick, className = '', ariaLabel }) => {
  const baseClasses = "rounded-lg h-16 text-2xl font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95";
  
  const typeClasses = 
    ['=', 'C'].includes(value) ? 'bg-cyan-500 hover:bg-cyan-400 text-white' :
    ['/', '*', '-', '+'].includes(value) ? 'bg-gray-600 hover:bg-gray-500 text-cyan-400' :
    'bg-gray-700 hover:bg-gray-600 text-white';

  return (
    <button 
      onClick={() => onClick(value)}
      className={`${baseClasses} ${typeClasses} ${className}`}
      aria-label={ariaLabel || `button ${value}`}
    >
      {value}
    </button>
  );
};

export default Button;
