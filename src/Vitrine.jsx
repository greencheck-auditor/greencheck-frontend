import React from "react";
import { Link } from "react-router-dom";

export default function Vitrine() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4">
      <img
        src="/logo-greencheck.png"
        alt="Logo GreenCheck"
        className="w-72 mb-4"
      />

      <p className="text-center text-gray-700 dark:text-gray-300 text-xl font-semibold mb-2">
        Plataforma Inteligente de Análise ESG e Conformidade
      </p>

      <Link
        to="/painel"
        className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 mt-4 rounded shadow transition duration-200 text-lg"
      >
        ✅ Acesse o Painel ESG
      </Link>
    </div>
  );
}
