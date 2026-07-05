"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createScene(data: { title: string; description?: string; narrativeText?: string; chapter?: number; chronicleId: string; order?: number }) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.create("Scene", {
    title: data.title, description: data.description ?? null, narrativeText: data.narrativeText ?? null, chapter: data.chapter ?? null,
    chronicleId: data.chronicleId, narratorId: session.userId, order: data.order ?? null,
  });

  revalidatePath(`/narrador/cronicas/${data.chronicleId}`);
  revalidatePath("/narrador/cenas");
}

export async function updateScene(id: string, data: { title?: string; description?: string; narrativeText?: string; chapter?: number; order?: number }) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Scene", { id }, data);
  revalidatePath("/narrador/cenas");
}

export async function deleteScene(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.remove("Scene", id);
  revalidatePath("/narrador/cenas");
}

export async function getScenes(chronicleId?: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return [];

  const scenes = await db.find("Scene", { narratorId: session.userId, ...(chronicleId ? { chronicleId } : {}) }, "*", { orderBy: [{ chronicleId: "asc" }, { order: "asc" }] }) as any[];

  const chronicleIds = [...new Set(scenes.map((s: any) => s.chronicleId).filter(Boolean))];
  const chronicles: Record<string, string> = {};
  if (chronicleIds.length) {
    const rows = await db.find("Chronicle", { id_in: chronicleIds }, "id,name");
    for (const c of rows as any[]) {
      chronicles[c.id] = c.name;
    }
  }

  return scenes.map((s: any) => ({
    ...s,
    chronicle: s.chronicleId ? { name: chronicles[s.chronicleId] || "Desconhecida" } : { name: "Sem crônica" },
  }));
}

export async function approveCharacter(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Character", { id }, { status: "APROVADO" });
  revalidatePath("/narrador/fichas");
  revalidatePath("/narrador/cronicas");
}

export async function rejectCharacter(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("Character", { id }, { status: "RASCUNHO" });
  revalidatePath("/narrador/fichas");
  revalidatePath("/narrador/cronicas");
}

export async function submitCharacterForApproval(id: string) {
  const session = await verifySession();
  const char = await db.get("Character", { id });
  if (!char || (char as any).playerId !== session.userId) throw new Error("Unauthorized");

  await db.update("Character", { id }, { status: "PENDENTE" });
  revalidatePath("/jogador/fichas");
}
