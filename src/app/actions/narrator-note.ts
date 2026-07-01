"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function createNarratorNote(data: {
  title: string;
  content: string;
  chronicleId?: string;
}) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.narratorNote.create({
    data: {
      title: data.title,
      content: data.content,
      narratorId: session.userId,
      chronicleId: data.chronicleId ?? null,
    },
  });

  revalidatePath("/narrador/notas");
  redirect("/narrador/notas");
}

export async function getNarratorNotes(chronicleId?: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return [];

  return prisma.narratorNote.findMany({
    where: {
      narratorId: session.userId,
      ...(chronicleId ? { chronicleId } : {}),
    },
    include: { chronicle: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function deleteNarratorNote(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await prisma.narratorNote.delete({ where: { id } });
  revalidatePath("/narrador/notas");
}
