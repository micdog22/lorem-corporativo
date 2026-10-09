/**
 * Lorem Corporativo: texto de preenchimento em corporatês.
 * Módulo puro (sem DOM): a mesma semente gera sempre o mesmo texto.
 */

export const TYPES = {
  paragrafos: 'Parágrafos',
  frases: 'Frases',
  palavras: 'Palavras',
  titulos: 'Títulos de slides',
  topicos: 'Lista de tópicos',
  email: 'E-mail de follow-up',
  post: 'Post motivacional',
};

export const INTENSITIES = {
  leve: 'Leve',
  moderado: 'Moderado',
  'reuniao-de-segunda': 'Reunião de segunda-feira',
};

export const LIMITS = { paragrafos: 50, frases: 100, palavras: 1000, titulos: 50, topicos: 50, email: 10, post: 10 };
export const DEFAULTS = { paragrafos: 3, frases: 5, palavras: 50, titulos: 5, topicos: 5, email: 1, post: 1 };
export const FORMATS = { texto: 'Texto', html: 'HTML' };

const LEVELS = { leve: 1, moderado: 2, 'reuniao-de-segunda': 3 };

// Partes de frase: [nível mínimo, texto]. 1 = leve, 2 = moderado, 3 = reunião de segunda-feira.
const OPENERS = [
  [1, 'Precisamos alinhar as expectativas'],
  [1, 'Vamos revisitar o planejamento'],
  [1, 'A equipe concluiu a primeira etapa'],
  [1, 'É importante ouvir todas as áreas'],
  [1, 'O cronograma foi atualizado'],
  [1, 'Cada área vai apresentar seus resultados'],
  [1, 'Combinamos uma nova rodada de conversas'],
  [1, 'O relatório mensal já está disponível'],
  [1, 'A diretoria aprovou a nova proposta'],
  [1, 'Organizamos as prioridades do time'],
  [2, 'Precisamos destravar as entregas'],
  [2, 'O time de produto vai mapear os gargalos'],
  [2, 'A liderança quer ver mais protagonismo'],
  [2, 'Vamos colocar o cliente no centro da estratégia'],
  [2, 'O comitê sugeriu um mergulho profundo nos indicadores'],
  [2, 'Precisamos sair da zona de conforto'],
  [2, 'O squad de inovação está prototipando soluções'],
  [2, 'O time de P&D apresentou uma nova abordagem'],
  [2, 'Vamos endereçar os pontos de atenção'],
  [2, 'É hora de pensar fora da caixa'],
  [3, 'Precisamos empoderar os stakeholders'],
  [3, 'Vamos fazer um deep dive no funil de valor'],
  [3, 'O board pediu um plano de ação disruptivo'],
  [3, 'Temos que pivotar o mindset da operação'],
  [3, 'Vamos rodar um brainstorming sobre o roadmap'],
  [3, 'Precisamos de mais ownership nas entregas'],
  [3, 'A ideia é capturar os famosos "quick wins"'],
  [3, 'Vamos escalar a cultura de feedback contínuo'],
  [3, 'O kickoff do projeto superou todas as expectativas'],
  [3, 'Precisamos gamificar a jornada do colaborador'],
];

const PURPOSES = [
  [1, 'para melhorar a comunicação entre as áreas'],
  [1, 'para entregar mais valor ao cliente'],
  [1, 'para ganhar agilidade'],
  [1, 'para organizar melhor as próximas etapas'],
  [1, 'com o objetivo de reduzir o retrabalho'],
  [2, 'para alavancar as sinergias'],
  [2, 'a fim de otimizar os processos'],
  [2, 'garantindo o engajamento de todos os envolvidos'],
  [2, 'para gerar resultados sustentáveis'],
  [2, 'com foco total na experiência do cliente'],
  [2, 'para acelerar a transformação digital'],
  [3, 'para potencializar o ecossistema de inovação'],
  [3, 'a fim de maximizar o retorno sobre o engajamento'],
  [3, 'garantindo o alinhamento estratégico de ponta a ponta'],
  [3, 'para destravar valor em escala exponencial'],
  [3, 'sem perder a sinergia transversal entre os squads'],
  [3, 'para materializar a visão de longo prazo da companhia'],
];

