import Link from "next/link";

type NoteItem = {
  id: string;
  title: string;
  type: string;
  createdAt: Date;
  character?: { name: string } | null;
};

export function NoteList({
  notes,
  basePath,
  emptyMsg,
}: {
  notes: NoteItem[];
  basePath: string;
  emptyMsg: string;
}) {
  if (notes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
        <p className="text-zinc-500">{emptyMsg}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notes.map((n) => (
        <Link
          key={n.id}
          href={`${basePath}/${n.id}`}
          className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-sm">{n.title}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {n.createdAt.toLocaleDateString("pt-BR")}
                {n.character && ` · ${n.character.name}`}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
