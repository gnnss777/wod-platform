"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function startSession(chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  const existing = await prisma.liveSession.findFirst({
    where: { chronicleId, status: "ACTIVE" },
  });
  if (existing) redirect(`/narrador/sessao/${existing.id}`);

  const live = await prisma.liveSession.create({
    data: { chronicleId, narratorId: session.userId },
  });

  revalidatePath("/narrador/sessao");
  redirect(`/narrador/sessao/${live.id}`);
}

export async function endSession(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.liveSession.update({
    where: { id, narratorId: session.userId },
    data: { status: "ENDED", endedAt: new Date() },
  });
  revalidatePath("/narrador/sessao");
  redirect("/narrador/sessao");
}

export async function getActiveSession(chronicleId: string) {
  return prisma.liveSession.findFirst({
    where: { chronicleId, status: "ACTIVE" },
    include: {
      chronicle: { select: { name: true } },
      initiative: { orderBy: { turnOrder: "asc" } },
      messages: {
        orderBy: { createdAt: "asc" },
        take: 50,
        include: { user: { select: { name: true } } },
      },
    },
  });
}

export async function getSession(id: string) {
  const s = await verifySession();

  const live = await prisma.liveSession.findUnique({
    where: { id },
    include: {
      chronicle: { select: { name: true, narratorId: true } },
      initiative: { orderBy: { turnOrder: "asc" } },
      messages: {
        orderBy: { createdAt: "asc" },
        take: 100,
        include: { user: { select: { name: true, role: true } } },
      },
    },
  });
  if (!live) return null;

  if (live.chronicle.narratorId !== s.userId && s.role !== "NARRADOR") {
    const isPlayer = await prisma.character.findFirst({
      where: { chronicleId: live.chronicleId, playerId: s.userId },
    });
    if (!isPlayer) return null;
  }

  return live;
}

export async function addInitiative(
  sessionId: string,
  data: { name: string; value: number; isPlayer?: boolean; actorId?: string },
) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  const count = await prisma.initiativeEntry.count({
    where: { sessionId },
  });

  await prisma.initiativeEntry.create({
    data: {
      sessionId,
      name: data.name,
      value: data.value,
      isPlayer: data.isPlayer ?? false,
      actorId: data.actorId ?? null,
      turnOrder: count,
    },
  });

  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}

export async function removeInitiative(entryId: string, sessionId: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.initiativeEntry.delete({ where: { id: entryId } });
  await reorderInitiative(sessionId);
  revalidatePath(`/narrador/sessao/${sessionId}`);
}

export async function reorderInitiative(sessionId: string) {
  const entries = await prisma.initiativeEntry.findMany({
    where: { sessionId },
    orderBy: { value: "desc" },
  });
  for (let i = 0; i < entries.length; i++) {
    await prisma.initiativeEntry.update({
      where: { id: entries[i].id },
      data: { turnOrder: i, isActive: i === 0 },
    });
  }
}

export async function nextTurn(sessionId: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  const entries = await prisma.initiativeEntry.findMany({
    where: { sessionId },
    orderBy: { turnOrder: "asc" },
  });

  const currentIdx = entries.findIndex((e) => e.isActive);
  const nextIdx = (currentIdx + 1) % entries.length;

  for (let i = 0; i < entries.length; i++) {
    if (i === nextIdx || entries.length === 1) {
      await prisma.initiativeEntry.update({
        where: { id: entries[i].id },
        data: { isActive: true },
      });
    } else {
      await prisma.initiativeEntry.update({
        where: { id: entries[i].id },
        data: { isActive: false },
      });
    }
  }

  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}

export async function sendMessage(sessionId: string, content: string) {
  const s = await verifySession();
  if (!content.trim()) return;

  await prisma.sessionMessage.create({
    data: { sessionId, userId: s.userId, content },
  });
  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}

export async function setCurrentScene(sessionId: string, sceneId: string | null) {
  const s = await verifySession();
  if (s.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.liveSession.update({
    where: { id: sessionId },
    data: { currentSceneId: sceneId },
  });
  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}
