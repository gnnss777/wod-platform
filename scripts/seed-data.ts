export interface UserSeed {
  name: string;
  email: string;
  password: string;
  role: "JOGADOR";
}

export interface CharSeed {
  name: string;
  playerEmail: string;
  concept: string;
  clan?: string;
  nature?: string;
  demeanor?: string;
  generation?: number;
  sect?: string;
  edition: "V5" | "V20";
  attributes: Record<string, number>;
  abilities: Record<string, number>;
  powers: Record<string, number>;
  backgrounds: Record<string, number>;
  willpower: { rating: number; current: number };
  health: { max: number; bashing: number; lethal: number; aggravated: number };
  morality: { type: string; rating: number };
  pool: { type: string; rating: number; current: number };
  experience: { total: number; spent: number };
  notes?: string;
}

export interface NpcSeed {
  name: string;
  concept?: string;
  clan?: string;
  attributes: Record<string, number>;
  abilities: Record<string, number>;
  willpower: { rating: number; current: number };
  health: { max: number; bashing: number; lethal: number; aggravated: number };
  powers: Record<string, number>;
  notes?: string;
}

export interface SceneSeed {
  title: string;
  description: string;
  chapter: number;
  order: number;
}

export interface NoteSeed {
  title: string;
  content: string;
  type: "PESSOAL" | "DIARIO";
  playerEmail: string;
}

export interface NarratorNoteSeed {
  title: string;
  content: string;
}

export const SEED_PASSWORD = "senha123";

export const CHRONICLE = {
  name: "Noites Sombrias em Curitiba",
  description: "Curitiba tornou-se um ponto focal de atividade sobrenatural. Assassinatos misteriosos estão ocorrendo — vítimas humanas e sobrenaturais. Algo está desestabilizando o véu entre os mundos, e as facções precisam cooperar para sobreviver.",
  edition: "V20" as const,
};

export const NARRADOR = {
  name: "Alexandre",
  email: "alexandre.narrador@email.com",
  password: SEED_PASSWORD,
  role: "NARRADOR" as const,
};

