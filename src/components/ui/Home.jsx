import React from "react";
import { Link } from "react-router-dom";
import { FileText, ShieldCheck, Globe } from "lucide-react";

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
        {/* Imagem de fundo */}
        <img
          src="/assets/hero/hero-greencheck.jpg"
          alt="Consultoria Verde"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        />
  
        {/* Conteúdo em cima da imagem */}
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
            <button
              onClick={() => handleScrollToSection("quem-somos")}
              className="bg-gray-200 hover:bg-gray-300 text-green-700 py-3 px-8 rounded-full shadow-lg text-lg font-semibold transition transform hover:scale-105"
            >
              Quem Somos
            </button>
          </div>
        </div>
      </section>
  
      {/* Quem Somos */}
      <section id="quem-somos" className="flex flex-col md:flex-row items-center justify-center gap-8 p-12 bg-white">
        {/* Imagem Quem Somos */}
        <img
          src="/assets/quem-somos/auditor-equipe-verde.jpg"
          alt="Equipe GreenCheck"
          className="w-full md:w-1/2 rounded-xl shadow-lg object-cover"
        />
  
        {/* Texto Quem Somos */}
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
  
        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Serviço 1 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <img
              src="/assets/servicos/auditores-cumprimento.jpg"
              alt="Análise de Relatórios"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-green-700">Análise de Relatórios ESG</h3>
            <p className="text-gray-600 text-center">
              Analisamos documentos e relatórios seguindo padrões internacionais (IFRS, GRI).
            </p>
          </div>
  
          {/* Serviço 2 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <img
              src="/assets/servicos/auditores-prancheta.jpg"
              alt="Verificação Ambiental"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-green-700">Verificação Ambiental</h3>
            <p className="text-gray-600 text-center">
              Cruzamos dados públicos e evidências para combater o greenwashing e garantir autenticidade.
            </p>
          </div>
  
          {/* Serviço 3 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <img
              src="/assets/servicos/auditores-trabalhando.jpg"
              alt="Painel de Transparência"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-green-700">Painel de Transparência</h3>
            <p className="text-gray-600 text-center">
              Visualize relatórios verificados em tempo real, com segurança blockchain e transparência pública.
            </p>
          </div>
  
        </div>
      </section>
  
  {/* Indústria e Greenwashing */}
<section id="industria-greenwashing" className="p-12 bg-white">
  <h2 className="text-3xl font-bold text-green-700 text-center mb-8">ESG na Prática</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Indústria Sustentável */}
    <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow-md">
      <img
        src="/assets/industria/industria-verde.jpg"
        alt="Indústria Sustentável"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-semibold text-lg mb-2 text-green-700">Boas Práticas Industriais</h3>
      <p className="text-gray-600 text-center">
        Empresas que investem em práticas ambientais responsáveis demonstram compromisso real com o futuro.
      </p>
    </div>

    {/* Alerta Greenwashing */}
    <div className="flex flex-col items-center bg-red-50 p-6 rounded-lg shadow-md">
      <img
        src="/assets/alerta/greenwashing.jpg"
        alt="Greenwashing"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-semibold text-lg mb-2 text-red-700">Atenção ao Greenwashing</h3>
      <p className="text-gray-600 text-center">
        Greenwashing ocorre quando empresas fingem práticas sustentáveis. Nosso app ajuda a identificar esses riscos.
      </p>
    </div>

  </div>
</section>

      {/* Contato */}
      <section id="contato" className="p-12 bg-white flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Fale Conosco</h2>
        <p className="text-gray-600 mb-8 max-w-xl">
          Estamos prontos para transformar a gestão ESG da sua empresa. Entre em contato conosco e saiba mais!
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          <a
            href="https://wa.me/SEUNUMEROWHATSAPP"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full shadow-lg text-lg font-semibold transition transform hover:scale-105"
          >
            📱 WhatsApp
          </a>
          <a
            href="mailto:greencheck@email.com"
            className="bg-gray-200 hover:bg-gray-300 text-green-700 py-3 px-8 rounded-full shadow-lg text-lg font-semibold transition transform hover:scale-105"
          >
            ✉️ E-mail
          </a>
        </div>
      </section>
  
      {/* Rodapé */}
      <footer className="bg-green-700 text-white text-center py-6">
        © 2025 GreenCheck • Plataforma Inteligente de Análise ESG
      </footer>
  
    </div>
  );
}  