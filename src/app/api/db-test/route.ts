import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, any> = {};

  results.env = {
    node: process.version,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  };

  try {
    const { supabaseAdmin } = await import("@/lib/supabase-admin");
    const { error } = await supabaseAdmin.from("User").select("*", { count: "exact", head: true });
    results.supabase = error ? "FAIL" : "OK";
  } catch (e: any) {
    results.supabase = "FAIL";
    results.supabaseError = e.message?.slice(0, 300);
  }

  try {
    const { db } = await import("@/lib/db");
    const r = await db.get("User", { email: "test@test.com" });
    results.db_get = r ? "FOUND" : "NOT_FOUND";
  } catch (e: any) {
    results.db_get = "FAIL";
    results.dbGetError = e.message?.slice(0, 200);
  }

  return NextResponse.json(results);
}