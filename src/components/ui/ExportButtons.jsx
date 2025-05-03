import React from "react";
import { Button } from "@/components/ui/button";

export default function ExportButtons({ publicData, setShowModal }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center">
      <Button
        onClick={() =>
          navigator.clipboard.writeText(JSON.stringify(publicData, null, 2))
        }
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        📋 Copiar
      </Button>

      <Button
        onClick={() => {
          const blob = new Blob(
            [JSON.stringify(publicData, null, 2)],
            { type: "application/json" }
          );
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
  );
}
