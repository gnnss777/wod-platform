import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, User, CheckCircle, Clock, XCircle } from "lucide-react";

export default async function JogadorDetailPage(props: { params: Promise<{ id: string }> }) {
  const session = await verifySession();
  const params = await props.params;

  const player = await db.get("User", { id: params.id }) as any;
  if (!player || player.role !== "JOGADOR") notFound();

  const chronicles = await db.find("Chronicle",
    { narratorId: session.userId },
    "id, name"
  ) as any[];

  const chronicleIds = chronicles.map(c => c.id);

  const memberships = chronicleIds.length
    ? await db.find("ChronicleMember",
        { chronicleId_in: chronicleIds, userId: player.id },
        "*, chronicle(id, name)"
      ) as any[]
    : [];

  const playerChronicleIds = memberships.map(m => m.chronicleId);

  const characters = playerChronicleIds.length
    ? await db.find("Character",
        { playerId: player.id, chronicleId_in: playerChronicleIds },
        "*, chronicle(id, name)"
      ) as any[]
    : [];

  const notes = await db.find("Note",
    { playerId: player.id },
    "id, title, content, type, characterId, createdAt",
    { orderBy: { createdAt: "desc" } }
  ) as any[];

  const chronicleNotes = notes.filter(n =>
    !n.characterId || characters.some(c => c.id === n.characterId)
  );

  const statusIcon: Record<string, typeof Clock> = {
    RASCUNHO: Clock,
    PENDENTE: Clock,
    APROVADO: CheckCircle,
  };
  const statusColor: Record<string, string> = {
    RASCUNHO: "text-zinc-500",
    PENDENTE: "text-yellow-400",
    APROVADO: "text-green-400",
  };

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div>
        <Link href="/narrador/jogadores" className="text-sm text-zinc-500 hover:text-zinc-300">&larr; Voltar</Link>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
            <User className="h-6 w-6 text-zinc-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{player.name}</h1>
            <p className="text-sm text-zinc-500">{player.email}</p>
          </div>
        </div>
      </div>

      {memberships.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 p-8 text-center">
          <p className="text-zinc-400">Este jogador não está em nenhuma das suas crônicas.</p>
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-lg font-semibold mb-3">Crônicas</h2>
            <div className="flex flex-wrap gap-2">
              {memberships.map(m => (
                <span key={m.id} className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                  {m.chronicle.name}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Fichas ({characters.length})</h2>
            {characters.length === 0 ? (
              <p className="text-sm text-zinc-500">Nenhuma ficha neste personagem.</p>
            ) : (
              <div className="space-y-2">
                {characters.map(c => {
                  const StatusIcon = statusIcon[c.status] || Clock;
                  return (
                    <Link
                      key={c.id}
                      href={`/narrador/fichas`}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 hover:bg-zinc-800/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-zinc-200">{c.name}</p>
                        <p className="text-xs text-zinc-500">{c.chronicle?.name} &middot; {c.edition} &middot; {c.concept || "Sem conceito"}</p>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${statusColor[c.status] || "text-zinc-500"}`}>
                        <StatusIcon size={14} />
                        {c.status === "RASCUNHO" ? "Rascunho" : c.status === "PENDENTE" ? "Pendente" : "Aprovado"}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Notas e Diário ({chronicleNotes.length})</h2>
            {chronicleNotes.length === 0 ? (
              <p className="text-sm text-zinc-500">Nenhuma nota ou diário.</p>
            ) : (
              <div className="space-y-2">
                {chronicleNotes.map(n => (
                  <div key={n.id} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText size={14} className="text-zinc-500" />
                      <span className="font-medium text-sm text-zinc-200">{n.title}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${n.type === "DIARIO" ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-400"}`}>
                        {n.type === "DIARIO" ? "Diário" : "Nota"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2">{n.content}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}