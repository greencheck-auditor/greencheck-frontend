import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg shadow bg-green-600 hover:bg-green-700 text-white font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

