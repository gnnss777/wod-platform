import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, any> = {};

  const dbUrl = process.env.DATABASE_URL || "MISSING";
  results.dbUrl_mask = dbUrl.replace(/\/\/.*@/, "//***:***@");

  results.env = {
    node: process.version,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  };

  try {
    const { supabaseAdmin } = await import("@/lib/supabase-admin");
    const { data, error } = await supabaseAdmin.from("User").select("email", { count: "exact", head: true });
    results.supabase = error ? "FAIL" : "OK";
    results.userCount = data;
  } catch (e: any) {
    results.supabase = "FAIL";
    results.supabaseError = e.message?.slice(0, 300);
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const r = await prisma.$queryRaw`SELECT 1 as ok`;
    results.prisma = "OK";
  } catch (e: any) {
    results.prisma = "FAIL";
    results.prismaError = e.message?.slice(0, 200);
  }

  return NextResponse.json(results);
}