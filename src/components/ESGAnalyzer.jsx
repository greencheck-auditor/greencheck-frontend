import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Lock, RefreshCcw, CheckCircle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import sha256 from "crypto-js/sha256";
import robot from "@/assets/robot.png";
import background from "@/assets/grafico-fundo.png";
import seloCertificado from "@/assets/selo-certificado.png";
import { gerarCertificado } from "../utils/gerarCertificado";
import ExportButtons from "@/components/ui/ExportButtons";
import NormasLink from "@/components/ui/NormasLink";
import { Link } from "react-router-dom";




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
  // outras traduções...
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
  const [email, setEmail] = useState("");
  const [cnpjInfo, setCnpjInfo] = useState(null);
  const [publicData, setPublicData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dados");
  const [dadosOrgaos, setDadosOrgaos] = useState(null);
  const [analysisData, setAnalysisData] = useState({});
  const empresa = analysisData?.empresa || "Empresa Auditada";
  const [arquivo, setArquivo] = useState(null);
  const [conteudo, setConteudo] = useState("");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [score, setScore] = useState(null);
  const [mostrarCNPJ, setMostrarCNPJ] = useState(false);
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

  const handleStopSpeaking = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setTranslated("");
    setAnalysis("");
  };
  
  const handleAnalyze = async () => {
    if (!file) return;

    setAnalyzing(true);
    setAnalysis("");
    setTranslated("");
    setFileName(file.name);
   
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });
      
      

      const data = await res.json();
      const cleanText = (data.texto || "").replace(/[\x00-\x1F\x7F]/g, "");
      setAnalysis(cleanText);
      setScore(data.score || null);
      setCnpjInfo(data.cnpj_info || {});
      setPublicData(filtrarDadosPublicos(data.dados_publicos || {}));
      setDadosOrgaos(data.orgaos_publicos || []);
      

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

      if (language !== "pt") {
        await handleTranslate(cleanText);
      }

      const historicoAtual = JSON.parse(localStorage.getItem("historico_esg")) || [];
      const novoRelatorio = {
        name: file.name,
        date: new Date().toLocaleString(),
        score: data.score || "N/A",
        hash: newHash,
        antifraude: publicData ? "Verificado" : "Pendente"
      };
      localStorage.setItem("historico_esg", JSON.stringify([...historicoAtual, novoRelatorio]));
      setHistorico((prev) => [
        ...prev,
        {
          nome: file.name,
          hash: newHash,
          data: new Date().toISOString(),
          conteudo: cleanText,
        },
      ]);
      

    } catch (error) {
      console.error("Erro ao analisar:", error);
      alert("Erro ao analisar documento.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleTranslate = async (text) => {
    try {
      if (!text) return;
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|en`);
      const data = await response.json();
      console.log("🔍 RESPOSTA DO BACKEND:", data);
      if (data?.responseData?.translatedText) {
        setTranslated(data.responseData.translatedText);
      } else {
        alert("Falha ao traduzir.");
      }
    } catch (error) {
      alert("Erro de conexão na tradução.");
    }
  };

  const handleExportPDF = async () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString();
    const text = translated || analysis;
    const cleanText = (text || "(sem conteúdo)").normalize("NFKD").replace(/[^\x00-\x7F]/g, "");

    doc.setFontSize(16);
    doc.text("GreenCheck - Análise ESG", 20, 20);
    doc.setFontSize(12);
    doc.text(`Arquivo: ${fileName}`, 20, 30);
    doc.text(`Data: ${currentDate}`, 20, 38);
    doc.text("Resultado da Análise:", 20, 48);

    if (score && parseInt(score) >= 70) {
      doc.addImage(seloCertificado, "PNG", 150, 10, 35, 35);
    }

    const lines = doc.splitTextToSize(cleanText, 170);
    doc.text(lines, 20, 58);

    let y = 58 + lines.length * 7 + 10;
    if (score && parseInt(score) >= 70) {
      doc.setTextColor(0, 150, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`${t.scoreInfo}${score}%`, 20, y);
      y += 8;
      doc.text(t.compliant.normalize("NFKD").replace(/[^\x00-\x7F]/g, ""), 20, y);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
    }

    const qrCode = await QRCode.toDataURL(`GreenCheck|Arquivo: ${fileName} | Score: ${score} | Data: ${currentDate}`);
    doc.addImage(qrCode, "PNG", 20, y + 20, 30, 30);

    doc.setFontSize(10);
    doc.text("Assinado digitalmente por:", 60, y + 25);
    doc.text("Kamila Silva - GreenCheck", 60, y + 31);
    doc.text(`Data e Hora: ${currentDate}`, 60, y + 37);

    doc.line(20, 270, 130, 270);
    doc.text("Assinatura Manual", 20, y + 50);
    doc.text("Kamila Silva - GreenCheck", 20, y + 55);

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
      alert("Erro ao enviar e-mail.");
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

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "1119px auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
     {/* Upload do arquivo */}
<div className="w-full flex justify-center px-4 mt-8">
  <div className="w-full max-w-4xl bg-white/90 rounded-xl p-4 shadow-md">
    <input
      type="file"
      accept=".pdf,.doc,.docx,.txt"
      onChange={handleFileChange}
      className="w-full text-gray-700 bg-white rounded-md border border-gray-300 p-2 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
    />
  </div>
</div>

{/* Botões principais */}
<div className="flex flex-wrap gap-4 justify-center mt-10">
  <Button
    onClick={handleAnalyze}
    disabled={!file}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md"
  >
    {analyzing ? "Analisando..." : t.analyze}
  </Button>

  <Button
    onClick={handleTranslate}
    disabled={!analysis}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md"
  >
    {t.translateText}
  </Button>

  <Button
    onClick={handleExportPDF}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md"
  >
    Exportar PDF
  </Button>

  {!speaking ? (
    <Button
      onClick={handleSpeak}
      disabled={!analysis}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl shadow-md"
    >
      {t.listening}
    </Button>
  ) : (
    <Button
      onClick={handleStopSpeaking}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-md"
    >
      {t.stop}
    </Button>
  )}
</div>

{/* Campo de e-mail e botão de envio */}
<div className="max-w-4xl mx-auto px-4 mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
  <Input
    type="email"
    placeholder="Digite seu e-mail para envio"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="flex-1 p-3 rounded-md border border-gray-300 bg-white text-gray-800 shadow-md w-full"
  />
  <Button
    onClick={handleSendEmail}
    disabled={!analysis}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow-md w-full md:w-auto"
  >
    {t.emailButton}
  </Button>
</div>

{/* Resultado da análise */}
<div className="w-full flex justify-center px-4 mt-8 mb-14">
  <div className="w-full max-w-4xl">
    <Textarea
      readOnly
      rows={10}
      value={
        translated && showTranslated && !translated.includes("Erro")
          ? translated
          : analysis || "⚠️ Nenhum resultado disponível."
      }
      
      placeholder={t.placeholder}
      className="w-full p-5 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-xl resize-none"
    />
  </div>
</div>

  
      {/* Selo e Certificado */}
      {typeof score === "number" && score >= 70 && (
        <div className="text-center mt-6">
          <img src={seloCertificado} alt="Selo de Conformidade" className="mx-auto w-20 h-20" />
          <p className="text-green-700 font-semibold mt-2">{t.compliant}</p>
          <button
            onClick={() => gerarCertificado(empresa)}
            className="mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded shadow"
          >
            📄 Gerar Certificado ESG
          </button>
        </div>
      )}
  
      {/* Órgãos Públicos */}
      {Array.isArray(dadosOrgaos) && dadosOrgaos?.length > 0 && (
        <div className="mt-6 px-4 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-green-700 mb-2">🗂️ Dados de Órgãos Públicos</h2>
          <ul className="bg-white shadow-md rounded p-4">
            {dadosOrgaos.map((orgao, index) => (
              <li key={index} className="border-b py-2 text-gray-800">
                <strong>{orgao.nome}</strong>: {orgao.status}
              </li>
            ))}
          </ul>
        </div>
      )}
  
      {/* Validação Blockchain */}
      {score && (
        <div className={`font-semibold text-center pt-6 ${parseInt(score) >= 70 ? "text-green-700 dark:text-green-400" : "text-red-600"}`}>
          {t.scoreInfo}
          {score}%<br />
          {parseInt(score) >= 70 ? t.compliant : "⚠️ Documento fora dos critérios do GreenCheck."}
        </div>
      )}
  
  {/* Botão Colapsável de CNPJ */}
<div className="w-full max-w-4xl mx-auto mt-8">
  <button
    onClick={() => setMostrarCNPJ(!mostrarCNPJ)}
    className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded shadow transition duration-200"
  >
    {mostrarCNPJ ? "⬆️ Ocultar Detalhes do CNPJ" : "🔎 Ver Detalhes do CNPJ"}
  </button>

  {mostrarCNPJ && (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h3 className="text-lg font-bold text-green-600 mb-2">📄 Informações do CNPJ</h3>
      <p><strong>Status:</strong> {dadosCNPJ?.status || "Não disponível"}</p>
      <p><strong>Razão Social:</strong> {dadosCNPJ?.razao_social || "Não disponível"}</p>
      <p><strong>Abertura:</strong> {dadosCNPJ?.abertura || "Não disponível"}</p>
      <p><strong>Município:</strong> {dadosCNPJ?.municipio || "Não disponível"}</p>
    </div>
  )}
</div>

)
  
      {/* Tabs */}
      {publicData && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-md shadow-md mx-6">
          <div className="flex border-b">
            <button onClick={() => setActiveTab("dados")} className={`px-4 py-2 font-semibold ${activeTab === "dados" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-600"}`}>
              📌 Dados Formatados
            </button>
            <button onClick={() => setActiveTab("json")} className={`px-4 py-2 font-semibold ${activeTab === "json" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-600"}`}>
              🧾 JSON Completo
            </button>
          </div>
          <div className="p-4 text-sm">
            {activeTab === "dados" ? (
              <div className="grid md:grid-cols-2 gap-4">
                <p><strong>Status:</strong> {publicData.status}</p>
                <p><strong>Razão Social:</strong> {publicData.razao_social}</p>
                <p><strong>Abertura:</strong> {publicData.abertura}</p>
                <p><strong>Nome Fantasia:</strong> {publicData.fantasia}</p>
                <p><strong>Capital Social:</strong> {publicData.capital_social}</p>
                <p><strong>Município:</strong> {`${publicData.municipio} / ${publicData.uf}`}</p>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-words">{JSON.stringify(publicData, null, 2)}</pre>
            )}
          </div>
        </div>
      )}
  
      {/* Histórico com hash */}
      {historico.length > 0 && (
        <div className="mt-10 px-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">Histórico de Análises</h2>
          <ul className="space-y-4">
            {historico.map((item, index) => (
              <li key={index} className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
                <p><strong>Arquivo:</strong> {item.nome}</p>
                <p><strong>Hash:</strong> {item.hash}</p>
                <p><strong>Data:</strong> {new Date(item.data).toLocaleString()}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.conteudo.slice(0, 100)}...</p>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-600 hover:text-red-500">❌</button>
            <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">🔍 Visualização dos Dados Públicos</h2>
            <pre className="text-sm whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100">
              {JSON.stringify(publicData, null, 2)}
            </pre>
          </div>
        </div>
      )}
  
      {/* Botões antifraude */}
      <motion.div className="mt-10 px-6">
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <Button variant="secondary" className="w-full shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => alert("Validação via sensor IoT (simulada) realizada.")}>
                <Lock className="w-4 h-4 mr-2" />
                Validar com IoT
              </Button>
              <Button variant="secondary" className="w-full shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => alert("Consulta pública (simulada) aos órgãos ambientais concluída.")}>
                <Globe className="w-4 h-4 mr-2" />
                Verificar com Dados Públicos
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}  