export const USERS: UserSeed[] = [
  { name: "Julia Mackenzie", email: "julia.mackenzie@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Otávio Meireles", email: "otavio.meireles@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Rodolfo Klauswitz", email: "rodolfo.klauswitz@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Willian Miller", email: "willian.miller@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Silvana Parks", email: "silvana.parks@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Juliana Marruá", email: "juliana.marrua@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Abelardo Nogueira", email: "abelardo.nogueira@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Silas von Zanthier", email: "silas.zanthier@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Adam Clair", email: "adam.clair@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Patrick Brennand", email: "patrick.brennand@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Samir Saade", email: "samir.saade@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Roman Costello", email: "roman.costello@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Mahara Pereira", email: "mahara.pereira@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
  { name: "Normando Almeida", email: "normando.almeida@email.com", password: SEED_PASSWORD, role: "JOGADOR" },
];

export const CHARACTERS: CharSeed[] = [
  {
    name: "Julia Mackenzie",
    playerEmail: "julia.mackenzie@email.com",
    concept: "Assassina e perita financeira",
    clan: "Ventrue",
    nature: "Sobrevivente",
    demeanor: "Diretora",
    generation: 11,
    sect: "Camarilla",
    edition: "V20",
    attributes: { forca: 2, destreza: 4, vigor: 3, carisma: 4, manipulacao: 3, aparencia: 3, percepcao: 4, inteligencia: 3, astucia: 4 },
    abilities: { prontidao: 3, atletismo: 2, briga: 2, esquiva: 3, empatia: 1, expressao: 2, intimidacao: 3, lideranca: 3, manha: 4, subterfugio: 4, empinar: 1, direcao: 2, etiqueta: 4, armas_fogo: 4, armas_brancas: 3, seguranca: 2, furtividade: 4, academicos: 1, computador: 2, financas: 5, investigacao: 4, direito: 1, ocultismo: 2, politica: 3 },
    powers: { "auspicios": 3, "fortitude": 2, "presenca": 4 },
    backgrounds: { "recursos": 5, "aliados": 3, "influencia": 3, "contatos": 4 },
    willpower: { rating: 8, current: 8 },
    health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 6 },
    pool: { type: "blood", rating: 11, current: 11 },
    experience: { total: 60, spent: 60 },
    notes: "Julia é uma Ventrue meticulosa que opera nos bastidores do mercado financeiro de Curitiba. Sua empresa de consultoria é fachada para uma rede de informações que abastece a Camarilla local. Ela foi a primeira a notar o padrão nos assassinatos e convocou a reunião.",
  },
  {
    name: "Otávio Meireles",
    playerEmail: "otavio.meireles@email.com",
    concept: "Doutor em sociologia e política",
    clan: "Brujah",
    nature: "Visionário",
    demeanor: "Reservado",
    generation: 12,
    sect: "Anarch",
    edition: "V20",
    attributes: { forca: 3, destreza: 2, vigor: 3, carisma: 3, manipulacao: 3, aparencia: 2, percepcao: 3, inteligencia: 5, astucia: 4 },
    abilities: { prontidao: 3, atletismo: 1, briga: 2, esquiva: 2, empatia: 3, expressao: 4, intimidacao: 2, lideranca: 3, manha: 3, subterfugio: 3, empinar: 1, direcao: 1, etiqueta: 2, armas_fogo: 1, armas_brancas: 2, performance: 2, furtividade: 2, academicos: 5, computador: 2, investigacao: 4, direito: 2, linguistica: 3, ocultismo: 3, politica: 5, ciencia: 1 },
    powers: { "potencia": 3, "celeridade": 2, "presenca": 2 },
    backgrounds: { "contatos": 4, "aliados": 2, "influencia": 2, "academia": 3 },
    willpower: { rating: 7, current: 7 },
    health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 7 },
    pool: { type: "blood", rating: 10, current: 10 },
    experience: { total: 60, spent: 60 },
    notes: "Otávio é professor universitário e intelectual Brujah. Prefere observar e analisar antes de agir. Mantém-se reservado, mas sua sede por conhecimento e justiça social o levou a abraçar a causa Anarch. Desconfia da Camarilla e das motivações de Julia.",
  },
  {
    name: "Rodolfo Klauswitz",
    playerEmail: "rodolfo.klauswitz@email.com",
    concept: "Ex Forças Especiais, Philodox Shadow Lord",
    clan: "Shadow Lord",
    nature: "Juiz",
    demeanor: "Soldado",
    edition: "V20",
    attributes: { forca: 5, destreza: 4, vigor: 5, carisma: 2, manipulacao: 2, aparencia: 3, percepcao: 4, inteligencia: 3, astucia: 4 },
    abilities: { prontidao: 5, atletismo: 4, briga: 5, esquiva: 4, empatia: 1, expressao: 1, intimidacao: 5, lideranca: 4, manha: 2, subterfugio: 2, empinar: 3, direcao: 3, etiqueta: 1, armas_fogo: 5, armas_brancas: 4, seguranca: 4, furtividade: 4, sobrevivencia: 4, academicos: 1, computador: 1, investigacao: 3, ocultismo: 2, politica: 2, medicina: 2 },
    powers: { "forca_do_lobo": 4, "sentidos_aguacados": 3, "velocidade_do_lobo": 3, "garras_da_besta": 3, "chamado_selvagem": 2 },
    backgrounds: { "recursos": 2, "aliados": 3, "contatos": 2, "territorio": 3, "mentor": 2 },
    willpower: { rating: 9, current: 9 },
    health: { max: 8, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 6 },
    pool: { type: "rage", rating: 7, current: 7 },
    experience: { total: 21, spent: 21 },
    notes: "Rodolfo serviu nas Forças Especiais do Exército Brasileiro antes de passar pela Primeira Mudança. Como Philodox, ele é um juiz e mediador dentro da seita Shadow Lord. Sua experiência militar o torna um estrategista nato. Reservado, mas leal à causa Garou.",
  },
  {
    name: "Willian Miller",
    playerEmail: "willian.miller@email.com",
    concept: "Bartender e produtor de shows, dono do Foggy Dew",
    clan: "Fianna",
    nature: "Bon Vivant",
    demeanor: "Artista",
    edition: "V20",
    attributes: { forca: 3, destreza: 3, vigor: 3, carisma: 4, manipulacao: 3, aparencia: 4, percepcao: 3, inteligencia: 2, astucia: 3 },
    abilities: { prontidao: 2, atletismo: 2, briga: 2, esquiva: 2, empatia: 4, expressao: 4, intimidacao: 1, lideranca: 2, manha: 3, subterfugio: 3, empinar: 1, direcao: 2, etiqueta: 3, armas_fogo: 1, armas_brancas: 1, performance: 5, seguranca: 1, furtividade: 2, academicos: 1, computador: 1, financas: 2, investigacao: 2, ocultismo: 3, politica: 1, linguistica: 2 },
    powers: { "charme_fae": 3, "sentidos_aguacados": 2, "garras_da_besta": 2, "forca_do_lobo": 2, "chamado_da_lua": 2 },
    backgrounds: { "recursos": 3, "aliados": 4, "contatos": 3, "fama": 2 },
    willpower: { rating: 6, current: 6 },
    health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 7 },
    pool: { type: "gnosis", rating: 5, current: 5 },
    experience: { total: 21, spent: 21 },
    notes: "Willian é o dono do Foggy Dew, um pub irlandês que se tornou ponto de encontro de sobrenaturais em Curitiba. Ragabash Fianna, ele usa seu carisma e talento musical para unir as pessoas. O pub é território neutro, e ele faz questão de manter assim.",
  },
  {
    name: "Silvana Parks",
    playerEmail: "silvana.parks@email.com",
    concept: "DJ e especialista em TI",
    clan: "Glass Walker",
    nature: "Inovadora",
    demeanor: "Descolada",
    edition: "V20",
    attributes: { forca: 2, destreza: 3, vigor: 2, carisma: 4, manipulacao: 3, aparencia: 3, percepcao: 4, inteligencia: 4, astucia: 3 },
    abilities: { prontidao: 3, atletismo: 1, briga: 1, esquiva: 2, empatia: 2, expressao: 4, intimidacao: 1, lideranca: 2, manha: 3, subterfugio: 3, empinar: 2, direcao: 1, etiqueta: 2, armas_fogo: 1, performance: 5, seguranca: 3, furtividade: 2, academicos: 2, computador: 5, investigacao: 3, ocultismo: 2, ciencia: 2, tecnologia: 5 },
    powers: { "conexao_tecnologica": 4, "sentidos_aguacados": 2, "chamado_selvagem": 2, "visao_da_teia": 3 },
    backgrounds: { "recursos": 2, "aliados": 2, "contatos": 4, "territorio": 2 },
    willpower: { rating: 6, current: 6 },
    health: { max: 6, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 7 },
    pool: { type: "gnosis", rating: 6, current: 6 },
    experience: { total: 21, spent: 21 },
    notes: "Silvana é uma Glass Walker que vive na interseção entre tecnologia e natureza. DJ renomada nas baladas de Curitiba, ela também é uma hacker talentosa. Sua boate é coberta de plantas e telas — seu território. Monitora a Web profunda em busca de sinais da atividade sobrenatural na cidade.",
  },
  {
    name: "Juliana Marruá",
    playerEmail: "juliana.marrua@email.com",
    concept: "Advogada ambientalista Balam Baset",
    clan: "Balam",
    nature: "Protetora",
    demeanor: "Diplomata",
    edition: "V20",
    attributes: { forca: 3, destreza: 3, vigor: 3, carisma: 3, manipulacao: 4, aparencia: 3, percepcao: 3, inteligencia: 4, astucia: 3 },
    abilities: { prontidao: 2, atletismo: 2, briga: 2, esquiva: 2, empatia: 3, expressao: 3, intimidacao: 2, lideranca: 2, manha: 3, subterfugio: 3, empinar: 1, direcao: 2, etiqueta: 3, armas_fogo: 1, armas_brancas: 1, seguranca: 1, furtividade: 2, sobrevivencia: 2, academicos: 4, computador: 2, direito: 5, investigacao: 3, ocultismo: 2, politica: 4, ciencia: 2 },
    powers: { "metamorfose": 3, "sentidos_felinos": 3, "garras_do_jaguar": 2, "furtividade_da_selva": 2 },
    backgrounds: { "recursos": 3, "aliados": 3, "contatos": 4, "influencia": 2 },
    willpower: { rating: 7, current: 7 },
    health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 8 },
    pool: { type: "gnosis", rating: 5, current: 5 },
    experience: { total: 21, spent: 21 },
    notes: "Juliana é uma advogada ambientalista que usa sua posição para proteger áreas verdes de Curitiba. Como Balam Baset (a raça dos jaguar), ela defende o equilíbrio ecológico com ferocidade. Olhos de âmbar e fala mansa, mas perigosa quando provocada.",
  },
  {
    name: "Abelardo Nogueira",
    playerEmail: "abelardo.nogueira@email.com",
    concept: "Mokolé centenário, tropeiro e jagunço",
    clan: "Mokolé",
    nature: "Sábio",
    demeanor: "Caipira",
    edition: "V20",
    attributes: { forca: 4, destreza: 3, vigor: 5, carisma: 3, manipulacao: 3, aparencia: 2, percepcao: 5, inteligencia: 4, astucia: 5 },
    abilities: { prontidao: 5, atletismo: 3, briga: 4, esquiva: 3, empatia: 3, expressao: 2, intimidacao: 3, lideranca: 3, manha: 4, subterfugio: 3, empinar: 4, direcao: 2, etiqueta: 1, armas_fogo: 3, armas_brancas: 5, seguranca: 2, furtividade: 3, sobrevivencia: 5, academicos: 2, computador: 1, investigacao: 3, ocultismo: 4, medicina: 2, linguistica: 2, ciencia: 1 },
    powers: { "memoria_ancestral": 5, "sentidos_do_reptil": 4, "camuflagem": 3, "forca_do_jacare": 4, "visao_dos_sonhos": 3 },
    backgrounds: { "recursos": 2, "aliados": 3, "contatos": 3, "mentor": 1 },
    willpower: { rating: 9, current: 9 },
    health: { max: 9, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 7 },
    pool: { type: "gnosis", rating: 8, current: 8 },
    experience: { total: 100, spent: 100 },
    notes: "Abelardo é um Mokolé centenário que já foi tropeiro, jagunço e hoje trabalha em sítios e fazendas da Região Metropolitana de Curitiba. Carrega a memória ancestral de sua linhagem, lembrando-se do mundo antes da civilização. Fala pausado, mas sua sabedoria é profunda. Conhece cada rio, árvore e espírito da região.",
  },
  {
    name: "Silas von Zanthier",
    playerEmail: "silas.zanthier@email.com",
    concept: "Biólogo transformado em criatura vegetal",
    clan: "Promethean",
    nature: "Peregrino",
    demeanor: "Cientista",
    edition: "V20",
    attributes: { forca: 3, destreza: 2, vigor: 4, carisma: 2, manipulacao: 2, aparencia: 1, percepcao: 4, inteligencia: 5, astucia: 3 },
    abilities: { prontidao: 3, atletismo: 1, briga: 2, esquiva: 2, empatia: 3, expressao: 2, intimidacao: 1, lideranca: 1, manha: 2, subterfugio: 2, empinar: 1, direcao: 1, etiqueta: 2, armas_fogo: 1, armas_brancas: 1, furtividade: 2, sobrevivencia: 3, academicos: 5, computador: 2, investigacao: 3, medicina: 4, ocultismo: 2, ciencia: 5 },
    powers: { "vitalidade_vegetal": 4, "controle_da_flora": 3, "metamorfose": 2, "sentidos_naturais": 3 },
    backgrounds: { "recursos": 1, "aliados": 1, "contatos": 1 },
    willpower: { rating: 7, current: 7 },
    health: { max: 9, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 5 },
    pool: { type: "pyros", rating: 6, current: 6 },
    experience: { total: 100, spent: 100 },
    notes: "Silas era um biólogo pesquisador da UFPR até um experimento com células vegetais geneticamente modificadas transformá-lo em uma criatura híbrida de planta e humano. Agora busca entender sua nova existência e um caminho para a humanidade. Sua pele tem textura de casca de árvore, e flores crescem espontaneamente ao seu redor.",
  },
  {
    name: "Adam Clair",
    playerEmail: "adam.clair@email.com",
    concept: "Criatura Frankenstein",
    clan: "Promethean",
    nature: "Peregrino",
    demeanor: "Tímido",
    edition: "V20",
    attributes: { forca: 5, destreza: 2, vigor: 5, carisma: 1, manipulacao: 1, aparencia: 0, percepcao: 3, inteligencia: 2, astucia: 2 },
    abilities: { prontidao: 2, atletismo: 3, briga: 4, esquiva: 2, empatia: 2, expressao: 1, intimidacao: 3, lideranca: 1, manha: 1, subterfugio: 1, empinar: 1, direcao: 1, etiqueta: 1, armas_fogo: 2, armas_brancas: 3, seguranca: 1, furtividade: 1, academicos: 1, computador: 1, investigacao: 1, ocultismo: 1, medicina: 1 },
    powers: { "forca_titanica": 5, "resistencia_sobre_humana": 4, "cura_acelerada": 3, "resistencia_a_fogo": 2 },
    backgrounds: { "recursos": 1, "aliados": 1 },
    willpower: { rating: 5, current: 5 },
    health: { max: 10, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 4 },
    pool: { type: "pyros", rating: 5, current: 5 },
    experience: { total: 100, spent: 100 },
    notes: "Adam Clair foi criado em um laboratório a partir de partes de vários corpos. Sua aparência grotesca o obriga a viver nas sombras. Apesar da força imensa, é gentil e busca desesperadamente a humanidade. Poucas pessoas veem além de sua aparência monstruosa.",
  },
  {
    name: "Patrick Brennand",
    playerEmail: "patrick.brennand@email.com",
    concept: "Clurichaun, colecionador de vinil",
    clan: "Changeling",
    nature: "Colecionador",
    demeanor: "Festivo",
    edition: "V20",
    attributes: { forca: 2, destreza: 4, vigor: 2, carisma: 4, manipulacao: 4, aparencia: 3, percepcao: 3, inteligencia: 3, astucia: 4 },
    abilities: { prontidao: 2, atletismo: 1, briga: 1, esquiva: 3, empatia: 3, expressao: 4, intimidacao: 1, lideranca: 1, manha: 4, subterfugio: 4, empinar: 2, direcao: 1, etiqueta: 2, armas_fogo: 1, performance: 4, seguranca: 2, furtividade: 3, academicos: 2, computador: 1, financas: 3, investigacao: 3, ocultismo: 3, linguistica: 2 },
    powers: { "sortudo": 4, "esconderijo_fae": 3, "encanto": 3, "ilusao": 2 },
    backgrounds: { "recursos": 3, "aliados": 3, "contatos": 4, "fama": 2, "tesouro": 3 },
    willpower: { rating: 7, current: 7 },
    health: { max: 6, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 7 },
    pool: { type: "glamour", rating: 7, current: 7 },
    experience: { total: 42, spent: 42 },
    notes: "Patrick é um Clurichaun — um changeling irlandês obcecado por música. Sua loja de discos de vinil no Centro é ponto de encontro de artistas e boêmios. Por trás do balcão, mantém uma coleção de objetos mágicos e informações sobre o submundo sobrenatural de Curitiba.",
  },
  {
    name: "Samir Saade",
    playerEmail: "samir.saade@email.com",
    concept: "Ifreet, comerciante de tecidos",
    clan: "Changeling",
    nature: "Comerciante",
    demeanor: "Misterioso",
    edition: "V20",
    attributes: { forca: 2, destreza: 3, vigor: 3, carisma: 3, manipulacao: 5, aparencia: 2, percepcao: 4, inteligencia: 4, astucia: 4 },
    abilities: { prontidao: 3, atletismo: 1, briga: 1, esquiva: 2, empatia: 3, expressao: 2, intimidacao: 2, lideranca: 2, manha: 5, subterfugio: 5, empinar: 2, direcao: 1, etiqueta: 4, armas_fogo: 1, performance: 2, seguranca: 1, furtividade: 2, academicos: 3, computador: 1, financas: 4, investigacao: 3, ocultismo: 4, linguistica: 4, politica: 2 },
    powers: { "negociacao_sobrenatural": 4, "visao_do_destino": 3, "tecido_da_realidade": 3, "camaleao": 2 },
    backgrounds: { "recursos": 5, "aliados": 4, "contatos": 5, "influencia": 3 },
    willpower: { rating: 8, current: 8 },
    health: { max: 6, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 6 },
    pool: { type: "glamour", rating: 6, current: 6 },
    experience: { total: 42, spent: 42 },
    notes: "Samir é um Ifreet — um changeling de fogo — dono de uma loja de tecidos orientais no centro de Curitiba. Sua loja é passagem para o mundo fae. Ele é um negociante de informações e objetos raros. Sabe de tudo que acontece na cidade antes de qualquer um.",
  },
  {
    name: "Roman Costello",
    playerEmail: "roman.costello@email.com",
    concept: "Médico, exorcista e detetive particular",
    clan: "Sorcerer",
    nature: "Curandeiro",
    demeanor: "Investigativo",
    edition: "V20",
    attributes: { forca: 2, destreza: 3, vigor: 3, carisma: 3, manipulacao: 3, aparencia: 3, percepcao: 5, inteligencia: 5, astucia: 4 },
    abilities: { prontidao: 4, atletismo: 1, briga: 1, esquiva: 2, empatia: 4, expressao: 3, intimidacao: 2, lideranca: 2, manha: 3, subterfugio: 3, empinar: 1, direcao: 2, etiqueta: 3, armas_fogo: 2, armas_brancas: 1, seguranca: 1, investigacao: 5, furtividade: 2, academicos: 4, computador: 2, direito: 2, linguistica: 3, medicina: 5, ocultismo: 5, politica: 2, ciencia: 3 },
    powers: { "exorcismo": 4, "visao_espiritual": 3, "cura_magica": 3, "protecao_ritual": 4, "detectar_magia": 3 },
    backgrounds: { "recursos": 2, "aliados": 3, "contatos": 4, "arsenal_oculto": 3 },
    willpower: { rating: 9, current: 9 },
    health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 8 },
    pool: { type: "mana", rating: 7, current: 7 },
    experience: { total: 100, spent: 100 },
    notes: "Roman era um médico renomado até perder sua licença por práticas não-convencionais. Hoje trabalha como detetive particular especializado em casos sobrenaturais — exorcismos, assombrações e criaturas. Seu consultório esconde uma biblioteca de grimórios e artefatos de proteção.",
  },
  {
    name: "Mahara Pereira",
    playerEmail: "mahara.pereira@email.com",
    concept: "Avatar de Shiva, garçonete",
    clan: "Avatar",
    nature: "Visionária",
    demeanor: "Humilde",
    edition: "V20",
    attributes: { forca: 2, destreza: 3, vigor: 3, carisma: 5, manipulacao: 3, aparencia: 4, percepcao: 5, inteligencia: 3, astucia: 4 },
    abilities: { prontidao: 4, atletismo: 2, briga: 1, esquiva: 3, empatia: 5, expressao: 4, intimidacao: 1, lideranca: 3, manha: 2, subterfugio: 2, empinar: 1, direcao: 1, etiqueta: 2, performance: 3, furtividade: 2, academicos: 2, computador: 1, investigacao: 2, ocultismo: 5, medicina: 2, linguistica: 3, politica: 1, ciencia: 1 },
    powers: { "visao_do_tempo": 4, "conexao_divina": 5, "cura_espiritual": 3, "protecao_astral": 3, "sabedoria_ancestral": 3 },
    backgrounds: { "recursos": 1, "aliados": 2, "contatos": 2, "mentor_espiritual": 4 },
    willpower: { rating: 9, current: 9 },
    health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 9 },
    pool: { type: "karma", rating: 8, current: 8 },
    experience: { total: 52, spent: 52 },
    notes: "Mahara trabalha como garçonete em um café do Centro, mas sua verdadeira natureza é a de um avatar de Shiva — a divindade hindu da destruição e transformação. Ela tem visões do futuro e toca as pessoas com uma paz profunda. Fala pouco, mas quando fala, é profético.",
  },
  {
    name: "Normando Almeida",
    playerEmail: "normando.almeida@email.com",
    concept: "Reconciler Malefactor, metalúrgico",
    clan: "Demon",
    nature: "Reconciliador",
    demeanor: "Operário",
    edition: "V20",
    attributes: { forca: 4, destreza: 2, vigor: 5, carisma: 2, manipulacao: 3, aparencia: 2, percepcao: 3, inteligencia: 3, astucia: 3 },
    abilities: { prontidao: 3, atletismo: 2, briga: 3, esquiva: 2, empatia: 3, expressao: 2, intimidacao: 3, lideranca: 2, manha: 3, subterfugio: 2, empinar: 2, direcao: 1, etiqueta: 1, armas_fogo: 1, armas_brancas: 3, oficios: 5, seguranca: 2, furtividade: 1, academicos: 1, computador: 1, financas: 2, investigacao: 2, ocultismo: 3, politica: 2 },
    powers: { "forca_infernal": 4, "resistencia_da_forja": 3, "visao_das_almas": 3, "persuasao_das_trevas": 2, "telepatia_limitada": 2 },
    backgrounds: { "recursos": 2, "aliados": 2, "contatos": 3, "arsenal": 2 },
    willpower: { rating: 8, current: 8 },
    health: { max: 9, bashing: 0, lethal: 0, aggravated: 0 },
    morality: { type: "humanity", rating: 5 },
    pool: { type: "faith", rating: 6, current: 6 },
    experience: { total: 42, spent: 42 },
    notes: "Normando trabalha em uma metalúrgica em Curitiba. Como um Malefactor Reconciler, ele é um demônio que busca redenção — ou, no mínimo, equilíbrio. Passou séculos cometendo atos terríveis e agora tenta compensar ajudando os mortais. Sua pele é fria como metal e seus olhos brilham como brasa quando se irrita.",
  },
];

