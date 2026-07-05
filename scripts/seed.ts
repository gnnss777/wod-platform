import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { createId } from "@paralleldrive/cuid2";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  USERS, NARRADOR, CHRONICLE, CHARACTERS, NPCS, SCENES,
  NOTES, NARRATOR_NOTES,
} from "./seed-data";

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
    if (key === "SUPABASE_URL" || key === "SUPABASE_SERVICE_ROLE_KEY") {
      process.env[key] = value;
    }
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

function now() {
  return new Date().toISOString();
}

async function main() {
  console.log("🌱 Seeding WoD Platform...\n");

  // --- USERS ---
  console.log("👤 Criando Narrador...");
  const narId = createId();
  const narHash = await bcrypt.hash(NARRADOR.password, 10);
  const { error: narErr } = await sb.from("User").insert({
    id: narId,
    name: NARRADOR.name,
    email: NARRADOR.email,
    password: narHash,
    role: NARRADOR.role,
    createdAt: now(),
    updatedAt: now(),
  });
  if (narErr) throw new Error(`Narrador: ${narErr.message}`);
  console.log(`   ✅ ${NARRADOR.name} (${narId})`);

  console.log("\n👤 Criando Jogadores...");
  const userIds: Record<string, string> = {};
  for (const u of USERS) {
    const uid = createId();
    const hash = await bcrypt.hash(u.password, 10);
    const { error } = await sb.from("User").insert({
      id: uid, name: u.name, email: u.email,
      password: hash, role: u.role,
      createdAt: now(), updatedAt: now(),
    });
    if (error) throw new Error(`User ${u.email}: ${error.message}`);
    userIds[u.email] = uid;
    console.log(`   ✅ ${u.name}`);
  }

  // --- CHRONICLE ---
  console.log("\n📖 Criando Crônica...");
  const chrId = createId();
  const { error: chrErr } = await sb.from("Chronicle").insert({
    id: chrId, name: CHRONICLE.name, description: CHRONICLE.description,
    edition: CHRONICLE.edition, status: "ATIVA", narratorId: narId,
    createdAt: now(), updatedAt: now(),
  });
  if (chrErr) throw new Error(`Chronicle: ${chrErr.message}`);
  console.log(`   ✅ ${CHRONICLE.name} (${chrId})`);

  // --- CHRONICLE MEMBERS ---
  console.log("\n👥 Vinculando Jogadores...");
  for (const u of USERS) {
    const { error } = await sb.from("ChronicleMember").insert({
      id: createId(), chronicleId: chrId, userId: userIds[u.email], createdAt: now(),
    });
    if (error) throw new Error(`Member ${u.email}: ${error.message}`);
  }
  console.log(`   ✅ ${USERS.length} jogadores vinculados`);

  // --- CHARACTERS ---
  console.log("\n📝 Criando Fichas...");
  for (const c of CHARACTERS) {
    const uid = userIds[c.playerEmail];
    if (!uid) throw new Error(`User not found: ${c.playerEmail}`);
    const { error } = await sb.from("Character").insert({
      id: createId(), name: c.name, playerId: uid, chronicleId: chrId,
      edition: c.edition, status: "APROVADO",
      concept: c.concept ?? null, nature: c.nature ?? null,
      demeanor: c.demeanor ?? null, clan: c.clan ?? null,
      generation: c.generation ?? null, sect: c.sect ?? null,
      attributes: c.attributes, abilities: c.abilities,
      advantages: {}, powers: c.powers, backgrounds: c.backgrounds,
      meritsFlaws: {}, health: c.health, willpower: c.willpower,
      morality: c.morality, pool: c.pool, experience: c.experience,
      notes: c.notes ?? null,
      createdAt: now(), updatedAt: now(),
    });
    if (error) {
      console.error(`   ❌ ${c.name}: ${error.message}`);
      console.error(error);
    } else {
      console.log(`   ✅ ${c.name}`);
    }
  }

  // --- NPCs ---
  console.log("\n🎭 Criando NPCs...");
  for (const n of NPCS) {
    const { error } = await sb.from("Npc").insert({
      id: createId(), name: n.name, chronicleId: chrId,
      concept: n.concept ?? null, clan: n.clan ?? null,
      attributes: n.attributes, abilities: n.abilities,
      health: n.health, willpower: n.willpower,
      powers: n.powers, notes: n.notes ?? null,
      narratorId: narId,
      createdAt: now(), updatedAt: now(),
    });
    if (error) throw new Error(`NPC ${n.name}: ${error.message}`);
    console.log(`   ✅ ${n.name}`);
  }

  // --- SCENES ---
  console.log("\n🎬 Criando Cenas...");
  for (const s of SCENES) {
    const { error } = await sb.from("Scene").insert({
      id: createId(), title: s.title, description: s.description,
      chapter: s.chapter, chronicleId: chrId, narratorId: narId,
      order: s.order, createdAt: now(), updatedAt: now(),
    });
    if (error) throw new Error(`Scene ${s.title}: ${error.message}`);
    console.log(`   ✅ ${s.title}`);
  }

  // --- NOTES ---
  console.log("\n📓 Criando Notas e Diários...");
  for (const n of NOTES) {
    const uid = userIds[n.playerEmail];
    if (!uid) throw new Error(`User not found: ${n.playerEmail}`);
    const { error } = await sb.from("Note").insert({
      id: createId(), title: n.title, content: n.content,
      type: n.type, playerId: uid, characterId: null,
      createdAt: now(), updatedAt: now(),
    });
    if (error) throw new Error(`Note ${n.title}: ${error.message}`);
    console.log(`   ✅ ${n.title}`);
  }

  // --- NARRATOR NOTES ---
  console.log("\n📋 Criando Notas do Narrador...");
  for (const n of NARRATOR_NOTES) {
    const { error } = await sb.from("NarratorNote").insert({
      id: createId(), title: n.title, content: n.content,
      narratorId: narId, chronicleId: chrId,
      createdAt: now(), updatedAt: now(),
    });
    if (error) throw new Error(`NarratorNote ${n.title}: ${error.message}`);
    console.log(`   ✅ ${n.title}`);
  }

  console.log("\n🎉 Seed completo!");
  console.log(`📧 Login: qualquer email com senha: ${USERS[0].password}`);
  console.log("🔗 Narrador: alexandre.narrador@email.com");
}

main().catch((err) => {
  console.error("\n❌ Erro:", err);
  process.exit(1);
});