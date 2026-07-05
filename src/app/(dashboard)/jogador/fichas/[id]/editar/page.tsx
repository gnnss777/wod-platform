import { notFound } from "next/navigation";
import { getCharacter } from "@/app/actions/character";
import { EditCharacterForm } from "@/components/character/edit-form";
import { verifySession } from "@/lib/dal";
import Link from "next/link";

export default async function EditarFichaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await verifySession();
  const char = await getCharacter(id);

  if (!char) notFound();
  if (char.playerId !== session.userId && session.role !== "MESTRE" && session.role !== "NARRADOR") notFound();

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <Link
        href={`/jogador/fichas/${id}`}
        className="inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        &larr; Voltar
      </Link>
      <div>
        <h1 className="text-2xl font-bold">Editar Ficha</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{char.name}</p>
      </div>
      <EditCharacterForm character={char as never} />
    </div>
  );
}
