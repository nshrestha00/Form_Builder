const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white'
};

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-md transition-colors duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;