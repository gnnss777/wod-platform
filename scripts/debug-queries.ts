import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const content = readFileSync(resolve(".env"), "utf-8");
  for (const line of content.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (k === "SUPABASE_URL" || k === "SUPABASE_SERVICE_ROLE_KEY") process.env[k] = v;
  }
}
loadEnv();

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

async function main() {
  // Simulate what the app does
  const narratorId = "u81y0s2s96y1jys18618vrng"; // gnnss.art@gmail.com

  console.log("1. Finding chronicles where narratorId =", narratorId);
  const { data: chronicles, error: err1 } = await sb.from("Chronicle").select("*, narrator(name)").eq("narratorId", narratorId).order("updatedAt", { ascending: false });
  console.log("   Result:", chronicles?.length || 0, "chronicles");
  if (err1) console.log("   ERROR:", err1.message);
  if (chronicles) for (const c of chronicles) console.log("   -", c.id, c.name, "narrator:", c.narrator?.name);

  if (!chronicles?.length) {
    // Try all chronicles
    const { data: all } = await sb.from("Chronicle").select("id, name, narratorId");
    console.log("\n2. ALL chronicles in DB:");
    for (const c of all || []) console.log("   -", c.id, c.name, "| narratorId:", c.narratorId);
  }

  console.log("\n3. NPCs for narrator:", narratorId);
  const { data: npcs } = await sb.from("Npc").select("id, name").eq("narratorId", narratorId);
  console.log("   Found:", npcs?.length || 0);

  console.log("\n4. Characters with status PENDENTE:");
  const { count: pend } = await sb.from("Character").select("*", { count: "exact", head: true }).eq("status", "PENDENTE");
  console.log("   Count:", pend);

  console.log("\n5. Chronicle members for narrator's chronicles:");
  if (chronicles?.length) {
    const ids = chronicles.map(c => c.id);
    const { data: members } = await sb.from("ChronicleMember").select("id").in("chronicleId", ids);
    console.log("   Found:", members?.length || 0);
  }
}

main().catch(console.error);
