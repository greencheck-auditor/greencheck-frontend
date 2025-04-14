import React, { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import background from "./assets/grafico-fundo.png";
import logoCompleto from "./assets/logo-completo.png";
import seloCertificado from "./assets/selo-certificado.png";

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("pt");
  const [translated, setTranslated] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && /\.(pdf|docx|txt)$/i.test(selectedFile.name)) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert("Envie um arquivo PDF, DOCX ou TXT válido.");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return alert("Carregue um documento primeiro.");
    setLoading(true);
    setError("");
    setAnalysis("");
    setScore(null);
    setTranslated("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao analisar o documento.");

      const data = await res.json();
      const clean = data.analysis.replace(/[\x00-\x1F\x7F]/g, "");
      const termos = ["IFRS S1", "IFRS S2", "TCFD", "emissões", "transição", "risco", "divulgação"];
      const encontrados = termos.filter((t) => clean.toLowerCase().includes(t.toLowerCase()));
      const percent = Math.round((encontrados.length / termos.length) * 100);

      setAnalysis(clean);
      setScore(percent);
      const timestamp = new Date().toLocaleString();
      setHistory((prev) => [...prev, { name: file.name, content: clean, score: percent, date: timestamp }]);
    } catch (err) {
      setError("Erro na análise. Verifique o backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    try {
      const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: analysis,
          source: "pt",
          target: language,
          format: "text",
        }),
      });
      const data = await res.json();
      setTranslated(data.translatedText);
    } catch (err) {
      alert("Erro na tradução.");
    }
  };

  const handleSpeak = () => {
    const text = translated || analysis;
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(history);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Histórico");
    XLSX.writeFile(wb, "historico_analises.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Histórico de Análises ESG", 20, 20);
    history.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} | Score: ${item.score}% | ${item.date}`, 20, 30 + index * 10);
    });
    doc.save("historico_analises.pdf");
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className="min-h-screen text-gray-800 dark:text-white"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-white/95 dark:bg-black/90 min-h-screen px-4 py-10 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between mb-12">
            <img src={logoCompleto} alt="Logo GreenCheck" className="h-16" />
            <div className="text-right">
              <p>Análise ESG baseada nas normas IFRS S1 e S2</p>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="mt-1 bg-yellow-300 dark:bg-gray-600 text-black dark:text-white px-2 py-1 rounded text-xs"
              >
                🌙 {darkMode ? "Modo Claro" : "Modo Escuro"}
              </button>
            </div>
          </header>

          <div className="mt-32 p-6 rounded shadow max-w-2xl mx-auto space-y-4 bg-white/90 dark:bg-gray-900">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border p-2 rounded text-sm"
            />
            {fileName && <p className="text-sm text-gray-600 dark:text-gray-300">📎 {fileName}</p>}

            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow disabled:opacity-50"
            >
              {loading ? "Analisando..." : "📊 Analisar Documento"}
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {analysis && (
              <>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded border text-sm max-h-64 overflow-y-auto">
                  <p className="whitespace-pre-wrap">{translated || analysis}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <select
                    className="border p-2 rounded text-sm"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en">Inglês</option>
                    <option value="es">Espanhol</option>
                    <option value="fr">Francês</option>
                    <option value="de">Alemão</option>
                    <option value="pt">Português</option>
                    <option value="it">Italiano</option>
                    <option value="zh">Chinês</option>
                    <option value="ar">Árabe</option>
                  </select>
                  <button
                    onClick={handleTranslate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    🌐 Traduzir
                  </button>
                  {!speaking ? (
                    <button
                      onClick={handleSpeak}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      🔊 Ouvir
                    </button>
                  ) : (
                    <button
                      onClick={handleStopSpeaking}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      ✖ Parar
                    </button>
                  )}
                </div>
              </>
            )}

            {score !== null && (
              <div className="text-center">
                <p className="text-green-700 font-semibold">Conformidade ESG: {score}%</p>
                {score >= 60 ? (
                  <Link
                    to="/certificado"
                    className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                  >
                    📄 Gerar Certificado
                  </Link>
                ) : (
                  <p className="text-yellow-600 text-sm mt-2">Conformidade insuficiente para certificado.</p>
                )}
              </div>
            )}

            {history.length > 0 && (
              <div className="text-center pt-4 space-y-2">
                <h3 className="font-bold text-sm text-gray-600 dark:text-gray-300">Histórico de Análises</h3>
                <button
                  onClick={exportToPDF}
                  className="bg-gray-700 hover:bg-gray-800 text-white text-xs px-3 py-1 rounded"
                >
                  📄 Exportar PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className="bg-green-700 hover:bg-green-800 text-white text-xs px-3 py-1 rounded ml-2"
                >
                  📊 Exportar Excel
                </button>
              </div>
            )}
          </div>

          <footer className="text-xs text-gray-500 text-center mt-10">
            Desenvolvido com 💚 para auditores e empresas responsáveis
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
