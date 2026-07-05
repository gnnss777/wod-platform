import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const results: Record<string, any> = {};
  const { searchParams } = new URL(request.url);
  const chronicleId = searchParams.get("chronicleId") || "d410rwp46xxqeaitf7owumhh";

  try {
    const narratorId = "u81y0s2s96y1jys18618vrng";
    const chronicles = await db.find("Chronicle", { narratorId }, "*");
    results.chronicles = {
      count: chronicles.length,
      items: chronicles,
    };

    const ids = chronicles.map((c: any) => c.id);
    const members = await db.find("ChronicleMember", { chronicleId_in: ids }, "chronicleId, userId");
    results.members = { count: members.length, items: members };

    const npcs = await db.find("Npc", { narratorId }, "id, name");
    results.npcs = { count: npcs.length, items: npcs };

    const chars = await db.find("Character", {}, "id, name, playerId, chronicleId, status");
    results.characters = { count: chars.length, items: chars };

    // Test getChronicle equivalent queries
    results.test = {};
    results.test.chronicle = await db.get("Chronicle", { id: chronicleId, narratorId }, "*");
    results.test.characterCount = await db.count("Character", { chronicleId });
    results.test.characterSample = (await db.find("Character", { chronicleId }, "id,name,playerId", { orderBy: { name: "asc" }, take: 3 }));
    results.test.npcCount = await db.count("Npc", { chronicleId });
    results.test.npcSample = (await db.find("Npc", { chronicleId }, "id,name", { orderBy: { name: "asc" }, take: 3 }));
    results.test.sceneCount = await db.count("Scene", { chronicleId });
    results.test.sceneSample = (await db.find("Scene", { chronicleId }, "id,title", { orderBy: { order: "asc" }, take: 3 }));
  } catch (e: any) {
    results.error = e.message;
  }

  return NextResponse.json(results);
}
