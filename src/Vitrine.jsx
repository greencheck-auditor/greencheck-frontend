import React from "react";
import { Link } from "react-router-dom";
import banner from "@/assets/banner-home.png";

export default function Vitrine() {
  return (
    <div className="relative bg-white dark:bg-gray-900">
      {/* Imagem de fundo encostando no topo */}
      <div className="w-full overflow-hidden">
      <img
  src={banner}
  alt="Banner institucional GreenCheck"
  className="w-full h-[600px] object-cover object-center"
/>

      </div>

      {/* Faixa verde com botões */}
      <div className="w-full bg-green-600 py-6 flex flex-wrap justify-center gap-4 shadow-md z-10 relative">


        <Link
          to="/analisar"
          className="bg-white text-green-700 font-semibold py-2 px-6 rounded shadow hover:bg-green-100 transition"
        >
          Analisar Documento
        </Link>
        <Link
          to="/painel"
          className="bg-white text-green-700 font-semibold py-2 px-6 rounded shadow hover:bg-green-100 transition"
        >
          Painel ESG
        </Link>
        <Link
          to="/home"
          className="bg-white text-green-700 font-semibold py-2 px-6 rounded shadow hover:bg-green-100 transition"
        >
          Conheça mais
        </Link>
      </div>

      {/* Título central */}
      <div className="text-center max-w-3xl mx-auto px-6 mt-12">
        <h1 className="text-4xl sm:text-4xl font-bold text-green-700 mb-4">
          Plataforma Inteligente de Análise ESG
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-md sm:text-lg">
          Automatize a análise de relatórios ESG com precisão, segurança e transparência.
        </p>
      </div>

      {/* Seção de Serviços */}
      <section id="servicos" className="py-16 bg-gray-100 dark:bg-gray-800 text-center mt-20 px-4">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-10">Serviços</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-600">📊 Análise ESG</h3>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              Leitura automatizada de relatórios PDF, DOCX e TXT com extração de dados.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-600">🔎 Validação Pública</h3>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              Confirmação de CNPJ e dados em órgãos como IBAMA, ANEEL, CETESB e Receita Federal.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-600">📄 Exportações & Certificados</h3>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              Geração de relatórios em PDF e envio por e-mail com selo de conformidade.
            </p>
          </div>
        </div>
      </section>

      {/* Seção Quem Somos */}
      <section id="quem-somos" className="py-16 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Quem Somos</h2>
        <p className="text-gray-700 dark:text-gray-300 text-md sm:text-lg">
          O GreenCheck foi desenvolvido por especialistas em contabilidade, tecnologia e ESG
          para facilitar auditorias automatizadas com verificação em tempo real.
          Nossa missão é garantir transparência, sustentabilidade e conformidade com normas internacionais como IFRS S1 e S2.
        </p>
      </section>

      {/* Seção Contato */}
      <section id="contato" className="py-16 bg-gray-100 dark:bg-gray-800 text-center px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Contato</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Dúvidas, sugestões ou quer testar o GreenCheck na sua empresa?
        </p>
        <a
          href="mailto:contato@greencheck.com"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow transition"
        >
          ✉️ Fale Conosco
        </a>
      </section>
    </div>
  );
}
