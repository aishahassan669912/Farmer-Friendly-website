import React from 'react';
import { Button } from "../components/ui/button";

 const Button = ({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-green-600 text-green-600 hover:bg-green-50',
    ghost: 'hover:bg-green-100 text-green-700',
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;