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
      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
