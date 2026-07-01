import { DiceRoller } from "@/components/dice/dice-roller";

export default function JogadorRoladorPage() {
  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rolador de Dados</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Role dados d10 com as regras do World of Darkness
        </p>
      </div>

      <div className="flex gap-2">
        <a
          href="/jogador/rolador"
          className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          V20
        </a>
        <a
          href="/jogador/rolador-v5"
          className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs font-medium dark:border-zinc-700"
        >
          V5
        </a>
      </div>

      <DiceRoller mode="v20" />
    </div>
  );
}
