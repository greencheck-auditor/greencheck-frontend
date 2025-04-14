// ESGAnalyzer.jsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Moon, Sun, FileText, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

export default function ESGAnalyzer() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [translated, setTranslated] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("pt");
  const [filters, setFilters] = useState({ ano: "", empresa: "" });
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    const supportedLangs = ["en", "es", "fr", "de", "pt", "it", "zh", "ar"];
    if (supportedLangs.includes(browserLang)) {
      setLanguage(browserLang);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || "");
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setAnalysis("");
    setTranslated("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const cleanText = data.analysis.replace(/[\x00-\x1F\x7F]/g, "");
      setAnalysis(cleanText);
    } catch (err) {
      setAnalysis("Erro na análise. Verifique o backend.");
    } finally {
      setAnalyzing(false);
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
      setTranslated("Erro na tradução.");
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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const text = translated || analysis || "Sem análise disponível.";
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 10);
    doc.save(`${fileName.replace(/\.[^/.]+$/, "")}_analise.pdf`);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.onload = () => {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-green-50 to-green-100 text-gray-900"
      } p-6`}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <header className="mb-10 text-center relative">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-green-800 dark:text-green-300"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ESG & IFRS Analyzer
          </motion.h1>
          <p className="mt-4 text-lg text-green-700 dark:text-green-200">
            Faça upload de documentos PDF ou Word e obtenha uma análise automática ESG com base em critérios IFRS.
          </p>
          <Button
            className="absolute top-0 right-0"
            variant="ghost"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </Button>
        </header>

        <Card className="shadow-2xl rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <Input
              type="file"
              id="documento"
              name="documento"
              onChange={handleFileChange}
              className="file:bg-green-700 file:text-white file:rounded file:px-4 file:py-2"
            />
            {fileName && (
              <div className="flex items-center text-sm text-green-800 dark:text-green-200 gap-2">
                <FileText className="w-4 h-4" /> <span>{fileName}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="ano"
                name="ano"
                placeholder="Filtrar por Ano"
                value={filters.ano}
                onChange={(e) => setFilters({ ...filters, ano: e.target.value })}
              />
              <Input
                id="empresa"
                name="empresa"
                placeholder="Filtrar por Empresa"
                value={filters.empresa}
                onChange={(e) => setFilters({ ...filters, empresa: e.target.value })}
              />
            </div>
            <select
              id="idioma"
              className="w-full border border-green-400 rounded p-2"
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

            <Button
              className="w-full bg-green-700 hover:bg-green-800 text-white text-lg py-6 rounded-xl"
              onClick={handleAnalyze}
              disabled={analyzing || !file}
            >
              {analyzing ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Analisando...
                </>
              ) : (
                "Analisar Documento"
              )}
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-xl"
                onClick={handleTranslate}
                disabled={!analysis}
              >
                Traduzir Análise
              </Button>
              {!speaking ? (
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg py-6 rounded-xl"
                  onClick={handleSpeak}
                  disabled={!analysis}
                >
                  <Volume2 className="inline-block mr-2" /> Ouvir
                </Button>
              ) : (
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white text-lg py-6 rounded-xl"
                  onClick={handleStopSpeaking}
                >
                  <VolumeX className="inline-block mr-2" /> Parar de Ouvir
                </Button>
              )}
            </div>

            <Textarea
              readOnly
              className="min-h-[300px] bg-white border border-green-300 shadow-inner rounded-xl p-4 text-green-900"
              value={translated || analysis}
              placeholder="O resultado da análise será exibido aqui."
            />

            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 rounded-xl"
              onClick={handleExportPDF}
              disabled={!analysis}
            >
              Exportar Análise em PDF
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
