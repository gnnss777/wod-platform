"use client";

import type { RollResult } from "@/lib/dice-roller";

function DieFace({ value, isHunger, success, critical }: { value: number; isHunger: boolean; success: boolean; critical: boolean }) {
  let cls = "w-8 h-8 rounded flex items-center justify-center text-xs font-bold border-2 transition-all";
  if (isHunger) cls += " border-red-500";
  else cls += " border-zinc-300 dark:border-zinc-600";

  if (critical) cls += " bg-green-200 text-green-900 dark:bg-green-900 dark:text-green-100";
  else if (success) cls += " bg-zinc-200 dark:bg-zinc-700";
  else cls += " bg-zinc-100 text-zinc-400 dark:bg-zinc-800";

  if (critical && isHunger) cls = cls.replace("bg-green-200", "bg-red-200").replace("text-green-900", "text-red-900").replace("dark:bg-green-900", "dark:bg-red-900").replace("dark:text-green-100", "dark:text-red-100");

  return (
    <div className={cls} title={isHunger ? "Dado de Fome" : undefined}>
      {value}
    </div>
  );
}

const RESULT_COLORS: Record<string, string> = {
  "Crítico Sangrento!": "text-red-600 dark:text-red-400",
  "Falha Bestial!": "text-red-600 dark:text-red-400",
  "Falha Crítica (Botch)!": "text-red-500",
  "Falha": "text-zinc-500",
  "Crítico!": "text-green-600 dark:text-green-400",
  "Sucesso Excepcional!": "text-green-600 dark:text-green-400",
  "Sucesso Notável": "text-green-600 dark:text-green-400",
  "Sucesso": "text-green-600 dark:text-green-400",
};

export function DiceResultView({ result }: { result: RollResult }) {
  const color = RESULT_COLORS[result.label] ?? "";

  return (
    <div className="rounded-lg border border-zinc-200 p-4 space-y-3 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <span className={`text-lg font-bold ${color}`}>{result.label}</span>
        <span className="text-sm text-zinc-500">
          {result.successes} sucesso(s)
        </span>
      </div>

      {result.messyCritical && (
        <p className="text-xs text-red-600 dark:text-red-400">
          Seu personagem venceu, mas a Besta se manifesta de forma violenta!
        </p>
      )}
      {result.bestialFailure && (
        <p className="text-xs text-red-600 dark:text-red-400">
          A Besta toma o controle! A falha é catastrófica e vergonhosa.
        </p>
      )}
      {result.botch && !result.bestialFailure && (
        <p className="text-xs text-red-500">
          Algo deu muito errado. O Narrador decide o destino do seu personagem.
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {result.dice.map((d, i) => (
          <DieFace key={i} {...d} />
        ))}
      </div>

      <div className="flex gap-4 text-[10px] text-zinc-500">
        <span>Dados: {result.pool}</span>
        <span>Dificuldade: {result.difficulty}</span>
        {result.hungerDice > 0 && (
          <span>Fome: {result.hungerDice}</span>
        )}
      </div>
    </div>
  );
}
