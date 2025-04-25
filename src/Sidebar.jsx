import React from "react";
import { Link } from "react-router-dom";
import { BarChart2, FileText, BadgeCheck, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-green-700 text-white p-6 space-y-6 shadow-md fixed h-full">
      <h1 className="text-2xl font-bold mb-4">
        <span className="text-white">Green</span>
        <span className="text-gray-300">Check</span>
      </h1>

      <nav className="space-y-4">
        <Link to="/" className="flex items-center gap-3 hover:text-green-200 transition">
          <BarChart2 className="w-5 h-5" />
          Início
        </Link>
        <Link to="/relatorios" className="flex items-center gap-3 hover:text-green-200 transition">
          <FileText className="w-5 h-5" />
          Relatórios
        </Link>
        <Link to="/certificado" className="flex items-center gap-3 hover:text-green-200 transition">
          <BadgeCheck className="w-5 h-5" />
          Certificados
        </Link>
        <Link to="/configuracoes" className="flex items-center gap-3 hover:text-green-200 transition">
          <Settings className="w-5 h-5" />
          Configurações
        </Link>
      </nav>
    </aside>
  );
}
