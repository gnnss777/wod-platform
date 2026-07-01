import Link from "next/link";
import { getNotes } from "@/app/actions/note";
import { NoteList } from "@/components/notes/note-list";

export default async function NotasPage() {
  const notes = await getNotes("PESSOAL");

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notas de Sessão</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {notes.length} anotação(ões)
          </p>
        </div>
        <Link
          href="/jogador/notas/novo"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          + Nova Nota
        </Link>
      </div>

      <NoteList notes={notes} basePath="/jogador/notas" emptyMsg="Nenhuma nota de sessão ainda." />
    </div>
  );
}
