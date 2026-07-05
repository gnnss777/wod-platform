import Link from "next/link";
import { getNarratorPrivateNoteThreads } from "@/app/actions/private-note";

export default async function NotasPrivadasPage() {
  const threads = await getNarratorPrivateNoteThreads();

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notas Privadas</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Conversas privadas com jogadores
        </p>
      </div>

      {threads.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhuma conversa ainda.</p>
          <p className="text-xs text-zinc-400 mt-1">Envie uma nota privada para um jogador para iniciar.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {threads.map((t: any) => (
            <Link
              key={t.playerId}
              href={`/narrador/notas-privadas/${t.playerId}`}
              className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">{t.playerName}</h3>
                <span className="text-xs text-zinc-500">{t.count} notas</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{t.lastNote.content}</p>
              <p className="text-[10px] text-zinc-400 mt-1">
                {new Date(t.lastNote.createdAt).toLocaleString("pt-BR")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
