import {
  DEFAULTS,
  FORMATS,
  INTENSITIES,
  LIMITS,
  generateBlocks,
  normalizeSeed,
  randomSeed,
  renderHtml,
  renderText,
} from './lorem.js';

const STORAGE_KEY = 'lorem-corporativo:preferencias';
const UNITS = {
  paragrafos: ['parágrafo', 'parágrafos'],
  frases: ['frase', 'frases'],
  palavras: ['palavra', 'palavras'],
  titulos: ['título', 'títulos'],
  topicos: ['tópico', 'tópicos'],
  email: ['e-mail', 'e-mails'],
  post: ['post', 'posts'],
};

const form = document.getElementById('controles');
const typeSelect = document.getElementById('tipo');
const quantityInput = document.getElementById('quantidade');
const quantityHint = document.getElementById('quantidade-dica');
const seedInput = document.getElementById('semente');
const copyButton = document.getElementById('copiar');
const message = document.getElementById('mensagem');
const result = document.getElementById('resultado');
const status = document.getElementById('status');

let currentSeed = randomSeed();
let currentOutput = '';
let messageTimer;

const selected = (name) => form.querySelector(`input[name="${name}"]:checked`).value;

function check(name, value) {
  for (const input of form.querySelectorAll(`input[name="${name}"]`)) input.checked = input.value === value;
}

function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return;
    if (Object.hasOwn(LIMITS, saved.tipo)) typeSelect.value = saved.tipo;
    if (Object.hasOwn(INTENSITIES, saved.intensidade)) check('intensidade', saved.intensidade);
    if (Object.hasOwn(FORMATS, saved.formato)) check('formato', saved.formato);
    const limit = LIMITS[typeSelect.value];
    if (Number.isInteger(saved.quantidade) && saved.quantidade >= 1 && saved.quantidade <= limit) {
      quantityInput.value = String(saved.quantidade);
    } else {
      quantityInput.value = String(DEFAULTS[typeSelect.value]);
    }
  } catch {
    // Sem acesso ao localStorage (modo privado, por exemplo): segue com os padrões.
  }
}

function savePreferences(preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Preferências são só uma conveniência; ignorar falhas de gravação.
  }
}

function updateQuantityLimits(resetValue) {
  const tipo = typeSelect.value;
  quantityInput.max = String(LIMITS[tipo]);
  quantityHint.textContent = `De 1 a ${LIMITS[tipo].toLocaleString('pt-BR')}.`;
  if (resetValue) quantityInput.value = String(DEFAULTS[tipo]);
}

function showMessage(text, isError = false) {
  clearTimeout(messageTimer);
  message.textContent = text;
  message.classList.toggle('error', isError);
  if (!isError && text) messageTimer = setTimeout(() => { message.textContent = ''; }, 3000);
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function listElement(items) {
  const list = element('ul');
  for (const item of items) list.append(element('li', item));
  return list;
}

function blockElement(block) {
  if (block.type === 'paragraph') return element('p', block.text);
  if (block.type === 'heading') return element('h3', block.text, 'slide-title');
  if (block.type === 'list') return listElement(block.items);
  const article = element('article', undefined, block.type);
  if (block.type === 'email') {
    const subject = element('p', undefined, 'subject');
    subject.append(element('strong', 'Assunto:'), ` ${block.subject}`);
    article.append(subject, element('p', block.greeting));
    for (const text of block.paragraphs) article.append(element('p', text));
    article.append(element('p', block.listTitle), listElement(block.items), element('p', block.closing));
    const signature = element('p');
    signature.append(block.signoff, element('br'), block.signature);
    article.append(signature);
  } else {
    for (const line of block.lines) article.append(element('p', line));
    article.append(element('p', block.hashtags.join(' '), 'hashtags'));
  }
  return article;
}

function renderPreview(blocks, formato) {
  if (formato === 'html') {
    const pre = element('pre', undefined, 'code');
    pre.append(element('code', currentOutput));
    result.replaceChildren(pre);
  } else {
    result.replaceChildren(...blocks.map(blockElement));
  }
}

function generate({ newSeed = false } = {}) {
  const tipo = typeSelect.value;
  const raw = quantityInput.value.trim();
  if (raw === '') return;
  const quantidade = Number(raw);
  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > LIMITS[tipo]) {
    quantityInput.setAttribute('aria-invalid', 'true');
    showMessage(`Escolha uma quantidade de 1 a ${LIMITS[tipo].toLocaleString('pt-BR')}.`, true);
    return;
  }
  quantityInput.removeAttribute('aria-invalid');

  const typedSeed = seedInput.value.trim();
  if (typedSeed) currentSeed = normalizeSeed(typedSeed);
  else if (newSeed) currentSeed = randomSeed();

  const intensidade = selected('intensidade');
  const formato = selected('formato');
  const { blocks } = generateBlocks({ tipo, quantidade, intensidade, semente: currentSeed, formato });
  currentOutput = formato === 'html' ? renderHtml(blocks) : renderText(blocks);
  renderPreview(blocks, formato);

  const [singular, plural] = UNITS[tipo];
  const seedLabel = typedSeed ? `semente "${typedSeed}"` : `semente ${currentSeed}`;
  status.textContent = `${quantidade} ${quantidade === 1 ? singular : plural} · ${currentOutput.length.toLocaleString('pt-BR')} caracteres · ${seedLabel}`;
  if (message.classList.contains('error')) showMessage('');
  savePreferences({ tipo, quantidade, intensidade, formato });
}

function fallbackCopy(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.append(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}

async function copyOutput() {
  if (!currentOutput) return;
  try {
    await navigator.clipboard.writeText(currentOutput);
    showMessage('Texto copiado!');
  } catch {
    if (fallbackCopy(currentOutput)) showMessage('Texto copiado!');
    else showMessage('Não foi possível copiar automaticamente. Selecione o texto e use Ctrl+C.', true);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  generate({ newSeed: true });
});
typeSelect.addEventListener('change', () => {
  updateQuantityLimits(true);
  generate();
});
quantityInput.addEventListener('input', () => generate());
seedInput.addEventListener('change', () => generate());
for (const radio of form.querySelectorAll('input[type="radio"]')) radio.addEventListener('change', () => generate());
copyButton.addEventListener('click', copyOutput);

loadPreferences();
updateQuantityLimits(false);
generate();
