export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold focus:outline-none transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
