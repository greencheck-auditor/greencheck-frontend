import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Vitrine() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <img src="/logo-greencheck.png" alt="GreenCheck" className="w-32 h-32 mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-center">
        Plataforma Inteligente de Análise ESG e Conformidade
      </h1>
      <Link to="/analisar">
        <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow">
          ✅ Acesse o Painel ESG
        </Button>
      </Link>
    </div>
  );
}
