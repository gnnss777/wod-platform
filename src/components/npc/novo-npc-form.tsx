"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createNpc } from "@/app/actions/npc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NovoNpcForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chronicleId = searchParams.get("chronicle");

  const [name, setName] = useState("");
  const [concept, setConcept] = useState("");
  const [clan, setClan] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await createNpc({
      name,
      concept: concept || undefined,
      clan: clan || undefined,
      chronicleId: chronicleId || undefined,
      notes: notes || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="name" label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input id="concept" label="Conceito" value={concept} onChange={(e) => setConcept(e.target.value)} placeholder="Ex: Segurança do clube" />
      <Input id="clan" label="Clã / Tipo" value={clan} onChange={(e) => setClan(e.target.value)} placeholder="Ex: Ventrue, Garou, Mortal" />
      <div className="space-y-1">
        <label className="text-sm font-medium">Notas</label>
        <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>{submitting ? "Criando..." : "Criar NPC"}</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
}
