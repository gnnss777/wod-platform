"use client";

import { DotsInput } from "./dots-input";
import { LABELS } from "@/lib/character-utils";

type Props = {
  title: string;
  keys: readonly string[];
  values: Record<string, number>;
  onChange?: (key: string, val: number) => void;
  readonly?: boolean;
};

export function AbilityCol({
  title,
  keys,
  values,
  onChange,
  readonly,
}: Props) {
  return (
    <div className="space-y-0.5">
      <h4 className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
        {title}
      </h4>
      {keys.map((k) => (
        <div
          key={k}
          className="flex items-center gap-3 py-1"
        >
          <span className="text-xs text-zinc-700 dark:text-zinc-300 truncate min-w-0 flex-1">
            {LABELS[k] ?? k}
          </span>
          <DotsInput
            value={values[k] ?? 0}
            min={0}
            onChange={(v) => onChange?.(k, v)}
            readonly={readonly}
            size="sm"
          />
        </div>
      ))}
    </div>
  );
}