export const NPCS: NpcSeed[] = [
  {
    name: "Xerife Moreira",
    concept: "Xerife da Camarilla de Curitiba, Brujah ancião",
    clan: "Brujah",
    attributes: { forca: 5, destreza: 4, vigor: 4, carisma: 3, manipulacao: 3, aparencia: 2, percepcao: 4, inteligencia: 3, astucia: 4 },
    abilities: { prontidao: 4, atletismo: 3, briga: 5, esquiva: 4, intimidacao: 4, lideranca: 3, armas_fogo: 4, armas_brancas: 4, investigacao: 3, ocultismo: 2, politica: 3 },
    willpower: { rating: 8, current: 8 },
    health: { max: 8, bashing: 0, lethal: 0, aggravated: 0 },
    powers: { "potencia": 4, "celeridade": 3, "fortitude": 3 },
    notes: "O Xerife Moreira é o braço armado da Princesa da Camarilla em Curitiba. Brujah de guerra, ele não confia em ninguém e mantém a ordem na cidade com mão de ferro. Monitora todos os recém-chegados.",
  },
  {
    name: "Mãe Benedita",
    concept: "Mãe-de-santo candomblecista, aliada dos Mokolé",
    attributes: { forca: 1, destreza: 2, vigor: 2, carisma: 5, manipulacao: 4, aparencia: 3, percepcao: 5, inteligencia: 4, astucia: 5 },
    abilities: { prontidao: 5, empatia: 5, expressao: 4, lideranca: 4, manha: 4, etiqueta: 3, academicos: 2, ocultismo: 5, medicina: 3, linguistica: 2 },
    willpower: { rating: 10, current: 10 },
    health: { max: 5, bashing: 0, lethal: 0, aggravated: 0 },
    powers: { "visao_espiritual": 5, "cura_espiritual": 4, "comunhao_com_orixas": 5, "protecao_ritual": 4 },
    notes: "Mãe Benedita é uma mãe-de-santo poderosa no terreiro de Umbanda em Curitiba. Ela é aliada dos Mokolé há décadas e conhece Abelardo desde que ele era jovem. Serve como ponte entre o mundo espiritual e o material.",
  },
  {
    name: "Doutor Arcanjo",
    concept: "Médico legista aposentado, conhecedor do oculto",
    attributes: { forca: 1, destreza: 2, vigor: 2, carisma: 2, manipulacao: 3, aparencia: 2, percepcao: 5, inteligencia: 5, astucia: 4 },
    abilities: { prontidao: 4, empatia: 2, investigacao: 5, academicos: 5, medicina: 5, ocultismo: 5, ciencia: 4, linguistica: 3 },
    willpower: { rating: 9, current: 9 },
    health: { max: 5, bashing: 0, lethal: 0, aggravated: 0 },
    powers: { "conhecimento_ancestral": 4, "analise_forense_oculta": 4 },
    notes: "O Doutor Arcanjo é um médico legista aposentado que passou 40 anos no IML de Curitiba. Viu coisas que não podia explicar e dedicou-se a estudar o oculto. Seu arquivo particular de casos sobrenaturais é vasto. Roman Costello o consulta frequentemente.",
  },
  {
    name: "Espírito da Tormenta",
    concept: "Entidade Wyrm-corrompida nos esgotos de Curitiba",
    attributes: { forca: 6, destreza: 3, vigor: 6, carisma: 0, manipulacao: 2, aparencia: 0, percepcao: 3, inteligencia: 1, astucia: 2 },
    abilities: { briga: 5, esquiva: 2, intimidacao: 5, furtividade: 3, sobrevivencia: 4, ocultismo: 3 },
    willpower: { rating: 6, current: 6 },
    health: { max: 12, bashing: 0, lethal: 0, aggravated: 0 },
    powers: { "toque_corruptor": 5, "dominio_das_sombras": 4, "invocar_espectros": 3, "residencia_espiritual": 4 },
    notes: "O Espírito da Tormenta é uma entidade corrompida pelo Wyrm que se alojou nos túneis dos esgotos sob o centro de Curitiba. Alimenta-se de desespero e poluição. Está por trás dos assassinatos — está criando um exército de zumbis e espectros para corromper a cidade.",
  },
  {
    name: "Zé do Charuto",
    concept: "Dono do bar 'Caveira', informante do submundo",
    attributes: { forca: 2, destreza: 2, vigor: 2, carisma: 3, manipulacao: 4, aparencia: 1, percepcao: 5, inteligencia: 3, astucia: 5 },
    abilities: { prontidao: 5, empatia: 3, manha: 5, subterfugio: 4, furtividade: 3, contatos: 5, investigacao: 4 },
    willpower: { rating: 7, current: 7 },
    health: { max: 5, bashing: 0, lethal: 0, aggravated: 0 },
    powers: {},
    notes: "Zé do Charuto é um humano que conhece todo mundo. Seu bar 'Caveira' na região da Rodoferroviária é o ponto de encontro de informantes, criminosos e sobrenaturais. Por um preço, ele sabe de tudo. Não tem lealdade a nenhuma facção — só ao dinheiro.",
  },
  {
    name: "Capitã Gabriela Luz",
    concept: "Delegada da Polícia Civil, contato de Roman",
    attributes: { forca: 3, destreza: 3, vigor: 3, carisma: 3, manipulacao: 3, aparencia: 3, percepcao: 4, inteligencia: 4, astucia: 4 },
    abilities: { prontidao: 3, atletismo: 2, briga: 2, esquiva: 2, empatia: 3, expressao: 2, intimidacao: 2, lideranca: 3, manha: 3, subterfugio: 2, direcao: 2, etiqueta: 2, armas_fogo: 3, armas_brancas: 2, investigacao: 5, direito: 3, politica: 2 },
    willpower: { rating: 8, current: 8 },
    health: { max: 7, bashing: 0, lethal: 0, aggravated: 0 },
    powers: {},
    notes: "A Capitã Luz é delegada da Polícia Civil e contato de Roman Costello. Ela tem acesso aos laudos dos assassinatos e suspeita que há algo sobrenatural por trás dos casos. Mora em Curitiba há 15 anos.",
  },
];

