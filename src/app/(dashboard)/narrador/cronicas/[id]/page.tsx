import { notFound } from "next/navigation";
import Link from "next/link";
import { getChronicle, removeCharacterFromChronicle } from "@/app/actions/chronicle";
import { getNpcs } from "@/app/actions/npc";
import { getScenes } from "@/app/actions/scene";
import { approveCharacter, rejectCharacter } from "@/app/actions/scene";
import { prisma } from "@/lib/prisma";

export default async function CronicaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chronicle = await getChronicle(id);
  if (!chronicle) notFound();

  const allPlayers = await prisma.user.findMany({
    where: { role: "JOGADOR" },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const availableChars = await prisma.character.findMany({
    where: {
      OR: [
        { chronicleId: null },
        { chronicleId: id },
      ],
    },
    include: { player: { select: { name: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <Link href="/narrador/cronicas" className="text-sm text-zinc-500 hover:underline">
            &larr; Crônicas
          </Link>
          <h1 className="text-2xl font-bold mt-1">{chronicle.name}</h1>
          <p className="text-sm text-zinc-500">
            {chronicle.edition && `${chronicle.edition} · `}
            {chronicle._count.characters} personagens · {chronicle._count.npcs} NPCs · {chronicle._count.scenes} cenas
          </p>
        </div>
        <div className="flex gap-2">
          <span className={`rounded px-2 py-1 text-xs font-semibold ${
            chronicle.status === "ATIVA"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
          }`}>
            {chronicle.status === "ATIVA" ? "Ativa" : "Encerrada"}
          </span>
          <Link
            href={`/narrador/cronicas/${id}/editar`}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Editar
          </Link>
        </div>
      </div>

      {chronicle.description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{chronicle.description}</p>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Personagens ({chronicle.characters.length})</h2>
        {chronicle.characters.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum personagem nesta crônica.</p>
        ) : (
          <div className="space-y-2">
            {chronicle.characters.map((ch) => (
              <div key={ch.id} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                <div>
                  <Link href={`/jogador/fichas/${ch.id}`} className="font-medium text-sm hover:underline">
                    {ch.name}
                  </Link>
                  <p className="text-xs text-zinc-500">{ch.player.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    ch.status === "APROVADO" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                    ch.status === "PENDENTE" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" :
                    "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
                  }`}>
                    {ch.status === "APROVADO" ? "Aprovado" : ch.status === "PENDENTE" ? "Pendente" : "Rascunho"}
                  </span>
                  {ch.status === "PENDENTE" && (
                    <>
                      <form action={async () => { "use server"; await approveCharacter(ch.id); }}>
                        <button className="text-xs text-green-600 hover:underline">Aprovar</button>
                      </form>
                      <form action={async () => { "use server"; await rejectCharacter(ch.id); }}>
                        <button className="text-xs text-red-500 hover:underline">Rejeitar</button>
                      </form>
                    </>
                  )}
                  <form action={async () => { "use server"; await removeCharacterFromChronicle(ch.id, id); }}>
                    <button className="text-xs text-zinc-400 hover:text-red-500">Remover</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}

        <details className="text-sm">
          <summary className="cursor-pointer font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400">
            Adicionar personagem à crônica
          </summary>
          <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
            {availableChars.filter(ch => ch.chronicleId !== id).map(ch => (
              <form key={ch.id} action={async () => {
                "use server";
                const { addCharacterToChronicle } = await import("@/app/actions/chronicle");
                await addCharacterToChronicle(ch.id, id);
              }}>
                <button className="w-full text-left rounded px-2 py-1 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  {ch.name} ({ch.player.name})
                </button>
              </form>
            ))}
          </div>
        </details>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">NPCs ({chronicle.npcs.length})</h2>
          <Link
            href={`/narrador/npcs/novo?chronicle=${id}`}
            className="text-xs font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            + Novo NPC
          </Link>
        </div>
        {chronicle.npcs.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum NPC nesta crônica.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {chronicle.npcs.map((npc) => (
              <Link
                key={npc.id}
                href={`/narrador/npcs/${npc.id}`}
                className="block rounded-lg border border-zinc-200 bg-white p-3 text-sm hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
              >
                <span className="font-medium">{npc.name}</span>
                {npc.concept && <p className="text-xs text-zinc-500">{npc.concept}</p>}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cenas ({chronicle.scenes.length})</h2>
        {chronicle.scenes.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhuma cena planejada.</p>
        ) : (
          <div className="space-y-2">
            {chronicle.scenes.map((scene, i) => (
              <div key={scene.id} className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium">
                      {scene.order && `#${scene.order} `}{scene.title}
                    </h3>
                    {scene.chapter && <p className="text-xs text-zinc-500">Capítulo {scene.chapter}</p>}
                  </div>
                </div>
                {scene.description && (
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{scene.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
        <details className="text-sm">
          <summary className="cursor-pointer font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400">
            Adicionar cena
          </summary>
          <AddSceneForm chronicleId={id} />
        </details>
      </section>
    </div>
  );
}

function AddSceneForm({ chronicleId }: { chronicleId: string }) {
  return (
    <form
      action={async (form: FormData) => {
        "use server";
        const { createScene } = await import("@/app/actions/scene");
        await createScene({
          title: form.get("title") as string,
          description: form.get("description") as string || undefined,
          chapter: form.get("chapter") ? parseInt(form.get("chapter") as string) : undefined,
          chronicleId,
        });
      }}
      className="mt-3 space-y-2 border-t border-zinc-200 pt-3 dark:border-zinc-800"
    >
      <input
        name="title"
        placeholder="Título da cena"
        required
        className="w-full rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900"
      />
      <input
        name="description"
        placeholder="Descrição rápida..."
        className="w-full rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900"
      />
      <input
        name="chapter"
        type="number"
        placeholder="Capítulo (opcional)"
        className="w-24 rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900"
      />
      <button
        type="submit"
        className="rounded bg-zinc-900 px-3 py-1 text-xs text-white dark:bg-white dark:text-zinc-900"
      >
        Adicionar
      </button>
    </form>
  );
}
