import { notFound } from "next/navigation";
import { getCharacter } from "@/app/actions/character";
import { CharacterSheet } from "@/components/character/character-sheet";
import type { CharacterData } from "@/components/character/character-sheet";
import { verifySession } from "@/lib/dal";
import Link from "next/link";

export default async function FichaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await verifySession();
  const char = await getCharacter(id);

  if (!char) notFound();

  const isOwner = char.playerId === session.userId;
  const canEdit = isOwner || session.role === "MESTRE" || session.role === "NARRADOR";

  return (
    <div className="mx-auto max-w-5xl p-6">
      <Link
        href="/jogador/fichas"
        className="mb-4 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        &larr; Voltar
      </Link>
      <CharacterSheet char={char as unknown as CharacterData} isOwner={isOwner} canEdit={canEdit} />
    </div>
  );
}
