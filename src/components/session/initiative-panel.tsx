"use client";

import { useState, useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addInitiative, removeInitiative, nextTurn } from "@/app/actions/session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Entry = {
  id: string;
  name: string;
  value: number;
  isPlayer: boolean;
  isActive: boolean;
  turnOrder: number;
};

export function InitiativePanel({
  sessionId,
  entries,
}: {
  sessionId: string;
  entries: Entry[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [value, setValue] = useState(5);
  const [isPlayer, setIsPlayer] = useState(false);
  const [optimisticEntries, addOptimistic] = useOptimistic(
    entries,
    (state, action: { type: "add" | "remove" | "next"; entry?: Entry }) => {
      if (action.type === "add" && action.entry) {
        return [...state, action.entry].sort((a, b) => b.value - a.value)
          .map((e, i) => ({ ...e, turnOrder: i, isActive: i === 0 }));
      }
      if (action.type === "remove" && action.entry) {
        return state.filter((e) => e.id !== action.entry!.id);
      }
      if (action.type === "next") {
        const cur = state.findIndex((e) => e.isActive);
        const next = (cur + 1) % state.length;
        return state.map((e, i) => ({ ...e, isActive: i === next }));
      }
      return state;
    },
  );

  async function handleAdd() {
    if (!name.trim() || value < 1) return;
    const tempId = `temp-${Date.now()}`;
    addOptimistic({
      type: "add",
      entry: { id: tempId, name, value, isPlayer, isActive: false, turnOrder: 0 },
    });
    setName("");
    setValue(5);
    setIsPlayer(false);
    await addInitiative(sessionId, { name, value, isPlayer });
    router.refresh();
  }

  async function handleRemove(entryId: string) {
    addOptimistic({ type: "remove", entry: { id: entryId, name: "", value: 0, isPlayer: false, isActive: false, turnOrder: 0 } });
    await removeInitiative(entryId, sessionId);
    router.refresh();
  }

  async function handleNext() {
    addOptimistic({ type: "next" });
    await nextTurn(sessionId);
    router.refresh();
  }

  const sorted = [...optimisticEntries].sort((a, b) => b.value - a.value);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Iniciativa</h3>
        {sorted.length > 0 && (
          <Button onClick={handleNext} variant="secondary" className="text-xs !px-3 !py-1">
            Próximo &rarr;
          </Button>
        )}
      </div>

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            id="init-name"
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Personagem/NPC"
          />
        </div>
        <div className="w-16">
          <Input
            id="init-value"
            label="Init"
            type="number"
            value={value.toString()}
            onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          />
        </div>
        <button
          type="button"
          onClick={() => setIsPlayer(!isPlayer)}
          className={`mb-1 rounded px-2 py-1.5 text-[10px] font-medium ${
            isPlayer
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
          }`}
        >
          {isPlayer ? "PC" : "NPC"}
        </button>
        <Button onClick={handleAdd} variant="secondary" className="!mb-0.5">
          +
        </Button>
      </div>

      <div className="space-y-0.5 max-h-64 overflow-y-auto">
        {sorted.length === 0 && (
          <p className="text-xs text-zinc-500 py-4 text-center">
            Adicione personagens e NPCs à iniciativa
          </p>
        )}
        {sorted.map((e) => (
          <div
            key={e.id}
            className={`flex items-center justify-between rounded px-2.5 py-1.5 text-sm transition-colors ${
              e.isActive
                ? "bg-yellow-100 font-medium dark:bg-yellow-900/40"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {e.isPlayer && (
                <span className="text-[10px] text-blue-500 font-semibold">PC</span>
              )}
              <span>{e.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 tabular-nums w-6 text-right">
                {e.value}
              </span>
              <button
                onClick={() => handleRemove(e.id)}
                className="text-[10px] text-zinc-300 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
