import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const messages = await prisma.sessionMessage.findMany({
    where: { sessionId: id },
    orderBy: { createdAt: "asc" },
    take: 100,
    include: { user: { select: { name: true, role: true } } },
  });

  return NextResponse.json(messages);
}
