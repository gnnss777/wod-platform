"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createDocument } from "@/app/actions/document";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NovoDocumentoForm({ chronicles }: { chronicles: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chronicleIdParam = searchParams.get("chronicle");

  const [title, setTitle] = useState("");
  const [type, setType] = useState("TEXT");
  const [content, setContent] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [chronicleId, setChronicleId] = useState(chronicleIdParam || "");
  const [sceneId, setSceneId] = useState("");
  const [visible, setVisible] = useState(false);
  const [scheduledFor, setScheduledFor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [scenes, setScenes] = useState<any[]>([]);

  useEffect(() => {
    if (!chronicleId) { setScenes([]); return; }
    fetch(`/api/scenes?chronicleId=${chronicleId}`).then(r => r.json()).then(setScenes).catch(() => {});
  }, [chronicleId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    await createDocument({
      title, type: type || undefined,
      content: type === "TEXT" ? content : undefined,
      fileUrl: type === "LINK" ? fileUrl : undefined,
      chronicleId: chronicleId || undefined,
      sceneId: sceneId || undefined,
      visibleToPlayers: visible || !!scheduledFor,
      scheduledFor: scheduledFor || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="title" label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <div className="space-y-1">
        <label className="text-sm font-medium">Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="TEXT">Texto</option>
          <option value="LINK">Link</option>
          <option value="PDF">PDF</option>
          <option value="IMAGE">Imagem</option>
        </select>
      </div>

      {type === "TEXT" && (
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

      {(type === "LINK" || type === "PDF" || type === "IMAGE") && (
        <Input id="fileUrl" label={type === "LINK" ? "URL" : "URL do arquivo"} value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://..." />
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium">Crônica (opcional)</label>
        <select
          value={chronicleId}
          onChange={(e) => setChronicleId(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">Nenhuma</option>
          {chronicles.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {chronicleId && scenes.length > 0 && (
        <div className="space-y-1">
          <label className="text-sm font-medium">Cena (opcional)</label>
          <select
            value={sceneId}
            onChange={(e) => setSceneId(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="">Nenhuma</option>
            {scenes.map((s: any) => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
      )}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} className="rounded" />
        Visível para jogadores
      </label>

      {(visible || scheduledFor) && (
        <div className="space-y-1">
          <label className="text-sm font-medium">Agendar visibilidade para (opcional)</label>
          <input
            type="datetime-local"
            value={scheduledFor}
            onChange={(e) => setScheduledFor(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          {scheduledFor && (
            <p className="text-xs text-zinc-500">O documento ficará visível aos jogadores a partir desta data.</p>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>{submitting ? "Criando..." : "Criar Documento"}</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
}
