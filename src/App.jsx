import Vitrine from "./Vitrine"; // ✅ Importa a Vitrine
import ESGAnalyzer from "./components/ESGAnalyzer";
import Apresentacao from "./components/ui/Apresentacao";
import PainelTransparencia from "./components/PainelTransparencia";
import Certificado from "./Certificado";
import Configuracoes from "./Configuracoes";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Relatorios from "./Relatorios";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Vitrine />} /> {/* 👈 Tela inicial agora é a vitrine */}
        <Route path="analisar" element={<ESGAnalyzer />} />
        <Route path="apresentacao" element={<Apresentacao />} />
        <Route path="painel" element={<PainelTransparencia />} />
        <Route path="certificado" element={<Certificado />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="relatorios" element={<Relatorios />} />
      </Route>
    </Routes>
  );
}

