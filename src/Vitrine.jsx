import React from "react";
import { Link } from "react-router-dom";
import banner from "@/assets/banner-home.png";

export default function Vitrine() {
  return (
    <>
      <div className="relative bg-white dark:bg-gray-900">
        {/* Imagem de fundo encostando no topo */}
        <div className="w-full overflow-hidden">
          <img
            src={banner}
            alt="Banner institucional GreenCheck"
            className="w-full h-[450px] object-cover object-center"
          />
        </div>

        {/* Faixa verde com botões */}
        <div className="w-full bg-green-600 py-6 flex flex-wrap justify-center gap-4 shadow-md z-10 relative">
          <Link to="/analisar" className="bg-white text-green-700 font-semibold py-2 px-6 rounded shadow hover:bg-green-100 transition">
            Analisar Documento
          </Link>
          <Link to="/painel" className="bg-white text-green-700 font-semibold py-2 px-6 rounded shadow hover:bg-green-100 transition">
            Painel ESG
          </Link>
          <Link to="/conheca" className="bg-white text-green-700 font-semibold py-2 px-6 rounded shadow hover:bg-green-100 transition">
            Conheça Mais
          </Link>
        </div>

        {/* Título central */}
        <div className="text-center max-w-3xl mx-auto px-6 mt-12">
          <h1 className="text-4xl sm:text-4xl font-bold text-green-700 mb-4">
            Plataforma Inteligente de Análise ESG
          </h1>
          <div className="text-gray-700 dark:text-gray-300 text-md sm:text-lg">
            <p className="text-center">
              Automatize a análise de relatórios ESG com precisão, segurança e transparência.
            </p>
            <p className="mt-2 text-md text-gray-600 dark:text-gray-400 text-center">
              A análise é automatizada e gera resultados em <strong>até 30 segundos</strong>.
            </p>
          </div>
        </div>

        {/* Seção de Serviços */}
        <section id="servicos" className="py-16 bg-gray-100 dark:bg-gray-800 text-center mt-20 px-4">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-10">Serviços</h2>
          <p className="mt-4 mb-6 text-md text-gray-600 dark:text-gray-400 text-center">
          Explore as funcionalidades que tornam sua auditoria mais eficiente.
          </p>
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

        {/* Rodapé com Contato */}
        <footer id="contato" className="bg-gray-100 dark:bg-gray-800 text-center py-10 mt-12 px-4">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Entre em Contato</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img
              src="/fale-conosco.jpg"
              alt="Fale Conosco"
              className="w-full md:w-1/3 max-w-md rounded shadow-md"
            />
            <div className="text-gray-700 dark:text-gray-200 text-left space-y-2 text-lg">
              <p><strong>Email:</strong> greencheckapp@outlook.com</p>
              <p><strong>Telefone:</strong> (11) 93926-2609</p>
              <p><strong>Site:</strong> www.greencheckesg.com.br</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
