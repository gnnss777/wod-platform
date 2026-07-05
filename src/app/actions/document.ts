"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

export async function createDocument(data: {
  title: string; type?: string; content?: string; fileUrl?: string;
  chronicleId?: string; sceneId?: string; visibleToPlayers?: boolean;
  scheduledFor?: string;
}) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  const doc = await db.create("StoryDocument", {
    title: data.title, type: data.type ?? "TEXT", content: data.content ?? null,
    fileUrl: data.fileUrl ?? null, chronicleId: data.chronicleId ?? null,
    sceneId: data.sceneId ?? null, narratorId: session.userId,
    visibleToPlayers: data.visibleToPlayers ?? false,
    scheduledFor: data.scheduledFor || null,
  });

  revalidatePath("/narrador/documentos");
  revalidatePath(`/narrador/cronicas/${data.chronicleId}`);
  redirect(`/narrador/documentos/${(doc as any).id}`);
}

export async function updateDocument(id: string, data: {
  title?: string; type?: string; content?: string; fileUrl?: string;
  chronicleId?: string; sceneId?: string; visibleToPlayers?: boolean;
  scheduledFor?: string | null;
}) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.update("StoryDocument", { id }, data);
  revalidatePath("/narrador/documentos");
  revalidatePath(`/narrador/documentos/${id}`);
}

export async function deleteDocument(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") throw new Error("Unauthorized");

  await db.remove("StoryDocument", id);
  revalidatePath("/narrador/documentos");
  redirect("/narrador/documentos");
}

export async function getDocuments() {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return [];

  const docs = await db.find("StoryDocument", { narratorId: session.userId }, "*", { orderBy: { updatedAt: "desc" } }) as any[];
  return attachNames(docs);
}

export async function getDocument(id: string) {
  const session = await verifySession();
  if (session.role !== "MESTRE" && session.role !== "NARRADOR") return null;

  const doc = await db.get("StoryDocument", { id, narratorId: session.userId }, "*") as any;
  if (!doc) return null;
  return (await attachNames([doc]))[0];
}

export async function getPlayerDocuments() {
  const session = await verifySession();
  if (session.role !== "JOGADOR") return [];

  const docs = await db.find("StoryDocument", { visibleToPlayers: true }, "*", { orderBy: { updatedAt: "desc" } }) as any[];
  const now = new Date().toISOString();
  return attachNames(docs.filter((d: any) => !d.scheduledFor || d.scheduledFor <= now));
}

async function attachNames(items: any[]): Promise<any[]> {
  const chronicleIds = [...new Set(items.map((d: any) => d.chronicleId).filter(Boolean))];
  const sceneIds = [...new Set(items.map((d: any) => d.sceneId).filter(Boolean))];
  const chronicleMap: Record<string, string> = {};
  const sceneMap: Record<string, string> = {};
  if (chronicleIds.length) {
    const rows = await db.find("Chronicle", { id_in: chronicleIds }, "id,name");
    for (const c of rows as any[]) chronicleMap[c.id] = c.name;
  }
  if (sceneIds.length) {
    const rows = await db.find("Scene", { id_in: sceneIds }, "id,title");
    for (const s of rows as any[]) sceneMap[s.id] = s.title;
  }
  return items.map((d: any) => ({
    ...d,
    chronicle: d.chronicleId ? { name: chronicleMap[d.chronicleId] || "Desconhecida" } : null,
    scene: d.sceneId ? { title: sceneMap[d.sceneId] || "Desconhecida" } : null,
  }));
}
