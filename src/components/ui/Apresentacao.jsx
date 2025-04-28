import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Apresentacao() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
        📥 Apresentação Narrada do GreenCheck
      </h2>

      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Baixe o PDF com o passo a passo real da auditoria ESG usando o app.
      </p>
     
      <Link to="/" className="inline-block">
  <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow">
    📄 Acesse o Painel ESG
  </Button>
</Link>

      <a
        href="/GreenCheck_Narrativa_Auditoria_FINAL (2).pdf"
        download
        className="inline-block"
      >
        <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow">
          Baixar Apresentação em PDF
        </Button>
      </a>
    </div>
  );
}
