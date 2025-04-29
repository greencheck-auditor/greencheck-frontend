import React from "react";

export default function ContatoFlutuante() {
  return (
    <a
      href="#contato" // ou futuramente pode ser WhatsApp, e-mail, etc.
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 z-50"
      title="Fale Conosco"
    >
      <img
        src="/assets/fale-conosco.png"
        alt="Fale Conosco"
        className="w-10 h-10"
      />
    </a>
  );
}
