"use client";

import { Menu } from "lucide-react";
import { useNav } from "@/lib/nav-context";

export function NavToggle() {
  const { toggle } = useNav();
  return (
    <button onClick={toggle} className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
      <Menu size={20} />
    </button>
  );
}