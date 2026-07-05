import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/app/actions/session";
import { db } from "@/lib/db";
import { ChatPanel } from "@/components/session/chat-panel";

export default async function JogadorSessaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession(id);
  if (!session) notFound();

  const scenes = await db.find("Scene", { chronicleId: (session as any).chronicleId }, "*", { orderBy: { order: "asc" } }) as any[];

  const currentScene = scenes.find((s) => s.id === (session as any).currentSceneId);
  const activeChar = (session as any).initiative?.find((e: any) => e.isActive);

  return (
    <div className="mx-auto max-w-4xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{(session as any).chronicle.name}</h1>
        <span className="rounded bg-green-200 px-2 py-0.5 text-[10px] font-semibold text-green-800 dark:bg-green-800 dark:text-green-200">
          AO VIVO
        </span>
      </div>

      {currentScene && (
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-[10px] uppercase font-semibold text-zinc-500">Cena Atual</p>
          <h2 className="text-lg font-bold mt-0.5">{currentScene.title}</h2>
          {currentScene.description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{currentScene.description}</p>
          )}
          {currentScene.narrativeText && (
            <div className="mt-2 whitespace-pre-wrap text-sm text-zinc-500 dark:text-zinc-400">{currentScene.narrativeText}</div>
          )}
        </div>
      )}

      {activeChar && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
          <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">
            Vez de: {activeChar.name}
            {activeChar.value && ` (Iniciativa: ${activeChar.value})`}
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <h3 className="text-sm font-semibold mb-2">Iniciativa</h3>
          <div className="space-y-1">
            {(session as any).initiative?.map((e: any) => (
              <div
                key={e.id}
                className={`flex items-center justify-between rounded px-2 py-1 text-sm ${
                  e.isActive
                    ? "bg-yellow-100 font-medium dark:bg-yellow-900/40"
                    : "bg-zinc-50 dark:bg-zinc-900"
                }`}
              >
                <span>{e.name}</span>
                <span className="text-xs text-zinc-500 tabular-nums">{e.value}</span>
              </div>
            ))}
            {!(session as any).initiative?.length && (
              <p className="text-xs text-zinc-500">Aguardando...</p>
            )}
          </div>
        </div>

        <ChatPanel sessionId={id} messages={(session as any).messages as never[]} isNarrator={false} />
      </div>
    </div>
  );
}