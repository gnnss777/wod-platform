import Link from "next/link";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(127,29,29,0.08),transparent_60%)]" />
      <div className="w-full max-w-sm space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-crimson/30 bg-crimson/10">
            <span className="text-2xl font-bold text-crimson-light">WoD</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Criar conta</h1>
          <p className="text-sm text-zinc-500">
            Cadastre-se na WoD Platform
          </p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <RegisterForm />
        </div>
        <p className="text-center text-sm text-zinc-500">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="font-medium text-crimson-light hover:text-crimson-dark transition-colors"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
