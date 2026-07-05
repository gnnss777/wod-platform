"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createChronicle(data: { name: string; description?: string; narrativeText?: string; edition?: "V5" | "V20" }) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  const chronicle = await db.create("Chronicle", {
    name: data.name,
    description: data.description ?? null,
    narrativeText: data.narrativeText ?? null,
    edition: data.edition ?? null,
    narratorId: session.userId,
  });

  revalidatePath("/narrador/cronicas");
  redirect(`/narrador/cronicas/${chronicle.id}`);
}

export async function updateChronicle(id: string, data: { name?: string; description?: string; narrativeText?: string; edition?: string; status?: string }) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Chronicle", { id, narratorId: session.userId }, {
    ...(data.name && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.narrativeText !== undefined && { narrativeText: data.narrativeText }),
    ...(data.edition && { edition: data.edition }),
    ...(data.status && { status: data.status }),
  });

  revalidatePath("/narrador/cronicas");
  revalidatePath(`/narrador/cronicas/${id}`);
}

export async function getChronicles() {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return [];

  const chronicles = await db.find("Chronicle", { narratorId: session.userId }, "*", { orderBy: { updatedAt: "desc" } }) as any[];

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
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return null;

  const chronicle = await db.get("Chronicle", { id, narratorId: session.userId }, "*");
  if (!chronicle) return null;

  const c = chronicle as any;

  const [characters, npcs, scenes, charCount, npcCount, sceneCount] = await Promise.all([
    db.find("Character", { chronicleId: id }, "*", { orderBy: { name: "asc" } }),
    db.find("Npc", { chronicleId: id }, "*", { orderBy: { name: "asc" } }),
    db.find("Scene", { chronicleId: id }, "*", { orderBy: { order: "asc" } }),
    db.count("Character", { chronicleId: id }),
    db.count("Npc", { chronicleId: id }),
    db.count("Scene", { chronicleId: id }),
  ]);

  const allChars = characters as any[];
  const playerIds = allChars.map((ch: any) => ch.playerId).filter(Boolean);
  const players: Record<string, string> = {};
  if (playerIds.length) {
    const users = await db.find("User", { id_in: playerIds }, "id,name");
    for (const u of users as any[]) {
      players[u.id] = u.name;
    }
  }

  c.characters = allChars.map((ch: any) => ({
    ...ch,
    player: ch.playerId ? { name: players[ch.playerId] || "Desconhecido" } : { name: "Nenhum" },
  }));
  c.npcs = npcs;
  c.scenes = scenes;
  c._count = { characters: charCount, npcs: npcCount, scenes: sceneCount };

  return c;
}

export async function addCharacterToChronicle(characterId: string, chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Character", { id: characterId }, { chronicleId });
  revalidatePath(`/narrador/cronicas/${chronicleId}`);
}

export async function removeCharacterFromChronicle(characterId: string, chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Character", { id: characterId }, { chronicleId: null });
  revalidatePath(`/narrador/cronicas/${chronicleId}`);
}
