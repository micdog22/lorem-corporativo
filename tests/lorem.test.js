import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULTS,
  INTENSITIES,
  LIMITS,
  TYPES,
  escapeHtml,
  gerar,
  generateBlocks,
  mulberry32,
  normalizeSeed,
  renderHtml,
} from '../src/lorem.js';

const INTENSITY_IDS = Object.keys(INTENSITIES);
const TYPE_IDS = Object.keys(TYPES);
const SENTENCE = /[^.!?]+[.!?](?=\s|$)/g;
const sentencesOf = (text) => text.match(SENTENCE).map((s) => s.trim());

test('mulberry32 é determinístico e fica entre 0 e 1', () => {
  const a = mulberry32(123);
  const b = mulberry32(123);
  const values = Array.from({ length: 1000 }, () => a());
  assert.deepEqual(values.slice(0, 5), Array.from({ length: 5 }, () => b()));
  assert.ok(values.every((v) => v >= 0 && v < 1));
  assert.ok(new Set(values).size > 990);
});

test('mesma semente gera o mesmo texto; sementes diferentes, textos diferentes', () => {
  for (const tipo of TYPE_IDS) {
    for (const intensidade of INTENSITY_IDS) {
      const options = { tipo, quantidade: DEFAULTS[tipo], intensidade, semente: 2026 };
      assert.equal(gerar(options), gerar(options), `${tipo}/${intensidade}`);
      assert.equal(gerar({ ...options, formato: 'html' }), gerar({ ...options, formato: 'html' }));
    }
  }
  assert.notEqual(gerar({ semente: 1 }), gerar({ semente: 2 }));
});

test('sementes em texto funcionam e "42" equivale a 42', () => {
  assert.equal(gerar({ semente: 'reunião de segunda' }), gerar({ semente: 'reunião de segunda' }));
  assert.equal(gerar({ semente: '42' }), gerar({ semente: 42 }));
  assert.equal(normalizeSeed(' 42 '), 42);
  assert.equal(normalizeSeed(-1), 4294967295);
  assert.notEqual(normalizeSeed('abc'), normalizeSeed('abd'));
});

test('sem semente, sorteia uma e informa qual foi usada', () => {
  const { seed, blocks } = generateBlocks({ tipo: 'paragrafos', quantidade: 2 });
  assert.ok(Number.isInteger(seed) && seed >= 0 && seed <= 0xffffffff);
  assert.equal(blocks.length, 2);
  assert.equal(gerar({ tipo: 'paragrafos', quantidade: 2, semente: seed }), gerar({ tipo: 'paragrafos', quantidade: 2, semente: String(seed) }));
});

test('respeita a quantidade de parágrafos, frases e palavras', () => {
  for (const intensidade of INTENSITY_IDS) {
    for (const quantidade of [1, 4, 9]) {
      const paragraphs = gerar({ tipo: 'paragrafos', quantidade, intensidade, semente: quantidade });
      assert.equal(paragraphs.split('\n\n').length, quantidade);
      const html = gerar({ tipo: 'paragrafos', quantidade, intensidade, semente: quantidade, formato: 'html' });
      assert.equal(html.match(/<p>/g).length, quantidade);

      const sentences = gerar({ tipo: 'frases', quantidade, intensidade, semente: quantidade });
      assert.equal(sentencesOf(sentences).length, quantidade, sentences);

      const words = gerar({ tipo: 'palavras', quantidade: quantidade * 7, intensidade, semente: quantidade });
      assert.equal(words.split(' ').length, quantidade * 7);
    }
  }
});

test('respeita a quantidade de títulos, tópicos, e-mails e posts', () => {
  assert.equal(gerar({ tipo: 'titulos', quantidade: 6, semente: 1 }).split('\n').length, 6);
  assert.equal(gerar({ tipo: 'topicos', quantidade: 7, semente: 1 }).split('\n').length, 7);
  assert.equal(gerar({ tipo: 'topicos', quantidade: 30, semente: 1, intensidade: 'leve' }).split('\n').length, 30);
  assert.equal(gerar({ tipo: 'email', quantidade: 3, semente: 1 }).match(/^Assunto: /gm).length, 3);
  assert.equal(gerar({ tipo: 'post', quantidade: 2, semente: 1, formato: 'html' }).match(/<article>/g).length, 2);
});

test('frases começam com maiúscula e terminam com pontuação', () => {
  for (const intensidade of INTENSITY_IDS) {
    for (let semente = 0; semente < 30; semente++) {
      const text = gerar({ tipo: 'paragrafos', quantidade: 3, intensidade, semente });
      for (const paragraph of text.split('\n\n')) {
        assert.match(paragraph, /^\p{Lu}/u);
        assert.match(paragraph, /[.!?]$/);
        for (const sentence of sentencesOf(paragraph)) assert.match(sentence, /^\p{Lu}/u, sentence);
      }
      const words = gerar({ tipo: 'palavras', quantidade: 5, intensidade, semente });
      assert.match(words, /^\p{Lu}.*\.$/u);
    }
  }
});

