"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote, updateNote } from "@/app/actions/note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  type: "PESSOAL" | "DIARIO";
  characters?: { id: string; name: string }[];
  initial?: { id: string; title: string; content: string; characterId?: string | null };
};

export function NoteEditor({ type, characters, initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [characterId, setCharacterId] = useState(initial?.characterId ?? "");
  const [submitting, setSubmitting] = useState(false);

  const isEdit = !!initial;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);

    if (isEdit) {
      await updateNote(initial!.id, { title, content, characterId: characterId || undefined });
      router.push(`/${type === "DIARIO" ? "diario" : "notas"}/${initial!.id}`);
    } else {
      await createNote({
        title,
        content,
        type,
        characterId: characterId || undefined,
      });
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="title"
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da nota..."
        required
      />

      {characters && characters.length > 0 && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Personagem (opcional)
          </label>
          <select
            value={characterId}
            onChange={(e) => setCharacterId(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="">Nenhum</option>
            {characters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Conteúdo
        </label>
        <textarea
          className="w-full min-h-[200px] rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva sua nota aqui..."
          required
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Salvando..." : isEdit ? "Salvar" : "Criar"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
