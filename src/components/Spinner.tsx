import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary'
}) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClass = {
    primary: 'border-primary',
    white: 'border-white'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClass[size]} border-2 ${colorClass[color]} border-b-transparent rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
};

export default Spinner;