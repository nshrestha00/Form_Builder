const DragDropArea = ({ children, onDrop, className }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-blue-500');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500');
    const elementType = e.dataTransfer.getData('elementType');
    onDrop(elementType);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`min-h-[200px] border-2 border-dashed rounded-lg p-4 transition-colors ${className}`}
    >
      {children}
    </div>
  );
};

export default DragDropArea;