const COMPLEMENTS = [
  [1, 'no próximo trimestre'],
  [1, 'até o fim do mês'],
  [1, 'ainda nesta semana'],
  [1, 'de forma colaborativa'],
  [1, 'com calma e organização'],
  [1, 'antes da próxima reunião'],
  [2, 'de forma ágil e escalável'],
  [2, 'sem perder o foco no cliente'],
  [2, 'dentro do budget aprovado'],
  [2, 'até o fim da sprint'],
  [2, 'conforme alinhado na última call'],
  [2, 'com total transparência'],
  [3, 'de maneira holística e disruptiva'],
  [3, 'antes do fechamento do Q4'],
  [3, 'com mindset de dono'],
  [3, 'em todas as frentes ao mesmo tempo'],
  [3, 'na velocidade que o mercado exige'],
  [3, 'mesmo que isso exija uma reunião sobre reuniões'],
];

const QUESTIONS = [
  [1, 'Faz sentido para todo mundo?'],
  [1, 'Alguém tem alguma dúvida?'],
  [1, 'Podemos seguir com esse plano?'],
  [2, 'Conseguimos avançar com isso até sexta?'],
  [2, 'Quem pode puxar essa frente?'],
  [2, 'Tem algum ponto de atenção que ainda não mapeamos?'],
  [3, 'Será que não vale uma reunião para alinhar esta reunião?'],
  [3, 'Estamos todos na mesma página do roadmap?'],
  [3, 'Quem vai ser o dono dessa sinergia?'],
];

const INTERJECTIONS = [[2, 'Pessoal'], [2, 'Conforme combinado'], [2, 'Só reforçando'], [2, 'Sem mais delongas'], [2, 'Olha só']];
const CHAINS = [[2, '; além disso,'], [2, ', e'], [2, '; paralelamente,']];

const WORDS = [
  [1, 'planejamento'], [1, 'reunião'], [1, 'equipe'], [1, 'resultado'], [1, 'meta'], [1, 'projeto'],
  [1, 'cronograma'], [1, 'orçamento'], [1, 'cliente'], [1, 'processo'], [1, 'qualidade'], [1, 'relatório'],
  [1, 'prazo'], [1, 'estratégia'], [1, 'indicador'], [1, 'gestão'], [1, 'inovação'], [1, 'comunicação'],
  [1, 'colaboração'], [1, 'desempenho'], [1, 'liderança'], [1, 'objetivo'], [1, 'produtividade'],
  [1, 'eficiência'], [1, 'apresentação'], [1, 'organização'], [1, 'parceria'], [1, 'entrega'], [1, 'melhoria'],
  [1, 'análise'], [1, 'implementação'], [1, 'transformação'], [1, 'operacionalização'], [1, 'comprometimento'],
  [2, 'sinergia'], [2, 'alinhamento'], [2, 'engajamento'], [2, 'protagonismo'], [2, 'resiliência'],
  [2, 'governança'], [2, 'entregável'], [2, 'escalável'], [2, 'disruptivo'], [2, 'ecossistema'], [2, 'jornada'],
  [2, 'propósito'], [2, 'priorização'], [2, 'otimização'], [2, 'transversal'], [2, 'sustentável'],
  [2, 'proatividade'], [2, 'empoderamento'], [2, 'multidisciplinaridade'], [2, 'interdepartamental'],
  [2, 'acionável'], [2, 'benchmarking'], [2, 'feedback'], [2, 'workshop'], [2, 'stakeholders'],
  [3, 'mindset'], [3, 'roadmap'], [3, 'budget'], [3, 'kickoff'], [3, 'deadline'], [3, 'onboarding'],
  [3, 'brainstorming'], [3, 'ownership'], [3, 'insight'], [3, 'pipeline'], [3, 'follow-up'], [3, 'sprint'],
  [3, 'squad'], [3, 'framework'], [3, 'compliance'], [3, 'networking'], [3, 'upskilling'], [3, 'OKR'],
  [3, 'KPI'], [3, 'holístico'], [3, 'exponencial'], [3, 'gamificação'],
];

