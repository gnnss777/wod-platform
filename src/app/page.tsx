import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          WoD Platform
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Plataforma para mestrar e jogar The World of Darkness.
          Gerencie crônicas, fichas,NPCs e muito mais.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
