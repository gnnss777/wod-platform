import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { AddPlayerForm } from "./form";

export default async function AdicionarJogadorPage(props: { searchParams: Promise<{ chronicleId?: string }> }) {
  const session = await verifySession();
  const searchParams = await props.searchParams;

  const chronicles = await db.find("Chronicle",
    { narratorId: session.userId, status: "ATIVA" },
    "id, name"
  ) as any[];

  const preselected = searchParams.chronicleId
    ? chronicles.find(c => c.id === searchParams.chronicleId)
    : null;

  if (!preselected && chronicles.length === 1) {
    redirect(`/narrador/jogadores/adicionar?chronicleId=${chronicles[0].id}`);
  }

  return (
    <div className="mx-auto max-w-lg p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Adicionar Jogador</h1>
        <p className="text-sm text-zinc-400">Adicione um jogador a uma crônica pelo email</p>
      </div>
      <AddPlayerForm chronicles={chronicles} preselected={preselected?.id ?? null} />
    </div>
  );
}