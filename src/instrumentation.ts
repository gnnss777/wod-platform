export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("[instrumentation] DATABASE_URL:", process.env.DATABASE_URL ? "present" : "MISSING");
    console.log("[instrumentation] SESSION_SECRET:", process.env.SESSION_SECRET ? "present" : "MISSING");
    console.log("[instrumentation] SUPABASE_URL:", process.env.SUPABASE_URL ? "present" : "MISSING");
    console.log("[instrumentation] NODE_ENV:", process.env.NODE_ENV);
  }
}

export function onRequestError(
  err: { digest: string } & Error,
  request: { path: string; method: string; headers: Record<string, string | string[]> },
  context: {
    routerKind: "Pages Router" | "App Router";
    routePath: string;
    routeType: "render" | "route" | "action" | "proxy";
    renderSource?: string;
    renderType?: string;
  },
) {
  console.error("[onRequestError]", {
    message: err.message,
    digest: err.digest,
    stack: err.stack?.split("\n").slice(0, 5).join("\n"),
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
    renderSource: context.renderSource,
  });
}