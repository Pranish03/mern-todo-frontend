export const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`border border-black/20 rounded-lg text-lg py-1.5 px-2.5 focus:border-black focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400 ${className}`}
      {...props}
    />
  );
};
