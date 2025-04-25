import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Eye, Trash } from "lucide-react";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion"; // Animação

export default function PainelTransparencia() {
  const [relatorios, setRelatorios] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("historico_esg")) || [];
    setRelatorios(salvos);
  }, []);

  const handleVisualizar = (relatorio) => {
    setItemSelecionado(relatorio);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setItemSelecionado(null);
    setModalAberto(false);
  };

  const handleExportarTxt = (relatorio) => {
    const blob = new Blob([relatorio.texto], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${relatorio.nomeArquivo || "relatorio-esg"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMensagem("Relatório exportado como TXT com sucesso!");
    limparMensagemDepois();
  };

  const handleExportarPdf = (relatorio) => {
    const pdf = new jsPDF();
    pdf.setFontSize(14);
    const texto = relatorio.texto || "Relatório vazio";
    const linhas = pdf.splitTextToSize(texto, 180);
    pdf.text(linhas, 10, 20);
    pdf.save(`${relatorio.nomeArquivo || "relatorio-esg"}.pdf`);
    setMensagem("Relatório exportado como PDF com sucesso!");
    limparMensagemDepois();
  };

  const handleExcluir = (index) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este relatório?");
    if (confirmacao) {
      const atualizados = [...relatorios];
      atualizados.splice(index, 1);
      setRelatorios(atualizados);
      localStorage.setItem("historico_esg", JSON.stringify(atualizados));
    }
  };

  const handleLimparTudo = () => {
    const confirmacao = window.confirm("Tem certeza que deseja apagar todos os relatórios?");
    if (confirmacao) {
      setRelatorios([]);
      localStorage.removeItem("historico_esg");
    }
  };

  const limparMensagemDepois = () => {
    setTimeout(() => setMensagem(""), 3000);
  };

  const relatoriosFiltrados = relatorios.filter((relatorio) =>
    relatorio.nomeArquivo?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
        📊 Painel de Transparência ESG
      </h1>

      <div className="max-w-md mx-auto mb-8 flex flex-col items-center gap-4">
        <Input
          type="text"
          placeholder="Pesquisar por nome do relatório..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        {relatorios.length > 0 && (
          <Button variant="destructive" onClick={handleLimparTudo}>
            Limpar Todos os Relatórios
          </Button>
        )}
      </div>

      {mensagem && (
        <div className="text-center text-green-600 dark:text-green-400 mb-4 font-semibold">
          {mensagem}
        </div>
      )}

      {relatoriosFiltrados.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Nenhum relatório encontrado.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {relatoriosFiltrados.map((relatorio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-6 h-6 text-green-700 dark:text-green-400" />
                      <h2 className="text-lg font-semibold truncate">{relatorio.nomeArquivo || "Relatório ESG"}</h2>
                    </div>
                    <div className="flex flex-col gap-2 mt-auto">
                      <Button variant="outline" onClick={() => handleVisualizar(relatorio)}>
                        <Eye className="w-4 h-4 mr-2" /> Visualizar
                      </Button>
                      <Button onClick={() => handleExportarTxt(relatorio)}>
                        <Download className="w-4 h-4 mr-2" /> Exportar TXT
                      </Button>
                      <Button onClick={() => handleExportarPdf(relatorio)}>
                        <Download className="w-4 h-4 mr-2" /> Exportar PDF
                      </Button>
                      <Button variant="destructive" onClick={() => handleExcluir(index)}>
                        <Trash className="w-4 h-4 mr-2" /> Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {modalAberto && itemSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
              {itemSelecionado.nomeArquivo || "Relatório ESG"}
            </h2>
            <p className="max-h-[400px] overflow-y-auto whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {itemSelecionado.texto}
            </p>
            <div className="flex justify-end mt-6">
              <Button onClick={handleFecharModal}>Fechar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
