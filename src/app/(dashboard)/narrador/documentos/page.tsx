import Link from "next/link";
import { getDocuments } from "@/app/actions/document";
import { FileText, Link as LinkIcon, Globe, Image } from "lucide-react";

const typeIcons: Record<string, any> = { TEXT: FileText, LINK: LinkIcon, PDF: FileText, IMAGE: Image };
const typeLabels: Record<string, string> = { TEXT: "Texto", LINK: "Link", PDF: "PDF", IMAGE: "Imagem" };

export default async function DocumentosPage() {
  const docs = await getDocuments();

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documentos</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{docs.length} documento(s)</p>
        </div>
        <Link
          href="/narrador/documentos/novo"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          + Novo Documento
        </Link>
      </div>

      {docs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhum documento criado.</p>
          <p className="text-xs text-zinc-400 mt-1">Crie documentos para compartilhar com seus jogadores.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc: any) => {
            const Icon = typeIcons[doc.type] || FileText;
            return (
              <Link
                key={doc.id}
                href={`/narrador/documentos/${doc.id}`}
                className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-zinc-400 shrink-0" />
                  <h3 className="font-medium text-sm truncate">{doc.title}</h3>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {typeLabels[doc.type] || doc.type}
                  </span>
                  {doc.visibleToPlayers && !doc.scheduledFor && (
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                      Visível
                    </span>
                  )}
                  {doc.scheduledFor && new Date(doc.scheduledFor) > new Date() && (
                    <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-medium text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                      Agendado
                    </span>
                  )}
                  {doc.scheduledFor && new Date(doc.scheduledFor) <= new Date() && (
                    <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      Publicado
                    </span>
                  )}
                </div>
                {doc.chronicle && <p className="text-xs text-zinc-400 mt-1">{doc.chronicle.name}</p>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
