"use client";

import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="space-y-4">
      <Input
        id="name"
        label="Nome"
        name="name"
        placeholder="Seu nome"
        error={state?.errors?.name?.[0]}
      />
      <Input
        id="email"
        label="Email"
        name="email"
        type="email"
        placeholder="seu@email.com"
        error={state?.errors?.email?.[0]}
      />
      <Input
        id="password"
        label="Senha"
        name="password"
        type="password"
        placeholder="••••••"
        error={state?.errors?.password?.[0]}
      />

      <fieldset>
        <legend className="text-xs font-medium text-zinc-400 mb-2">Tipo de conta</legend>
        <div className="flex gap-3">
          <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900 p-3 has-[:checked]:border-red-600 has-[:checked]:bg-red-900/10 transition-colors">
            <input type="radio" name="role" value="JOGADOR" defaultChecked className="sr-only" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-sm text-zinc-400 has-[:checked]:bg-red-900 has-[:checked]:text-red-200">
              🎲
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-100">Jogador</span>
              <span className="text-[10px] text-zinc-500">Crie fichas, diário e notas</span>
            </div>
          </label>
          <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900 p-3 has-[:checked]:border-amber-600 has-[:checked]:bg-amber-900/10 transition-colors">
            <input type="radio" name="role" value="MESTRE" className="sr-only" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-sm text-zinc-400 has-[:checked]:bg-amber-900 has-[:checked]:text-amber-200">
              🎭
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-100">Mestre</span>
              <span className="text-[10px] text-zinc-500">Crie crônicas, NPCs e cenas</span>
            </div>
          </label>
        </div>
        {state?.errors?.role?.[0] && (
          <p className="mt-1 text-xs text-red-500">{state.errors.role[0]}</p>
        )}
      </fieldset>

      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}