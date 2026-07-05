import { verifySession, getUser } from "@/lib/dal";
import { NavToggle } from "./nav-toggle";

export async function Header() {
  const session = await verifySession();
  const user = await getUser();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm px-4">
      <div className="flex items-center gap-3">
        <NavToggle />
        <h1 className="text-sm font-semibold text-zinc-100 hidden sm:block">
          {(user as any)?.name ? `${(user as any).name}` : "WoD Platform"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {(user as any)?.role && (
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
            {(user as any).role}
          </span>
        )}
        <form action={async () => {
          "use server";
          const { logout } = await import("@/app/actions/auth");
          await logout();
        }}>
          <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            Sair
          </button>
        </form>
      </div>
    </header>
  );
}