test('títulos e tópicos começam com maiúscula e não terminam com ponto', () => {
  for (const intensidade of INTENSITY_IDS) {
    const titles = gerar({ tipo: 'titulos', quantidade: 20, intensidade, semente: 5 }).split('\n');
    const items = gerar({ tipo: 'topicos', quantidade: 10, intensidade, semente: 5 }).split('\n');
    for (const line of titles) assert.match(line, /^[\p{Lu}\d].*[^.!?\s]$/u, line);
    for (const line of items) assert.match(line, /^• \p{Lu}.*[^.!?\s]$/u, line);
  }
});

test('nunca gera espaços duplos, espaço antes de pontuação ou espaços nas pontas', () => {
  for (const tipo of TYPE_IDS) {
    for (const intensidade of INTENSITY_IDS) {
      for (let semente = 0; semente < 15; semente++) {
        const text = gerar({ tipo, quantidade: Math.min(LIMITS[tipo], 4), intensidade, semente });
        assert.doesNotMatch(text, / {2}/, `${tipo}/${intensidade}/${semente}`);
        assert.doesNotMatch(text, / [.,;:!?]/);
        for (const line of text.split('\n')) assert.equal(line, line.trim());
      }
    }
  }
});

test('parágrafos não começam com pergunta nem têm duas perguntas seguidas', () => {
  for (const intensidade of INTENSITY_IDS) {
    for (let semente = 0; semente < 60; semente++) {
      const text = gerar({ tipo: 'paragrafos', quantidade: 3, intensidade, semente });
      for (const paragraph of text.split('\n\n')) {
        const list = sentencesOf(paragraph);
        assert.ok(!list[0].endsWith('?'), paragraph);
        for (let i = 1; i < list.length; i++) assert.ok(!(list[i].endsWith('?') && list[i - 1].endsWith('?')), paragraph);
      }
    }
  }
});

test('uma frase não repete a mesma ideia ("foco ... foco no cliente")', () => {
  for (let semente = 0; semente < 200; semente++) {
    const text = gerar({ tipo: 'frases', quantidade: 5, intensidade: 'reuniao-de-segunda', semente });
    for (const sentence of sentencesOf(text)) {
      for (const word of ['foco', 'cliente', 'sinergia', 'processos']) {
        const count = sentence.toLowerCase().split(/[^\p{L}]+/u).filter((w) => w === word).length;
        assert.ok(count <= 1, `${word}: ${sentence}`);
      }
    }
  }
});

test('a intensidade "reunião de segunda-feira" produz frases mais longas', () => {
  const average = (intensidade) => {
    const sentences = sentencesOf(gerar({ tipo: 'frases', quantidade: 100, intensidade, semente: 8 }));
    return sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length;
  };
  assert.ok(average('leve') < average('moderado'));
  assert.ok(average('moderado') < average('reuniao-de-segunda'));
});

test('HTML: estrutura de listas, títulos e artigos', () => {
  const list = gerar({ tipo: 'topicos', quantidade: 4, semente: 3, formato: 'html' });
  assert.match(list, /^<ul>\n( {2}<li>[^<]+<\/li>\n){4}<\/ul>$/);
  const titles = gerar({ tipo: 'titulos', quantidade: 3, semente: 3, formato: 'html' });
  assert.equal(titles.match(/<h2>[^<]+<\/h2>/g).length, 3);
  const email = gerar({ tipo: 'email', quantidade: 1, semente: 3, formato: 'html' });
  assert.match(email, /^<article>\n {2}<p><strong>Assunto:<\/strong> /);
  assert.match(email, /<ul>[\s\S]*<\/ul>/);
  assert.match(email, /<\/article>$/);
});

test('HTML: todo o texto é escapado', () => {
  assert.equal(escapeHtml(`<b>"P&D"</b> d'água`), '&lt;b&gt;&quot;P&amp;D&quot;&lt;/b&gt; d&#39;água');
  const html = renderHtml([
    { type: 'paragraph', text: '<script>alert("x")</script>' },
    { type: 'list', items: ['P&D', 'a < b'] },
  ]);
  assert.equal(
    html,
    '<p>&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</p>\n<ul>\n  <li>P&amp;D</li>\n  <li>a &lt; b</li>\n</ul>',
  );
  for (let semente = 0; semente < 40; semente++) {
    const out = gerar({ tipo: 'paragrafos', quantidade: 3, intensidade: 'reuniao-de-segunda', semente, formato: 'html' });
    const text = out.replace(/<\/?(p|ul|li|h2|article|strong|br)>/g, '');
    assert.doesNotMatch(text, /[<>"]|&(?!amp;|lt;|gt;|quot;|#39;)/, out);
  }
});

test('opções inválidas geram erro com mensagem em português', () => {
  assert.throws(() => gerar({ tipo: 'poema' }), /Tipo desconhecido/);
  assert.throws(() => gerar({ intensidade: 'alta' }), /Intensidade desconhecida/);
  assert.throws(() => gerar({ formato: 'pdf' }), /Formato desconhecido/);
  for (const quantidade of [0, -1, 2.5, 'três', LIMITS.paragrafos + 1]) {
    assert.throws(() => gerar({ tipo: 'paragrafos', quantidade }), RangeError);
  }
});
