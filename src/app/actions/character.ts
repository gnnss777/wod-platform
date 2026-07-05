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
    attributes,
    abilities,
  });

  revalidatePath("/jogador/fichas");
  revalidatePath("/narrador/fichas");
  redirect(`/jogador/fichas/${character.id}`);
}

export async function updateCharacter(id: string, data: Record<string, unknown>) {
  const session = await verifySession();
  const char = await db.get("Character", { id });

  if (!char || (char as any).playerId !== session.userId) {
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
  return db.find("Character", where, "*, chronicle(name)", { orderBy: { updatedAt: "desc" } });
}

export async function getCharacter(id: string) {
  const session = await verifySession();
  const char = await db.get("Character", { id }, "*, player(name), chronicle(name)");
  if (!char) return null;

  if ((char as any).playerId !== session.userId && session.role !== "NARRADOR") return null;

  return char;
}