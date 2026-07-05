import { Suspense } from "react";
import { db } from "@/lib/db";
import { NovoDocumentoForm } from "@/components/document/novo-documento-form";

export default async function NovoDocumentoPage() {
  const chronicles = await db.find("Chronicle", {}, "id,name", { orderBy: { name: "asc" } }) as any[];

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Novo Documento</h1>
      <Suspense fallback={<div className="text-sm text-zinc-500">Carregando...</div>}>
        <NovoDocumentoForm chronicles={chronicles} />
      </Suspense>
    </div>
  );
}
