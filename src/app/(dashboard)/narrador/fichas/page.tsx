import Link from "next/link";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export default async function NarradorFichasPage() {
  const session = await verifySession();

  const characters = await db.find("Character", {}, "*, player(name), chronicle(name)", { orderBy: { updatedAt: "desc" } }) as any[];

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fichas dos Jogadores</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {characters.length} personagem(ns) no total
        </p>
      </div>

      {characters.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Nenhuma ficha criada ainda.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Personagem</th>
                <th className="px-4 py-2 text-left font-medium">Jogador</th>
                <th className="px-4 py-2 text-left font-medium">Crônica</th>
                <th className="px-4 py-2 text-left font-medium">Edição</th>
                <th className="px-4 py-2 text-left font-medium">Atualizado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {characters.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <td className="px-4 py-2">
                    <Link
                      href={`/jogador/fichas/${c.id}`}
                      className="font-medium hover:underline"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                    {c.player?.name}
                  </td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                    {c.chronicle?.name ?? "-"}
                  </td>
                  <td className="px-4 py-2">
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold dark:bg-zinc-700">
                      {c.edition}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-zinc-500 text-xs">
                    {new Date(c.updatedAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}