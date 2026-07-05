import { verifySession } from "@/lib/dal";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Users, FileText, Globe, Dice5, BookOpen, ScrollText } from "lucide-react";

export default async function JogadorDashboard() {
  const session = await verifySession();

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard do Jogador</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Suas fichas, notas e aventuras
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Navegação Rápida</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Minhas Fichas"
            description="Visualize e edite seus personagens"
            href="/jogador/fichas"
            icon={Users}
          />
          <DashboardCard
            title="Notas"
            description="Suas anotações pessoais de sessão"
            href="/jogador/notas"
            icon={FileText}
          />
          <DashboardCard
            title="Diário"
            description="Diário do personagem"
            href="/jogador/diario"
            icon={BookOpen}
          />
          <DashboardCard
            title="Crônica"
            description="Acompanhe a história e sessões ao vivo"
            href="/jogador/cronica"
            icon={Globe}
          />
          <DashboardCard
            title="Rolador de Dados"
            description="Role dados d10"
            href="/jogador/rolador"
            icon={Dice5}
          />
          <DashboardCard
            title="Documentos"
            description="Documentos compartilhados pelo Mestre"
            href="/jogador/documentos"
            icon={ScrollText}
          />
        </div>
      </div>
    </div>
  );
}
