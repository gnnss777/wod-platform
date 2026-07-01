"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function createNpc(data: {
  name: string;
  concept?: string;
  clan?: string;
  chronicleId?: string;
  attributes?: Record<string, number>;
  abilities?: Record<string, number>;
  powers?: Record<string, number>;
  notes?: string;
}) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  const npc = await prisma.npc.create({
    data: {
      name: data.name,
      concept: data.concept ?? null,
      clan: data.clan ?? null,
      chronicleId: data.chronicleId ?? null,
      narratorId: session.userId,
      attributes: data.attributes ?? {},
      abilities: data.abilities ?? {},
      powers: data.powers ?? {},
      notes: data.notes ?? null,
    },
  });

  revalidatePath("/narrador/npcs");
  revalidatePath(`/narrador/cronicas/${data.chronicleId}`);
  redirect(`/narrador/npcs/${npc.id}`);
}

export async function updateNpc(
  id: string,
  data: Record<string, unknown>,
) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  const safe: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    safe[k] = v !== undefined && typeof v === "object"
      ? JSON.parse(JSON.stringify(v))
      : v;
  }

  await prisma.npc.update({ where: { id }, data: safe as never });
  revalidatePath("/narrador/npcs");
  revalidatePath(`/narrador/npcs/${id}`);
}

export async function deleteNpc(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.npc.delete({ where: { id } });
  revalidatePath("/narrador/npcs");
  redirect("/narrador/npcs");
}

export async function getNpcs(chronicleId?: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return [];

  return prisma.npc.findMany({
    where: {
      narratorId: session.userId,
      ...(chronicleId ? { chronicleId } : {}),
    },
    include: { chronicle: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getNpc(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return null;

  return prisma.npc.findFirst({
    where: { id, narratorId: session.userId },
    include: { chronicle: { select: { name: true, id: true } } },
  });
}

export async function getAllPlayers() {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return [];

  return prisma.user.findMany({
    where: { role: "JOGADOR" },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}
