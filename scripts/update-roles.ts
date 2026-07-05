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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
      value = value.slice(1, -1);
    if (key === "SUPABASE_URL" || key === "SUPABASE_SERVICE_ROLE_KEY")
      process.env[key] = value;
  }
}

loadEnv();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const sb = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

async function main() {
  const { data, error } = await sb.from("User").update({ role: "MESTRE" }).eq("role", "NARRADOR").select("id,name");
  if (error) throw new Error(error.message);
  console.log(`Updated ${data?.length ?? 0} users from NARRADOR to MESTRE:`);
  for (const u of data ?? []) console.log(`  ${u.name} (${u.id})`);
}

main().catch((err) => { console.error(err); process.exit(1); });
