const LoadingSpinner = ({ message }) => {
  return (
    <div className="p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-500">{message ? message : "Loading"}...</p>
    </div>
  );
};

export default LoadingSpinner;
