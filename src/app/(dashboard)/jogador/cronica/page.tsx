import Link from "next/link";
import { getPlayerChronicles } from "@/app/actions/note";
import { db } from "@/lib/db";

export default async function CronicaPage() {
  const chronicles = await getPlayerChronicles();

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Minha Crônica</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Acompanhe a história da sua crônica
        </p>
      </div>

      {chronicles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">
            Você não está em nenhuma crônica ativa no momento.
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            Quando o Mestre te adicionar a uma crônica, ela aparecerá aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {chronicles.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold">{c.name}</h2>
                  <p className="text-sm text-zinc-500 mt-1">
                    Narrado por {c.narrator.name}
                    {c.edition && ` · ${c.edition}`}
                  </p>
                </div>
                <span className="rounded bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                  {c.status}
                </span>
              </div>

              {(c as any).narrativeText && (
                <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 mb-4">
                  <h4 className="text-sm font-semibold mb-2">Narrativa da Crônica</h4>
                  <div className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400">
                    {(c as any).narrativeText}
                  </div>
                </div>
              )}

              {c.description && (
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {c.description}
                </p>
              )}

              {c.id && <ActiveSession chronicleId={c.id} />}

              <div className="mt-4">
                <p className="text-xs font-medium text-zinc-500 mb-2">
                  Seus personagens nesta crônica:
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.characters.map((ch: any) => (
                    <Link
                      key={ch.id}
                      href={`/jogador/fichas/${ch.id}`}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    >
                      {ch.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function ActiveSession({ chronicleId }: { chronicleId: string }) {
  const session = await db.get("LiveSession", { chronicleId, status: "ACTIVE" }, "id");
  if (!session) return null;

  return (
    <div className="mt-3">
      <Link
        href={`/jogador/sessao/${(session as any).id}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300"
      >
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        Sessão ao Vivo - Entrar
      </Link>
    </div>
  );
}