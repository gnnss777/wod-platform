import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

async function main() {
  const { data: users } = await sb.from("User").select("id, name, email, role");
  console.log(`\nUsuários (${users?.length || 0}):`);
  for (const u of users || []) console.log(`  ${u.role} | ${u.name} | ${u.email} | ${u.id}`);

  const { data: chronicles } = await sb.from("Chronicle").select("id, name, narratorId");
  console.log(`\nCrônicas (${chronicles?.length || 0}):`);
  for (const c of chronicles || []) console.log(`  ${c.name} | narrador: ${c.narratorId}`);

  const { count: members } = await sb.from("ChronicleMember").select("*", { count: "exact", head: true });
  console.log(`\nChronicleMembers: ${members}`);

  const { count: chars } = await sb.from("Character").select("*", { count: "exact", head: true });
  console.log(`Characters: ${chars}`);

  const { count: npcs } = await sb.from("Npc").select("*", { count: "exact", head: true });
  console.log(`NPCs: ${npcs}`);

  const { count: scenes } = await sb.from("Scene").select("*", { count: "exact", head: true });
  console.log(`Scenes: ${scenes}`);

  const { count: notes } = await sb.from("Note").select("*", { count: "exact", head: true });
  console.log(`Notes: ${notes}`);

  const { count: narNotes } = await sb.from("NarratorNote").select("*", { count: "exact", head: true });
  console.log(`NarratorNotes: ${narNotes}`);
}

main().catch(console.error);
