import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { CHARACTERS } from "./seed-data";

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

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const sb = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
const now = () => new Date().toISOString();

async function main() {
  console.log("Populando novos campos das fichas...\n");

  for (const c of CHARACTERS) {
    const { data: chars, error } = await sb
      .from("Character")
      .select("id, name")
      .eq("name", c.name)
      .limit(1);

    if (error) {
      console.error(`Erro buscando ${c.name}: ${error.message}`);
      continue;
    }

    if (!chars || chars.length === 0) {
      console.log(`  ⏭️  ${c.name} — não encontrado no banco`);
      continue;
    }

    const charId = chars[0].id;

    const { error: updateError } = await sb
      .from("Character")
      .update({
        sire: c.sire ?? null,
        ambition: c.ambition ?? null,
        desire: c.desire ?? null,
        predatorType: c.predatorType ?? null,
        age: c.age ?? null,
        apparentAge: c.apparentAge ?? null,
        appearance: c.appearance ?? null,
        personality: c.personality ?? null,
        history: c.history ?? null,
        goals: c.goals ?? null,
        weakness: c.weakness ?? null,
        touchstones: c.touchstones ?? null,
        convictions: c.convictions ?? null,
        alliesContacts: c.alliesContacts ?? null,
        possessions: c.possessions ?? null,
        updatedAt: now(),
      })
      .eq("id", charId);

    if (updateError) {
      console.error(`  ❌ ${c.name}: ${updateError.message}`);
    } else {
      console.log(`  ✅ ${c.name} — atualizado`);
    }
  }

  console.log("\n🎉 População completa!");
}

main().catch((err) => {
  console.error("\n❌ Erro:", err);
  process.exit(1);
});
