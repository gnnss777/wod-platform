"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";
import { buildDefaultAttributes, buildDefaultAbilities } from "@/lib/character-utils";

type CharFormData = {
  name: string;
  chronicleId?: string;
  concept?: string;
  edition: "V5" | "V20";
  clan?: string;
  generation?: number;
  nature?: string;
  demeanor?: string;
  sire?: string;
  ambition?: string;
  desire?: string;
  predatorType?: string;
  age?: number;
  apparentAge?: number;
  appearance?: string;
  personality?: string;
  history?: string;
  goals?: string;
  weakness?: string;
  touchstones?: string;
  convictions?: string;
  alliesContacts?: string;
  possessions?: string;
  notes?: string;
};

export async function createCharacter(data: CharFormData) {
  const session = await verifySession();

  const attributes = buildDefaultAttributes(data.edition);
  const abilities = buildDefaultAbilities(data.edition);

  const character = await db.create("Character", {
    name: data.name,
    playerId: session.userId,
    chronicleId: data.chronicleId ?? null,
    edition: data.edition,
    concept: data.concept ?? null,
    clan: data.clan ?? null,
    generation: data.generation ?? null,
    nature: data.nature ?? null,
    demeanor: data.demeanor ?? null,
    sire: data.sire ?? null,
    ambition: data.ambition ?? null,
    desire: data.desire ?? null,
    predatorType: data.predatorType ?? null,
    age: data.age ?? null,
    apparentAge: data.apparentAge ?? null,
    appearance: data.appearance ?? null,
    personality: data.personality ?? null,
    history: data.history ?? null,
    goals: data.goals ?? null,
    weakness: data.weakness ?? null,
    touchstones: data.touchstones ?? null,
    convictions: data.convictions ?? null,
    alliesContacts: data.alliesContacts ?? null,
    possessions: data.possessions ?? null,
    notes: data.notes ?? null,
    attributes,
    abilities,
  }) as any;

  revalidatePath("/jogador/fichas");
  revalidatePath("/narrador/fichas");
  redirect(`/jogador/fichas/${character.id}`);
}

export async function updateCharacter(id: string, data: Record<string, unknown>) {
  const session = await verifySession();
  const char = await db.get("Character", { id });

  if (!char) throw new Error("Not found");
  if ((char as any).playerId !== session.userId && session.role !== "MESTRE" && session.role !== "NARRADOR") {
    throw new Error("Unauthorized");
  }

  const safe: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    safe[k] = v !== undefined && typeof v === "object" ? JSON.parse(JSON.stringify(v)) : v;
  }

  await db.update("Character", { id }, safe);

  revalidatePath(`/jogador/fichas/${id}`);
  revalidatePath(`/narrador/fichas/${id}`);
}

export async function deleteCharacter(id: string) {
  const session = await verifySession();
  const char = await db.get("Character", { id });

  if (!char || (char as any).playerId !== session.userId) {
    throw new Error("Unauthorized");
  }

  await db.remove("Character", id);

  revalidatePath("/jogador/fichas");
  revalidatePath("/narrador/fichas");
  redirect("/jogador/fichas");
}

export async function getCharactersForUser(userId?: string) {
  const session = await verifySession();
  const where = userId ? { playerId: userId } : { playerId: session.userId };
  const chars = await db.find("Character", where, "*", { orderBy: { updatedAt: "desc" } }) as any[];
  return attachChronicleNames(chars);
}

async function attachChronicleNames(chars: any[]): Promise<any[]> {
  const chronicleIds = [...new Set(chars.map((c: any) => c.chronicleId).filter(Boolean))];
  const map: Record<string, string> = {};
  if (chronicleIds.length) {
    const rows = await db.find("Chronicle", { id_in: chronicleIds }, "id,name");
    for (const c of rows as any[]) map[c.id] = c.name;
  }
  return chars.map((c: any) => ({
    ...c,
    chronicle: c.chronicleId ? { name: map[c.chronicleId] || "Desconhecida" } : null,
  }));
}

export async function getCharacter(id: string) {
  const session = await verifySession();
  const char = await db.get("Character", { id }, "*") as any;
  if (!char) return null;

  if (char.playerId !== session.userId && session.role !== "MESTRE" && session.role !== "NARRADOR") return null;

  const [player, chronicle] = await Promise.all([
    char.playerId ? db.get("User", { id: char.playerId }, "id,name") : null,
    char.chronicleId ? db.get("Chronicle", { id: char.chronicleId }, "id,name") : null,
  ]);
  char.player = { name: (player as any)?.name || "Desconhecido" };
  char.chronicle = chronicle ? { name: (chronicle as any).name } : null;

  return char;
}
