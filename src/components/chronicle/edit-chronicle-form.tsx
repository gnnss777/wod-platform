"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateChronicle } from "@/app/actions/chronicle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
  initial: { name: string; description: string; edition: string };
};

export function EditChronicleForm({ id, initial }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial.name);
  const [description, setDescription] = useState(initial.description);
  const [edition, setEdition] = useState(initial.edition);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await updateChronicle(id, { name, description, edition: edition || undefined });
    router.push(`/narrador/cronicas/${id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="name" label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
      <div className="space-y-1">
        <label className="text-sm font-medium">Descrição</label>
        <textarea
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>Salvar</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
}
