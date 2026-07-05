import { notFound } from "next/navigation";
import Link from "next/link";
import { updateScene, deleteScene } from "@/app/actions/scene";
import { db } from "@/lib/db";

export default async function CenaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scene = await db.get("Scene", { id }, "*") as any;
  if (!scene) notFound();

  const chronicle = scene.chronicleId
    ? await db.get("Chronicle", { id: scene.chronicleId }, "id,name")
    : null;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6 animate-fade-in">
      <Link href="/narrador/cenas" className="text-sm text-zinc-500 hover:underline">&larr; Cenas</Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">{scene.title}</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {scene.order && `#${scene.order} `}
            {scene.chapter && `Capítulo ${scene.chapter} `}
            {chronicle && `· ${(chronicle as any).name}`}
          </p>
        </div>
        <form action={async () => { "use server"; await deleteScene(id); }}>
          <button className="text-xs text-red-500 hover:underline">Excluir</button>
        </form>
      </div>

      {scene.description && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-xs text-zinc-500 uppercase font-semibold mb-1">Descrição</p>
          <p className="text-sm text-zinc-300">{scene.description}</p>
        </div>
      )}

      {scene.narrativeText && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-xs text-zinc-500 uppercase font-semibold mb-1">Texto Narrativo</p>
          <div className="whitespace-pre-wrap text-sm text-zinc-300">{scene.narrativeText}</div>
        </div>
      )}

      <EditSceneForm scene={scene} />
    </div>
  );
}

function EditSceneForm({ scene }: { scene: any }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-4">
      <h3 className="text-sm font-semibold text-zinc-100">Editar Cena</h3>
      <form
        action={async (form: FormData) => {
          "use server";
          await updateScene(scene.id, {
            title: form.get("title") as string,
            description: form.get("description") as string || undefined,
            narrativeText: form.get("narrativeText") as string || undefined,
            chapter: form.get("chapter") ? parseInt(form.get("chapter") as string) : undefined,
            order: form.get("order") ? parseInt(form.get("order") as string) : undefined,
          });
        }}
        className="space-y-3"
      >
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Título</label>
          <input
            name="title"
            defaultValue={scene.title}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-crimson/50 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Descrição</label>
          <input
            name="description"
            defaultValue={scene.description || ""}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-crimson/50 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Texto Narrativo</label>
          <textarea
            name="narrativeText"
            defaultValue={scene.narrativeText || ""}
            rows={6}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-crimson/50 focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Capítulo</label>
            <input
              name="chapter"
              type="number"
              defaultValue={scene.chapter || ""}
              className="w-24 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-crimson/50 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Ordem</label>
            <input
              name="order"
              type="number"
              defaultValue={scene.order || ""}
              className="w-24 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-crimson/50 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-crimson px-4 py-2 text-sm font-medium text-white hover:bg-crimson-light transition-colors"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
