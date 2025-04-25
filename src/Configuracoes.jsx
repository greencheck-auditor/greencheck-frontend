import React from "react";

export default function Configuracoes() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 shadow rounded">
      <h1 className="text-2xl font-bold text-green-700 mb-4">⚙️ Configurações do GreenCheck</h1>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Tema:</label>
          <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option>Claro</option>
            <option>Escuro</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Idioma:</label>
          <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option>Português</option>
            <option>Inglês</option>
            <option>Espanhol</option>
          </select>
        </div>

        <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded shadow">
          Salvar Preferências
        </button>
      </div>
    </div>
  );
}
