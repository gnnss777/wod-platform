import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, any> = {};

  const dbUrl = process.env.DATABASE_URL || "MISSING";
  results.dbUrl_mask = dbUrl.replace(/\/\/.*@/, "//***:***@");

  results.env = {
    node: process.version,
    dnsSetOrder: typeof (require("node:dns") as any).setDefaultResultOrder === "function",
  };

  try {
    const dns = require("node:dns");
    const ip = await new Promise((resolve, reject) => {
      dns.lookup("db.njrhclykhwygctzmnwdd.supabase.co", { all: true }, (err: any, addresses: any) => {
        if (err) reject(err);
        else resolve(addresses.map((a: any) => `${a.address} (v${a.family})`));
      });
    });
    results.dns = ip;
  } catch (e: any) {
    results.dns = e.message;
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const r = await prisma.$queryRaw`SELECT 1 as ok`;
    results.prisma = "OK";
    results.query = r;
  } catch (e: any) {
    results.prisma = "FAIL";
    results.prismaError = e.message?.slice(0, 500);
  }

  return NextResponse.json(results);
}