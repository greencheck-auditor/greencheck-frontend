import React from "react";
import equipe from "../../assets/auditor-equipe-verde.jpg";


export default function QuemSomos() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-700 mb-6">🌱 Quem Somos</h1>

      <p className="max-w-3xl text-lg mb-4 text-center">
        Somos uma equipe apaixonada por sustentabilidade, tecnologia e auditoria. Criamos o GreenCheck
        para tornar a análise ESG acessível, automatizada e segura, ajudando empresas a seguir as
        normas IFRS S1 e S2 com facilidade.
      </p>

      <section id="quem-somos" className="py-8 text-center max-w-3xl">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Nossa Missão</h2>
        <p className="text-gray-700 dark:text-gray-300 text-md sm:text-lg">
          O GreenCheck foi desenvolvido por especialistas em contabilidade, tecnologia e ESG
          para facilitar auditorias automatizadas com verificação em tempo real.
          Nossa missão é garantir transparência, sustentabilidade e conformidade com normas
          internacionais como IFRS S1 e S2.
        </p>
      </section>

      <img
        src={equipe}
        alt="Equipe GreenCheck"
        className="w-full max-w-3xl mt-8 rounded-xl shadow-lg"
      />
    </div>
  );
}
