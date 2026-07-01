"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function createScene(data: {
  title: string;
  description?: string;
  chapter?: number;
  chronicleId: string;
  order?: number;
}) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.scene.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      chapter: data.chapter ?? null,
      chronicleId: data.chronicleId,
      narratorId: session.userId,
      order: data.order ?? null,
    },
  });

  revalidatePath(`/narrador/cronicas/${data.chronicleId}`);
  revalidatePath("/narrador/cenas");
}

export async function updateScene(
  id: string,
  data: { title?: string; description?: string; chapter?: number; order?: number },
) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.scene.update({ where: { id }, data });
  revalidatePath("/narrador/cenas");
}

export async function deleteScene(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.scene.delete({ where: { id } });
  revalidatePath("/narrador/cenas");
}

export async function getScenes(chronicleId?: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return [];

  return prisma.scene.findMany({
    where: { narratorId: session.userId, ...(chronicleId ? { chronicleId } : {}) },
    include: { chronicle: { select: { name: true } } },
    orderBy: [{ chronicleId: "asc" }, { order: "asc" }],
  });
}

export async function approveCharacter(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.character.update({ where: { id }, data: { status: "APROVADO" } });
  revalidatePath("/narrador/fichas");
  revalidatePath(`/narrador/cronicas`);
}

export async function rejectCharacter(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.character.update({ where: { id }, data: { status: "RASCUNHO" } });
  revalidatePath("/narrador/fichas");
  revalidatePath(`/narrador/cronicas`);
}

export async function submitCharacterForApproval(id: string) {
  const session = await verifySession();
  const char = await prisma.character.findUnique({ where: { id } });
  if (!char || char.playerId !== session.userId) throw new Error("Unauthorized");

  await prisma.character.update({ where: { id }, data: { status: "PENDENTE" } });
  revalidatePath("/jogador/fichas");
}
