"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createNarratorNote(data: { title: string; content: string; chronicleId?: string }) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.create("NarratorNote", {
    title: data.title,
    content: data.content,
    narratorId: session.userId,
    chronicleId: data.chronicleId ?? null,
  });

  revalidatePath("/narrador/notas");
  redirect("/narrador/notas");
}

export async function getNarratorNotes(chronicleId?: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") return [];

  return db.find("NarratorNote", { narratorId: session.userId, ...(chronicleId ? { chronicleId } : {}) }, "*, chronicle(name)", { orderBy: { updatedAt: "desc" } }) as Promise<any[]>;
}

export async function deleteNarratorNote(id: string) {
  const session = await verifySession();
  if (session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.remove("NarratorNote", id);
  revalidatePath("/narrador/notas");
}