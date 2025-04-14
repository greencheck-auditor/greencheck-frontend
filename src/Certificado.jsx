import React, { useState } from "react";
import jsPDF from "jspdf";
import selo from "./assets/selo-certificado.png"; // Coloque a imagem aqui

function Certificado() {
  const [assinatura, setAssinatura] = useState("");
  const [empresaAuditada, setEmpresaAuditada] = useState("");
  const [responsavelRecebimento, setResponsavelRecebimento] = useState("");
  const [localAuditoria, setLocalAuditoria] = useState("");
  const [horaAuditoria, setHoraAuditoria] = useState("");
  const [score, setScore] = useState(100);

  const gerarCertificado = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 0);
    doc.text("Certificado de Conformidade ESG", 105, 30, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Empresa auditada: ${empresaAuditada || "__________________"}`, 105, 45, { align: "center" });
    doc.text("Certificamos que o documento analisado atende às normas IFRS S1 e S2", 105, 60, { align: "center" });
    doc.text(`Score de Conformidade: ${score}%`, 105, 75, { align: "center" });
    doc.text(`Emitido por: GreenCheck App`, 105, 90, { align: "center" });
    doc.text(`Data: ${new Date().toLocaleDateString()} - Hora: ${horaAuditoria || "___:___"}`, 105, 105, { align: "center" });
    doc.text(`Local: ${localAuditoria || "__________________"}`, 105, 115, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Assinado digitalmente por: ${assinatura || "__________________"}`, 105, 125, { align: "center" });
    doc.text(`Responsável na empresa auditada: ${responsavelRecebimento || "__________________"}`, 105, 135, { align: "center" });
    doc.text(`Assinatura manual: ______________________`, 105, 150, { align: "center" });

    doc.addImage(selo, "PNG", 140, 155, 40, 40);
    doc.save("certificado-greencheck.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800">
      {/* MENU LATERAL */}
      <aside className="bg-green-700 text-white w-full md:w-64 p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold mb-6">GreenCheck</h1>
        <nav className="space-y-4 text-sm">
          <a href="/" className="block hover:text-green-200">🏠 Início</a>
          <a href="#" className="block font-semibold text-green-100">📄 Certificado</a>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-6">
        <div className="w-full max-w-3xl mx-auto bg-gray-100 p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-center mb-4">Gerar Certificado ESG</h2>

          <input type="text" placeholder="Nome do auditor" value={assinatura} onChange={(e) => setAssinatura(e.target.value)} className="mb-3 w-full px-3 py-2 border rounded text-sm" />
          <input type="text" placeholder="Empresa auditada" value={empresaAuditada} onChange={(e) => setEmpresaAuditada(e.target.value)} className="mb-3 w-full px-3 py-2 border rounded text-sm" />
          <input type="text" placeholder="Responsável na empresa" value={responsavelRecebimento} onChange={(e) => setResponsavelRecebimento(e.target.value)} className="mb-3 w-full px-3 py-2 border rounded text-sm" />
          <input type="text" placeholder="Local da auditoria" value={localAuditoria} onChange={(e) => setLocalAuditoria(e.target.value)} className="mb-3 w-full px-3 py-2 border rounded text-sm" />
          <input type="text" placeholder="Hora da auditoria" value={horaAuditoria} onChange={(e) => setHoraAuditoria(e.target.value)} className="mb-4 w-full px-3 py-2 border rounded text-sm" />

          <button onClick={gerarCertificado} className="w-full bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded">
            Gerar Certificado PDF
          </button>
        </div>
      </main>
    </div>
  );
}

export default Certificado;
