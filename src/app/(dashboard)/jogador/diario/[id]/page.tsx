import { notFound } from "next/navigation";
import Link from "next/link";
import { getNote } from "@/app/actions/note";
import { deleteNote } from "@/app/actions/note";

export default async function DiarioEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNote(id) as any;
  if (!note) notFound();

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <Link
        href="/jogador/diario"
        className="inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        &larr; Voltar
      </Link>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">{note.title}</h1>
            <p className="text-xs text-zinc-500 mt-1">
              {note.createdAt.toLocaleDateString("pt-BR")}
              {note.character && ` · ${note.character.name}`}
            </p>
          </div>
          <div className="flex gap-2">
            <form action={async () => { "use server"; await deleteNote(id); }}>
              <button
                type="submit"
                className="rounded-lg border border-red-300 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400"
              >
                Excluir
              </button>
            </form>
          </div>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
          {note.content}
        </div>
      </div>
    </div>
  );
}
