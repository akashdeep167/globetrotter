const Button = ({ children, className, variant, ...props }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "default":
        return "bg-blue-600 text-white hover:bg-blue-700";
      case "normal":
        return "bg-[#006749] hover:bg-green-900 text-white border border-slate-200 text-slate-700";
      case "outline":
        return "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700";
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${getVariantClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
