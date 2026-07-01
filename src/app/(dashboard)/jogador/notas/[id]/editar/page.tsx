import { notFound } from "next/navigation";
import Link from "next/link";
import { getNote } from "@/app/actions/note";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { NoteEditor } from "@/components/notes/note-editor";

export default async function EditarNotaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await verifySession();
  const note = await getNote(id);
  if (!note) notFound();

  const characters = await prisma.character.findMany({
    where: { playerId: session.userId },
    select: { id: true, name: true },
  });

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <Link
        href={`/jogador/notas/${id}`}
        className="inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        &larr; Voltar
      </Link>
      <div>
        <h1 className="text-2xl font-bold">Editar Nota</h1>
      </div>
      <NoteEditor
        type="PESSOAL"
        characters={characters}
        initial={{ id: note.id, title: note.title, content: note.content, characterId: note.characterId }}
      />
    </div>
  );
}
