import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/ui/Header";
import Vitrine from "./Vitrine";
import ESGAnalyzer from "./components/ESGAnalyzer";
import Apresentacao from "./components/ui/Apresentacao";
import PainelTransparencia from "./components/PainelTransparencia";
import Certificado from "./Certificado";
import Configuracoes from "./Configuracoes";
import Relatorios from "./Relatorios";
import Layout from "./layout/Layout";
import ContatoFlutuante from "@/components/ui/ContatoFlutuante";

export default function App() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Vitrine />} />
            <Route path="analisar" element={<ESGAnalyzer />} />
            <Route path="apresentacao" element={<Apresentacao />} />
            <Route path="painel" element={<PainelTransparencia />} />
            <Route path="certificado" element={<Certificado />} />
            <Route path="configuracoes" element={<Configuracoes />} />
            <Route path="relatorios" element={<Relatorios />} />
          </Route>
        </Routes>
      </div>
      <ContatoFlutuante />
    </>
  );
}