const TITLE_NOUNS = [
  [1, 'Planejamento', 'm'], [1, 'Estratégia', 'f'], [1, 'Inovação', 'f'], [1, 'Gestão', 'f'],
  [1, 'Resultado', 'm'], [1, 'Cultura', 'f'], [2, 'Sinergia', 'f'], [2, 'Alinhamento', 'm'],
  [2, 'Engajamento', 'm'], [2, 'Protagonismo', 'm'], [2, 'Governança', 'f'], [2, 'Jornada', 'f'],
  [3, 'Mindset', 'm'], [3, 'Roadmap', 'm'], [3, 'Ownership', 'm'], [3, 'Performance', 'f'],
];
const TITLE_ADJECTIVES = [
  [1, 'Integrado', 'Integrada'], [1, 'Sustentável', 'Sustentável'], [1, 'Colaborativo', 'Colaborativa'],
  [2, 'Estratégico', 'Estratégica'], [2, 'Ágil', 'Ágil'], [2, 'Contínuo', 'Contínua'],
  [3, 'Disruptivo', 'Disruptiva'], [3, 'Exponencial', 'Exponencial'], [3, 'Holístico', 'Holística'],
];
const TITLE_TAILS = [
  [1, 'Próximos Passos'], [1, 'Onde Estamos'], [1, 'Resultados do Trimestre'], [1, 'Plano de Ação'],
  [2, 'Aprendizados e Desafios'], [2, 'Visão 360'], [3, 'O Que Vem por Aí'], [3, 'Rumo ao Próximo Nível'],
];
const TITLE_VERBS = [
  [1, 'Organizar as Prioridades'], [1, 'Melhorar a Comunicação'], [1, 'Entregar Mais Valor'],
  [2, 'Alavancar as Sinergias'], [2, 'Engajar o Time'], [2, 'Acelerar Resultados'],
  [3, 'Destravar Valor'], [3, 'Escalar a Operação'], [3, 'Encantar o Stakeholder'],
];
const TITLE_SHORT_COMPLEMENTS = [
  [1, 'no Próximo Trimestre'], [1, 'de Forma Sustentável'], [1, 'em Tempos de Mudança'],
  [2, 'sem Perder o Foco'], [2, 'com Menos Reuniões'], [3, 'na Velocidade do Mercado'],
];
const FIXED_TITLES = [
  [1, 'Visão Geral do Trimestre'], [1, 'Lições Aprendidas'], [1, 'Agenda do Dia'],
  [1, 'Resultados e Aprendizados'], [2, 'Da Estratégia à Execução'], [2, 'Do Insight ao Impacto'],
  [3, 'Sinergias em Escala Exponencial'], [3, 'Reunião de Alinhamento Sobre Alinhamentos'],
];

const ACTIONS = [
  [1, 'Revisar o cronograma'], [1, 'Atualizar o relatório mensal'], [1, 'Agendar a reunião de acompanhamento'],
  [1, 'Definir os responsáveis por cada etapa'], [1, 'Compartilhar a apresentação com o time'],
  [1, 'Validar o orçamento com o financeiro'], [1, 'Organizar a pauta da próxima reunião'],
  [1, 'Registrar as decisões em ata'],
  [2, 'Mapear os gargalos do processo'], [2, 'Alinhar expectativas com os stakeholders'],
  [2, 'Priorizar as entregas de maior impacto'], [2, 'Revisitar os indicadores de engajamento'],
  [2, 'Endereçar os pontos de atenção'], [2, 'Consolidar os aprendizados do ciclo'],
  [3, 'Fazer um deep dive no funil de valor'], [3, 'Rodar um brainstorming sobre o roadmap'],
  [3, 'Destravar os quick wins da sprint'], [3, 'Escalar a cultura de ownership'],
  [3, 'Marcar uma reunião para preparar a próxima reunião'], [3, 'Gamificar a jornada de onboarding'],
];
const DEADLINES = ['até sexta-feira', 'até o fim da sprint', 'na próxima semana', 'antes do comitê', 'até o fim do trimestre'];

