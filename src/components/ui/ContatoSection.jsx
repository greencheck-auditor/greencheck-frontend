import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContatoSection() {
  return (
    <section
      id="contato"
      className="bg-white dark:bg-gray-900 py-16 px-6 flex flex-col items-center text-center"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        Entre em Contato
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        Ficou com alguma dúvida ou quer saber mais sobre o GreenCheck? Envie sua
        mensagem para nós!
      </p>

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
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none resize-none"
          required
        />
        <Button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg w-full transition">
          Enviar Mensagem
        </Button>
      </form>
    </section>
  );
}
