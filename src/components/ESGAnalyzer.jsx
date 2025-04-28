import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Moon, Sun, Mail, FileText, QrCode, Lock, Globe, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import sha256 from "crypto-js/sha256";
import robot from "@/assets/robot.png";
import background from "@/assets/grafico-fundo.png";
import seloCertificado from "@/assets/selo-certificado.png";
import { CheckCircle } from "lucide-react";
import { gerarCertificado } from "../utils/gerarCertificado";

const filtrarDadosPublicos = (dados) => {
  const copia = { ...dados };
  delete copia.telefone;
  delete copia.email;
  delete copia.cpf_responsavel;
  return copia;
};

const translations = {
  pt: {
    title: "GreenCheck",
    description: "Plataforma Inteligente de Análise ESG e Conformidade",
    analyze: "Analisar",
    exportPDF: "Exportar PDF",
    exportHistory: "Histórico",
    listening: "Ouvir",
    stop: "Parar",
    translateText: "Traduzir",
    toggleText: "Alternar texto traduzido",
    placeholder: "Resultado da análise ESG...",
    noFile: "Nenhum arquivo escolhido",
    fileLabel: "Escolher arquivo",
    scoreInfo: "Pontuação ESG: ",
    compliant: "✔️ Em conformidade com os critérios do GreenCheck.",
    viewStandards: "Consultar Normas em Português e Inglês",
    blockchainLabel: "Histórico com Segurança Blockchain",
    emailButton: "Enviar por E-mail"
  },
  en: {
    title: "GreenCheck",
    description: "Intelligent ESG and Compliance Analysis Platform",
    analyze: "Analyze",
    exportPDF: "Export PDF",
    exportHistory: "History",
    listening: "Listen",
    stop: "Stop",
    translateText: "Translate",
    toggleText: "Toggle Translated Text",
    placeholder: "ESG analysis result...",
    noFile: "No file chosen",
    fileLabel: "Choose file",
    scoreInfo: "ESG Score: ",
    compliant: "✔️ Compliant with GreenCheck standards.",
    viewStandards: "Consultar Normas em Português e Inglês",
    blockchainLabel: "Histórico com Segurança Blockchain",
    emailButton: "Enviar por E-mail"
  },
  es: {
    title: "GreenCheck",
    description: "Plataforma Inteligente de Análisis ESG y Cumplimiento",
    analyze: "Analizar",
    exportPDF: "Exportar PDF",
    exportHistory: "Historial",
    listening: "Escuchar",
    stop: "Detener",
    translateText: "Traducir",
    toggleText: "Alternar texto traducido",
    placeholder: "Resultado del análisis ESG...",
    noFile: "Ningún archivo elegido",
    fileLabel: "Elegir archivo",
    scoreInfo: "Puntuación ESG: ",
    compliant: "✔️ Cumple con los estándares de GreenCheck.",
    viewStandards: "Consultar Normas em Português e Inglês",
    blockchainLabel: "Histórico com Segurança Blockchain",
    emailButton: "Enviar por E-mail"
  },
  fr: {
    title: "GreenCheck",
    description: "Plateforme intelligente d'analyse ESG et de conformité",
    analyze: "Analyser",
    exportPDF: "Exporter PDF",
    exportHistory: "Historique",
    listening: "Écouter",
    stop: "Arrêter",
    translateText: "Traduire",
    toggleText: "Basculer le texte traduit",
    placeholder: "Résultat de l'analyse ESG...",
    noFile: "Aucun fichier choisi",
    fileLabel: "Choisir un fichier",
    scoreInfo: "Score ESG : ",
    compliant: "✔️ Conforme aux standards de GreenCheck.",
    viewStandards: "Consultar Normas em Português e Inglês",
    blockchainLabel: "Histórico com Segurança Blockchain",
    emailButton: "Enviar por E-mail"
  }
};

export default function ESGAnalyzer() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [translated, setTranslated] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "pt");
  const [speaking, setSpeaking] = useState(false);
  const [showTranslated, setShowTranslated] = useState(true);
  const [lastHash, setLastHash] = useState("0000000000");
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("");
  const [score, setScore] = useState(null);
  const [email, setEmail] = useState("");
  const [cnpjInfo, setCnpjInfo] = useState(null);
  const [publicData, setPublicData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dados");
  const [dadosOrgaos, setDadosOrgaos] = useState(null);
  const [analysisData, setAnalysisData] = useState({});
  const empresa = analysisData?.empresa || "Empresa Auditada";

  const t = translations[language] || translations["pt"];
 
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [language, darkMode]);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  const calculateHash = (entry) => {
  return sha256(JSON.stringify(entry)).toString();
};