const SUBJECTS = [
  [1, 'Resumo da reunião de hoje'], [1, 'Próximos passos do projeto'], [1, 'Follow-up: alinhamento do trimestre'],
  [2, 'Follow-up: pontos de atenção da sprint'], [2, 'Ação necessária: validação do cronograma'],
  [3, 'Re: Re: Re: alinhamento sobre o alinhamento'], [3, 'Urgente: kickoff do kickoff da iniciativa'],
];
const GREETINGS = ['Olá, pessoal,', 'Oi, time,', 'Bom dia a todos,', 'Prezados,'];
const EMAIL_OPENINGS = [
  'Conforme alinhado na reunião de hoje, seguem os principais pontos.',
  'Passando para dar um follow-up sobre o tema que conversamos.',
  'Retomando nossa conversa, compartilho abaixo um breve resumo.',
  'Só para registrar o que combinamos na última call.',
];
const EMAIL_CLOSINGS = [
  'Fico à disposição para qualquer dúvida.',
  'Fico no aguardo de um retorno até o fim do dia.',
  'Se fizer sentido, podemos marcar uma call rápida para alinhar.',
  'Contamos com o engajamento de todos!',
];
const SIGNOFFS = ['Abraços,', 'Atenciosamente,', 'Um abraço,', 'Obrigado,'];
const SIGNATURES = [
  'Coordenação de Projetos Estratégicos', 'Gerência de Alinhamento Contínuo', 'Comitê de Sinergias',
  'Diretoria de Inovação e Futuro', 'Núcleo de Excelência em Reuniões',
];

const HOOKS = [
  'Às 5h da manhã, antes do primeiro café, tive uma reflexão que mudou minha carreira.',
  'Ninguém fala sobre isso, mas precisamos falar sobre alinhamento.',
  'Meu estagiário me ensinou mais sobre liderança do que muitos cursos.',
  'Fui recusado em 37 processos seletivos. No 38º, entendi o poder da resiliência.',
  'Ontem, na fila do café, uma conversa de dois minutos virou um grande insight.',
  'Este post não é sobre café. É sobre propósito.',
];
const LESSON_INTROS = ['E foi aí que eu entendi:', 'A lição?', 'Moral da história:', 'O que aprendi com isso:'];
const LESSONS = [
  'resiliência não é um destino, é uma jornada.',
  'quem alinha expectativas colhe sinergias.',
  'liderar é servir, inclusive o café da reunião.',
  'feedback é um presente, mesmo quando vem embrulhado em planilha.',
  'toda crise é uma oportunidade disfarçada de reunião.',
  'o maior KPI é a gratidão.',
];
const CALLS_TO_ACTION = [
  'Concorda? Comenta aqui embaixo 👇',
  'E você, já alavancou suas sinergias hoje?',
  'Faz sentido para você? Compartilhe com a sua rede.',
  'Marque aquele colega que vive alinhando expectativas.',
];
const HASHTAGS = [
  '#liderança', '#inovação', '#sinergia', '#gestão', '#carreira', '#propósito', '#resiliência', '#mindset',
  '#gratidão', '#produtividade',
];
const EMOJI = ['🚀', '💡', '🔥', '✨', '🙌'];

