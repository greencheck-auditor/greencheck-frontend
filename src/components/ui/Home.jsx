import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center bg-green-100 p-12 overflow-hidden">
        <img
          src="/assets/hero/hero-greencheck.jpg"
          alt="Consultoria Verde"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6 drop-shadow-lg">
            Transforme a gestão ESG da sua empresa com inteligência, agilidade e confiança.
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
            Simplificando sua jornada rumo à conformidade sustentável.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/analisar"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full shadow-lg text-lg font-semibold transition transform hover:scale-105"
            >
              🔎 Analisar Documento
            </Link>
            <Link
  to="/quem-somos"
  className="bg-gray-200 hover:bg-gray-300 text-green-700 py-3 px-8 rounded-full shadow-lg text-lg font-semibold transition"
>
  Quem Somos
</Link>

          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section id="quem-somos" className="flex flex-col md:flex-row items-center justify-center gap-8 p-12 bg-white">
        <img
          src="/assets/quem-somos/auditor-equipe-verde.jpg"
          alt="Equipe GreenCheck"
          className="w-full md:w-1/2 rounded-xl shadow-lg object-cover"
        />
        <div className="flex flex-col max-w-lg text-center md:text-left">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Quem Somos</h2>
          <p className="text-gray-600 mb-6">
            O GreenCheck nasceu para conectar empresas, auditores e investidores a um novo padrão de transparência, responsabilidade e inovação no universo ESG.
          </p>
          <p className="text-gray-600">
            Combinamos tecnologia, inteligência de dados e compromisso socioambiental para simplificar auditorias, eliminar riscos e fortalecer a confiança nas práticas empresariais.
          </p>
        </div>
      </section>

      {/* Nossos Serviços */}
      <section id="servicos" className="p-12 bg-green-50">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/assets/servicos/auditores-cumprimento.jpg" alt="Análise" className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-green-700">Análise de Relatórios ESG</h3>
            <p className="text-gray-600">Padrões IFRS, GRI e verificação automatizada.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/assets/servicos/auditores-prancheta.jpg" alt="Verificação" className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-green-700">Verificação Ambiental</h3>
            <p className="text-gray-600">Conferência com dados públicos e validação antifraude.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/assets/servicos/auditores-trabalhando.jpg" alt="Painel" className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-green-700">Painel de Transparência</h3>
            <p className="text-gray-600">Histórico seguro com blockchain para consulta pública.</p>
          </div>
        </div>
      </section>

      {/* Greenwashing vs Sustentável */}
      <section id="industria-greenwashing" className="p-12 bg-white">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">ESG na Prática</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-lg shadow-md text-center">
            <img src="/assets/industria/industria-verde.jpg" alt="Indústria Verde" className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-green-700">Boas Práticas Industriais</h3>
            <p className="text-gray-600">Empresas que adotam práticas ambientais responsáveis são mais confiáveis.</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-md text-center">
            <img src="/assets/alerta/greenwashing.jpg" alt="Greenwashing" className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-red-700">Alerta Greenwashing</h3>
            <p className="text-gray-600">Detectamos indícios de falsificação de sustentabilidade e orientamos o auditor.</p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="p-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Fale Conosco</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Estamos prontos para transformar a gestão ESG da sua empresa. Entre em contato conosco e saiba mais!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/SEUNUMEROWHATSAPP" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full shadow-md transition">📱 WhatsApp</a>
          <a href="mailto:greencheck@email.com" className="bg-gray-200 hover:bg-gray-300 text-green-700 py-3 px-6 rounded-full shadow-md transition">✉️ E-mail</a>
        </div>
      </section>

      {/* Botão voltar à página inicial */}
      <div className="text-center mt-6 mb-12">
        <Link
          to="/"
          className="bg-green-100 text-green-700 font-semibold py-2 px-6 rounded shadow hover:bg-green-200 transition"
        >
          ⬅ Voltar à Página Inicial
        </Link>
      </div>

      {/* Rodapé */}
      <footer className="bg-green-700 text-white text-center py-6 mt-8">
        © 2025 GreenCheck • Plataforma Inteligente de Análise ESG
      </footer>
    </div>
  );
}
