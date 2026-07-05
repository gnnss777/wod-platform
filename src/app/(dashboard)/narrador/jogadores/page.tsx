import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, User, UserCheck } from "lucide-react";

export default async function JogadoresPage() {
  const session = await verifySession();

  const chronicles = await db.find("Chronicle",
    { narratorId: session.userId },
    "id, name, status"
  ) as any[];

  const chronicleIds = chronicles.map(c => c.id);

  const members = chronicleIds.length
    ? await db.find("ChronicleMember",
        { chronicleId_in: chronicleIds },
        "chronicleId, userId"
      ) as any[]
    : [];

  const userIds = [...new Set(members.map(m => m.userId))] as string[];

  const [users, charCounts] = await Promise.all([
    userIds.length ? db.find("User", { id_in: userIds }, "id, name, email") as Promise<any[]> : Promise.resolve([] as any[]),
    userIds.length ? db.batchCounts("Character", "playerId", userIds) : Promise.resolve({} as Record<string, number>),
  ]);

  const userMap: Record<string, { name: string; email: string }> = {};
  for (const u of users) userMap[u.id] = { name: u.name, email: u.email };

  const grouped: Record<string, { id: string; name: string; email: string; charCount: number }[]> = {};
  for (const c of chronicles) {
    const players = members
      .filter(m => m.chronicleId === c.id)
      .map(m => ({
        id: m.userId,
        name: userMap[m.userId]?.name || "Desconhecido",
        email: userMap[m.userId]?.email || "-",
        charCount: charCounts[m.userId] || 0,
      }));
    if (players.length) grouped[c.id] = players;
  }

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jogadores</h1>
          <p className="text-sm text-zinc-400">Gerencie os jogadores das suas crônicas</p>
        </div>
      </div>

      {chronicles.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 p-12 text-center">
          <User className="mx-auto h-12 w-12 text-zinc-600" />
          <p className="mt-4 text-zinc-400">Você ainda não tem crônicas.</p>
          <Link href="/narrador/cronicas/novo" className="mt-2 inline-block text-sm text-red-400 hover:underline">
            Criar primeira crônica
          </Link>
        </div>
      ) : chronicles.every(c => !grouped[c.id]) ? (
        <div className="rounded-lg border border-zinc-800 p-12 text-center">
          <UserCheck className="mx-auto h-12 w-12 text-zinc-600" />
          <p className="mt-4 text-zinc-400">Nenhum jogador nas suas crônicas ainda.</p>
          <p className="text-sm text-zinc-600">Adicione jogadores pelo email deles em cada crônica.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {chronicles.map(c => {
            const players = grouped[c.id];
            if (!players) return null;
            return (
              <div key={c.id}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-zinc-200">{c.name}</h2>
                  <Link
                    href={`/narrador/jogadores/adicionar?chronicleId=${c.id}`}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                  >
                    <Plus size={16} /> Adicionar jogador
                  </Link>
                </div>
                <div className="rounded-lg border border-zinc-800 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-900">
                      <tr className="text-left text-zinc-400">
                        <th className="px-4 py-3 font-medium">Nome</th>
                        <th className="px-4 py-3 font-medium hidden sm:table-cell">Email</th>
                        <th className="px-4 py-3 font-medium text-center">Fichas</th>
                        <th className="px-4 py-3 font-medium text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {players.map(p => (
                        <tr key={p.id} className="hover:bg-zinc-900/50">
                          <td className="px-4 py-3">
                            <Link href={`/narrador/jogadores/${p.id}`} className="text-zinc-100 hover:text-red-400 font-medium">
                              {p.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-zinc-500 hidden sm:table-cell">{p.email}</td>
                          <td className="px-4 py-3 text-center text-zinc-400">{p.charCount}</td>
                          <td className="px-4 py-3 text-right">
                            <Link href={`/narrador/jogadores/${p.id}`} className="text-sm text-zinc-500 hover:text-zinc-300">
                              Ver detalhes
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}