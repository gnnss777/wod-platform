"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import clsx from "clsx";

type NavCtx = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const ctx = createContext<NavCtx>({ open: false, toggle() {}, close() {} });

export function NavProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <ctx.Provider value={{ open, toggle() { setOpen((v) => !v); }, close() { setOpen(false); } }}>{children}</ctx.Provider>;
}

export function useNav() {
  return useContext(ctx);
}

export function Overlay() {
  const { open, close } = useNav();
  return <div onClick={close} className={clsx("fixed inset-0 z-30 bg-black/50 lg:hidden", open ? "block" : "hidden")} />;
}