import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo ou Nome */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          Green<span className="text-gray-700">Check</span>
        </Link>

        {/* Menu */}
        <nav className="flex gap-6 text-gray-700 font-semibold text-lg">
          <a href="#hero" className="hover:text-green-600 transition">Início</a>
          <a href="#quem-somos" className="hover:text-green-600 transition">Quem Somos</a>
          <a href="#servicos" className="hover:text-green-600 transition">Serviços</a>
          <a href="#contato" className="hover:text-green-600 transition">Contato</a>
        </nav>
      </div>
    </header>
  );
}
