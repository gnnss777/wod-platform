"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function startSession(chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  const existing = await db.get("LiveSession", { chronicleId, status: "ACTIVE" });
  if (existing) redirect(`/narrador/sessao/${(existing as any).id}`);

  const live = await db.create("LiveSession", { chronicleId, narratorId: session.userId });

  revalidatePath("/narrador/sessao");
  redirect(`/narrador/sessao/${live.id}`);
}

export async function endSession(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("LiveSession", { id, narratorId: session.userId }, { status: "ENDED", endedAt: new Date().toISOString() });
  revalidatePath("/narrador/sessao");
  redirect("/narrador/sessao");
}

export async function getActiveSession(chronicleId: string) {
  const data = await db.get("LiveSession", { chronicleId, status: "ACTIVE" }, "*, chronicle(name), initiative(*), messages(*, user(name))") as any;
  if (data?.messages) data.messages = data.messages.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).slice(-50);
  if (data?.initiative) data.initiative = data.initiative.sort((a: any, b: any) => a.turnOrder - b.turnOrder);
  return data;
}

export async function getSession(id: string) {
  const s = await verifySession();

  const live = await db.get("LiveSession", { id }, "*, chronicle(name, narratorId), initiative(*), messages(*, user(name,role))") as any;
  if (!live) return null;

  if (live.chronicle.narratorId !== s.userId && s.role !== "NARRADOR") {
    const isPlayer = await db.get("Character", { chronicleId: live.chronicleId, playerId: s.userId });
    if (!isPlayer) return null;
  }

  if (live?.messages) live.messages = live.messages.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).slice(-100);
  if (live?.initiative) live.initiative = live.initiative.sort((a: any, b: any) => a.turnOrder - b.turnOrder);

  return live;
}

export async function addInitiative(sessionId: string, data: { name: string; value: number; isPlayer?: boolean; actorId?: string }) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

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
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

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
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

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
  if (s.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("LiveSession", { id: sessionId }, { currentSceneId: sceneId });
  revalidatePath(`/narrador/sessao/${sessionId}`);
  revalidatePath(`/jogador/sessao/${sessionId}`);
}