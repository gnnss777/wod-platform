import { getUser } from "@/lib/dal";
import { logout } from "@/app/actions/auth";

export async function Header() {
  const user = await getUser();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <span className="text-sm font-semibold">WoD Platform</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {user?.name}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-zinc-500 underline hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
