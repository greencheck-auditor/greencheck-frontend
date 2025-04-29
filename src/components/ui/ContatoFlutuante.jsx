import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContatoSection from "@/components/ui/ContatoSection";

function Home() {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Hero, Quem Somos, Serviços... */}
        <ContatoSection />  {/* Adiciona aqui */}
        {/* Footer */}
      </div>
    );
  }

export default function ContatoFlutuante() {
  return (
    <a
      href="#contato" // ou futuramente pode ser WhatsApp, e-mail etc
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


export default function ContatoSection() {
  return (
    <section id="contato" className="bg-white dark:bg-gray-900 py-16 px-6 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        Entre em Contato
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        Ficou com alguma dúvida ou quer saber mais sobre o GreenCheck? Envie sua mensagem para nós!
      </p>

      {/* Formulário Simples */}
      <form className="w-full max-w-md space-y-4">
        <Input
          type="text"
          placeholder="Seu nome"
          className="rounded-lg border-gray-300"
          required
        />
        <Input
          type="email"
          placeholder="Seu e-mail"
          className="rounded-lg border-gray-300"
          required
        />
        <textarea
          placeholder="Sua mensagem"
          rows="4"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none resize-none"
          required
        ></textarea>
        <Button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg w-full transition">
          Enviar Mensagem
        </Button>
      </form>
    </section>
  );
}
