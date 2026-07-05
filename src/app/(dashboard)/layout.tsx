import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { BottomNav } from "@/components/bottom-nav";
import { NavProvider, Overlay } from "@/lib/nav-context";
import { verifySession } from "@/lib/dal";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <NavProvider>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar role={session.role} />
        <Overlay />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        </div>
        <BottomNav role={session.role} />
      </div>
    </NavProvider>
  );
}