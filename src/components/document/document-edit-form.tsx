"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateDocument } from "@/app/actions/document";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DocumentEditForm({ doc }: { doc: any }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(doc.title);
  const [content, setContent] = useState(doc.content || "");
  const [fileUrl, setFileUrl] = useState(doc.fileUrl || "");
  const [visible, setVisible] = useState(doc.visibleToPlayers);
  const [scheduledFor, setScheduledFor] = useState(
    doc.scheduledFor ? new Date(doc.scheduledFor).toISOString().slice(0, 16) : ""
  );
  const [submitting, setSubmitting] = useState(false);

  if (!editing) {
    return (
      <button onClick={() => setEditing(true)} className="text-xs text-zinc-500 hover:underline">
        Editar documento
      </button>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await updateDocument(doc.id, {
      title, content: doc.type === "TEXT" ? content : undefined,
      fileUrl: doc.type !== "TEXT" ? fileUrl : undefined,
      visibleToPlayers: visible || !!scheduledFor,
      scheduledFor: scheduledFor ? new Date(scheduledFor).toISOString() : null,
    });
    setSubmitting(false);
    setEditing(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
      <h3 className="text-sm font-semibold">Editar Documento</h3>
      <Input id="edit-title" label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />

      {doc.type === "TEXT" && (
        <div className="space-y-1">
          <label className="text-sm font-medium">Conteúdo</label>
          <textarea
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}

      {(doc.type === "LINK" || doc.type === "PDF" || doc.type === "IMAGE") && (
        <Input id="edit-fileUrl" label="URL" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
      )}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} className="rounded" />
        Visível para jogadores
      </label>

      {(visible || scheduledFor) && (
        <div className="space-y-1">
          <label className="text-sm font-medium">Agendar visibilidade para</label>
          <input
            type="datetime-local"
            value={scheduledFor}
            onChange={(e) => setScheduledFor(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>{submitting ? "Salvando..." : "Salvar"}</Button>
        <Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancelar</Button>
      </div>
    </form>
  );
}
