"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createChronicle } from "@/app/actions/chronicle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NovaCronicaPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [edition, setEdition] = useState<"V5" | "V20">("V20");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await createChronicle({ name, description, edition });
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nova Crônica</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Crie uma nova crônica para sua campanha
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Nome da Crônica"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: A Noite do Caçador"
          required
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Descrição
          </label>
          <textarea
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tema, época, conceito da crônica..."
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Edição
          </label>
          <div className="flex gap-2">
            {(["V20", "V5"] as const).map((ed) => (
              <button
                key={ed}
                type="button"
                onClick={() => setEdition(ed)}
                className={`rounded-lg px-4 py-1.5 text-xs font-medium ${
                  edition === ed
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "border border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {ed}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Criando..." : "Criar Crônica"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
