import React from "react";

export function Card({ children }) {
  return (
    <div className="rounded-lg shadow-md p-4 bg-white dark:bg-gray-800">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return (
    <div className="p-2">
      {children}
    </div>
  );
}
