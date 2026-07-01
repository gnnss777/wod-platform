import Link from "next/link";
import { getChronicles } from "@/app/actions/chronicle";

export default async function CronicasPage() {
  const chronicles = await getChronicles();

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Crônicas</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {chronicles.length} crônica(s)
          </p>
        </div>
        <Link
          href="/narrador/cronicas/novo"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          + Nova Crônica
        </Link>
      </div>

      {chronicles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhuma crônica ainda.</p>
          <Link
            href="/narrador/cronicas/novo"
            className="mt-2 inline-block text-sm font-medium underline"
          >
            Criar primeira crônica
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {chronicles.map((c) => (
            <Link
              key={c.id}
              href={`/narrador/cronicas/${c.id}`}
              className="block rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <div className="flex items-start justify-between">
                <h2 className="font-semibold">{c.name}</h2>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    c.status === "ATIVA"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
                  }`}
                >
                  {c.status === "ATIVA" ? "Ativa" : "Encerrada"}
                </span>
              </div>
              {c.description && (
                <p className="mt-1 text-xs text-zinc-500 line-clamp-2">{c.description}</p>
              )}
              <div className="mt-3 flex gap-3 text-xs text-zinc-500">
                <span>{c._count.characters} personagens</span>
                <span>{c._count.npcs} NPCs</span>
                <span>{c._count.scenes} cenas</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
