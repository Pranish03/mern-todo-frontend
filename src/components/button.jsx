import React from "react";

export const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`border border-black rounded-lg text-lg py-1.5 px-2.5 bg-black hover:bg-black/80 text-white cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
