"use client";

type Props = {
  value: number;
  max?: number;
  min?: number;
  onChange?: (val: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
};

export function DotsInput({
  value,
  max = 5,
  min = 0,
  onChange,
  readonly = false,
  size = "md",
}: Props) {
  const dotSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <span className="inline-flex gap-1.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => {
              if (!readonly && onChange) {
                onChange(i + 1 === value && i + 1 > min ? i : i + 1);
              }
            }}
            className={`${dotSize} rounded-full border-2 transition-colors ${
              filled
                ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100"
                : "border-zinc-300 bg-transparent dark:border-zinc-600"
            } ${readonly ? "cursor-default" : "cursor-pointer hover:opacity-70"}`}
            aria-label={`${i + 1} de ${max}`}
          />
        );
      })}
    </span>
  );
}
