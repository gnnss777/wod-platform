import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chronicleId = searchParams.get("chronicleId");
  if (!chronicleId) return NextResponse.json([]);

  const scenes = await db.find("Scene", { chronicleId }, "id,title", { orderBy: { order: "asc" } });
  return NextResponse.json(scenes);
}