/** Gerador pseudoaleatório mulberry32 (32 bits). Devolve uma função que gera números em [0, 1). */
export function mulberry32(seed) {
  let state = seed >>> 0;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Converte números ou textos em uma semente de 32 bits ("42" e 42 dão o mesmo resultado). */
export function normalizeSeed(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.trunc(value) >>> 0;
  const text = String(value ?? '').trim();
  if (/^\d{1,10}$/.test(text) && Number(text) <= 0xffffffff) return Number(text);
  let hash = 0x811c9dc5;
  for (const char of text) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/** Semente aleatória usando crypto.getRandomValues. */
export function randomSeed() {
  return globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
}

function createPicker(random, level) {
  const int = (min, max) => min + Math.floor(random() * (max - min + 1));
  const chance = (probability) => random() < probability;
  const pick = (list) => list[Math.floor(random() * list.length)];
  // Nas intensidades maiores, as partes mais "corporativas" aparecem com mais frequência.
  // "avoid" evita repetir partes já usadas na mesma frase ou parágrafo, e "context"
  // evita partes que repetem palavras do trecho anterior ("foco ... foco no cliente").
  const pickLeveled = (entries, avoid, context = '') => {
    const allowed = entries.filter(([min]) => min <= level);
    const top = allowed.filter(([min]) => min === level);
    let pool = top.length && chance(0.6) ? top : allowed;
    const taken = keywords(context);
    const repeats = (text) => taken.size > 0 && [...keywords(text)].some((word) => taken.has(word));
    const usable = (list) => list.filter(([, text]) => !(avoid && avoid.has(text)) && !repeats(text));
    pool = usable(pool).length ? usable(pool) : usable(allowed).length ? usable(allowed) : pool;
    const choice = pick(pool);
    if (avoid) avoid.add(choice[1]);
    return choice;
  };
  // Sorteio sem repetição; as partes do nível escolhido têm peso maior.
  const pickDistinct = (entries, count) => {
    const pool = entries.filter(([min]) => min <= level);
    const weight = ([min]) => (level > 1 && min === level ? 2 : 1);
    const chosen = [];
    let available = [...pool];
    for (let i = 0; i < count; i++) {
      if (!available.length) available = [...pool];
      let ticket = random() * available.reduce((sum, entry) => sum + weight(entry), 0);
      let index = 0;
      while (index < available.length - 1 && ticket >= weight(available[index])) {
        ticket -= weight(available[index]);
        index++;
      }
      chosen.push(available.splice(index, 1)[0]);
    }
    return chosen;
  };
  return { int, chance, pick, pickLeveled, pickDistinct };
}

const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);
const upperFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const COMMON_WORDS = new Set(['para', 'como', 'isso', 'esta', 'este', 'essa', 'esse']);

function keywords(text) {
  const words = String(text).toLowerCase().match(/\p{L}{4,}/gu) || [];
  return new Set(words.filter((word) => !COMMON_WORDS.has(word)));
}

function clause(p, level, used, context = '') {
  const parts = [p.pickLeveled(OPENERS, used, context)[1]];
  const purposeChance = [0, 0.3, 0.8, 1][level];
  const complementChance = [0, 0.6, 0.8, 1][level];
  if (p.chance(purposeChance)) parts.push(p.pickLeveled(PURPOSES, used, `${context} ${parts.join(' ')}`)[1]);
  if (p.chance(complementChance)) parts.push(p.pickLeveled(COMPLEMENTS, used, `${context} ${parts.join(' ')}`)[1]);
  return parts.join(' ');
}

function sentence(p, level, used = new Set(), allowQuestion = true) {
  if (allowQuestion && level > 1 && p.chance(level === 3 ? 0.12 : 0.08)) return p.pickLeveled(QUESTIONS, used)[1];
  let text = clause(p, level, used);
  if (level > 1 && p.chance(level === 3 ? 0.35 : 0.1)) {
    text += `${p.pickLeveled(CHAINS, used)[1]} ${lowerFirst(clause(p, level, used, text))}`;
  }
  if (level > 1 && p.chance(level === 3 ? 0.3 : 0.1)) {
    text = `${p.pickLeveled(INTERJECTIONS, used)[1]}, ${lowerFirst(text)}`;
  }
  const exclamation = p.chance([0, 0, 0.08, 0.2][level]);
  return `${upperFirst(text)}${exclamation ? '!' : '.'}`;
}

// Sequência de frases: nunca começa com pergunta nem traz duas perguntas seguidas.
function sentences(p, level, count, resetEvery = Infinity) {
  const list = [];
  let used = new Set();
  let previousQuestion = true;
  for (let i = 0; i < count; i++) {
    if (i > 0 && i % resetEvery === 0) used = new Set();
    const text = sentence(p, level, used, !previousQuestion);
    previousQuestion = text.endsWith('?');
    list.push(text);
  }
  return list;
}

function paragraph(p, level) {
  const [min, max] = [[0, 0], [3, 4], [4, 5], [5, 6]][level];
  return sentences(p, level, p.int(min, max)).join(' ');
}

function words(p, level, count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    let word = p.pickLeveled(WORDS)[1];
    if (word === list[list.length - 1]) word = p.pickLeveled(WORDS)[1];
    list.push(word);
  }
  return `${upperFirst(list.join(' '))}.`;
}

