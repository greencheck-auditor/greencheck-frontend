import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo GreenCheck */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-greencheck.png" alt="Logo GreenCheck" className="w-10 h-10" />
          <span className="text-2xl font-bold">
            <span className="text-green-600">Green</span>
            <span className="text-gray-800">Check</span>
          </span>
        </Link>

        {/* Menu estilo site */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium text-sm">
          <a href="#hero" className="hover:text-green-600 transition">Início</a>
          <a href="#quem-somos" className="hover:text-green-600 transition">Quem Somos</a>
          <a href="#servicos" className="hover:text-green-600 transition">Serviços</a>
          <a href="#contato" className="hover:text-green-600 transition">Contato</a>
        </nav>
      </div>
    </header>
  );
}
