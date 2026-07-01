import Link from "next/link";
import { getNpcs } from "@/app/actions/npc";

export default async function NpcsPage({
  searchParams,
}: {
  searchParams: Promise<{ chronicle?: string }>;
}) {
  const sp = await searchParams;
  const npcs = await getNpcs(sp.chronicle);

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">NPCs</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {npcs.length} NPC(s)
          </p>
        </div>
        <Link
          href={`/narrador/npcs/novo${sp.chronicle ? `?chronicle=${sp.chronicle}` : ""}`}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          + Novo NPC
        </Link>
      </div>

      {npcs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhum NPC criado.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {npcs.map((npc) => (
            <Link
              key={npc.id}
              href={`/narrador/npcs/${npc.id}`}
              className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="font-medium text-sm">{npc.name}</h3>
              {npc.concept && <p className="text-xs text-zinc-500 mt-0.5">{npc.concept}</p>}
              {npc.chronicle && <p className="text-xs text-zinc-400 mt-1">{npc.chronicle.name}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