function title(p, level) {
  const kind = p.int(0, 3);
  if (kind === 0) {
    const [, noun, gender] = p.pickLeveled(TITLE_NOUNS);
    let adjective;
    do {
      const [, masculine, feminine] = p.pickLeveled(TITLE_ADJECTIVES);
      adjective = gender === 'f' ? feminine : masculine;
    } while (adjective.startsWith(noun.slice(0, 5)));
    return `${noun} ${adjective}: ${p.pickLeveled(TITLE_TAILS)[1]}`;
  }
  if (kind === 1) return `Como ${p.pickLeveled(TITLE_VERBS)[1]} ${p.pickLeveled(TITLE_SHORT_COMPLEMENTS)[1]}`;
  if (kind === 2) return `${p.int(3, 7)} Pilares para ${p.pickLeveled(TITLE_VERBS)[1]}`;
  return p.pickLeveled(FIXED_TITLES)[1];
}

function topics(p, level, count) {
  return p.pickDistinct(ACTIONS, count).map(([, action]) => (p.chance(0.5) ? `${action} ${p.pick(DEADLINES)}` : action));
}

function email(p, level) {
  const paragraphs = [p.pick(EMAIL_OPENINGS)];
  for (let i = level === 3 ? 2 : 1; i > 0; i--) paragraphs.push(sentences(p, level, p.int(2, 3)).join(' '));
  return {
    type: 'email',
    subject: p.pickLeveled(SUBJECTS)[1],
    greeting: p.pick(GREETINGS),
    paragraphs,
    listTitle: 'Próximos passos:',
    items: topics(p, level, level === 3 ? 4 : 3),
    closing: p.pick(EMAIL_CLOSINGS),
    signoff: p.pick(SIGNOFFS),
    signature: p.pick(SIGNATURES),
  };
}

function post(p, level) {
  let hook = p.pick(HOOKS);
  if (level === 3) hook += ` ${p.pick(EMOJI)}`;
  const lines = [hook];
  if (level > 1) lines.push(sentence(p, level, new Set(), false));
  lines.push(`${p.pick(LESSON_INTROS)} ${p.pick(LESSONS)}`);
  if (level === 3) lines.push(`Gratidão por fazer parte dessa jornada ${p.pick(EMOJI)}`);
  lines.push(p.pick(CALLS_TO_ACTION));
  const hashtags = p.pickDistinct(HASHTAGS.map((tag) => [1, tag]), [0, 2, 3, 5][level]).map(([, tag]) => tag);
  return { type: 'post', lines, hashtags };
}

function checkOptions({ tipo, quantidade, intensidade, formato }) {
  if (!Object.hasOwn(TYPES, tipo)) {
    throw new TypeError(`Tipo desconhecido: ${tipo}. Use um destes: ${Object.keys(TYPES).join(', ')}.`);
  }
  if (!Object.hasOwn(LEVELS, intensidade)) {
    throw new TypeError(`Intensidade desconhecida: ${intensidade}. Use: ${Object.keys(LEVELS).join(', ')}.`);
  }
  if (!Object.hasOwn(FORMATS, formato)) {
    throw new TypeError(`Formato desconhecido: ${formato}. Use texto ou html.`);
  }
  const count = Number(quantidade);
  if (!Number.isInteger(count) || count < 1 || count > LIMITS[tipo]) {
    throw new RangeError(`A quantidade deve ser um número inteiro de 1 a ${LIMITS[tipo]}.`);
  }
  return count;
}

/**
 * Gera o conteúdo em blocos (útil para montar a visualização).
 * Devolve { seed, blocks }.
 */
