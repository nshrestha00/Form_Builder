const variants = {
  error: 'bg-red-100 text-red-700 border-red-300',
  success: 'bg-green-100 text-green-700 border-green-300',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  info: 'bg-blue-100 text-blue-700 border-blue-300'
};

const Alert = ({ 
  children, 
  variant = 'info', 
  className = '', 
  onClose 
}) => {
  return (
    <div className={`
      p-4 rounded-md border ${variants[variant]} 
      relative flex items-center 
      ${className}
    `}>
      <div className="flex-grow">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;