import Link from "next/link";
import { getScenes } from "@/app/actions/scene";

export default async function CenasPage() {
  const scenes = await getScenes();

  const grouped = scenes.reduce(
    (acc, s) => {
      const key = s.chronicle.name;
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    },
    {} as Record<string, any[]>,
  );

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Cenas</h1>

      {Object.keys(grouped).length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhuma cena planejada.</p>
          <p className="text-xs text-zinc-400 mt-1">Crie cenas dentro de uma crônica.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([chronicle, scs]) => (
            <div key={chronicle} className="space-y-2">
              <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {chronicle}
              </h2>
              {(scs as any[]).map((s) => (
                <div
                  key={s.id}
                  className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">
                        {s.order && `#${s.order} `}{s.title}
                      </h3>
                      {s.chapter && (
                        <p className="text-xs text-zinc-500">
                          Capítulo {s.chapter}
                        </p>
                      )}
                    </div>
                  </div>
                  {s.description && (
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {s.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
