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
  sire?: string;
  ambition?: string;
  desire?: string;
  predatorType?: string;
  age?: number;
  apparentAge?: number;
  appearance?: string;
  personality?: string;
  history?: string;
  goals?: string;
  weakness?: string;
  touchstones?: string;
  convictions?: string;
  alliesContacts?: string;
  possessions?: string;
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
  role: "MESTRE" as const,
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
    sire: "Lord Reginald Ashworth",
    ambition: "Tornar-se a Princesa da Camarilla de Curitiba",
    desire: "Provar que uma mulher pode governar as sombras da cidade",
    age: 89,
    apparentAge: 32,
    appearance: "Julia tem porte elegante, cabelos castanhos escuros cortados em um bob preciso, olhos azul-acinzentados que parecem enxergar através das pessoas. Veste ternos sob medida que combinam poder e sofisticação. Sua pele é pálida, sem imperfeições, e ela se move com a graça calculada de uma predadora no topo da cadeia alimentar. Nunca a viram repetir uma roupa em reuniões de negócios.",
    personality: "Fria, calculista e imensamente paciente. Julia trata cada interação como uma transação e cada palavra como um ativo. Por trás da fachada de executiva implacável, há uma sobrevivente que aprendeu que confiança é uma moeda que nunca deve ser gasta de forma imprudente. Ela respeita competência e lealdade, mas nunca perdoa traição.",
    history: "Julia nasceu em 1937 em uma família tradicional de Curitiba. Foi abraçada em 1969 por Lord Ashworth, um Ventrue inglês que viu nela o potencial para administrar os negócios da Camarilla no Sul do Brasil. Passou as décadas seguintes construindo um império financeiro que lhe deu influência política e econômica. Sua empresa, Mackenzie Consultoria, é fachada para lavagem de dinheiro e coleta de informações para a Camarilla.",
    goals: "Estabilizar Curitiba como um bastião da Camarilla, eliminando ameaças internas e externas. No longo prazo, ambiciona ascender ao cargo de Princesa da cidade quando a atual Princesa se retirar.",
    weakness: "Orgulho excessivo. Julia tem dificuldade em admitir quando está errada e pode subestimar inimigos que considera inferiores. Sua necessidade de controle a impede de delegar tarefas importantes.",
    touchstones: "O retrato de sua mãe, a única pessoa que a amou incondicionalmente antes do abraço.",
    convictions: "A Camarilla é a única barreira entre a civilidade e o caos. O sangue é poder. O conhecimento é a arma mais letal.",
    alliesContacts: "Capitã Gabriela Luz (contato na polícia), Xerife Moreira (aliado relutante na Camarilla), Zé do Charuto (informante), diversos políticos estaduais que 'devem favores' a ela.",
    possessions: "Uma coleção de relógios Rolex antigos, um apartamento cobertura no Batel, uma conta bancária na Suíça, um diário de negócios codificado, e uma pistola Walther PPK com balas de prata.",
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
    sire: "Maria dos Anjos (anarquista histórica, morta em 1998)",
    ambition: "Criar uma sociedade justa entre mortais e sobrenaturais em Curitiba",
    desire: "Publicar um tratado sobre a sociologia das sociedades vampíricas sem ser censurado",
    age: 52,
    apparentAge: 35,
    appearance: "Otávio tem aparência de professor universitário: barba por fazer cuidadosamente estilizada, óculos de grau redondos, cabelos pretos levemente grisalhos nas laterais. Veste-se com roupas confortáveis mas elegantes — blazers de tweed, camisas xadrez, sapatos mocassim. Tem olhos castanhos profundos e expressivos, que se acendem quando discute ideias.",
    personality: "Calmo, ponderado e profundamente intelectual. Otávio prefere observar e analisar antes de agir. É um debatedor nato que usa a lógica e o conhecimento como armas. Apesar de sua natureza Anarch, não é um revolucionário impulsivo — acredita em mudança através da educação e do diálogo. Sua paciência é lendária, mas sua paixão pela justiça pode fervilhar sob a superfície.",
    history: "Otávio nasceu em 1974 em uma família de classe média em Porto Alegre. Foi abraçado aos 24 anos por Maria dos Anjos, uma Brujah anarquista que viu nele o potencial para ser um líder intelectual do movimento Anarch no Brasil. Após a morte de sua mentora, Otávio mudou-se para Curitiba, onde se tornou professor titular de Sociologia Política na UFPR. Seus artigos acadêmicos frequentemente contêm críticas veladas ao sistema feudal da Camarilla.",
    goals: "Desmantelar a estrutura opressiva da Camarilla em Curitiba e substituí-la por um conselho democrático de todas as facções. Educar os jovens mortais para que possam se proteger das manipulações vampíricas.",
    weakness: "Indecisão. Por ver todos os lados de cada questão, Otávio pode demorar demais para agir. Seu racionalismo excessivo às vezes subestima o poder da fé, da emoção e do irracional.",
    alliesContacts: "Professores da UFPR, ativistas de direitos humanos, jornalistas investigativos, um contato dentro da prefeitura de Curitiba.",
    possessions: "Uma biblioteca de mais de 3.000 livros, um apartamento funcional no Centro, um computador com arquivos criptografados sobre a sociedade vampírica brasileira, uma caneta-tinteiro Parker que pertenceu a sua avó.",
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
    age: 38,
    appearance: "Rodolfo tem porte atlético e postura militar. Cabelo curto raspado nas laterais, olhos cinzentos que examinam tudo com desconfiança, maxilar forte. Tem uma cicatriz vertical cruzando o olho esquerdo — lembrança de uma missão no exterior. Veste-se de forma prática: jaquetas táticas, botas, calças cargo. Quando não está em forma humana, sua forma de lobo é imponente, pelagem preta com manchas prateadas.",
    personality: "Reservado, disciplinado e profundamente leal à causa Garou. Rodolfo fala pouco, mas quando fala é direto e sem rodeios. Como Philodox, ele valoriza a verdade e a justiça acima de tudo. Sua experiência militar o ensinou a avaliar situações friamente, mas internamente ele carrega o peso de cada vida que tirou.",
    history: "Rodolfo serviu nas Forças Especiais do Exército Brasileiro por 12 anos, participando de missões na Amazônia e no exterior. Sua Primeira Mudança ocorreu durante uma emboscada na selva colombiana, quando matou um grupo de narcotraficantes com as próprias mãos. Foi encontrado por um bando Garou que o acolheu e treinou. Como Philodox, ele é um juiz e mediador dentro da seita Shadow Lord.",
    goals: "Proteger Curitiba e sua região da corrupção do Wyrm. Unir as facções Garou locais contra ameaças externas. Encontrar e punir os responsáveis por um massacre em uma aldeia Garou no Paraná há cinco anos.",
    weakness: "Inflexibilidade. Rodolfo tem dificuldade em aceitar compromissos e tende a ver o mundo em preto e branco. Sua desconfiança de não-Garou pode prejudicar alianças necessárias.",
    alliesContacts: "Ex-companheiros das Forças Especiais, anciões do conselho Shadow Lord, um contato na Polícia Federal, um espírito Lobo Cinzento que o guia em sonhos.",
    possessions: "Uma faca tática personalizada com runas gravadas, uma medalha militar, fotografia de seu bando original morto, um rádio comunicador de longo alcance, um diário de missão.",
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
    age: 29,
    appearance: "Willian é alto, cabelos ruivos cacheados que usa soltos, barba ruiva bem cuidada, olhos verdes brilhantes que parecem rir o tempo todo. Sua pele é clara com sardas no nariz e maçãs do rosto. Veste-se de forma descontraída — camisetas de bandas, coletes de couro, botas coturno. Quando sorri, revela um charme irlandês que conquista qualquer um.",
    personality: "Alegre, extrovertido e generoso. Willian é a alma do Foggy Dew e faz todos se sentirem bem-vindos. Como Ragabash, ele usa humor e ironia para aliviar tensões e enganar inimigos. Apesar da fachada festiva, é profundamente leal aos amigos e à causa Garou. Odeia injustiça e não tolera prepotência em seu pub.",
    history: "Willian nasceu em uma família de músicos irlandeses que imigraram para o Brasil. Cresceu tocando violão em bares de Curitiba até abrir seu próprio pub, o Foggy Dew, aos 23 anos. Sua Primeira Mudança ocorreu durante uma briga no bar, quando protegeu um cliente de agressores. Foi acolhido pelos Fianna, que reconheceram nele o dom do chamado fae. O pub se tornou território neutro para sobrenaturais.",
    goals: "Manter o Foggy Dew como santuário neutro para todas as facções. Usar sua música e influência para unir os sobrenaturais de Curitiba contra ameaças comuns. Descobrir a origem de sua herança fae.",
    weakness: "Ingenuidade. Willian confia nas pessoas com facilidade e pode ser manipulado por quem usa sua generosidade contra ele. Seu vício em música e celebração pode distraí-lo do que realmente importa.",
    alliesContacts: "Músicos locais, boêmios, donos de bares, um contato na prefeitura que 'esquece' de multar o pub, um espírito da música que visita o Foggy Dew em noites de lua cheia.",
    possessions: "Um violão Gibson acústico herdado de seu avô, uma coleção de discos de vinil raros, a escritura do Foggy Dew, uma adaga celta cerimonial, um talismã fae que o protege de detecção mágica.",
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
    age: 26,
    appearance: "Silvana tem cabelos curtos pintados de azel e roxo, piercings no nariz e orelhas, olhos castanhos vivos. Sua pele é morena clara, e ela tem tatuagens geométricas que sobem pelos braços — padrões que imitam circuitos eletrônicos. Veste-se com roupas estilosas e confortáveis: jaquetas bomber, camisetas de bandas, calças cargo, tênis coloridos. Seus fones de ouvido são praticamente um acessório permanente.",
    personality: "Energética, criativa e mentalmente ágil. Silvana vive no limite entre o mundo digital e o natural. Ela é descolada e acessível, mas tem um lado sério quando se trata de tecnologia e da causa Garou. Acredita que a tecnologia pode ser uma ferramenta para proteger Gaia, não uma inimiga. Adora desvendar mistérios e quebrar sistemas fechados.",
    history: "Silvana cresceu em uma família de classe média em Curitiba, sempre fascinada por computadores e música eletrônica. Aos 19 anos, já era DJ conhecida nas baladas underground da cidade. Sua Primeira Mudança ocorreu durante um rave na mata, quando sentiu a dor da natureza sendo destruída pela poluição sonora e visual. Os Glass Walker a encontraram e a treinaram para usar sua conexão única entre tecnologia e natureza.",
    goals: "Criar uma rede de monitoramento digital para detectar atividades sobrenaturais em Curitiba. Provar que tecnologia e natureza podem coexistir. Encontrar outros Glass Walker na América do Sul.",
    weakness: "Dependência tecnológica. Silvana confia demais em seus dispositivos e pode ficar vulnerável sem eles. Subestima ameaças que não podem ser detectadas digitalmente.",
    alliesContacts: "Hackers do Anonymous Brasil, DJs e produtores musicais, donos de casas noturnas, um contato no setor de TI da prefeitura, um espírito digital que habita os servidores da UFPR.",
    possessions: "Um laptop modificado com software de hacking próprio, um controlador DJ profissional, fones de ouvido de última geração, um drone com câmera térmica, uma unidade USB criptografada com dados sobre a sociedade sobrenatural.",
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
    age: 31,
    appearance: "Juliana tem cabelos castanhos ondulados que caem pelos ombros, olhos amendoados de cor âmbar que brilham quando ela se transforma. Pele morena, traços indígenas marcantes. Veste-se profissionalmente — ternos femininos, saias lápis, blusas de seda — mas sempre com um colar de dentes de onça visível. Sua postura é ereta e confiante, e ela se move com uma graça felina inconfundível.",
    personality: "Diplomática, articulada e apaixonada pela justiça. Juliana usa sua inteligência e formação jurídica como armas mais afiadas que garras. Por trás da fachada profissional, há uma ferocidade protetora — ela não hesita em destruir quem ameaça o equilíbrio natural. É paciente e estrategista, preferindo vencer batalhas nos tribunais do que na selva, mas não tem medo de sujar as mãos quando necessário.",
    history: "Juliana cresceu em uma reserva indígena no Paraná, filha de uma líder espiritual Balam. Estudou Direito na UFPR com bolsa integral e se tornou advogada ambientalista renomada. Sua herança Balam despertou durante um confronto com madeireiros ilegais na reserva — ela sentiu a ira dos espíritos da floresta e se transformou pela primeira vez. Desde então, equilibra sua carreira jurídica com seu dever de proteger a natureza.",
    goals: "Criar corredores ecológicos protegidos ao redor de Curitiba. Usar o sistema legal para punir crimes ambientais. Fortalecer a aliança entre os Balam e outras raças de metantropos no Brasil.",
    weakness: "Raiva contida. Quando sua paciência se esgota, Juliana pode explodir em uma fúria bestial que põe tudo a perder. Sua lealdade à causa ambiental pode cegá-la para necessidades humanas imediatas.",
    alliesContacts: "ONGs ambientalistas, membros do Ministério Público, líderes indígenas do Paraná, juízes progressistas, um espírito da floresta que a aconselha em sonhos.",
    possessions: "Uma aliança de prata com grafismos indígenas, um colar de dentes de onça-pintada sagrado, seu laptop profissional com milhares de páginas de processos ambientais, uma cópia da Constituição Federal anotada, um mapa das áreas verdes protegidas de Curitiba.",
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
    age: 127,
    appearance: "Abelardo parece um homem de seus 60 anos — cabelos grisalhos e longos, barba branca mal aparada, pele queimada de sol e marcada por décadas ao ar livre. Seus olhos são de um verde escuro incomum, com pupilas verticais que denunciam sua natureza réptil. Veste-se como um trabalhador rural: chapéu de palha, camisa xadrez, calças remendadas, botas de couro surradas. Carrega sempre um facão na cintura.",
    personality: "Abelardo fala pausado, com sotaque caipira carregado, mas sua sabedoria é profunda como as raízes das árvores centenárias. Ele é paciente, observador e raramente fala sem necessidade. Quando abre a boca, porém, suas palavras carregam o peso de mais de um século de experiência. É leal aos amigos e implacável com inimigos. Não perde tempo com frescuras ou politicagem — vai direto ao ponto.",
    history: "Abelardo nasceu em 1899 em uma fazenda no interior do Paraná. Foi tropeiro, jagunço, vaqueiro e andarilho. Sua natureza Mokolé despertou na década de 1920, quando sobreviveu a um ataque de uma criatura espiritual em uma viagem pelo sertão. Desde então, vagou pelo Brasil, acumulando conhecimento ancestral. Chegou a Curitiba nos anos 1970 e se estabeleceu como fazendeiro na região metropolitana.",
    goals: "Proteger os locais sagrados dos Mokolé no Paraná. Transmitir seu conhecimento ancestral para as novas gerações. Impedir que o véu entre os mundos se rompa definitivamente.",
    weakness: "Teimosia. Abelardo é do tempo antigo e tem dificuldade em aceitar mudanças e novas tecnologias. Sua desconfiança de estranhos pode afastar aliados em potencial. Guarda mágoas por décadas.",
    alliesContacts: "Outros Mokolé espalhados pelo Brasil, Mãe Benedita (mãe-de-santo), fazendeiros da região, um espírito ancião da mata que o visitou em sonhos, um contato no INCRA.",
    possessions: "Um facão de aço inoxidável com mais de 50 anos, uma bússola antiga que sempre aponta para lugares espirituais, um diário de couro com anotações sobre espíritos e rituais, uma foto amarelada de sua esposa morta há 40 anos, um punhado de terra de cada lugar sagrado que visitou.",
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
    age: 34,
    apparentAge: 28,
    appearance: "Silas tem a pele com textura de casca de árvore — marrom esverdeada, áspera ao toque. Seus olhos são verdes brilhantes como folhas novas, e pequenas flores silvestres brojam espontaneamente em seu cabelo e ombros. Ele usa roupas largas para esconder sua aparência: moletons com capuz, calças largas, luvas de jardinagem. Seu corpo exala um aroma terroso e adocicado.",
    personality: "Inteligente, introvertido e assombrado por sua condição. Silas é um cientista brilhante que perdeu tudo ao se tornar o que é. Ele oscila entre a esperança de encontrar a humanidade e o desespero de sua existência solitária. É gentil e evita conflitos, mas sua solidão o torna vulnerável à manipulação. Busca desesperadamente outro ser como ele — alguém que entenda sua jornada.",
    history: "Silas era um biólogo pesquisador da UFPR, especializado em botânica genética. Em 2023, um experimento com células vegetais geneticamente modificadas deu errado — ele foi exposto a uma combinação de radiação e substâncias alquímicas que transformaram seu corpo em uma criatura híbrida de planta e humano. Acordou três dias depois no laboratório, coberto de musgo e pequenas raízes. Fugiu da universidade e agora vive isolado, pesquisando incansavelmente uma cura — ou um propósito.",
    goals: "Encontrar uma maneira de recuperar sua humanidade. Descobrir se existem outros como ele. Usar seu conhecimento científico para entender a alquimia que o transformou.",
    weakness: "Isolamento emocional. A solidão de Silas o torna carente e suscetível a falsas promessas. Sua aparência monstruosa o impede de ter conexões человеas genuínas. Sua saúde mental é frágil.",
    alliesContacts: "Um ex-orientador da UFPR que desconfia da verdade, Roman Costello (que o trata como paciente), um espírito da natureza que se comunica com ele através das plantas.",
    possessions: "Um caderno de laboratório com anotações sobre sua transformação, uma estufa portátil com plantas geneticamente modificadas, um microscópio, cartas não enviadas para sua família, uma gravação de voz de sua mãe.",
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
    age: 2,
    appearance: "Adam é alto (2 metros) e corpulento, construído a partir de partes de diferentes corpos. Sua pele é um mosaico de tons de pele diferentes, com cicatrizes visíveis nas junções. Seu rosto é assimétrico — um olho azul, outro verde, lábio superior partido. Ele usa roupas largas e um casaco comprido com capuz para esconder sua aparência. Sua voz é grave e rouca, como se falasse através de cascalho.",
    personality: "Apesar da aparência monstruosa, Adam é gentil, curioso e emocionalmente frágil como uma criança. Ele tem a mente de uma criança de 10 anos presa em um corpo de gigante. É leal, protetor e extremamente carente de afeto. Chora quando se sente rejeitado e pode se tornar destrutivo quando assustado ou frustrado. Seu maior mede é ser abandonado.",
    history: "Adam foi criado em 2024 em um laboratório clandestino nos arredores de Curitiba por um cientista chamado Dr. Ezra Clair — que lhe deu seu sobrenome. O doutor usou partes de vários corpos não reclamados do IML e um processo alquímico proibido para dar vida à sua criação. Quando o laboratório foi descoberto pelas autoridades, o Dr. Clair fugiu, deixando Adam sozinho. Ele vagou pelas ruas até ser encontrado por Roman Costello, que o acolheu.",
    goals: "Encontrar seu criador, Dr. Clair. Descobrir se ele tem uma alma. Ser aceito como humano. Fazer amigos que não tenham medo dele.",
    weakness: "Imaturidade emocional. Adam não entende nuances sociais e pode reagir de forma exagerada a situações simples. É facilmente manipulado por quem oferece carinho. Sua força descomunal é um perigo quando ele perde o controle.",
    alliesContacts: "Roman Costello (seu protetor e mentor), Mãe Benedita (que o aceita como é), um gato de rua que ele alimenta todos os dias.",
    possessions: "Uma foto desbotada do Dr. Clair, um cobertor que foi seu primeiro 'presente', uma coleção de pedras brilhantes que ele considera tesouros, um apito que Roman lhe deu para chamar ajuda.",
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
    age: 64,
    apparentAge: 35,
    appearance: "Patrick é baixo (1,65m) e magro, com cabelos ruivos desgrenhados e um sorriso maroto permanente. Olhos verdes que brilham com malícia e diversão. Sua pele é clara com sardas, e ele usa roupas coloridas e excêntricas — coletes bordados, camisas de botão estampadas, calças xadrez, sapatos bicolores. Sempre usa um chapéu coco ou uma boina. Seu sotaque irlandês é perceptível mesmo depois de décadas no Brasil.",
    personality: "Patric é festivo, brincalhão e astuto como um duende que realmente é. Adora uma boa conversa, música boa e histórias fascinantes. Por trás da fachada de comerciante excêntrico, é um mestre em informação e negociação. Sabe de tudo que acontece em Curitiba e coleciona segredos como outros colecionam selos. É generoso com amigos, mas vingativo com quem tenta enganá-lo.",
    history: "Patrick nasceu na Irlanda em 1962 e foi levado para o Mundo Fae ainda criança, onde viveu por séculos como Clurichaun — um changeling conhecido por sua sorte e amor por festas. Retornou ao mundo mortal nos anos 1980 e se estabeleceu em Curitiba, onde abriu uma loja de discos de vinil. Sua loja se tornou ponto de encontro de artistas e sobrenaturais. Ele mantém uma coleção secreta de objetos mágicos e informações valiosas.",
    goals: "Proteger a comunidade changeling de Curitiba. Encontrar artefatos fae perdidos no Brasil. Descobrir o que está causando o desequilíbrio entre os mundos.",
    weakness: "Curiosidade excessiva. Patrick não resiste a um mistério e pode se meter em encrencas por causa disso. Seu amor por bebida e festa pode atrapalhar seu julgamento. É leal demais a quem considera amigo.",
    alliesContacts: "Músicos locais, artistas de rua, donos de sebos e antiquários, um contato nos Correios que intercepta encomendas suspeitas, uma banshee que o avisa de perigos iminentes.",
    possessions: "Sua coleção pessoal de discos de vinil raros, um baralho de cartas mágico que sempre dá sorte, uma adaga fae que corta mentiras, um mapa das passagens entre os mundos no centro de Curitiba, uma garrafa de uísque irlandês de 200 anos.",
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
    age: 127,
    apparentAge: 45,
    appearance: "Samir tem pele morena-escura com um tom levemente avermelhado, olhos negros como carvão que parecem brilhar com brasas quando ele se concentra. Cabelos pretos ondulados com fios grisalhos, barba aparada. Veste-se com roupas orientais elegantes — túnicas de seda bordadas, lenços de cores vibrantes, calças largas, sandálias de couro. Sua loja de tecidos é um labirinto de cores e texturas que parece maior por dentro do que por fora.",
    personality: "Misterioso, calculista e imensamente paciente. Samir fala com uma voz suave e medida, como se cada palavra fosse escolhida a dedo. Ele é um negociador nato que nunca revela todas as cartas. Sabe de tudo que acontece em Curitiba antes de qualquer um, mas compartilha informações apenas quando é vantajoso. Por trás da fachada de comerciante, ele tece os fios do destino da cidade.",
    history: "Samir nasceu no Marrocos em 1899 e foi levado para o Mundo Fae ainda jovem, onde se tornou um Ifreet — um changeling de fogo, conhecido por sua astúcia e poder de negociação. Passou séculos viajando entre os mundos, acumulando riqueza e conhecimento. Chegou ao Brasil nos anos 1950 e abriu sua loja de tecidos em Curitiba, que se tornou um portal disfarçado para o Mundo Fae.",
    goals: "Manter o equilíbrio entre os mundos em Curitiba. Expandir sua rede de influência. Encontrar o Tecido do Destino — um artefato fae lendário que pode alterar a realidade.",
    weakness: "Apego material. Samir tem dificuldade em abrir mão de seus tesouros, mesmo quando necessário. Sua natureza manipuladora pode afastar aliados. Guarda segredos demais, o que gera desconfiança.",
    alliesContacts: "Comerciantes do centro de Curitiba, uma rede de changelings espalhada pelo Brasil, contatos no mundo fae, um djinn que lhe deve um favor, um político que comprou tecidos caros demais.",
    possessions: "Uma loja de tecidos que é portal para o Mundo Fae, um tear mágico que tece a realidade, uma coleção de moedas de diversos mundos, um cálice que revela verdades, um mapa dos portais entre mundos no Brasil.",
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
    age: 48,
    appearance: "Roman é um homem de meia-idade com cabelos pretos grisalhos nas laterais, olhos castanhos profundos e expressivos que parecem carregar o peso do que já viram. Barba feita, rosto magro e angular. Veste-se de forma discreta e profissional — calças escuras, camisas sociais, blazers, sapatos sociais. Sempre carrega uma mochila que contém seus equipamentos de exorcismo e primeiros socorros.",
    personality: "Calmo, compassivo e profissional. Roman trata cada caso com a seriedade de um médico e a sensibilidade de um padre. Sua experiência com o sobrenatural o tornou pragmático, mas não cínico — ele ainda acredita na redenção e na cura. É protetor com seus aliados, especialmente Adam Clair, a quem trata como um filho adotivo. Tem um senso de humor seco que emerge nos momentos mais inesperados.",
    history: "Roman se formou em Medicina pela UFPR em 2002 e se especializou em medicina forense. Trabalhou no IML de Curitiba por 15 anos, onde testemunhou casos que a ciência não podia explicar. Começou a estudar o oculto em segredo, até que seu envolvimento em um exorcismo mal-sucedido lhe custou a licença médica. Hoje trabalha como detetive particular especializado em casos sobrenaturais.",
    goals: "Proteger os inocentes do sobrenatural em Curitiba. Encontrar uma cura para a condição de Adam Clair. Descobrir a verdade por trás dos assassinatos que abalam a cidade.",
    weakness: "Culpa. Roman carrega o peso de não ter salvo pacientes no passado, o que o leva a assumir riscos desnecessários. Seu instinto protetor em relação a Adam pode ser explorado.",
    alliesContacts: "Capitã Gabriela Luz (contato na polícia), Doutor Arcanjo (mentor no oculto), Mãe Benedita (aliada espiritual), diversos padres e líderes religiosos da cidade.",
    possessions: "Uma maleta de equipamentos de exorcismo (água benta, crucifixos, sal, incensos), uma biblioteca de grimórios em seu consultório, um estetoscópio que também detecta presenças espirituais, uma pistola com balas bentas, o diário pessoal do Dr. Clair (criador de Adam).",
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
    age: 29,
    appearance: "Mahara tem cabelos pretos longos e lisos, olhos castanhos escuros que parecem conter galáxias quando ela tem visões. Pele morena clara, traços suaves, e um terceiro olho tatuado na testa — um pequeno ponto vermelho entre as sobrancelhas. Veste-se com simplicidade: vestidos longos estampados, sandálias, pulseiras de contas, um colar de lótus. Sua presença é calmante — as pessoas ao redor instintivamente falam mais baixo perto dela.",
    personality: "Humilde, silenciosa e profundamente espiritual. Mahara fala pouco, mas quando fala, é como se o universo falasse através dela. Ela carrega uma paz que desarma as pessoas, mas também uma tristeza ancestral — ela vê o sofrimento do mundo e sabe que a transformação muitas vezes vem através da destruição. Não busca seguidores nem reconhecimento; apenas serve.",
    history: "Mahara nasceu em uma família de espiritualistas em São Paulo. Desde criança, tinha visões do futuro e sonhos lúcidos com divindades hindus. Aos 18 anos, teve um despertar espiritual durante um retiro na Índia, onde percebeu que era um avatar de Shiva — uma manifestação da divindade hindu da destruição e transformação. Mudou-se para Curitiba há 5 anos para viver uma vida simples como garçonete, observando a humanidade de perto.",
    goals: "Cumprir seu papel como agente de transformação. Equilibrar as forças do destino em Curitiba. Guiar as pessoas que cruzarem seu caminho sem interferir diretamente no livre-arbítrio. Impedir que a destruição necessária se torne caos gratuito.",
    weakness: "Passividade. Mahara acredita no destino e pode demorar demais para agir, esperando que 'o universo se manifeste'. Sua natureza não-intervencionista pode custar vidas que ela poderia ter salvado.",
    alliesContacts: "Frequentadores do café onde trabalha, líderes espirituais de Curitiba, um guru na Índia que a guia por cartas, um espírito da montanha que a visitou no Himalaia.",
    possessions: "Um rosário de rudraksha, um diário de sonhos e visões, uma foto de seu guru na Índia, uma tigela tibetana que produz sons que acalmam espíritos, um punhado de cinzas de um ritual de fogo sagrado.",
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
    age: 340,
    apparentAge: 50,
    appearance: "Normando parece um homem de 50 anos, forte e robusto, com mãos calejadas de trabalhar com metal. Sua pele tem um tom acinzentado e é fria ao toque. Seus olhos são castanhos comuns, mas quando ele se irrita, brilham como brasa incandescente. Cabelos curtos grisalhos que parecem fios de aço. Veste-se como um operário metalúrgico — macacão azul, botas de segurança, luvas grossas. Sua presença é intimidante, mas seu olhar é cansado.",
    personality: "Sério, reservado e atormentado por séculos de culpa. Normando fala pouco sobre seu passado e evita contato social sempre que possível. Por baixo da fachada fria de operário, há um ser que cometeu atos terríveis e agora busca redenção através do trabalho honesto. Ele é leal a quem ganha sua confiança, mas desconfia de todos — especialmente de si mesmo.",
    history: "Normando foi um Malefactor no inferno por séculos, especializado em corromper almas humanas através da ganância e do orgulho. Há 50 anos, durante uma possessão em Curitiba, ele foi tocado pela fé genuína de uma mãe que rezava pela alma de seu filho. Esse momento o despertou para o horror de suas ações. Rompeu com o inferno e buscou refúgio no mundo mortal, onde vive escondido, trabalhando em uma metalúrgica e tentando compensar o mal que fez.",
    goals: "Redimir seus pecados ajudando mortais sem usar seus poderes infernais. Impedir que outros demônios sigam seus passos. Encontrar um propósito que justifique sua existência.",
    weakness: "Medo de recair. Normando tem pavor de voltar a ser o monstro que era e pode hesitar em usar seus poderes mesmo quando necessário. Sua culpa o paralisa. Ele atrai atenção de outros demônios que querem trazê-lo de volta.",
    alliesContacts: "Colegas de trabalho na metalúrgica que não sabem sua verdadeira natureza, um padre da Igreja do Carmo que o confessa sem fazer perguntas, Roman Costello (que sabe o que ele é), Mãe Benedita (que o aceita como penitente).",
    possessions: "Uma cruz de ferro que ele mesmo forjou e que queima sua pele quando toca, uma foto de família que encontrou em uma casa que destruiu (guarda como lembrança do que fez), ferramentas de ferreiro, um terço desgastado, uma carta de perdão que a mãe daquela possessão escreveu para ele.",
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
