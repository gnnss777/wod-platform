import { Suspense } from "react";
import { NovoNpcForm } from "@/components/npc/novo-npc-form";

export default function NovoNpcPage() {
  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Novo NPC</h1>
      <Suspense fallback={<div className="text-sm text-zinc-500">Carregando...</div>}>
        <NovoNpcForm />
      </Suspense>
    </div>
  );
}
