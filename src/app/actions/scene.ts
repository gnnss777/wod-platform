"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createScene(data: { title: string; description?: string; chapter?: number; chronicleId: string; order?: number }) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.create("Scene", {
    title: data.title, description: data.description ?? null, chapter: data.chapter ?? null,
    chronicleId: data.chronicleId, narratorId: session.userId, order: data.order ?? null,
  });

  revalidatePath(`/narrador/cronicas/${data.chronicleId}`);
  revalidatePath("/narrador/cenas");
}

export async function updateScene(id: string, data: { title?: string; description?: string; chapter?: number; order?: number }) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Scene", { id }, data);
  revalidatePath("/narrador/cenas");
}

export async function deleteScene(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.remove("Scene", id);
  revalidatePath("/narrador/cenas");
}

export async function getScenes(chronicleId?: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return [];

  return db.find("Scene", { narratorId: session.userId, ...(chronicleId ? { chronicleId } : {}) }, "*, chronicle(name)", { orderBy: [{ chronicleId: "asc" }, { order: "asc" }] }) as Promise<any[]>;
}

export async function approveCharacter(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Character", { id }, { status: "APROVADO" });
  revalidatePath("/narrador/fichas");
  revalidatePath("/narrador/cronicas");
}

export async function rejectCharacter(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Character", { id }, { status: "RASCUNHO" });
  revalidatePath("/narrador/fichas");
  revalidatePath("/narrador/cronicas");
}

export async function submitCharacterForApproval(id: string) {
  const session = await verifySession();
  const char = await db.get("Character", { id });
  if (!char || (char as any).playerId !== session.userId) throw new Error("Unauthorized");

  await db.update("Character", { id }, { status: "PENDENTE" });
  revalidatePath("/jogador/fichas");
}