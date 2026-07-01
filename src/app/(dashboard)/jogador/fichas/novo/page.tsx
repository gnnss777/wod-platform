import { CharacterForm } from "@/components/character/character-form";

export default function NovaFichaPage() {
  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nova Ficha</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Crie um novo personagem para sua crônica
        </p>
      </div>
      <CharacterForm />
    </div>
  );
}
