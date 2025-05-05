import React from "react";
import Header from "./components/ui/Header.jsx";
import ESGAnalyzer from "./components/ESGAnalyzer";
import Apresentacao from "./components/ui/Apresentacao.jsx";
import PainelTransparencia from "./components/ui/PainelTransparencia.jsx";
import Certificado from "./Certificado";
import Configuracoes from "./Configuracoes";
import Relatorios from "./Relatorios";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ContatoFlutuante from "./components/ui/ContatoFlutuante.jsx";
import Vitrine from "./Vitrine";
import QuemSomos from "./components/ui/QuemSomos";
import Servicos from "./components/ui/Servicos";
import ConhecaMais from "./components/ui/ConhecaMais";

export default function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Vitrine />} />
            <Route path="analisar" element={<ESGAnalyzer />} />
            <Route path="apresentacao" element={<Apresentacao />} />
            <Route path="painel" element={<PainelTransparencia />} />
            <Route path="certificado" element={<Certificado />} />
            <Route path="configuracoes" element={<Configuracoes />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="quem-somos" element={<QuemSomos />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="/conheca" element={<ConhecaMais />} />
          </Route>
        </Routes>
      </div>
      <ContatoFlutuante />
    </>
  );
}

