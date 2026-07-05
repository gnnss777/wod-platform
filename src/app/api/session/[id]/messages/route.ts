import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const messages = await db.find("SessionMessage", { sessionId: id }, "*, user(name,role)", { orderBy: { createdAt: "asc" }, take: 100 });

  return NextResponse.json(messages);
}