import React from "react";
import { FileText, ShieldCheck, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function ConhecaMais() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-4">🌿 Conheça o GreenCheck</h1>
        <p className="text-lg max-w-3xl mx-auto">
          O GreenCheck é uma plataforma que une auditoria, ESG, inteligência artificial e sustentabilidade. 
          Automatizamos a análise de documentos, cruzamos dados com fontes públicas e emitimos certificados com QR Code e segurança blockchain.
        </p>
      </motion.div>

      {/* Como Funciona */}
      <section className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-semibold text-center text-green-600">🔎 Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <FileText className="mx-auto h-12 w-12 text-green-600 mb-2" />
            <h3 className="font-bold text-lg">1. Upload do Documento</h3>
            <p className="text-sm">Você envia arquivos PDF, DOC ou TXT para análise.</p>
          </div>
          <div>
            <Globe className="mx-auto h-12 w-12 text-green-600 mb-2" />
            <h3 className="font-bold text-lg">2. Checagem Pública</h3>
            <p className="text-sm">Cruzamos dados com IBAMA, ANEEL, CETESB e outros órgãos reguladores.</p>
          </div>
          <div>
            <ShieldCheck className="mx-auto h-12 w-12 text-green-600 mb-2" />
            <h3 className="font-bold text-lg">3. Certificado Seguro</h3>
            <p className="text-sm">Emitimos relatório com QR Code, blockchain e histórico de auditoria.</p>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-semibold text-center text-green-600">🌟 Nossos Diferenciais</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm list-disc pl-5">
          <li>Checagem com órgãos públicos oficiais (IBAMA, ANEEL, CETESB)</li>
          <li>Certificado digital com QR Code autenticado</li>
          <li>Validação antifraude com histórico em blockchain</li>
          <li>Consulta e painel de transparência pública</li>
          <li>Integração futura com sensores IoT de fábricas</li>
        </ul>
      </section>

      {/* Chamada para Ação */}
      <div className="text-center space-x-4">
        <a href="/analisar" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow">
          📄 Analisar Documento
        </a>
        <a href="/painel" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded shadow">
          📊 Ver Transparência
        </a>
      </div>
    </div>
  );
}
