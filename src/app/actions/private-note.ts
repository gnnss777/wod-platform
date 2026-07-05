"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createPrivateNote(data: { playerId: string; chronicleId?: string; content: string }) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.create("PrivateNote", {
    narratorId: session.userId,
    playerId: data.playerId,
    chronicleId: data.chronicleId ?? null,
    content: data.content,
  });

  revalidatePath("/narrador/notas-privadas");
  revalidatePath(`/narrador/notas-privadas/${data.playerId}`);
}

export async function getNarratorPrivateNoteThreads() {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return [];

  const notes = await db.find("PrivateNote", { narratorId: session.userId }, "id, playerId, content, createdAt, updatedAt", { orderBy: { createdAt: "desc" } }) as any[];
  return attachPlayerNames(notes);
}

export async function getNarratorPrivateNotesWithPlayer(playerId: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return [];

  const notes = await db.find("PrivateNote", { narratorId: session.userId, playerId }, "id, content, createdAt, updatedAt", { orderBy: { createdAt: "asc" } }) as any[];
  return notes;
}

export async function getPlayerPrivateNotes() {
  const session = await verifySession();
  if (session.role !== "JOGADOR") return [];

  const notes = await db.find("PrivateNote", { playerId: session.userId }, "id, narratorId, content, createdAt", { orderBy: { createdAt: "desc" } }) as any[];
  const narratorIds = [...new Set(notes.map((n: any) => n.narratorId))];
  const map: Record<string, string> = {};
  if (narratorIds.length) {
    const rows = await db.find("User", { id_in: narratorIds }, "id,name");
    for (const u of rows as any[]) map[u.id] = u.name;
  }
  return notes.map((n: any) => ({ ...n, narrator: { name: map[n.narratorId] || "Mestre" } }));
}

async function attachPlayerNames(notes: any[]): Promise<any[]> {
  const playerIds = [...new Set(notes.map((n: any) => n.playerId))];
  const map: Record<string, string> = {};
  if (playerIds.length) {
    const rows = await db.find("User", { id_in: playerIds }, "id,name");
    for (const u of rows as any[]) map[u.id] = u.name;
  }
  const threads: Record<string, any> = {};
  for (const n of notes) {
    if (!threads[n.playerId]) {
      threads[n.playerId] = { playerId: n.playerId, playerName: map[n.playerId] || "Desconhecido", lastNote: n, count: 0 };
    }
    threads[n.playerId].count++;
  }
  return Object.values(threads);
}
