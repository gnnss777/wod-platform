"use client";

import { useState } from "react";
import { rollV20, rollV5, type RollResult } from "@/lib/dice-roller";
import { DiceResultView } from "./dice-view";
import { Button } from "@/components/ui/button";

type Props = {
  mode: "v20" | "v5";
};

export function DiceRoller({ mode }: Props) {
  const [pool, setPool] = useState(5);
  const [difficulty, setDifficulty] = useState(6);
  const [hunger, setHunger] = useState(1);
  const [results, setResults] = useState<RollResult[]>([]);

  function roll() {
    const r = mode === "v20" ? rollV20(pool, difficulty) : rollV5(pool, hunger);
    setResults((prev) => [r, ...prev].slice(0, 20));
  }

  function clear() {
    setResults([]);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 p-4 space-y-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold">Configurar Rolagem</h2>

        <div className="flex flex-wrap gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Pool de Dados
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPool(Math.max(1, pool - 1))}
                className="w-7 h-7 rounded border border-zinc-300 text-sm dark:border-zinc-700"
              >
                -
              </button>
              <span className="w-8 text-center text-lg font-bold tabular-nums">
                {pool}
              </span>
              <button
                type="button"
                onClick={() => setPool(Math.min(30, pool + 1))}
                className="w-7 h-7 rounded border border-zinc-300 text-sm dark:border-zinc-700"
              >
                +
              </button>
            </div>
          </div>

          {mode === "v20" ? (
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Dificuldade
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDifficulty(Math.max(2, difficulty - 1))}
                  className="w-7 h-7 rounded border border-zinc-300 text-sm dark:border-zinc-700"
                >
                  -
                </button>
                <span className="w-8 text-center text-lg font-bold tabular-nums">
                  {difficulty}
                </span>
                <button
                  type="button"
                  onClick={() => setDifficulty(Math.min(10, difficulty + 1))}
                  className="w-7 h-7 rounded border border-zinc-300 text-sm dark:border-zinc-700"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Dados de Fome
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHunger(Math.max(0, hunger - 1))}
                  className="w-7 h-7 rounded border border-zinc-300 text-sm dark:border-zinc-700"
                >
                  -
                </button>
                <span className="w-8 text-center text-lg font-bold tabular-nums">
                  {hunger}
                </span>
                <button
                  type="button"
                  onClick={() => setHunger(Math.min(pool, hunger + 1))}
                  className="w-7 h-7 rounded border border-zinc-300 text-sm dark:border-zinc-700"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={roll} className="flex-1">
            Rolar {pool}d10
          </Button>
          {results.length > 0 && (
            <Button type="button" variant="ghost" onClick={clear}>
              Limpar
            </Button>
          )}
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <DiceResultView key={i} result={r} />
          ))}
        </div>
      )}
    </div>
  );
}
