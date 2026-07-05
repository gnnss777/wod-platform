"use client";

import { approveCharacter, rejectCharacter } from "@/app/actions/jogadores";
import { useRouter } from "next/navigation";

export function ApproveActions({ characterId, status }: { characterId: string; status: string }) {
  const router = useRouter();

  if (status !== "PENDENTE") return null;

  return (
    <div className="flex gap-1 justify-center">
      <button
        onClick={async () => {
          await approveCharacter(characterId);
          router.refresh();
        }}
        className="rounded bg-green-900/50 px-2 py-1 text-xs text-green-300 hover:bg-green-800/50"
      >
        Aprovar
      </button>
      <button
        onClick={async () => {
          await rejectCharacter(characterId);
          router.refresh();
        }}
        className="rounded bg-red-900/50 px-2 py-1 text-xs text-red-300 hover:bg-red-800/50"
      >
        Rejeitar
      </button>
    </div>
  );
}