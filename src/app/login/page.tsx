import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Entrar</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Acesse sua conta na WoD Platform
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