export const SCENES: SceneSeed[] = [
  {
    title: "O Chamado",
    description: "Os personagens são convocados por Julia Mackenzie para uma reunião de emergência no Foggy Dew, o pub de Willian Miller. Corpos foram encontrados com marcas rituais em diferentes pontos de Curitiba. Julia revela que as vítimas incluem tanto humanos quanto sobrenaturais. Cada facção traz suas próprias descobertas e desconfianças. A tensão entre Camarilla, Anarchs e Garou é palpável. Ao final da reunião, um ataque acontece do lado de fora do pub — uma criatura sombria ataca, ferindo um dos presentes antes de fugir para os esgotos.",
    chapter: 1,
    order: 1,
  },
  {
    title: "Rastros de Sangue",
    description: "Divididos em grupos, os personagens seguem pistas diferentes. O grupo de Julia e Roman investiga os laudos dos corpos com a Capitã Luz. Willian e Silvana usam suas conexões no submundo da música e da tecnologia para rastrear padrões. Abelardo e Mãe Benedita sentem uma corrupção espiritual vinda dos esgotos. Patrick descobre que sua loja foi arrombada — roubaram um vinil raro que contém um mapa das passagens subterrâneas de Curitiba. As pistas convergem para uma antiga construção no centro, selada há décadas.",
    chapter: 1,
    order: 2,
  },
  {
    title: "Confronto no Subsolo",
    description: "Os personagens adentram os túneis dos esgotos sob o centro histórico de Curitiba. Lá encontram o covil do Espírito da Tormenta — uma criatura Wyrm-corrompida que está usando um artefato mágico (um antigo totem indígena) para amplificar seu poder e criar um exército de espectros. A batalha é intensa e confusa nos túneis escuros. Cada personagem usa suas habilidades únicas: os Garou atacam na dianteira, Roman e Mahara combatem espiritualmente, Normando e Adam usam sua força bruta, e os vampiros coordenam taticamente. O confronto culmina na destruição do artefato, que libera uma onda de energia espiritual pela cidade.",
    chapter: 2,
    order: 3,
  },
  {
    title: "Consequências",
    description: "Com o artefato destruído, os espectros se dissipam e a corrupção nos esgotos começa a regredir. Os personagens emergem dos túneis ao amanhecer (ou ao anoitecer) unidos pela experiência. Julia propõe a criação de um conselho informal entre as facções para monitorar ameaças futuras. Otávio concorda com ressalvas. Rodolfo impõe condições. Abelardo abençoa o acordo com um ritual antigo. O Foggy Dew celebra a primeira vitória, mas o artefato destruído enviou um sinal — algo maior está despertando nas profundezas da América do Sul. Fim do primeiro arco.",
    chapter: 2,
    order: 4,
  },
];

