import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession, endSession } from "@/app/actions/session";
import { db } from "@/lib/db";
import { InitiativePanel } from "@/components/session/initiative-panel";
import { ChatPanel } from "@/components/session/chat-panel";
import { SceneSelector } from "@/components/session/scene-selector";

export default async function LiveSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession(id);
  if (!session) notFound();

  const scenes = await db.find("Scene", { chronicleId: (session as any).chronicleId }, "*", { orderBy: { order: "asc" } }) as any[];

  const currentScene = scenes.find((s) => s.id === (session as any).currentSceneId);

  return (
    <div className="mx-auto max-w-7xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/narrador/sessao" className="text-xs text-zinc-500 hover:underline">
            &larr; Sessões
          </Link>
          <h1 className="text-xl font-bold mt-0.5">
            {(session as any).chronicle.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-green-200 px-2 py-0.5 text-[10px] font-semibold text-green-800 dark:bg-green-800 dark:text-green-200">
            AO VIVO
          </span>
          <form action={async () => { "use server"; await endSession(id); }}>
            <button className="rounded-lg border border-red-300 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400">
              Encerrar
            </button>
          </form>
        </div>
      </div>

      {currentScene && (
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-[10px] uppercase font-semibold text-zinc-500">Cena Atual</p>
          <h2 className="text-lg font-bold mt-0.5">{currentScene.title}</h2>
          {currentScene.description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{currentScene.description}</p>
          )}
        </div>
      )}

      <SceneSelector sessionId={id} scenes={scenes} currentSceneId={(session as any).currentSceneId} />

      <div className="grid gap-4 lg:grid-cols-2">
        <InitiativePanel sessionId={id} entries={(session as any).initiative || []} />
        <ChatPanel sessionId={id} messages={(session as any).messages as never[]} isNarrator />
      </div>
    </div>
  );
}