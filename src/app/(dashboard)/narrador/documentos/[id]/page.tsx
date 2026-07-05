import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocument, deleteDocument } from "@/app/actions/document";
import { FileText, Link as LinkIcon, Globe, Image, Eye, EyeOff } from "lucide-react";
import { DocumentEditForm } from "@/components/document/document-edit-form";

const typeIcons: Record<string, any> = { TEXT: FileText, LINK: LinkIcon, PDF: FileText, IMAGE: Image };

export default async function DocumentoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getDocument(id);
  if (!doc) notFound();

  const Icon = typeIcons[doc.type] || FileText;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <Link href="/narrador/documentos" className="text-sm text-zinc-500 hover:underline">&larr; Documentos</Link>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Icon size={24} className="text-zinc-400" />
          <div>
            <h1 className="text-2xl font-bold">{doc.title}</h1>
            <p className="text-sm text-zinc-500">
              {doc.type}
              {doc.visibleToPlayers ? " · Visível para jogadores" : " · Oculto"}
            </p>
          </div>
        </div>
        <form action={async () => { "use server"; await deleteDocument(id); }}>
          <button className="text-xs text-red-500 hover:underline">Excluir</button>
        </form>
      </div>

      {doc.chronicle && (
        <p className="text-sm text-zinc-600">Crônica: {doc.chronicle.name}</p>
      )}
      {doc.scene && (
        <p className="text-sm text-zinc-600">Cena: {doc.scene.title}</p>
      )}

      {doc.type === "TEXT" && doc.content && (
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">{doc.content}</div>
        </div>
      )}

      {(doc.type === "LINK" || doc.type === "PDF" || doc.type === "IMAGE") && doc.fileUrl && (
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs text-zinc-500 mb-1">
            {doc.type === "LINK" ? "Link:" : "Arquivo:"}
          </p>
          {doc.type === "IMAGE" ? (
            <img src={doc.fileUrl} alt={doc.title} className="max-w-full rounded" />
          ) : (
            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
              {doc.fileUrl}
            </a>
          )}
        </div>
      )}

      <DocumentEditForm doc={doc} />
    </div>
  );
}
