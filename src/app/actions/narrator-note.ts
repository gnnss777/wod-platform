"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createNarratorNote(data: { title: string; content: string; chronicleId?: string }) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

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
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return [];

  const notes = await db.find("NarratorNote", { narratorId: session.userId, ...(chronicleId ? { chronicleId } : {}) }, "*", { orderBy: { updatedAt: "desc" } }) as any[];

  const chronicleIds = [...new Set(notes.map((n: any) => n.chronicleId).filter(Boolean))];
  const map: Record<string, string> = {};
  if (chronicleIds.length) {
    const rows = await db.find("Chronicle", { id_in: chronicleIds }, "id,name");
    for (const c of rows as any[]) map[c.id] = c.name;
  }

  return notes.map((n: any) => ({
    ...n,
    chronicle: n.chronicleId ? { name: map[n.chronicleId] || "Desconhecida" } : null,
  }));
}

export async function deleteNarratorNote(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.remove("NarratorNote", id);
  revalidatePath("/narrador/notas");
}
