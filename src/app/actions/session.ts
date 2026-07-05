"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function startSession(chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  const existing = await db.get("LiveSession", { chronicleId, status: "ACTIVE" });
  if (existing) redirect(`/narrador/sessao/${(existing as any).id}`);

  const live = await db.create("LiveSession", { chronicleId, narratorId: session.userId });

  revalidatePath("/narrador/sessao");
  redirect(`/narrador/sessao/${live.id}`);
}

export async function endSession(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("LiveSession", { id, narratorId: session.userId }, { status: "ENDED", endedAt: new Date().toISOString() });
  revalidatePath("/narrador/sessao");
  redirect("/narrador/sessao");
}

export async function getActiveSession(chronicleId: string) {
  const data = await db.get("LiveSession", { chronicleId, status: "ACTIVE" }) as any;
  if (!data) return null;
  const { data: initiative } = await db.find("InitiativeEntry", { sessionId: data.id }, "*", { orderBy: { turnOrder: "asc" } }) as any;
  data.initiative = initiative || [];
  data.messages = [];
  return data;
}

export async function getSession(id: string) {
  const s = await verifySession();

  const live = await db.get("LiveSession", { id }, "*") as any;
  if (!live) return null;

  const [chronicle, initiative, messages] = await Promise.all([
    db.get("Chronicle", { id: live.chronicleId }, "id,name,narratorId"),
    db.find("InitiativeEntry", { sessionId: live.id }, "*", { orderBy: { turnOrder: "asc" } }),
    db.find("SessionMessage", { sessionId: live.id }, "*", { orderBy: { createdAt: "asc" } }),
  ]);

  if ((chronicle as any)?.narratorId !== s.userId && s.role !== "MESTRE" && s.role !== "NARRADOR") {
    const isPlayer = await db.get("Character", { chronicleId: live.chronicleId, playerId: s.userId });
    if (!isPlayer) return null;
  }

  const userIds = [...new Set((messages as any[]).map((m: any) => m.userId).filter(Boolean))];
  const userMap: Record<string, { name: string; role: string }> = {};
  if (userIds.length) {
    const users = await db.find("User", { id_in: userIds }, "id,name,role");
    for (const u of users as any[]) userMap[u.id] = { name: u.name, role: u.role };
  }

  live.chronicle = chronicle || null;
  live.initiative = (initiative as any[]).sort((a: any, b: any) => a.turnOrder - b.turnOrder);
  live.messages = (messages as any[])
    .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-100)
    .map((m: any) => ({
      ...m,
      user: userMap[m.userId] || { name: "Desconhecido", role: "JOGADOR" },
    }));

  return live;
}

export async function addInitiative(sessionId: string, data: { name: string; value: number; isPlayer?: boolean; actorId?: string }) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  const count = await db.count("InitiativeEntry", { sessionId });

  await db.create("InitiativeEntry", {
    sessionId, name: data.name, value: data.value,
    isPlayer: data.isPlayer ?? false, actorId: data.actorId ?? null, turnOrder: count,
  });

  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}

export async function removeInitiative(entryId: string, sessionId: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.remove("InitiativeEntry", entryId);
  await reorderInitiative(sessionId);
  revalidatePath(`/narrador/sessao/${sessionId}`);
}

async function reorderInitiative(sessionId: string) {
  const entries = await db.find("InitiativeEntry", { sessionId }, "id,value", { orderBy: { value: "desc" } }) as any[];
  for (let i = 0; i < entries.length; i++) {
    await db.update("InitiativeEntry", { id: entries[i].id }, { turnOrder: i, isActive: i === 0 });
  }
}

export async function nextTurn(sessionId: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  const entries = await db.find("InitiativeEntry", { sessionId }, "id,isActive", { orderBy: { turnOrder: "asc" } }) as any[];

  const currentIdx = entries.findIndex((e: any) => e.isActive);
  const nextIdx = (currentIdx + 1) % entries.length;

  for (let i = 0; i < entries.length; i++) {
    await db.update("InitiativeEntry", { id: entries[i].id }, { isActive: i === nextIdx || entries.length === 1 });
  }

  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}

export async function sendMessage(sessionId: string, content: string) {
  const s = await verifySession();
  if (!content.trim()) return;

  await db.create("SessionMessage", { sessionId, userId: s.userId, content });
  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}

export async function setCurrentScene(sessionId: string, sceneId: string | null) {
  const s = await verifySession();
  if (s.role !== "MESTRE" && s.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("LiveSession", { id: sessionId }, { currentSceneId: sceneId });
  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}
