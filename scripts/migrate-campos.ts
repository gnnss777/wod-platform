import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const content = readFileSync(resolve(".env"), "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnv();

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

async function main() {
  const sql = `
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS sire TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS ambition TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS desire TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS "predatorType" TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS age INTEGER;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS "apparentAge" INTEGER;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS appearance TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS personality TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS history TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS goals TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS weakness TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS touchstones TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS convictions TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS "alliesContacts" TEXT;
    ALTER TABLE "Character" ADD COLUMN IF NOT EXISTS possessions TEXT;
  `;

  const { error } = await sb.rpc("exec_sql", { query: sql });
  if (error) {
    console.error("exec_sql RPC failed:", error.message);
    console.log("Trying raw query via rest/v1/sql...");
    const { error: e2 } = await sb.from("_sql").select("*").limit(0).maybeSingle();
    console.log("Fallback also failed:", e2?.message);
    console.log("\nPlease run this SQL manually in Supabase SQL Editor:\n");
    console.log(sql);
    return;
  }
  console.log("Migration complete!");
}

main().catch(console.error);
