import { notFound } from "next/navigation";
import Link from "next/link";
import { getNarratorPrivateNotesWithPlayer, createPrivateNote } from "@/app/actions/private-note";
import { db } from "@/lib/db";

export default async function NotaPrivadaPlayerPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;
  const player = await db.get("User", { id: playerId }, "id,name");
  if (!player) notFound();

  const notes = await getNarratorPrivateNotesWithPlayer(playerId);

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <Link href="/narrador/notas-privadas" className="text-sm text-zinc-500 hover:underline">
        &larr; Notas Privadas
      </Link>

      <h1 className="text-2xl font-bold">{(player as any).name}</h1>

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhuma nota ainda.</p>
        ) : (
          notes.map((n: any) => (
            <div key={n.id} className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">{n.content}</p>
              <p className="text-[10px] text-zinc-400 mt-1">{new Date(n.createdAt).toLocaleString("pt-BR")}</p>
            </div>
          ))
        )}
      </div>

      <form
        action={async (form: FormData) => {
          "use server";
          await createPrivateNote({
            playerId,
            content: form.get("content") as string,
          });
        }}
        className="space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800"
      >
        <textarea
          name="content"
          placeholder="Escreva uma nota privada para este jogador..."
          required
          rows={4}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
