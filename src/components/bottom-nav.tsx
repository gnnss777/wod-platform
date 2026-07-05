"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutDashboard, Users, FileText, BookOpen, Dice5, Radio, ScrollText } from "lucide-react";

type Item = { label: string; href: string; icon: typeof LayoutDashboard };

const jogadorItems: Item[] = [
  { label: "Fichas", href: "/jogador/fichas", icon: Users },
  { label: "Notas", href: "/jogador/notas", icon: FileText },
  { label: "Dashboard", href: "/jogador", icon: LayoutDashboard },
  { label: "Diário", href: "/jogador/diario", icon: BookOpen },
  { label: "Rolador", href: "/jogador/rolador", icon: Dice5 },
];

const narradorItems: Item[] = [
  { label: "Crônicas", href: "/narrador/cronicas", icon: BookOpen },
  { label: "NPCs", href: "/narrador/npcs", icon: Users },
  { label: "Dashboard", href: "/narrador", icon: LayoutDashboard },
  { label: "Sessão", href: "/narrador/sessao", icon: Radio },
  { label: "Cenas", href: "/narrador/cenas", icon: ScrollText },
];

export function BottomNav({ role }: { role: string }) {
  const pathname = usePathname();
  const items = role === "MESTRE" || role === "NARRADOR" ? narradorItems : jogadorItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-zinc-950 lg:hidden">
      <div className="flex items-center justify-around h-14">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors",
                active ? "text-red-400" : "text-zinc-500",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
