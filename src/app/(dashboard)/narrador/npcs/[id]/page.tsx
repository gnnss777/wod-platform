import { notFound } from "next/navigation";
import Link from "next/link";
import { getNpc, deleteNpc } from "@/app/actions/npc";
import { DotsInput } from "@/components/character/dots-input";

export default async function NpcDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const npc = await getNpc(id);
  if (!npc) notFound();

  const attrs = npc.attributes as Record<string, number>;
  const abils = npc.abilities as Record<string, number>;
  const powers = npc.powers as Record<string, number>;
  const wp = npc.willpower as { rating: number; current: number };
  const hp = npc.health as { max: number; bashing: number; lethal: number; aggravated: number };

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <Link href="/narrador/npcs" className="text-sm text-zinc-500 hover:underline">&larr; NPCs</Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{npc.name}</h1>
          <p className="text-sm text-zinc-500">
            {npc.concept && `${npc.concept} `}
            {npc.clan && `· ${npc.clan}`}
            {npc.chronicle && ` · ${npc.chronicle.name}`}
          </p>
        </div>
        <form action={async () => { "use server"; await deleteNpc(id); }}>
          <button className="text-xs text-red-500 hover:underline">Excluir</button>
        </form>
      </div>

      {Object.keys(attrs).length > 0 && (
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <h3 className="text-sm font-semibold mb-2">Atributos</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(attrs).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-xs">
                <span className="capitalize">{k}</span>
                <DotsInput value={v} readonly size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(abils).length > 0 && (
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <h3 className="text-sm font-semibold mb-2">Habilidades</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(abils).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-xs">
                <span className="capitalize">{k}</span>
                <DotsInput value={v} readonly size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <MiniCard title="Força de Vontade" value={`${wp.current}/${wp.rating}`} />
        <MiniCard title="Saúde" value={`${hp.bashing}/${hp.lethal}/${hp.aggravated} (${hp.max})`} />
        {Object.keys(powers).length > 0 && (
          <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-[10px] uppercase font-semibold text-zinc-500">Poderes</p>
            {Object.entries(powers).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-xs mt-1">
                <span className="capitalize">{k}</span>
                <DotsInput value={v as number} readonly size="sm" />
              </div>
            ))}
          </div>
        )}
      </div>

      {npc.notes && (
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <h3 className="text-sm font-semibold mb-1">Notas</h3>
          <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400">{npc.notes}</p>
        </div>
      )}
    </div>
  );
}

function MiniCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
      <p className="text-[10px] uppercase font-semibold text-zinc-500">{title}</p>
      <p className="text-lg font-bold mt-0.5">{value}</p>
    </div>
  );
}
