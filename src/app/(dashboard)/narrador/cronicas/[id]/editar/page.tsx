import { notFound } from "next/navigation";
import { getChronicle } from "@/app/actions/chronicle";
import { EditChronicleForm } from "@/components/chronicle/edit-chronicle-form";

export default async function EditarCronicaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chronicle = await getChronicle(id);
  if (!chronicle) notFound();

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Editar Crônica</h1>
      <EditChronicleForm
        id={chronicle.id}
        initial={{ name: chronicle.name, description: chronicle.description ?? "", edition: chronicle.edition ?? "" }}
      />
    </div>
  );
}
