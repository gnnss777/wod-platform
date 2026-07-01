"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function createChronicle(data: {
  name: string;
  description?: string;
  edition?: "V5" | "V20";
}) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  const chronicle = await prisma.chronicle.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      edition: data.edition ?? null,
      narratorId: session.userId,
    },
  });

  revalidatePath("/narrador/cronicas");
  redirect(`/narrador/cronicas/${chronicle.id}`);
}

export async function updateChronicle(
  id: string,
  data: { name?: string; description?: string; edition?: string; status?: string },
) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.chronicle.update({
    where: { id, narratorId: session.userId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.edition && { edition: data.edition as "V5" | "V20" }),
      ...(data.status && { status: data.status as "ATIVA" | "ENCERRADA" }),
    },
  });

  revalidatePath("/narrador/cronicas");
  revalidatePath(`/narrador/cronicas/${id}`);
}

export async function getChronicles() {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return [];

  return prisma.chronicle.findMany({
    where: { narratorId: session.userId },
    include: { _count: { select: { characters: true, npcs: true, scenes: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getChronicle(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return null;

  return prisma.chronicle.findFirst({
    where: { id, narratorId: session.userId },
    include: {
      characters: {
        include: { player: { select: { name: true } } },
        orderBy: { name: "asc" },
      },
      npcs: { orderBy: { name: "asc" } },
      scenes: { orderBy: { order: "asc" } },
      _count: { select: { characters: true, npcs: true, scenes: true } },
    },
  });
}

export async function addCharacterToChronicle(characterId: string, chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.character.update({
    where: { id: characterId },
    data: { chronicleId },
  });

  revalidatePath(`/narrador/cronicas/${chronicleId}`);
}

export async function removeCharacterFromChronicle(characterId: string, chronicleId: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.character.update({
    where: { id: characterId },
    data: { chronicleId: null },
  });

  revalidatePath(`/narrador/cronicas/${chronicleId}`);
}
