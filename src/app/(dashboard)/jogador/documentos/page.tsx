import Link from "next/link";
import { getPlayerDocuments } from "@/app/actions/document";
import { FileText, Link as LinkIcon, Globe, Image } from "lucide-react";

const typeIcons: Record<string, any> = { TEXT: FileText, LINK: LinkIcon, PDF: FileText, IMAGE: Image };
const typeLabels: Record<string, string> = { TEXT: "Texto", LINK: "Link", PDF: "PDF", IMAGE: "Imagem" };

export default async function JogadorDocumentosPage() {
  const docs = await getPlayerDocuments();

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Documentos</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Documentos compartilhados pelo Mestre
        </p>
      </div>

      {docs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhum documento disponível.</p>
          <p className="text-xs text-zinc-400 mt-1">
            Quando o Mestre compartilhar documentos, eles aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {docs.map((doc: any) => {
            const Icon = typeIcons[doc.type] || FileText;
            return (
              <div
                key={doc.id}
                className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-zinc-400 shrink-0" />
                  <h3 className="font-medium text-sm">{doc.title}</h3>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase">
                  {typeLabels[doc.type] || doc.type}
                  {doc.chronicle && ` · ${doc.chronicle.name}`}
                </p>
                {doc.type === "TEXT" && doc.content && (
                  <div className="mt-2 whitespace-pre-wrap text-xs text-zinc-600 dark:text-zinc-400 line-clamp-4">
                    {doc.content}
                  </div>
                )}
                {(doc.type === "LINK" || doc.type === "PDF") && doc.fileUrl && (
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                  >
                    {doc.type === "LINK" ? "Abrir link" : "Abrir PDF"}
                  </a>
                )}
                {doc.type === "IMAGE" && doc.fileUrl && (
                  <img src={doc.fileUrl} alt={doc.title} className="mt-2 max-h-48 rounded object-cover" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
