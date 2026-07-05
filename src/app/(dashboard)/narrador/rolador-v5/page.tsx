import { DiceRoller } from "@/components/dice/dice-roller";

export default function NarradorRoladorV5Page() {
  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rolador de Dados V5</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Rolagem V5 com Dados de Fome para o Mestre
        </p>
      </div>

      <div className="flex gap-2">
        <a
          href="/narrador/rolador"
          className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs font-medium dark:border-zinc-700"
        >
          V20
        </a>
        <a
          href="/narrador/rolador-v5"
          className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          V5
        </a>
      </div>

      <DiceRoller mode="v5" />
    </div>
  );
}
