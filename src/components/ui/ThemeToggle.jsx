import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-md hover:scale-105 transition"
      title="Alternar Tema"
    >
      {darkMode ? (
        <Sun className="text-yellow-400" size={22} />
      ) : (
        <Moon className="text-gray-800" size={22} />
      )}
    </button>
  );
}
