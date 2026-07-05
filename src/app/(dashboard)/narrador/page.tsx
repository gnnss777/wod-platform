import { verifySession } from "@/lib/dal";
import { getChronicles } from "@/app/actions/chronicle";
import { getNpcs } from "@/app/actions/npc";
import { db } from "@/lib/db";

export default async function NarradorDashboard() {
  const session = await verifySession();
  const chronicles = await getChronicles();
  const npcs = await getNpcs();
  const pendingChars = await db.count("Character", { status: "PENDENTE" });

  const chronicleIds = chronicles.map(c => c.id);
  const totalPlayers = chronicleIds.length
    ? await db.count("ChronicleMember", { chronicleId_in: chronicleIds })
    : 0;

  const stats = {
    cronicas: chronicles.length,
    npcs: npcs.length,
    pendentes: pendingChars,
    ativas: chronicles.filter((c) => c.status === "ATIVA").length,
    jogadores: totalPlayers,
  };

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard do Narrador</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Gerencie suas crônicas, NPCs e histórias
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-5">
        <StatCard title="Crônicas Ativas" value={stats.ativas} />
        <StatCard title="Jogadores" value={stats.jogadores} />
        <StatCard title="Total de NPCs" value={stats.npcs} />
        <StatCard title="Fichas Pendentes" value={stats.pendentes} highlight={stats.pendentes > 0} />
        <StatCard title="Crônicas" value={stats.cronicas} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Crônicas" description="Crie e gerencie suas crônicas" href="/narrador/cronicas" />
        <Card title="Jogadores" description="Gerencie jogadores nas suas crônicas" href="/narrador/jogadores" />
        <Card title="NPCs" description="Gerencie personagens não-jogadores" href="/narrador/npcs" />
        <Card title="Fichas dos Jogadores" description="Visualize e aprove fichas" href="/narrador/fichas" />
        <Card title="Cenas" description="Planeje cenas e capítulos" href="/narrador/cenas" />
        <Card title="Sessão ao Vivo" description="Iniciativa, chat e cenas em tempo real" href="/narrador/sessao" />
        <Card title="Regras" description="Consulta rápida de regras do WoD" href="/narrador/regras" />
        <Card title="Rolador de Dados" description="Role dados d10 com regras do sistema" href="/narrador/rolador" />
        <Card title="Notas do Narrador" description="Suas anotações privadas" href="/narrador/notas" />
      </div>
    </div>
  );
}

function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a href={href} className="block rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </a>
  );
}

function StatCard({ title, value, highlight }: { title: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? "border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"}`}>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${highlight ? "text-yellow-700 dark:text-yellow-300" : ""}`}>{value}</p>
    </div>
  );
}