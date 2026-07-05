"use client";

import { useRouter } from "next/navigation";
import { setCurrentScene } from "@/app/actions/session";
import { Button } from "@/components/ui/button";

type Scene = {
  id: string;
  title: string;
  description: string | null;
  narrativeText: string | null;
  order: number | null;
};

export function SceneSelector({
  sessionId,
  scenes,
  currentSceneId,
}: {
  sessionId: string;
  scenes: Scene[];
  currentSceneId: string | null;
}) {
  const router = useRouter();

  async function handleSelect(sceneId: string | null) {
    await setCurrentScene(sessionId, sceneId);
    router.refresh();
  }

  if (scenes.length === 0) {
    return (
      <p className="text-xs text-zinc-500">
        Nenhuma cena disponível. Crie cenas na crônica primeiro.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {scenes.map((scene) => (
        <button
          key={scene.id}
          onClick={() => handleSelect(scene.id)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            currentSceneId === scene.id
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          }`}
          title={scene.description ?? undefined}
        >
          {scene.order && `#${scene.order} `}{scene.title}
        </button>
      ))}
      {currentSceneId && (
        <Button variant="ghost" onClick={() => handleSelect(null)} className="text-xs !px-2 !py-1">
          Limpar
        </Button>
      )}
    </div>
  );
}
