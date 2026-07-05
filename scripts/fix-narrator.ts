import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { createId } from "@paralleldrive/cuid2";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const NARRATOR_EMAIL = "gnnss.art@gmail.com";

function loadEnv() {
  const content = readFileSync(resolve(".env"), "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (key === "SUPABASE_URL" || key === "SUPABASE_SERVICE_ROLE_KEY") process.env[key] = value;
  }
}
loadEnv();

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

function now() { return new Date().toISOString(); }

async function main() {
  // 1. Find existing narrator
  const { data: narrator } = await sb.from("User").select("id, name, email").eq("email", NARRATOR_EMAIL).single();
  if (!narrator) {
    console.error(`Usuário ${NARRATOR_EMAIL} não encontrado.`);
    console.error("Primeiro crie uma conta como Narrador no /register.");
    process.exit(1);
  }
  const narId = narrator.id;
  console.log(`✅ Narrador encontrado: ${narrator.name} (${narId})`);

  // 2. Delete seed chronicle (Alexandre's) if exists
  const { data: oldChronicles } = await sb.from("Chronicle").select("id").eq("narratorId", narId);
  for (const oc of oldChronicles || []) {
    await sb.from("NarratorNote").delete().eq("chronicleId", oc.id);
    await sb.from("Note").delete().eq("chronicleId", oc.id);
    await sb.from("Scene").delete().eq("chronicleId", oc.id);
    await sb.from("Npc").delete().eq("chronicleId", oc.id);
    const { data: chars } = await sb.from("Character").select("id").eq("chronicleId", oc.id);
    for (const c of chars || []) { await sb.from("Character").delete().eq("id", c.id); }
    await sb.from("ChronicleMember").delete().eq("chronicleId", oc.id);
    await sb.from("Chronicle").delete().eq("id", oc.id);
    console.log(`🗑️  Crônica antiga removida: ${oc.id}`);
  }

  // 3. Delete old seed users (jogadores) if they exist - only the ones created by seed
  const seedEmails = [
    "julia.mackenzie@email.com", "otavio.meireles@email.com", "rodolfo.klauswitz@email.com",
    "willian.miller@email.com", "silvana.parks@email.com", "juliana.marrua@email.com",
    "abelardo.nogueira@email.com", "silas.zanthier@email.com", "adam.clair@email.com",
    "patrick.brennand@email.com", "samir.saade@email.com", "roman.costello@email.com",
    "mahara.pereira@email.com", "normando.almeida@email.com",
  ];
  for (const email of seedEmails) {
    const { data: u } = await sb.from("User").select("id").eq("email", email).single();
    if (u) {
      await sb.from("ChronicleMember").delete().eq("userId", u.id);
      await sb.from("Note").delete().eq("playerId", u.id);
      const { data: chars } = await sb.from("Character").select("id").eq("playerId", u.id);
      for (const c of chars || []) { await sb.from("Character").delete().eq("id", c.id); }
      await sb.from("User").delete().eq("id", u.id);
      console.log(`🗑️  Jogador removido: ${email}`);
    }
  }

  // 4. Delete the seed narrator "Alexandre" too
  const { data: alex } = await sb.from("User").select("id").eq("email", "alexandre.narrador@email.com").single();
  if (alex) {
    await sb.from("User").delete().eq("id", alex.id);
    console.log("🗑️  Narrador seed removido: alexandre.narrador@email.com");
  }

  // Now re-create all data linked to gnnss.art@gmail.com
  console.log("\n📖 Criando Crônica...");
  const chrId = createId();
  const { error: chrErr } = await sb.from("Chronicle").insert({
    id: chrId, name: "Noites Sombrias em Curitiba",
    description: "Curitiba tornou-se um ponto focal de atividade sobrenatural. Assassinatos misteriosos estão ocorrendo — vítimas humanas e sobrenaturais. Algo está desestabilizando o véu entre os mundos, e as facções precisam cooperar para sobreviver.",
    edition: "V20", status: "ATIVA", narratorId: narId,
    createdAt: now(), updatedAt: now(),
  });
  if (chrErr) throw new Error(`Chronicle: ${chrErr.message}`);
  console.log(`   ✅ Crônica criada (${chrId})`);

  // Re-create jogadores
  console.log("\n👤 Recriando Jogadores...");
  const userIds: Record<string, string> = {};
  const jogadores = [
    { name: "Julia Mackenzie", email: "julia.mackenzie@email.com" },
    { name: "Otávio Meireles", email: "otavio.meireles@email.com" },
    { name: "Rodolfo Klauswitz", email: "rodolfo.klauswitz@email.com" },
    { name: "Willian Miller", email: "willian.miller@email.com" },
    { name: "Silvana Parks", email: "silvana.parks@email.com" },
    { name: "Juliana Marruá", email: "juliana.marrua@email.com" },
    { name: "Abelardo Nogueira", email: "abelardo.nogueira@email.com" },
    { name: "Silas von Zanthier", email: "silas.zanthier@email.com" },
    { name: "Adam Clair", email: "adam.clair@email.com" },
    { name: "Patrick Brennand", email: "patrick.brennand@email.com" },
    { name: "Samir Saade", email: "samir.saade@email.com" },
    { name: "Roman Costello", email: "roman.costello@email.com" },
    { name: "Mahara Pereira", email: "mahara.pereira@email.com" },
    { name: "Normando Almeida", email: "normando.almeida@email.com" },
  ];
  for (const j of jogadores) {
    const uid = createId(); const hash = await bcrypt.hash("senha123", 10);
    await sb.from("User").insert({ id: uid, name: j.name, email: j.email, password: hash, role: "JOGADOR", createdAt: now(), updatedAt: now() });
    userIds[j.email] = uid;
    console.log(`   ✅ ${j.name}`);
  }

  // ChronicleMember links
  console.log("\n👥 Vinculando...");
  for (const j of jogadores) {
    await sb.from("ChronicleMember").insert({ id: createId(), chronicleId: chrId, userId: userIds[j.email], createdAt: now() });
  }
  console.log(`   ✅ ${jogadores.length} jogadores vinculados`);

  // Characters
  console.log("\n📝 Criando Fichas...");
  const characterData = [
    { name: "Julia Mackenzie", email: "julia.mackenzie@email.com", concept: "Assassina e perita financeira", clan: "Ventrue", generation: 11, sect: "Camarilla", attributes: { forca: 2, destreza: 4, vigor: 3, carisma: 4, manipulacao: 3, aparencia: 3, percepcao: 4, inteligencia: 3, astucia: 4 }, abilities: { prontidao: 3, atletismo: 2, briga: 2, esquiva: 3, empatia: 1, expressao: 2, intimidacao: 3, lideranca: 3, manha: 4, subterfugio: 4, empinar: 1, direcao: 2, etiqueta: 4, armas_fogo: 4, armas_brancas: 3, seguranca: 2, furtividade: 4, academicos: 1, computador: 2, financas: 5, investigacao: 4, direito: 1, ocultismo: 2, politica: 3 }, powers: { "auspicios": 3, "fortitude": 2, "presenca": 4 }, backgrounds: { "recursos": 5, "aliados": 3, "influencia": 3, "contatos": 4 }, notes: "Ventrue meticulosa nos bastidores do mercado financeiro de Curitiba." },
    { name: "Otávio Meireles", email: "otavio.meireles@email.com", concept: "Doutor em sociologia e política", clan: "Brujah", generation: 12, sect: "Anarch", attributes: { forca: 3, destreza: 2, vigor: 3, carisma: 3, manipulacao: 3, aparencia: 2, percepcao: 3, inteligencia: 5, astucia: 4 }, abilities: { prontidao: 3, atletismo: 1, briga: 2, esquiva: 2, empatia: 3, expressao: 4, intimidacao: 2, lideranca: 3, manha: 3, subterfugio: 3, empinar: 1, direcao: 1, etiqueta: 2, armas_fogo: 1, armas_brancas: 2, performance: 2, furtividade: 2, academicos: 5, computador: 2, investigacao: 4, direito: 2, linguistica: 3, ocultismo: 3, politica: 5, ciencia: 1 }, powers: { "potencia": 3, "celeridade": 2, "presenca": 2 }, backgrounds: { "contatos": 4, "aliados": 2, "influencia": 2 }, notes: "Professor universitário Brujah. Reservado, intelectual, desconfia da Camarilla." },
    { name: "Rodolfo Klauswitz", email: "rodolfo.klauswitz@email.com", concept: "Ex Forças Especiais, Philodox Shadow Lord", clan: "Shadow Lord", attributes: { forca: 5, destreza: 4, vigor: 5, carisma: 2, manipulacao: 2, aparencia: 3, percepcao: 4, inteligencia: 3, astucia: 4 }, abilities: { prontidao: 5, atletismo: 4, briga: 5, esquiva: 4, empatia: 1, expressao: 1, intimidacao: 5, lideranca: 4, manha: 2, subterfugio: 2, empinar: 3, direcao: 3, etiqueta: 1, armas_fogo: 5, armas_brancas: 4, seguranca: 4, furtividade: 4, sobrevivencia: 4, academicos: 1, computador: 1, investigacao: 3, ocultismo: 2, politica: 2, medicina: 2 }, powers: { "forca_do_lobo": 4, "sentidos_aguacados": 3, "velocidade_do_lobo": 3, "garras_da_besta": 3, "chamado_selvagem": 2 }, backgrounds: { "recursos": 2, "aliados": 3, "contatos": 2, "territorio": 3, "mentor": 2 }, notes: "Ex Forças Especiais do EB. Philodox Shadow Lord. Estrategista nato." },
    { name: "Willian Miller", email: "willian.miller@email.com", concept: "Bartender, dono do Foggy Dew", clan: "Fianna", attributes: { forca: 3, destreza: 3, vigor: 3, carisma: 4, manipulacao: 3, aparencia: 4, percepcao: 3, inteligencia: 2, astucia: 3 }, abilities: { prontidao: 2, atletismo: 2, briga: 2, esquiva: 2, empatia: 4, expressao: 4, intimidacao: 1, lideranca: 2, manha: 3, subterfugio: 3, empinar: 1, direcao: 2, etiqueta: 3, armas_fogo: 1, armas_brancas: 1, performance: 5, seguranca: 1, furtividade: 2, academicos: 1, computador: 1, financas: 2, investigacao: 2, ocultismo: 3, politica: 1, linguistica: 2 }, powers: { "charme_fae": 3, "sentidos_aguacados": 2, "garras_da_besta": 2, "forca_do_lobo": 2, "chamado_da_lua": 2 }, backgrounds: { "recursos": 3, "aliados": 4, "contatos": 3, "fama": 2 }, notes: "Ragabash Fianna. Dono do Foggy Dew, pub irlandês neutro em Curitiba." },
    { name: "Silvana Parks", email: "silvana.parks@email.com", concept: "DJ e especialista em TI", clan: "Glass Walker", attributes: { forca: 2, destreza: 3, vigor: 2, carisma: 4, manipulacao: 3, aparencia: 3, percepcao: 4, inteligencia: 4, astucia: 3 }, abilities: { prontidao: 3, atletismo: 1, briga: 1, esquiva: 2, empatia: 2, expressao: 4, intimidacao: 1, lideranca: 2, manha: 3, subterfugio: 3, empinar: 2, direcao: 1, etiqueta: 2, armas_fogo: 1, performance: 5, seguranca: 3, furtividade: 2, academicos: 2, computador: 5, investigacao: 3, ocultismo: 2, ciencia: 2, tecnologia: 5 }, powers: { "conexao_tecnologica": 4, "sentidos_aguacados": 2, "chamado_selvagem": 2, "visao_da_teia": 3 }, backgrounds: { "recursos": 2, "aliados": 2, "contatos": 4, "territorio": 2 }, notes: "Glass Walker, DJ e hacker. Monitora a deep web por atividade sobrenatural." },
    { name: "Juliana Marruá", email: "juliana.marrua@email.com", concept: "Advogada ambientalista", clan: "Balam", attributes: { forca: 3, destreza: 3, vigor: 3, carisma: 3, manipulacao: 4, aparencia: 3, percepcao: 3, inteligencia: 4, astucia: 3 }, abilities: { prontidao: 2, atletismo: 2, briga: 2, esquiva: 2, empatia: 3, expressao: 3, intimidacao: 2, lideranca: 2, manha: 3, subterfugio: 3, empinar: 1, direcao: 2, etiqueta: 3, armas_fogo: 1, armas_brancas: 1, seguranca: 1, furtividade: 2, sobrevivencia: 2, academicos: 4, computador: 2, direito: 5, investigacao: 3, ocultismo: 2, politica: 4, ciencia: 2 }, powers: { "metamorfose": 3, "sentidos_felinos": 3, "garras_do_jaguar": 2, "furtividade_da_selva": 2 }, backgrounds: { "recursos": 3, "aliados": 3, "contatos": 4, "influencia": 2 }, notes: "Balam Baset (jaguar). Advogada ambientalista, defende áreas verdes de Curitiba." },
    { name: "Abelardo Nogueira", email: "abelardo.nogueira@email.com", concept: "Mokolé centenário", clan: "Mokolé", attributes: { forca: 4, destreza: 3, vigor: 5, carisma: 3, manipulacao: 3, aparencia: 2, percepcao: 5, inteligencia: 4, astucia: 5 }, abilities: { prontidao: 5, atletismo: 3, briga: 4, esquiva: 3, empatia: 3, expressao: 2, intimidacao: 3, lideranca: 3, manha: 4, subterfugio: 3, empinar: 4, direcao: 2, etiqueta: 1, armas_fogo: 3, armas_brancas: 5, seguranca: 2, furtividade: 3, sobrevivencia: 5, academicos: 2, computador: 1, investigacao: 3, ocultismo: 4, medicina: 2, linguistica: 2, ciencia: 1 }, powers: { "memoria_ancestral": 5, "sentidos_do_reptil": 4, "camuflagem": 3, "forca_do_jacare": 4, "visao_dos_sonhos": 3 }, backgrounds: { "recursos": 2, "aliados": 3, "contatos": 3 }, notes: "Mokolé centenário. Tropeiro, jagunço. Memória ancestral viva da região." },
    { name: "Silas von Zanthier", email: "silas.zanthier@email.com", concept: "Biólogo vegetal", clan: "Promethean", attributes: { forca: 3, destreza: 2, vigor: 4, carisma: 2, manipulacao: 2, aparencia: 1, percepcao: 4, inteligencia: 5, astucia: 3 }, abilities: { prontidao: 3, atletismo: 1, briga: 2, esquiva: 2, empatia: 3, expressao: 2, intimidacao: 1, lideranca: 1, manha: 2, subterfugio: 2, empinar: 1, direcao: 1, etiqueta: 2, armas_fogo: 1, armas_brancas: 1, furtividade: 2, sobrevivencia: 3, academicos: 5, computador: 2, investigacao: 3, medicina: 4, ocultismo: 2, ciencia: 5 }, powers: { "vitalidade_vegetal": 4, "controle_da_flora": 3, "metamorfose": 2, "sentidos_naturais": 3 }, backgrounds: { "recursos": 1, "aliados": 1, "contatos": 1 }, notes: "Promethean. Biólogo da UFPR transformado em criatura vegetal após experimento." },
    { name: "Adam Clair", email: "adam.clair@email.com", concept: "Criatura Frankenstein", clan: "Promethean", attributes: { forca: 5, destreza: 2, vigor: 5, carisma: 1, manipulacao: 1, aparencia: 0, percepcao: 3, inteligencia: 2, astucia: 2 }, abilities: { prontidao: 2, atletismo: 3, briga: 4, esquiva: 2, empatia: 2, expressao: 1, intimidacao: 3, lideranca: 1, manha: 1, subterfugio: 1, empinar: 1, direcao: 1, etiqueta: 1, armas_fogo: 2, armas_brancas: 3, seguranca: 1, furtividade: 1, academicos: 1, computador: 1, investigacao: 1, ocultismo: 1, medicina: 1 }, powers: { "forca_titanica": 5, "resistencia_sobre_humana": 4, "cura_acelerada": 3, "resistencia_a_fogo": 2 }, backgrounds: { "recursos": 1, "aliados": 1 }, notes: "Promethean. Criado em laboratório de partes humanas. Gentil apesar da aparência." },
    { name: "Patrick Brennand", email: "patrick.brennand@email.com", concept: "Clurichaun dono de loja de discos", clan: "Changeling", attributes: { forca: 2, destreza: 4, vigor: 2, carisma: 4, manipulacao: 4, aparencia: 3, percepcao: 3, inteligencia: 3, astucia: 4 }, abilities: { prontidao: 2, atletismo: 1, briga: 1, esquiva: 3, empatia: 3, expressao: 4, intimidacao: 1, lideranca: 1, manha: 4, subterfugio: 4, empinar: 2, direcao: 1, etiqueta: 2, armas_fogo: 1, performance: 4, seguranca: 2, furtividade: 3, academicos: 2, computador: 1, financas: 3, investigacao: 3, ocultismo: 3, linguistica: 2 }, powers: { "sortudo": 4, "esconderijo_fae": 3, "encanto": 3, "ilusao": 2 }, backgrounds: { "recursos": 3, "aliados": 3, "contatos": 4, "fama": 2, "tesouro": 3 }, notes: "Clurichaun. Colecionador de vinil. Sua loja no Centro é ponto de encontro boêmio." },
    { name: "Samir Saade", email: "samir.saade@email.com", concept: "Ifreet comerciante de tecidos", clan: "Changeling", attributes: { forca: 2, destreza: 3, vigor: 3, carisma: 3, manipulacao: 5, aparencia: 2, percepcao: 4, inteligencia: 4, astucia: 4 }, abilities: { prontidao: 3, atletismo: 1, briga: 1, esquiva: 2, empatia: 3, expressao: 2, intimidacao: 2, lideranca: 2, manha: 5, subterfugio: 5, empinar: 2, direcao: 1, etiqueta: 4, armas_fogo: 1, performance: 2, seguranca: 1, furtividade: 2, academicos: 3, computador: 1, financas: 4, investigacao: 3, ocultismo: 4, linguistica: 4, politica: 2 }, powers: { "negociacao_sobrenatural": 4, "visao_do_destino": 3, "tecido_da_realidade": 3, "camaleao": 2 }, backgrounds: { "recursos": 5, "aliados": 4, "contatos": 5, "influencia": 3 }, notes: "Ifreet de fogo. Loja de tecidos orientais no Centro. Sabe de tudo antes de todos." },
    { name: "Roman Costello", email: "roman.costello@email.com", concept: "Médico, exorcista e detetive", clan: "Sorcerer", attributes: { forca: 2, destreza: 3, vigor: 3, carisma: 3, manipulacao: 3, aparencia: 3, percepcao: 5, inteligencia: 5, astucia: 4 }, abilities: { prontidao: 4, atletismo: 1, briga: 1, esquiva: 2, empatia: 4, expressao: 3, intimidacao: 2, lideranca: 2, manha: 3, subterfugio: 3, empinar: 1, direcao: 2, etiqueta: 3, armas_fogo: 2, armas_brancas: 1, seguranca: 1, investigacao: 5, furtividade: 2, academicos: 4, computador: 2, direito: 2, linguistica: 3, medicina: 5, ocultismo: 5, politica: 2, ciencia: 3 }, powers: { "exorcismo": 4, "visao_espiritual": 3, "cura_magica": 3, "protecao_ritual": 4, "detectar_magia": 3 }, backgrounds: { "recursos": 2, "aliados": 3, "contatos": 4, "arsenal_oculto": 3 }, notes: "Sorcerer. Médico sem licença, exorcista e detetive particular. Biblioteca de grimórios." },
    { name: "Mahara Pereira", email: "mahara.pereira@email.com", concept: "Avatar de Shiva, garçonete", clan: "Avatar", attributes: { forca: 2, destreza: 3, vigor: 3, carisma: 5, manipulacao: 3, aparencia: 4, percepcao: 5, inteligencia: 3, astucia: 4 }, abilities: { prontidao: 4, atletismo: 2, briga: 1, esquiva: 3, empatia: 5, expressao: 4, intimidacao: 1, lideranca: 3, manha: 2, subterfugio: 2, empinar: 1, direcao: 1, etiqueta: 2, performance: 3, furtividade: 2, academicos: 2, computador: 1, investigacao: 2, ocultismo: 5, medicina: 2, linguistica: 3, politica: 1, ciencia: 1 }, powers: { "visao_do_tempo": 4, "conexao_divina": 5, "cura_espiritual": 3, "protecao_astral": 3, "sabedoria_ancestral": 3 }, backgrounds: { "recursos": 1, "aliados": 2, "contatos": 2, "mentor_espiritual": 4 }, notes: "Avatar de Shiva. Garçonete. Visões do futuro, toque de paz profunda." },
    { name: "Normando Almeida", email: "normando.almeida@email.com", concept: "Metalúrgico, Reconciler Malefactor", clan: "Demon", attributes: { forca: 4, destreza: 2, vigor: 5, carisma: 2, manipulacao: 3, aparencia: 2, percepcao: 3, inteligencia: 3, astucia: 3 }, abilities: { prontidao: 3, atletismo: 2, briga: 3, esquiva: 2, empatia: 3, expressao: 2, intimidacao: 3, lideranca: 2, manha: 3, subterfugio: 2, empinar: 2, direcao: 1, etiqueta: 1, armas_fogo: 1, armas_brancas: 3, oficios: 5, seguranca: 2, furtividade: 1, academicos: 1, computador: 1, financas: 2, investigacao: 2, ocultismo: 3, politica: 2 }, powers: { "forca_infernal": 4, "resistencia_da_forja": 3, "visao_das_almas": 3, "persuasao_das_trevas": 2, "telepatia_limitada": 2 }, backgrounds: { "recursos": 2, "aliados": 2, "contatos": 3, "arsenal": 2 }, notes: "Malefactor Reconciler. Demônio em busca de redenção. Metalúrgico. Pele fria como metal." },
  ];

  for (const c of characterData) {
    const uid = userIds[c.email];
    if (!uid) throw new Error(`User not found: ${c.email}`);
    const charId = createId();
    const { error } = await sb.from("Character").insert({
      id: charId, name: c.name, playerId: uid, chronicleId: chrId,
      edition: "V20", status: "APROVADO",
      concept: c.concept, clan: c.clan, generation: c.generation ?? null, sect: c.sect ?? null,
      attributes: c.attributes, abilities: c.abilities,
      advantages: {}, powers: c.powers, backgrounds: c.backgrounds,
      meritsFlaws: {}, health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
      willpower: { rating: 7, current: 7 }, morality: { type: "humanity", rating: 7 },
      pool: { type: "blood", rating: 10, current: 10 },
      experience: { total: 0, spent: 0 }, notes: c.notes,
      createdAt: now(), updatedAt: now(),
    });
    if (error) throw new Error(`Character ${c.name}: ${error.message}`);
    console.log(`   ✅ ${c.name}`);
  }

  // NPCs
  console.log("\n🎭 Criando NPCs...");
  const npcs = [
    { name: "Xerife Moreira", concept: "Xerife da Camarilla de Curitiba, Brujah ancião", clan: "Brujah", powers: { "potencia": 4, "celeridade": 3, "fortitude": 3 }, notes: "Braço armado da Princesa da Camarilla. Monitora todos os recém-chegados." },
    { name: "Mãe Benedita", concept: "Mãe-de-santo candomblecista, aliada dos Mokolé", powers: { "visao_espiritual": 5, "cura_espiritual": 4, "comunhao_com_orixas": 5, "protecao_ritual": 4 }, notes: "Mãe-de-santo poderosa. Ponte entre o mundo espiritual e o material." },
    { name: "Doutor Arcanjo", concept: "Médico legista aposentado, conhecedor do oculto", powers: { "conhecimento_ancestral": 4, "analise_forense_oculta": 4 }, notes: "40 anos no IML de Curitiba. Arquivo particular de casos sobrenaturais." },
    { name: "Espírito da Tormenta", concept: "Entidade Wyrm-corrompida nos esgotos", powers: { "toque_corruptor": 5, "dominio_das_sombras": 4, "invocar_espectros": 3, "residencia_espiritual": 4 }, notes: "Entidade corrompida pelo Wyrm. Alimenta-se de desespero. Antagonista principal." },
    { name: "Zé do Charuto", concept: "Dono do bar Caveira, informante", powers: {}, notes: "Humano que conhece todo mundo. Bar na Rodoferroviária. Só lealdade ao dinheiro." },
    { name: "Capitã Gabriela Luz", concept: "Delegada da Polícia Civil, contato de Roman", powers: {}, notes: "Acesso aos laudos dos assassinatos. Suspeita de atividade sobrenatural." },
  ];
  for (const n of npcs) {
    await sb.from("Npc").insert({
      id: createId(), name: n.name, chronicleId: chrId, concept: n.concept ?? null, clan: n.clan ?? null,
      attributes: { forca: 3, destreza: 3, vigor: 3, carisma: 3, manipulacao: 3, aparencia: 3, percepcao: 3, inteligencia: 3, astucia: 3 },
      abilities: {}, health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
      willpower: { rating: 7, current: 7 }, powers: n.powers, notes: n.notes, narratorId: narId,
      createdAt: now(), updatedAt: now(),
    });
    console.log(`   ✅ ${n.name}`);
  }

  // Scenes
  console.log("\n🎬 Criando Cenas...");
  const scenes = [
    { title: "O Chamado", description: "Reunião no Foggy Dew. Julia Mackenzie convoca as facções. Um ataque do lado de fora revela a ameaça.", chapter: 1, order: 1 },
    { title: "Rastros de Sangue", description: "Investigação dos assassinatos. Pistas convergem para um antigo edifício no centro selado há décadas.", chapter: 1, order: 2 },
    { title: "Confronto no Subsolo", description: "Batalha nos túneis dos esgotos contra o Espírito da Tormenta. Destruição do artefato corruptor.", chapter: 2, order: 3 },
    { title: "Consequências", description: "Criação de um conselho informal entre facções. O artefato destruído enviou um sinal para algo maior.", chapter: 2, order: 4 },
  ];
  for (const s of scenes) {
    await sb.from("Scene").insert({
      id: createId(), title: s.title, description: s.description, chapter: s.chapter,
      chronicleId: chrId, narratorId: narId, order: s.order,
      createdAt: now(), updatedAt: now(),
    });
    console.log(`   ✅ ${s.title}`);
  }

  // Notes
  console.log("\n📓 Criando Notas...");
  await sb.from("Note").insert({
    id: createId(), title: "Observações sobre as facções", content: "Camarilla quer controle. Anarchs querem liberdade. Garou querem proteger Gaia. Alguém precisa unir esses grupos.", type: "PESSOAL", playerId: userIds["julia.mackenzie@email.com"], characterId: null, createdAt: now(), updatedAt: now(),
  });
  await sb.from("Note").insert({
    id: createId(), title: "Primeiro encontro", content: "Hoje conheci os outros sobrenaturais de Curitiba. A Ventrue Julia é fria. Otávio é inteligente mas desconfiado. Os Garou são intensos.", type: "DIARIO", playerId: userIds["patrick.brennand@email.com"], characterId: null, createdAt: now(), updatedAt: now(),
  });
  console.log("   ✅ 2 notas");

  // Narrator notes
  console.log("\n📋 Criando Notas do Narrador...");
  const narNotes = [
    { title: "Visão Geral", content: "Crônica crossover em Curitiba. Tema: cooperação entre facções antagônicas. Espírito da Tormenta é o primeiro antagonista." },
    { title: "Personagens", content: "Julia (líder, Camarilla), Otávio (resistência Anarch), Rodolfo (guerreiro Garou), Willian (anfitrião neutro), Abelardo (memória ancestral)." },
    { title: "Ganchos Futuros", content: "1. Artefato destruído era parte de um conjunto. 2. Alguém no grupo pode ser infiltrado. 3. Camarilla desconfia da aliança. 4. Caipora — espírito ancestral aprisionado." },
  ];
  for (const n of narNotes) {
    await sb.from("NarratorNote").insert({
      id: createId(), title: n.title, content: n.content, narratorId: narId, chronicleId: chrId,
      createdAt: now(), updatedAt: now(),
    });
    console.log(`   ✅ ${n.title}`);
  }

  console.log("\n🎉 Tudo pronto!");
  console.log(`📧 Narrador: ${NARRATOR_EMAIL}`);
  console.log(`🔑 Senha dos jogadores: senha123`);
}

main().catch((err) => { console.error("\n❌ Erro:", err); process.exit(1); });