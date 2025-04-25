import jsPDF from "jspdf";
import selo from "../assets/selo-certificado.png";

export function gerarCertificado(nomeEmpresa, responsavelEmpresa = "elisa") {
  const doc = new jsPDF();

  const data = new Date();
  const dataFormatada = data.toLocaleDateString("pt-BR");
  const hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(0, 128, 0);
  doc.text("Certificado de Conformidade ESG", 105, 30, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Empresa auditada: ${nomeEmpresa}`, 105, 40, { align: "center" });

  doc.text("Certificamos que o documento analisado atende às normas IFRS S1 e S2", 105, 50, { align: "center" });
  doc.text("Score de Conformidade: 100%", 105, 60, { align: "center" });
  doc.text("Emitido por: GreenCheck App", 105, 70, { align: "center" });
  doc.text(`Data: ${dataFormatada} - Hora: ${hora}`, 105, 80, { align: "center" });
  doc.text("Local: São Paulo", 105, 90, { align: "center" });

  doc.setFontSize(10);
  doc.text("Assinado digitalmente por: kamila silva", 105, 110, { align: "center" });
  doc.text(`Responsável na empresa auditada: ${responsavelEmpresa}`, 105, 116, { align: "center" });

  doc.text("Assinatura manual: _______________________", 105, 130, { align: "center" });

  doc.addImage(selo, "PNG", 90, 140, 30, 30); // selo verde

  doc.save(`certificado-${nomeEmpresa.toLowerCase()}.pdf`);
}
