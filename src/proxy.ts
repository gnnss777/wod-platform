import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/narrador", "/jogador"];
const publicRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const sessionCookie = request.cookies.get("session")?.value;
  const session = await decrypt(sessionCookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    const dashboard =
      session.role === "MESTRE" || session.role === "NARRADOR" ? "/narrador" : "/jogador";
    return NextResponse.redirect(new URL(dashboard, request.nextUrl));
  }

  if (path.startsWith("/narrador") && session?.role !== "MESTRE" && session?.role !== "NARRADOR") {
    return NextResponse.redirect(new URL("/jogador", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
