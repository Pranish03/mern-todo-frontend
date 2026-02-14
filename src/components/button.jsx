export const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`border border-black hover:border-black/3 rounded-lg text-lg py-1.5 px-2.5 bg-black hover:bg-black/80 text-white cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
