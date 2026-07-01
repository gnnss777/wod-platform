export const V20_ATTRIBUTES = {
  physical: ["forca", "destreza", "vigor"],
  social: ["carisma", "manipulacao", "aparencia"],
  mental: ["percepcao", "inteligencia", "astucia"],
} as const;

export const V20_TALENTS = [
  "prontidao", "atletismo", "briga", "esquiva",
  "empatia", "expressao", "intimidacao", "lideranca",
  "manha", "subterfugio",
] as const;

export const V20_SKILLS = [
  "empinar", "direcao", "etiqueta", "armas_fogo",
  "armas_brancas", "performance", "seguranca", "furtividade",
  "sobrevivencia",
] as const;

export const V20_KNOWLEDGES = [
  "academicos", "computador", "financas", "investigacao",
  "direito", "linguistica", "medicina", "ocultismo",
  "politica", "ciencia",
] as const;

export const V5_ATTRIBUTES = {
  physical: ["forca", "destreza", "vigor"],
  social: ["carisma", "manipulacao", "composure"],
  mental: ["inteligencia", "astucia", "resolucao"],
} as const;

export const V5_PHYSICAL_SKILLS = [
  "atletismo", "briga", "oficios", "direcao",
  "armas_fogo", "ladroagem", "armas_brancas", "furtividade",
  "sobrevivencia",
] as const;

export const V5_SOCIAL_SKILLS = [
  "empinar", "etiqueta", "perspicacia", "intimidacao",
  "lideranca", "performance", "persuasao", "manha",
  "subterfugio",
] as const;

export const V5_MENTAL_SKILLS = [
  "academicos", "consciencia", "financas", "investigacao",
  "medicina", "ocultismo", "politica", "ciencia",
  "tecnologia",
] as const;

export const LABELS: Record<string, string> = {
  forca: "Força", destreza: "Destreza", vigor: "Vigor",
  carisma: "Carisma", manipulacao: "Manipulação", aparencia: "Aparência",
  percepcao: "Percepção", inteligencia: "Inteligência", astucia: "Astúcia",
  composure: "Compostura", resolucao: "Resolução",
  prontidao: "Prontidão", atletismo: "Atletismo", briga: "Briga",
  esquiva: "Esquiva", empatia: "Empatia", expressao: "Expressão",
  intimidacao: "Intimidação", lideranca: "Liderança", manha: "Manha",
  subterfugio: "Subterfúgio",
  empinar: "Empinar", direcao: "Direção", etiqueta: "Etiqueta",
  armas_fogo: "Armas de Fogo", armas_brancas: "Armas Brancas",
  performance: "Performance", seguranca: "Segurança",
  furtividade: "Furtividade", sobrevivencia: "Sobrevivência",
  academicos: "Acadêmicos", computador: "Computador",
  financas: "Finanças", investigacao: "Investigação",
  direito: "Direito", linguistica: "Linguística",
  medicina: "Medicina", ocultismo: "Ocultismo",
  politica: "Política", ciencia: "Ciência",
  oficios: "Ofícios", ladroagem: "Ladroagem",
  perspicacia: "Perspicácia", persuasao: "Persuasão",
  consciencia: "Consciência", tecnologia: "Tecnologia",
};

export function buildDefaultAttributes(edition: "V5" | "V20") {
  const attrs = edition === "V5" ? V5_ATTRIBUTES : V20_ATTRIBUTES;
  const result: Record<string, number> = {};
  for (const group of Object.values(attrs)) {
    for (const attr of group) result[attr] = 1;
  }
  return result;
}

export function buildDefaultAbilities(edition: "V5" | "V20") {
  const pools = edition === "V5"
    ? [...V5_PHYSICAL_SKILLS, ...V5_SOCIAL_SKILLS, ...V5_MENTAL_SKILLS]
    : [...V20_TALENTS, ...V20_SKILLS, ...V20_KNOWLEDGES];
  return Object.fromEntries(pools.map((a) => [a, 0]));
}

export function calcDicePool(
  attributes: Record<string, number>,
  abilities: Record<string, number>,
  attrKey: string,
  abilKey: string,
) {
  return (attributes[attrKey] ?? 0) + (abilities[abilKey] ?? 0);
}