export function generateBlocks({ tipo = 'paragrafos', quantidade, intensidade = 'moderado', semente, formato = 'texto' } = {}) {
  const count = checkOptions({ tipo, quantidade: quantidade ?? DEFAULTS[tipo], intensidade, formato });
  const empty = semente === undefined || semente === null || String(semente).trim() === '';
  const seed = empty ? randomSeed() : normalizeSeed(semente);
  const level = LEVELS[intensidade];
  const p = createPicker(mulberry32(seed), level);
  const blocks = [];
  if (tipo === 'paragrafos') {
    for (let i = 0; i < count; i++) blocks.push({ type: 'paragraph', text: paragraph(p, level) });
  } else if (tipo === 'frases') {
    blocks.push({ type: 'paragraph', text: sentences(p, level, count, 5).join(' ') });
  } else if (tipo === 'palavras') {
    blocks.push({ type: 'paragraph', text: words(p, level, count) });
  } else if (tipo === 'titulos') {
    for (let i = 0; i < count; i++) blocks.push({ type: 'heading', text: title(p, level) });
  } else if (tipo === 'topicos') {
    blocks.push({ type: 'list', items: topics(p, level, count) });
  } else if (tipo === 'email') {
    for (let i = 0; i < count; i++) blocks.push(email(p, level));
  } else {
    for (let i = 0; i < count; i++) blocks.push(post(p, level));
  }
  return { seed, blocks };
}

/** Escapa texto para HTML. */
export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const bullets = (items) => items.map((item) => `• ${item}`).join('\n');

/** Texto puro: parágrafos separados por linha em branco, listas com "•". */
export function renderText(blocks) {
  const rendered = blocks.map((block) => {
    if (block.type === 'paragraph' || block.type === 'heading') return block.text;
    if (block.type === 'list') return bullets(block.items);
    if (block.type === 'email') {
      return [
        `Assunto: ${block.subject}`,
        block.greeting,
        ...block.paragraphs,
        `${block.listTitle}\n${bullets(block.items)}`,
        block.closing,
        `${block.signoff}\n${block.signature}`,
      ].join('\n\n');
    }
    return [...block.lines, block.hashtags.join(' ')].join('\n\n');
  });
  const first = blocks[0]?.type;
  const separator = first === 'heading' ? '\n' : first === 'email' || first === 'post' ? '\n\n---\n\n' : '\n\n';
  return rendered.join(separator);
}

const listHtml = (items, indent = '') =>
  [`${indent}<ul>`, ...items.map((item) => `${indent}  <li>${escapeHtml(item)}</li>`), `${indent}</ul>`].join('\n');

/** HTML com <p>, <h2>, <ul> e <article>, com todo o texto escapado. */
export function renderHtml(blocks) {
  return blocks
    .map((block) => {
      if (block.type === 'paragraph') return `<p>${escapeHtml(block.text)}</p>`;
      if (block.type === 'heading') return `<h2>${escapeHtml(block.text)}</h2>`;
      if (block.type === 'list') return listHtml(block.items);
      const inner =
        block.type === 'email'
          ? [
              `  <p><strong>Assunto:</strong> ${escapeHtml(block.subject)}</p>`,
              `  <p>${escapeHtml(block.greeting)}</p>`,
              ...block.paragraphs.map((text) => `  <p>${escapeHtml(text)}</p>`),
              `  <p>${escapeHtml(block.listTitle)}</p>`,
              listHtml(block.items, '  '),
              `  <p>${escapeHtml(block.closing)}</p>`,
              `  <p>${escapeHtml(block.signoff)}<br>${escapeHtml(block.signature)}</p>`,
            ]
          : [
              ...block.lines.map((line) => `  <p>${escapeHtml(line)}</p>`),
              `  <p>${escapeHtml(block.hashtags.join(' '))}</p>`,
            ];
      return ['<article>', ...inner, '</article>'].join('\n');
    })
    .join('\n');
}

/**
 * Gera o texto de preenchimento.
 * Opções: tipo (paragrafos, frases, palavras, titulos, topicos, email, post),
 * quantidade, intensidade (leve, moderado, reuniao-de-segunda), semente e
 * formato (texto ou html).
 */
export function gerar(options = {}) {
  const { blocks } = generateBlocks(options);
  return options.formato === 'html' ? renderHtml(blocks) : renderText(blocks);
}
