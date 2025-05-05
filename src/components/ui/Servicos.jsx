import React from "react";
import servico1 from "@/assets/servico1.png";
import servico2 from "@/assets/servico2.png";
import servico3 from "@/assets/servico3.png";

export default function Servicos() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8 space-y-12">
      <h1 className="text-4xl font-bold text-green-700 text-center">🛠️ Nossos Serviços</h1>

      {/* Ambiental */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img src={servico1} alt="Ambiental" className="w-full md:w-1/2 rounded-lg shadow-lg" />
        <div className="md:w-1/2 text-lg">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">🌱 Ambiental</h2>
          <p>
            Fornecemos análise automatizada de relatórios com foco em sustentabilidade, uso racional de recursos
            e compromisso com o meio ambiente, seguindo padrões IFRS S1.
          </p>
        </div>
      </div>

      {/* Social */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8">
        <img src={servico2} alt="Social" className="w-full md:w-1/2 rounded-lg shadow-lg" />
        <div className="md:w-1/2 text-lg">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">👥 Social</h2>
          <p>
            Avaliamos práticas sociais com foco em inclusão, diversidade, segurança do trabalho e impacto nas comunidades.
            Tudo automatizado para dar visibilidade às ações sociais da empresa.
          </p>
        </div>
      </div>

      {/* Governança */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img src={servico3} alt="Governança" className="w-full md:w-1/2 rounded-lg shadow-lg" />
        <div className="md:w-1/2 text-lg">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">🏛️ Governança</h2>
          <p>
            Validamos aspectos de governança como transparência, ética, conformidade regulatória e
            estrutura de decisão, com geração de certificados e segurança por blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}
