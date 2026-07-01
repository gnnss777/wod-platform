"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function createNote(data: {
  title: string;
  content: string;
  type: "PESSOAL" | "DIARIO";
  characterId?: string;
}) {
  const session = await verifySession();
  const note = await prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      type: data.type,
      playerId: session.userId,
      characterId: data.characterId ?? null,
    },
  });
  revalidatePath("/jogador/notas");
  revalidatePath("/jogador/diario");
  redirect(`/${data.type === "DIARIO" ? "diario" : "notas"}`);
}

export async function updateNote(
  id: string,
  data: { title: string; content: string; characterId?: string },
) {
  const session = await verifySession();
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note || note.playerId !== session.userId) throw new Error("Unauthorized");

  await prisma.note.update({
    where: { id },
    data: { title: data.title, content: data.content, characterId: data.characterId ?? null },
  });
  revalidatePath("/jogador/notas");
  revalidatePath("/jogador/diario");
}

export async function deleteNote(id: string) {
  const session = await verifySession();
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note || note.playerId !== session.userId) throw new Error("Unauthorized");

  await prisma.note.delete({ where: { id } });
  revalidatePath("/jogador/notas");
  revalidatePath("/jogador/diario");
}

export async function getNotes(type?: "PESSOAL" | "DIARIO") {
  const session = await verifySession();
  return prisma.note.findMany({
    where: { playerId: session.userId, ...(type ? { type } : {}) },
    include: { character: { select: { name: true, id: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getNote(id: string) {
  const session = await verifySession();
  const note = await prisma.note.findUnique({
    where: { id },
    include: { character: { select: { name: true, id: true } } },
  });
  if (!note || note.playerId !== session.userId) return null;
  return note;
}

export async function getPlayerChronicles() {
  const session = await verifySession();
  return prisma.chronicle.findMany({
    where: {
      characters: { some: { playerId: session.userId } },
      status: "ATIVA",
    },
    include: {
      narrator: { select: { name: true } },
      characters: {
        where: { playerId: session.userId },
        select: { id: true, name: true },
      },
    },
  });
}
