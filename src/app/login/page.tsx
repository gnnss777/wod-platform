import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(127,29,29,0.08),transparent_60%)]" />
      <div className="w-full max-w-sm space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-crimson/30 bg-crimson/10">
            <span className="text-2xl font-bold text-crimson-light">WoD</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Bem-vindo de volta</h1>
          <p className="text-sm text-zinc-500">
            Entre na sua conta da WoD Platform
          </p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <LoginForm />
        </div>
        <p className="text-center text-sm text-zinc-500">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="font-medium text-crimson-light hover:text-crimson-dark transition-colors"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
