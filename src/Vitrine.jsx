import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Vitrine() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 scroll-smooth">
      {/* HERO */}
      <motion.section
        id="hero"
        className="w-full text-center p-6 bg-gray-100 dark:bg-gray-900"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <img src="/logo-greencheck.png" alt="GreenCheck" className="w-28 h-28 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">
          Plataforma Inteligente de Análise ESG
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Automatize a análise de relatórios ESG com precisão, segurança e transparência.
        </p>
        <Link to="/analisar">
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow">
            ✅ Acesse o Painel ESG
          </Button>
        </Link>
      </motion.section>

      {/* QUEM SOMOS */}
      <motion.section
        id="quem-somos"
        className="py-16 px-6 max-w-4xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Quem Somos</h2>
        <p className="text-gray-700 dark:text-gray-300">
          O GreenCheck foi criado para facilitar a vida de auditores e empresas que precisam garantir a conformidade ESG. Nossa solução analisa documentos com inteligência e transparência.
        </p>
      </motion.section>

      {/* SERVIÇOS */}
      <motion.section
        id="servicos"
        className="py-16 px-6 max-w-6xl text-center bg-white dark:bg-gray-800 w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Serviços</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              titulo: "Análise ESG",
              texto: "Leitura automatizada de relatórios PDF, DOCX e TXT com extração de dados.",
            },
            {
              titulo: "Validação Pública",
              texto: "Confirmação de CNPJ e dados em órgãos como IBAMA, ANEEL, CETESB e Receita Federal.",
            },
            {
              titulo: "Exportações & Certificados",
              texto: "Geração de relatórios em PDF e envio por e-mail com selo de conformidade.",
            },
          ].map((servico, i) => (
            <motion.div
              key={i}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold mb-2">{servico.titulo}</h3>
              <p>{servico.texto}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CONTATO */}
      <motion.section
        id="contato"
        className="py-16 px-6 max-w-xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Contato</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Dúvidas, sugestões ou deseja testar o GreenCheck na sua empresa? Fale com a gente!
        </p>
        <a href="mailto:contato@greencheck.com.br" className="text-green-600 hover:underline">
          contato@greencheck.com.br
        </a>
      </motion.section>
    </div>
  );
}
