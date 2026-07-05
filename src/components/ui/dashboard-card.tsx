import Link from "next/link";
import { type LucideIcon } from "lucide-react";

export function DashboardCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group relative block rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-crimson/50 hover:bg-zinc-900 hover:shadow-lg hover:shadow-crimson/5"
    >
      {Icon && (
        <div className="mb-3 inline-flex rounded-lg bg-zinc-800 p-2 text-zinc-400 transition-colors group-hover:bg-crimson/20 group-hover:text-crimson-light">
          <Icon size={18} />
        </div>
      )}
      <h2 className="font-semibold text-zinc-100">{title}</h2>
      <p className="mt-1 text-sm text-zinc-500">{description}</p>
    </Link>
  );
}

export function StatCard({
  title,
  value,
  highlight,
  icon: Icon,
}: {
  title: string;
  value: number | string;
  highlight?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        highlight
          ? "border-yellow-700 bg-yellow-900/20"
          : "border-zinc-800 bg-zinc-900/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">{title}</p>
        {Icon && <Icon size={14} className="text-zinc-600" />}
      </div>
      <p
        className={`mt-1 text-2xl font-bold tracking-tight ${
          highlight ? "text-yellow-300" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
