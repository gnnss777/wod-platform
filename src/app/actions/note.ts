"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createNote(data: { title: string; content: string; type: "PESSOAL" | "DIARIO"; characterId?: string }) {
  const session = await verifySession();
  const note = await db.create("Note", {
    title: data.title,
    content: data.content,
    type: data.type,
    playerId: session.userId,
    characterId: data.characterId ?? null,
  });
  revalidatePath("/jogador/notas");
  revalidatePath("/jogador/diario");
  redirect(`/${data.type === "DIARIO" ? "diario" : "notas"}`);
}

export async function updateNote(id: string, data: { title: string; content: string; characterId?: string }) {
  const session = await verifySession();
  const note = await db.get("Note", { id });
  if (!note || (note as any).playerId !== session.userId) throw new Error("Unauthorized");

  await db.update("Note", { id }, { title: data.title, content: data.content, characterId: data.characterId ?? null });
  revalidatePath("/jogador/notas");
  revalidatePath("/jogador/diario");
}

export async function deleteNote(id: string) {
  const session = await verifySession();
  const note = await db.get("Note", { id });
  if (!note || (note as any).playerId !== session.userId) throw new Error("Unauthorized");

  await db.remove("Note", id);
  revalidatePath("/jogador/notas");
  revalidatePath("/jogador/diario");
}

export async function getNotes(type?: "PESSOAL" | "DIARIO") {
  const session = await verifySession();
  return db.find("Note", { playerId: session.userId, ...(type ? { type } : {}) }, "*, character(name,id)", { orderBy: { updatedAt: "desc" } }) as Promise<any[]>;
}

export async function getNote(id: string) {
  const session = await verifySession();
  const note = await db.get("Note", { id }, "*, character(name,id)") as any;
  if (!note || note.playerId !== session.userId) return null;
  return note;
}

export async function getPlayerChronicles() {
  const session = await verifySession();
  const data = await db.find("Chronicle", { status: "ATIVA" }, "*, narrator(name), characters!inner(id, name, playerId)") as any[];
  return data.filter((c: any) => c.characters?.some((ch: any) => ch.playerId === session.userId));
}