export const NOTES: NoteSeed[] = [
  {
    title: "Observações sobre as facções",
    content: "Camarilla quer controle. Anarchs querem liberdade. Garou querem proteger Gaia. Os Prometheans só querem ser humanos. Os Changelings vivem entre dois mundos. Alguém precisa unir esses grupos antes que a cidade exploda. A reunião no Foggy Dew será o primeiro teste.",
    type: "PESSOAL",
    playerEmail: "julia.mackenzie@email.com",
  },
  {
    title: "Primeiro encontro",
    content: "Hoje conheci os outros... sobrenaturais de Curitiba. A Ventrue Julia é fria e calculista. Otávio parece inteligente, mas desconfiado. Os Garou são intensos. Mas algo me diz que vamos precisar uns dos outros. O ataque hoje à noite provou isso.",
    type: "DIARIO",
    playerEmail: "patrick.brennand@email.com",
  },
];

export const NARRATOR_NOTES: NarratorNoteSeed[] = [
  {
    title: "Visão Geral da Crônica",
    content: "Noites Sombrias em Curitiba é uma crônica crossover que reúne todas as principais linhagens do Mundo das Trevas em Curitiba. O tema central é a cooperação entre facções antagônicas diante de uma ameaça maior. O Espírito da Tormenta é apenas o primeiro antagonista — o artefato destruído no final do arco ativará um sinal que despertará algo nas profundezas da América do Sul, preparando o terreno para o próximo arco.",
  },
  {
    title: "Personagens Principais",
    content: "Julia Mackenzie: Líder de facto do grupo. Sua experiência em finanças e assassinato a torna valiosa, mas sua lealdade à Camarilla é questionável.\n\nOtávio Meireles: A voz da razão e da resistência. Seu conhecimento acadêmico e político equilibra o pragmatismo de Julia.\n\nRodolfo Klauswitz: O guerreiro. Sua experiência militar é inestimável em combate, mas sua rigidez pode causar atritos.\n\nWillian Miller: O anfitrião. Seu pub é o ponto neutro. Sua rede de contatos é essencial para a inteligência do grupo.\n\nAbelardo Nogueira: A memória viva. Seu conhecimento ancestral pode ser a chave para entender o artefato.",
  },
  {
    title: "Ganchos Futuros",
    content: "1. O artefato destruído era parte de um conjunto — os outros fragmentos estão espalhados pela América do Sul.\n2. Alguém dentro do grupo pode estar trabalhando para uma facção oculta.\n3. A Camarilla de Curitiba não vê com bons olhos essa aliança entre facções.\n4. Os espectros que escaparam podem ter possuído pessoas na cidade.\n5. O 'despertar' nas profundezas está ligado à lenda de Caipora — um espírito ancestral aprisionado.",
  },
];
