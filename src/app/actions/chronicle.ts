"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createChronicle(data: { name: string; description?: string; edition?: "V5" | "V20" }) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  const chronicle = await db.create("Chronicle", {
    name: data.name,
    description: data.description ?? null,
    edition: data.edition ?? null,
    narratorId: session.userId,
  });

  revalidatePath("/narrador/cronicas");
  redirect(`/narrador/cronicas/${chronicle.id}`);
}

export async function updateChronicle(id: string, data: { name?: string; description?: string; edition?: string; status?: string }) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Chronicle", { id, narratorId: session.userId }, {
    ...(data.name && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.edition && { edition: data.edition }),
    ...(data.status && { status: data.status }),
  });

  revalidatePath("/narrador/cronicas");
  revalidatePath(`/narrador/cronicas/${id}`);
}

export async function getChronicles() {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return [];

  const chronicles = await db.find("Chronicle", { narratorId: session.userId }, "*, narrator(name)", { orderBy: { updatedAt: "desc" } }) as any[];

  const ids = chronicles.map((c: any) => c.id);
  if (!ids.length) return [];
  const [charMap, npcMap, sceneMap] = await Promise.all([
    db.batchCounts("Character", "chronicleId", ids),
    db.batchCounts("Npc", "chronicleId", ids),
    db.batchCounts("Scene", "chronicleId", ids),
  ]);

  return chronicles.map((c: any) => ({ ...c, _count: { characters: charMap[c.id] || 0, npcs: npcMap[c.id] || 0, scenes: sceneMap[c.id] || 0 } }));
}

export async function getChronicle(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return null;

  const chronicle = await db.get("Chronicle", { id, narratorId: session.userId }, "*, characters(*, player(name)), npcs(*), scenes(*)");

  if (!chronicle) return null;

  const c = chronicle as any;
  const [charCount, npcCount, sceneCount] = await Promise.all([
    db.count("Character", { chronicleId: id }),
    db.count("Npc", { chronicleId: id }),
    db.count("Scene", { chronicleId: id }),
  ]);
  c._count = { characters: charCount, npcs: npcCount, scenes: sceneCount };

  return c;
}

export async function addCharacterToChronicle(characterId: string, chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Character", { id: characterId }, { chronicleId });
  revalidatePath(`/narrador/cronicas/${chronicleId}`);
}

export async function removeCharacterFromChronicle(characterId: string, chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Character", { id: characterId }, { chronicleId: null });
  revalidatePath(`/narrador/cronicas/${chronicleId}`);
}