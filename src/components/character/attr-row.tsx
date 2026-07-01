"use client";

import { DotsInput } from "./dots-input";
import { LABELS } from "@/lib/character-utils";

type Props = {
  label: string;
  attrKey: string;
  value: number;
  abilityValue?: number;
  onChange?: (key: string, val: number) => void;
  readonly?: boolean;
  min?: number;
};

export function AttrRow({
  label,
  attrKey,
  value,
  abilityValue,
  onChange,
  readonly = false,
  min = 1,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-2 py-0.5">
      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 min-w-24">
        {label}
      </span>
      <DotsInput
        value={value}
        min={min}
        onChange={(v) => onChange?.(attrKey, v)}
        readonly={readonly}
        size="sm"
      />
      {abilityValue !== undefined && (
        <span className="text-xs text-zinc-500 tabular-nums w-6 text-right">
          {value + abilityValue}
        </span>
      )}
    </div>
  );
}

export function AttrGroup({
  title,
  keys,
  values,
  abilityValues,
  onChange,
  readonly,
  min,
}: {
  title: string;
  keys: readonly string[];
  values: Record<string, number>;
  abilityValues?: Record<string, number>;
  onChange?: (key: string, val: number) => void;
  readonly?: boolean;
  min?: number;
}) {
  return (
    <div className="space-y-0.5">
      <h4 className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        {title}
      </h4>
      {keys.map((k) => (
        <AttrRow
          key={k}
          label={LABELS[k] ?? k}
          attrKey={k}
          value={values[k] ?? 1}
          abilityValue={abilityValues?.[k]}
          onChange={onChange}
          readonly={readonly}
          min={min}
        />
      ))}
    </div>
  );
}
