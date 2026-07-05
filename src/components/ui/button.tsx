import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "accent" | "danger";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
    secondary:
      "border border-zinc-300 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700",
    ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
    accent:
      "bg-crimson text-white hover:bg-crimson-light dark:bg-crimson dark:hover:bg-crimson-light",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
