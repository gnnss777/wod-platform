import { verifySession } from "@/lib/dal";

export default async function JogadorDashboard() {
  const session = await verifySession();

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard do Jogador</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Suas fichas e notas de jogo
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Minhas Fichas"
          description="Visualize e edite seus personagens"
          href="/jogador/fichas"
        />
        <Card
          title="Notas"
          description="Suas anotações pessoais de sessão"
          href="/jogador/notas"
        />
        <Card
          title="Crônica"
          description="Acompanhe a história da sua crônica"
          href="/jogador/cronica"
        />
        <Card
          title="Crônica"
          description="Acompanhe a história e sessões ao vivo"
          href="/jogador/cronica"
        />
        <Card
          title="Rolador de Dados"
          description="Role dados d10"
          href="/jogador/rolador"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
    >
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </a>
  );
}
