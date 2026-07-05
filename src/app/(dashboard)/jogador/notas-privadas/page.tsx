import { getPlayerPrivateNotes } from "@/app/actions/private-note";

export default async function JogadorNotasPrivadasPage() {
  const notes = await getPlayerPrivateNotes();

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notas do Mestre</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Mensagens privadas enviadas pelo Mestre
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhuma nota privada.</p>
          <p className="text-xs text-zinc-400 mt-1">Quando o Mestre enviar notas privadas, elas aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((n: any) => (
            <div key={n.id} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-start justify-between">
                <p className="text-xs text-zinc-500">{n.narrator.name}</p>
                <p className="text-[10px] text-zinc-400">{new Date(n.createdAt).toLocaleString("pt-BR")}</p>
              </div>
              <p className="mt-2 text-sm whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">{n.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
