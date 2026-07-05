"use client";

import { useActionState } from "react";
import { addPlayerToChronicle } from "@/app/actions/jogadores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function AddPlayerForm({ chronicles, preselected }: { chronicles: { id: string; name: string }[]; preselected: string | null }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const chronicleId = formData.get("chronicleId") as string;
    const email = formData.get("email") as string;
    const result = await addPlayerToChronicle(chronicleId, email);
    if (result.error) return { error: result.error };
    router.push(`/narrador/jogadores`);
    return { error: null };
  }, { error: null });

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-300">Crônica</label>
        <select
          name="chronicleId"
          defaultValue={preselected ?? undefined}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
        >
          {chronicles.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <Input
        id="email"
        label="Email do Jogador"
        name="email"
        type="email"
        placeholder="jogador@email.com"
      />

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Adicionando..." : "Adicionar"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}