const handleAnalyze = async () => {
  if (!file) return;

  // Ativando estado de análise
  setAnalyzing(true);
  setAnalysis("");
  setTranslated("");
  setFileName(file.name);
  setDadosOrgaos(data.orgaos_publicos);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const token = import.meta.env.VITE_API_TOKEN;


    const res = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {

      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    console.log("Retorno do backend:", data);
    // Limpa caracteres invisíveis do conteúdo analisado
    setAnalysisData(data);
    setScore(data.score);
    setCnpjInfo(data.cnpj_info); 
    setPublicData(filtrarDadosPublicos(data.dados_publicos));
    setDadosOrgaos(data.orgaos_publicos);
    
    const cleanText = (data.analysis || "").replace(/[\x00-\x1F\x7F]/g, "");
    setAnalysis(cleanText); // Mostra no textarea
    setScore(data.score || null); // Exibe score ESG se disponível

    // Monta e salva nova entrada no histórico com segurança estilo blockchain
    const newEntry = {
      name: file.name,
      score: data.score || "N/A",
      date: new Date().toLocaleString(),
      previousHash: lastHash,
      antifraude: data.dados_publicos?.status === "ATIVA" ? "Verificado" : "Pendente"
    };
    
    const newHash = calculateHash(newEntry);
    setLastHash(newHash);
    setHistory((prev) => [...prev, { ...newEntry, hash: newHash }]);

    // Traduz se o idioma for diferente de pt
    if (language !== "pt") {
      await handleTranslate(cleanText);
    }
  } catch (err) {
    setAnalysis("Erro na análise. Verifique o backend.");
  } finally {
   // Salvar no localStorage (Painel de Transparência)
const historicoAtual = JSON.parse(localStorage.getItem("historico_esg")) || [];
const novoRelatorio = {
  name: file.name,
  date: new Date().toLocaleString(),
  score: data.score || "N/A",
  hash: newHash,
  antifraude: publicData ? "Verificado" : "Pendente"
};
localStorage.setItem("historico_esg", JSON.stringify([...historicoAtual, novoRelatorio]));
 
    setAnalyzing(false);
  }
};

  const handleTranslate = async (text) => {
    if (!text) return;
    try {
      const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, source: "auto", target: language, format: "text" })
      });
      
      const data = await res.json();
      if (data && data.translatedText) {
        setTranslated(data.translatedText);
        setShowTranslated(true);  // <-- Isso garante que a tradução apareça logo
      } else {
        setTranslated("⚠️ Erro ao traduzir.");
      }
    } catch (err) {
      setTranslated("⚠️ Erro ao traduzir.");
    }
  };
  

  const handleExportPDF = async () => {
   console.log("Iniciando exportação...");
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString();
    const text = translated && !translated.includes("Erro ao traduzir") ? translated : analysis;
    const cleanText = (text || "(sem conteúdo)").normalize("NFKD").replace(/[^\x00-\x7F]/g, "");
     
    // Cabeçalho
  
    doc.setFontSize(16);
    doc.text("GreenCheck - Análise ESG", 20, 20);
    doc.setFontSize(12);
    doc.text(`Arquivo: ${fileName}`, 20, 30);
    doc.text(`Data: ${currentDate}`, 20, 38);
    doc.text("Resultado da Análise:", 20, 48);
  
    // Selo no canto superior direito
    if (score && parseInt(score) >= 70) {
      doc.addImage(seloCertificado, "PNG", 150, 10, 35, 35);
    }
  
    // Texto da análise
    const lines = doc.splitTextToSize(cleanText, 170);
    doc.text(lines, 20, 58);
  
    let y = 58 + lines.length * 7 + 10;
  
    // Score e mensagem de conformidade
    if (score && parseInt(score) >= 70) {
      doc.setTextColor(0, 150, 0);// verde
      doc.setFont("helvetica", "bold");
      doc.text(`${t.scoreInfo}${score}%`, 20, y);
      y += 8;
      doc.text(t.compliant.normalize("NFKD").replace(/[^\x00-\x7F]/g, ""), 20, y);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
    } else if (score) {
      doc.setTextColor(200, 0, 0);// vermelho
      doc.text(`${t.scoreInfo}${score}%`, 20, y);
      y += 8;
      doc.text("⚠️ Documento fora dos critérios do GreenCheck.", 20, y);
      doc.setTextColor(0, 0, 0);
    }
  
    y += 20;
    
    // QR Code + Assinatura
    const qrCode = await QRCode.toDataURL(`GreenCheck|Arquivo: ${fileName} | Score: ${score} | Data: ${currentDate}`)
    doc.addImage(qrCode, "PNG", 20, y, 30, 30);
  
   // Assinatura
    doc.setFontSize(10);
    doc.text("Assinado digitalmente por:", 60, y + 5);
    doc.text("Kamila Silva - GreenCheck", 60, y + 11);
    doc.text(`Data e Hora: ${currentDate}`, 60, y + 17);
  
 // Linha de assinatura manuscrita
     y += 35;
    doc.setLineWidth(0.5);
    doc.line(20, 270,130,270);  // x1,y1,x2,y2 linha horizontal
    doc.text("Assinatura Manual", 20, y + 45);
    doc.text("Kamila Silva - GreenCheck", 20, y + 50);

    // Salvar PDF
    doc.save(`Relatorio_ESG_${fileName}.pdf`);
  };
  
  const handleSendEmail = async () => {
    if (!email) {
      alert("Endereço de e-mail não fornecido.");
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body: JSON.stringify({
          fileName,
          score,
          content: analysis,
          email,
        }),
      });
  
      const res = await response.json();
      alert(res.message || "✅ Enviado para o e-mail com sucesso!");
    } catch (error) {
      alert("Erro ao enviar e-mail. Verifique o backend.");
    }
  };
  
  const handleSpeak = () => {
    const text = translated || analysis;
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.startsWith(language));
    if (voice) utterance.voice = voice;
    utterance.lang = language;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
   <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`} style={{ backgroundImage: `url(${background})`, backgroundSize: '1119px auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center' }}>
      <div className="w-full bg-green-700 text-white py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <img src={robot} alt="Logo" className="w-26 h-24 drop-shadow-xl" />
          <div>
            <h1 className="text-7xl font-black drop-shadow-xl text-green-500">Green<span className="text-black dark:text-white">Check</span></h1>
            <p className="text-sm text-white drop-shadow-sm">Plataforma Inteligente de Análise ESG e Conformidade</p>
          </div>
        </div>
        <div className="flex gap-2">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-black rounded px-2 py-1">
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
          
          <Button onClick={() => setDarkMode(!darkMode)} className="bg-white text-black dark:bg-gray-800 dark:text-white">
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>

      <motion.div
     className="max-w-4xl mx-auto w-full pt-[22rem] p-6 z-10 relative"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.5 }}
   >
     <Card>
       <CardContent className="space-y-4 p-6">
         <label className="block">
           <Input
             type="file"
             onChange={(e) => setFile(e.target.files[0])}
             className="file:bg-green-700 file:text-white"
             title={t.fileLabel}
           />
         </label>

         <div className="text-sm text-gray-600 dark:text-gray-300">
           {fileName || t.noFile}
         </div>

         <Button
           onClick={handleAnalyze}
           disabled={!file || analyzing}
           className="w-full bg-green-700 hover:bg-green-800 text-white shadow-md cursor-pointer transition duration-200"
         >
           {analyzing ? (
             <>
               <Loader2 className="animate-spin mr-2" /> {t.analyze}
             </>
           ) : (
             t.analyze
           )}
         </Button>

         <div className="grid grid-cols-3 gap-4 mb-4">
           <Button
             onClick={handleExportPDF}
             disabled={!analysis}
             className="bg-green-600 hover:bg-green-700 text-white"
           >
             {t.exportPDF}
           </Button>

           <Button
             onClick={() => handleTranslate(analysis)}
             disabled={!analysis}
             className="bg-green-600 hover:bg-green-700 text-white"
           >
             {t.translateText}
           </Button>

           {!speaking ? (
             <Button
               onClick={handleSpeak}
               disabled={!analysis}
               className="bg-green-600 hover:bg-green-700 text-white"
             >
               {t.listening}
             </Button>
           ) : (
             <Button
               onClick={handleStopSpeaking}
               className="bg-red-600 hover:bg-red-700 text-white"
             >
               {t.stop}
             </Button>
           )}
         </div>

         <div className="flex flex-col md:flex-row gap-2 items-center col-span-3">
           <Input
             type="email"
             placeholder="Digite seu e-mail para envio"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="flex-1 rounded px-3 py-2 border border-gray-300 w-full"
           />
           <Button
             onClick={handleSendEmail}
             disabled={!analysis}
             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
           >
             {t.emailButton}
           </Button>
         </div>

         {translated && (
           <Button
             onClick={() => setShowTranslated(!showTranslated)}
             className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
           >
             {t.toggleText}
           </Button>
         )}

         <Textarea
           readOnly
           value={
             showTranslated && translated && !translated.includes("Erro ao traduzir")
               ? translated
               : analysis
           }
           placeholder={t.placeholder}
           className="min-h-[500px] bg-white text-black dark:bg-gray-800 dark:text-white"
         />

         <div className="mt-4">
           <a
             href="https://www.ifrs.org/issued-standards/list-of-standards/"
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-700 underline hover:text-blue-900"
           >
             📘 {t.viewStandards}
           </a>
         </div>

         {score && (
           <div
             className={`font-semibold text-center pt-6 ${
               parseInt(score) >= 70 ? "text-green-700 dark:text-green-400" : "text-red-600"
             }`}
           >
             {parseInt(score) >= 70 && (
  <>
    <img
      src={seloCertificado}
      alt="Selo de Conformidade"
      className="mx-auto w-20 h-20"
    />
    <button
      onClick={() => gerarCertificado(empresa)}
      className="mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded shadow"
    >
      📄 Gerar Certificado ESG
    </button>
  </>

)}
{dadosOrgaos && (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mt-4">
    <h2 className="text-green-700 dark:text-green-300 font-bold mb-2">🔍 Validação com Órgãos Públicos</h2>
    <ul className="text-sm list-disc list-inside">
      {Object.entries(dadosOrgaos).map(([orgao, info]) => (
        <li key={orgao}>
          <strong>{orgao}:</strong> {info.status} {info.origem && `(${info.origem})`}
        </li>
      ))}
    </ul>
  </div>
)}

             {t.scoreInfo}
             {score}%<br />
             {parseInt(score) >= 70
               ? t.compliant
               : "⚠️ Documento fora dos critérios do GreenCheck."}
           </div>
         )}

{publicData?.status === "ATIVA" && (
  <div className="flex items-center justify-center gap-2 mt-2 text-green-600 font-bold">
    <CheckCircle className="w-5 h-5" />
    Dados Públicos Verificados com Base Oficial
  </div>
)}


{cnpjInfo && (
  <div className="mt-6 bg-white dark:bg-gray-800 rounded-md p-4 shadow-md border border-gray-300 dark:border-gray-700">
    <h3 className="text-lg font-bold text-green-600 mb-2">📄 Informações do CNPJ</h3>
    
    {cnpjInfo.status === "não identificado" ? (
  <p className="text-red-600 dark:text-red-400">
    ❌ CNPJ não identificado no documento.
  </p>
) : (
  <div className="space-y-2 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 p-4 rounded-md shadow border border-gray-300 dark:border-gray-700">
    <p><strong className="text-green-600">✅ Status:</strong> {cnpjInfo.status}</p>
    <p><strong className="text-green-600">🏢 Razão Social:</strong> {cnpjInfo.razao_social}</p>
    <p><strong className="text-green-600">📅 Abertura:</strong> {cnpjInfo.abertura}</p>
  </div>
)}
    
  </div>
)}

{publicData && (
  <div className="mt-6 bg-white dark:bg-gray-800 rounded-md shadow-md border border-blue-300 dark:border-blue-700">
    <div className="flex border-b border-blue-200 dark:border-blue-600">
      <button
        onClick={() => setActiveTab("dados")}
        className={`px-4 py-2 font-semibold ${activeTab === "dados" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-600"}`}
      >
        📌 Dados Formatados
      </button>
      <button
        onClick={() => setActiveTab("json")}
        className={`px-4 py-2 font-semibold ${activeTab === "json" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-600"}`}
      >
        🧾 JSON Completo
      </button>
    </div>

    {activeTab === "dados" && (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-200">
        <p><strong className="text-blue-600 dark:text-blue-400">🟢 Status:</strong> {publicData.status || "Não informado"}</p>
        <p><strong className="text-blue-600 dark:text-blue-400">📅 Abertura:</strong> {publicData.abertura || "Não informado"}</p>
        <p><strong className="text-blue-600 dark:text-blue-400">🏢 Razão Social:</strong> {publicData.razao_social || "Não informado"}</p>
        <p><strong className="text-blue-600 dark:text-blue-400">🎭 Nome Fantasia:</strong> {publicData.fantasia || "Não informado"}</p>
        <p><strong className="text-blue-600 dark:text-blue-400">🏛️ Natureza Jurídica:</strong> {publicData.natureza_juridica || "Não informado"}</p>
        <p><strong className="text-blue-600 dark:text-blue-400">💰 Capital Social:</strong> {publicData.capital_social || "Não informado"}</p>
        <p><strong className="text-blue-600 dark:text-blue-400">📍 Endereço:</strong> {`${publicData.logradouro || ""}, ${publicData.numero || ""} - ${publicData.bairro || ""}`}</p>
        <p><strong className="text-blue-600 dark:text-blue-400">🏙️ Município:</strong> {`${publicData.municipio || ""} / ${publicData.uf || ""}`}</p>
        <p><strong className="text-blue-600 dark:text-blue-400">📮 CEP:</strong> {publicData.cep || "Não informado"}</p>
      </div>
    )}

    {activeTab === "json" && (
      <div className="p-4">
        <pre className="text-sm whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100">
          {JSON.stringify(publicData, null, 2)}
        </pre>
        <div className="mt-4 flex gap-2">
  <Button
    onClick={() => navigator.clipboard.writeText(JSON.stringify(publicData, null, 2))}
    className="bg-blue-600 hover:bg-blue-700 text-white"
  >
    📋 Copiar JSON
  </Button>
  <Button
    onClick={() => {
      const blob = new Blob([JSON.stringify(publicData, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "dados_cnpj.json";
      link.click();
    }}
    className="bg-green-600 hover:bg-green-700 text-white"
  >
    📁 Baixar JSON
  </Button>
</div>

      
      </div>
    )}
  </div>
)}

<div className="px-4 pb-4 flex gap-4 flex-wrap">
  <Button
    onClick={() => navigator.clipboard.writeText(JSON.stringify(publicData, null, 2))}
    className="bg-blue-600 hover:bg-blue-700 text-white"
  >
    📋 Copiar
  </Button>

  <Button
    onClick={() => {
      const blob = new Blob([JSON.stringify(publicData, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "dados_cnpj.json";
      link.click();
    }}
    className="bg-green-600 hover:bg-green-700 text-white"
  >
    📁 Baixar JSON
  </Button>

  <Button
  onClick={() => setShowModal(true)}
    className="bg-gray-600 hover:bg-gray-700 text-white"
  > 
    🔍 Ver em Modal
  </Button>
</div>

{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
      >
        ❌
      </button>
      <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">🔍 Visualização dos Dados Públicos</h2>
      <pre className="text-sm whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100">
        {JSON.stringify(publicData, null, 2)}
      </pre>
    </div>
  </div>
)}

    
{history.length > 0 && (
           <div className="mt-6">
             <h2 className="text-xl font-semibold mb-2">{t.blockchainLabel}</h2>
             <ul className="text-sm space-y-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
               {history
                 .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
                 .map((item, index) => (
                   <li key={index} className="break-all">
  <strong>{item.date}:</strong> {item.name} - Score: {item.score} <br />
  Hash: {item.hash?.slice(0, 24)}...<br />
  <span className={item.antifraude === "Verificado" ? "text-green-600" : "text-yellow-600"}>
    {item.antifraude === "Verificado" ? "✔️ Verificado por Dados Públicos" : "⚠️ Pendente de Verificação"}
  </span>
</li>
 ))}
    </ul>
  </div>
)}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
  <Button
  variant="secondary"
  className="w-full shadow-md hover:shadow-lg transition cursor-pointer"
  onClick={() => alert('Validação via sensor IoT (simulada) realizada.')}
>
  <Lock className="w-4 h-4 mr-2" />
  Validar com IoT
</Button>


  <Button
    variant="secondary"
    className="w-full shadow-md hover:shadow-lg transition cursor-pointer"
    onClick={() => alert('Abrindo painel de transparência (em construção)...')}
  >
    <RefreshCcw className="w-4 h-4 mr-2" />
    Painel de Transparência
  </Button>
</div>


      </CardContent>
      </Card>
      </motion.div>
  </div> 
);
}
