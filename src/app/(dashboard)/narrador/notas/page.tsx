"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createNarratorNote, getNarratorNotes, deleteNarratorNote } from "@/app/actions/narrator-note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Note = { id: string; title: string; content: string; createdAt: Date; chronicle?: { name: string } | null };

export default function NarradorNotasPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNarratorNotes().then(setNotes).then(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await createNarratorNote({ title, content });
    setTitle("");
    setContent("");
    const updated = await getNarratorNotes();
    setNotes(updated);
  }

  if (loading) return <div className="p-6 text-sm text-zinc-500">Carregando...</div>;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Notas do Narrador</h1>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <Input id="nota-title" label="Título" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ideia para a sessão..." required />
        <div className="space-y-1">
          <label className="text-sm font-medium">Conteúdo</label>
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <Button type="submit">Salvar Nota</Button>
      </form>

      <div className="space-y-2">
        {notes.length === 0 && <p className="text-sm text-zinc-500">Nenhuma nota ainda.</p>}
        {notes.map((n) => (
          <div key={n.id} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-sm">{n.title}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {new Date(n.createdAt).toLocaleDateString("pt-BR")}
                  {n.chronicle && ` · ${n.chronicle.name}`}
                </p>
              </div>
              <form action={async () => { await deleteNarratorNote(n.id); setNotes(notes.filter(x => x.id !== n.id)); }}>
                <button className="text-xs text-red-500">Excluir</button>
              </form>
            </div>
            <p className="mt-2 text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
