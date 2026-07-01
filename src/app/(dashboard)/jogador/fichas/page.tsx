import Link from "next/link";
import { getCharactersForUser } from "@/app/actions/character";

export default async function FichasPage() {
  const characters = await getCharactersForUser();

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Minhas Fichas</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {characters.length} personagem(ns)
          </p>
        </div>
        <Link
          href="/jogador/fichas/novo"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
        >
          + Nova Ficha
        </Link>
      </div>

      {characters.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhuma ficha ainda.</p>
          <Link
            href="/jogador/fichas/novo"
            className="mt-2 inline-block text-sm font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            Criar primeira ficha
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((c) => (
            <Link
              key={c.id}
              href={`/jogador/fichas/${c.id}`}
              className="block rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold">{c.name}</h2>
                  {c.concept && (
                    <p className="mt-0.5 text-xs text-zinc-500">{c.concept}</p>
                  )}
                </div>
                <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold dark:bg-zinc-700">
                  {c.edition}
                </span>
              </div>
              {c.chronicle && (
                <p className="mt-2 text-xs text-zinc-500">
                  {c.chronicle.name}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
