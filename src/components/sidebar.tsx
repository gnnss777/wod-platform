"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard, Users, FileText, BookOpen, Globe, Dice5, Radio, ScrollText, Library, UserCheck, UserPlus, X,
} from "lucide-react";
import { useNav } from "@/lib/nav-context";

type NavItem = { label: string; href: string; icon: typeof LayoutDashboard };

const jogadorItems: NavItem[] = [
  { label: "Dashboard", href: "/jogador", icon: LayoutDashboard },
  { label: "Fichas", href: "/jogador/fichas", icon: Users },
  { label: "Notas", href: "/jogador/notas", icon: FileText },
  { label: "Diário", href: "/jogador/diario", icon: BookOpen },
  { label: "Crônica", href: "/jogador/cronica", icon: Globe },
  { label: "Rolador V20", href: "/jogador/rolador", icon: Dice5 },
  { label: "Rolador V5", href: "/jogador/rolador-v5", icon: Dice5 },
];

const narradorItems: NavItem[] = [
  { label: "Dashboard", href: "/narrador", icon: LayoutDashboard },
  { label: "Crônicas", href: "/narrador/cronicas", icon: BookOpen },
  { label: "Jogadores", href: "/narrador/jogadores", icon: UserPlus },
  { label: "NPCs", href: "/narrador/npcs", icon: Users },
  { label: "Fichas", href: "/narrador/fichas", icon: UserCheck },
  { label: "Cenas", href: "/narrador/cenas", icon: ScrollText },
  { label: "Sessão", href: "/narrador/sessao", icon: Radio },
  { label: "Rolador V20", href: "/narrador/rolador", icon: Dice5 },
  { label: "Rolador V5", href: "/narrador/rolador-v5", icon: Dice5 },
  { label: "Regras", href: "/narrador/regras", icon: Library },
  { label: "Notas", href: "/narrador/notas", icon: FileText },
];

function isActive(pathname: string, href: string) {
  if (href === "/jogador" || href === "/narrador") {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const { open, close } = useNav();
  const items = role === "NARRADOR" ? narradorItems : jogadorItems;

  return (
    <aside className={clsx(
      "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-800 bg-zinc-950 transition-transform lg:static lg:translate-x-0",
      open ? "translate-x-0" : "-translate-x-full",
    )}>
      <div className="flex h-14 items-center justify-between border-b border-zinc-800 px-4">
        <Link href={role === "NARRADOR" ? "/narrador" : "/jogador"} className="text-sm font-bold tracking-wider text-zinc-100" onClick={close}>
          WoD Platform
        </Link>
        <button onClick={close} className="text-zinc-400 hover:text-zinc-100 lg:hidden">
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-red-900/40 text-red-300"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 p-3">
        <p className="text-[10px] text-zinc-600 text-center">WoD Platform v0.1</p>
      </div>
    </aside>
  );
}