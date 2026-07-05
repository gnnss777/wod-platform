import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";
import { NoteEditor } from "@/components/notes/note-editor";

export default async function NovoDiarioPage() {
  const session = await verifySession();
  const characters = await db.find("Character", { playerId: session.userId }, "id,name");

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nova Entrada no Diário</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Escreva na perspectiva do seu personagem
        </p>
      </div>
      <NoteEditor type="DIARIO" characters={characters as any} />
    </div>
  );
}