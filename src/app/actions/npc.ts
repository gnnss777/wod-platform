"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createNpc(data: {
  name: string; concept?: string; clan?: string; chronicleId?: string;
  attributes?: Record<string, number>; abilities?: Record<string, number>;
  powers?: Record<string, number>; notes?: string;
}) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  const npc = await db.create("Npc", {
    name: data.name, concept: data.concept ?? null, clan: data.clan ?? null,
    chronicleId: data.chronicleId ?? null, narratorId: session.userId,
    attributes: data.attributes ?? {}, abilities: data.abilities ?? {},
    powers: data.powers ?? {}, notes: data.notes ?? null,
  });

  revalidatePath("/narrador/npcs");
  revalidatePath(`/narrador/cronicas/${data.chronicleId}`);
  redirect(`/narrador/npcs/${npc.id}`);
}

export async function updateNpc(id: string, data: Record<string, unknown>) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  const safe: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    safe[k] = v !== undefined && typeof v === "object" ? JSON.parse(JSON.stringify(v)) : v;
  }

  await db.update("Npc", { id }, safe);
  revalidatePath("/narrador/npcs");
  revalidatePath(`/narrador/npcs/${id}`);
}

export async function deleteNpc(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.remove("Npc", id);
  revalidatePath("/narrador/npcs");
  redirect("/narrador/npcs");
}

export async function getNpcs(chronicleId?: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return [];

  const npcs = await db.find("Npc", { narratorId: session.userId, ...(chronicleId ? { chronicleId } : {}) }, "*", { orderBy: { updatedAt: "desc" } }) as any[];
  return attachChronicleNames(npcs);
}

export async function getNpc(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return null;

  const npc = await db.get("Npc", { id, narratorId: session.userId }, "*") as any;
  if (!npc) return null;
  return (await attachChronicleNames([npc]))[0];
}

async function attachChronicleNames(items: any[]): Promise<any[]> {
  const chronicleIds = [...new Set(items.map((n: any) => n.chronicleId).filter(Boolean))];
  const map: Record<string, string> = {};
  if (chronicleIds.length) {
    const rows = await db.find("Chronicle", { id_in: chronicleIds }, "id,name");
    for (const c of rows as any[]) map[c.id] = c.name;
  }
  return items.map((n: any) => ({
    ...n,
    chronicle: n.chronicleId ? { name: map[n.chronicleId] || "Desconhecida" } : null,
  }));
}

export async function getAllPlayers() {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return [];

  return db.find("User", { role: "JOGADOR" }, "id,name", { orderBy: { name: "asc" } }) as Promise<any[]>;
}
