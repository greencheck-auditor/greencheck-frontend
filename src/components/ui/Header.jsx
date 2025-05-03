import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-greencheck.png"; // ajuste o caminho se necessário
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo e Nome */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="GreenCheck Logo" className="h-12 w-auto drop-shadow" />
            <h1 className="text-2xl md:text-3xl font-extrabold">
              <span className="text-green-600">Green</span>
              <span className="text-gray-800 dark:text-white">Check</span>
            </h1>
          </Link>

          {/* Navegação */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition"
            >
              Início
            </Link>
            <a
              href="#quem-somos"
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition"
            >
              Quem Somos
            </a>
            <a
              href="#servicos"
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition"
            >
              Serviços
            </a>
            <a
              href="#contato"
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition"
            >
              Contato
            </a>

            {/* Botão modo claro/escuro */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
              title={darkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
