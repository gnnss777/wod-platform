import { verifySession } from "@/lib/dal";
import { getChronicles } from "@/app/actions/chronicle";
import { getNpcs } from "@/app/actions/npc";
import { db } from "@/lib/db";
import { DashboardCard, StatCard } from "@/components/ui/dashboard-card";
import {
  BookOpen, Users, UserPlus, UserCheck, ScrollText, Radio, Library, Dice5, FileText, Activity, Swords, UserCog,
} from "lucide-react";

export default async function NarradorDashboard() {
  const session = await verifySession();
  const chronicles = await getChronicles();
  const npcs = await getNpcs();
  const pendingChars = await db.count("Character", { status: "PENDENTE" });

  const chronicleIds = chronicles.map((c: any) => c.id);
  const totalPlayers = chronicleIds.length
    ? await db.count("ChronicleMember", { chronicleId_in: chronicleIds })
    : 0;

  const stats = {
    cronicas: chronicles.length,
    npcs: npcs.length,
    pendentes: pendingChars,
    ativas: chronicles.filter((c: any) => c.status === "ATIVA").length,
    jogadores: totalPlayers,
  };

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard do Mestre</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Gerencie suas crônicas, NPCs e histórias
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-5">
        <StatCard title="Crônicas Ativas" value={stats.ativas} icon={Activity} />
        <StatCard title="Jogadores" value={stats.jogadores} icon={Users} />
        <StatCard title="Total de NPCs" value={stats.npcs} icon={Swords} />
        <StatCard title="Fichas Pendentes" value={stats.pendentes} highlight={stats.pendentes > 0} icon={UserCog} />
        <StatCard title="Crônicas" value={stats.cronicas} icon={BookOpen} />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Navegação Rápida</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="Crônicas" description="Crie e gerencie suas crônicas" href="/narrador/cronicas" icon={BookOpen} />
          <DashboardCard title="Jogadores" description="Gerencie jogadores nas suas crônicas" href="/narrador/jogadores" icon={UserPlus} />
          <DashboardCard title="NPCs" description="Gerencie personagens não-jogadores" href="/narrador/npcs" icon={Users} />
          <DashboardCard title="Fichas dos Jogadores" description="Visualize e aprove fichas" href="/narrador/fichas" icon={UserCheck} />
          <DashboardCard title="Cenas" description="Planeje cenas e capítulos" href="/narrador/cenas" icon={ScrollText} />
          <DashboardCard title="Sessão ao Vivo" description="Iniciativa, chat e cenas em tempo real" href="/narrador/sessao" icon={Radio} />
          <DashboardCard title="Regras" description="Consulta rápida de regras do WoD" href="/narrador/regras" icon={Library} />
          <DashboardCard title="Rolador de Dados" description="Role dados d10 com regras do sistema" href="/narrador/rolador" icon={Dice5} />
          <DashboardCard title="Notas do Mestre" description="Suas anotações privadas" href="/narrador/notas" icon={FileText} />
        </div>
      </div>
    </div>
  );
}
