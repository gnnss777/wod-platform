import Link from "next/link";
import { getChronicles } from "@/app/actions/chronicle";
import { startSession } from "@/app/actions/session";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export default async function SessaoPage() {
  const session = await verifySession();
  const chronicles = await getChronicles();

  const activeSessions = await db.find("LiveSession", { narratorId: session.userId, status: "ACTIVE" }, "*") as any[];

  const chronicleIds = [...new Set(activeSessions.map((s: any) => s.chronicleId).filter(Boolean))];
  const chronicleMap: Record<string, string> = {};
  if (chronicleIds.length) {
    const rows = await db.find("Chronicle", { id_in: chronicleIds }, "id,name");
    for (const c of rows as any[]) chronicleMap[c.id] = c.name;
  }

  for (const s of activeSessions) {
    const [initCount, msgCount] = await Promise.all([
      db.count("InitiativeEntry", { sessionId: s.id }),
      db.count("SessionMessage", { sessionId: s.id }),
    ]);
    s.chronicle = s.chronicleId ? { name: chronicleMap[s.chronicleId] || "Desconhecida" } : null;
    s._count = { initiative: initCount, messages: msgCount };
  }

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sessão ao Vivo</h1>

      {activeSessions.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Sessões Ativas</h2>
          {activeSessions.map((s) => (
            <Link
              key={s.id}
              href={`/narrador/sessao/${s.id}`}
              className="block rounded-lg border border-green-200 bg-green-50 p-4 transition-colors hover:border-green-400 dark:border-green-800 dark:bg-green-900/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{s.chronicle?.name}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Iniciativa: {s._count.initiative} · Mensagens: {s._count.messages}
                  </p>
                </div>
                <span className="rounded bg-green-200 px-1.5 py-0.5 text-[10px] font-semibold text-green-800 dark:bg-green-800 dark:text-green-200">
                  AO VIVO
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Iniciar Nova Sessão
        </h2>
        {chronicles.length === 0 ? (
          <p className="text-sm text-zinc-500">Crie uma crônica primeiro.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {chronicles.filter((c) => c.status === "ATIVA").map((c) => (
              <form key={c.id} action={async () => { "use server"; await startSession(c.id); }}>
                <button
                  type="submit"
                  className="w-full text-left rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                >
                  <h3 className="font-semibold text-sm">{c.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {(c as any)._count.characters} personagens · {(c as any)._count.npcs} NPCs
                  </p>
                </button>
              </form>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}