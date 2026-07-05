"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function getChroniclePlayers(chronicleId: string) {
  const session = await verifySession();

  const members = await db.find("ChronicleMember",
    { chronicleId },
    "*, user(id, name, email)"
  ) as any[];

  const userIds = members.map(m => m.userId);

  const chars = await db.find("Character",
    { chronicleId, playerId_in: userIds },
    "id, name, status, edition, updatedAt, playerId"
  ) as any[];

  return members.map(m => ({
    id: m.user.id,
    name: m.user.name,
    email: m.user.email,
    joinedAt: m.createdAt,
    characters: chars.filter(c => c.playerId === m.user.id),
  }));
}

export async function getChroniclePlayersSimple(chronicleId: string) {
  const session = await verifySession();

  const members = await db.find("ChronicleMember",
    { chronicleId },
    "*, user(id, name, email)"
  ) as any[];

  return members.map(m => ({
    id: m.user.id,
    name: m.user.name,
    email: m.user.email,
    joinedAt: m.createdAt,
  }));
}

export async function addPlayerToChronicle(chronicleId: string, email: string) {
  const session = await verifySession();

  const user = await db.get("User", { email }) as any;
  if (!user || user.role !== "JOGADOR") {
    return { error: "Jogador não encontrado com este email" };
  }

  const existing = await db.get("ChronicleMember", { chronicleId, userId: user.id });
  if (existing) {
    return { error: "Este jogador já está na crônica" };
  }

  await db.create("ChronicleMember", {
    chronicleId,
    userId: user.id,
  });

  revalidatePath(`/narrador/jogadores`);
  revalidatePath(`/narrador/cronicas/${chronicleId}`);
  return { error: null };
}

export async function removePlayerFromChronicle(chronicleId: string, userId: string) {
  const session = await verifySession();

  const member = await db.get("ChronicleMember", { chronicleId, userId }) as any;
  if (!member) return { error: "Jogador não encontrado na crônica" };

  await db.remove("ChronicleMember", member.id);

  revalidatePath(`/narrador/jogadores`);
  revalidatePath(`/narrador/cronicas/${chronicleId}`);
  return { error: null };
}

export async function getPlayerDetails(playerId: string, chronicleId: string) {
  const session = await verifySession();

  const player = await db.get("User", { id: playerId }) as any;
  if (!player) return null;

  const characters = await db.find("Character",
    { playerId, chronicleId },
    "id, name, edition, status, concept, clan, updatedAt"
  ) as any[];

  const notes = await db.find("Note",
    { playerId },
    "id, title, content, type, characterId, createdAt, updatedAt",
    { orderBy: { updatedAt: "desc" } }
  ) as any[];

  const chronicleNotes = notes.filter(n =>
    !n.characterId || characters.some(c => c.id === n.characterId)
  );

  return {
    id: player.id,
    name: player.name,
    email: player.email,
    characters,
    notes: chronicleNotes,
  };
}

export async function getNarratorChronicles() {
  const session = await verifySession();
  return db.find("Chronicle", { narratorId: session.userId, status: "ATIVA" },
    "id, name"
  ) as Promise<any[]>;
}

export async function submitCharacterForApproval(characterId: string) {
  const session = await verifySession();
  const char = await db.get("Character", { id: characterId }) as any;
  if (!char || char.playerId !== session.userId) throw new Error("Unauthorized");
  if (char.status !== "RASCUNHO") return { error: "Apenas fichas em rascunho podem ser enviadas" };

  await db.update("Character", { id: characterId }, { status: "PENDENTE" });
  revalidatePath(`/jogador/fichas/${characterId}`);
  revalidatePath("/narrador/fichas");
  return { error: null };
}

export async function approveCharacter(characterId: string) {
  const session = await verifySession();
  await db.update("Character", { id: characterId }, { status: "APROVADO" });
  revalidatePath(`/narrador/fichas`);
  revalidatePath("/jogador/fichas");
}

export async function rejectCharacter(characterId: string) {
  const session = await verifySession();
  await db.update("Character", { id: characterId }, { status: "RASCUNHO" });
  revalidatePath(`/narrador/fichas`);
  revalidatePath("/jogador/fichas");
}