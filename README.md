# Lorem Corporativo — texto de preenchimento em corporatês para seus layouts (HTML + JS)

Lorem ipsum é ótimo, mas não parece português: não tem acentos, cedilha nem aquelas palavras compridas que quebram o layout na hora errada. O **Lorem Corporativo** gera texto de preenchimento em português de verdade, com um toque de humor corporativo: alinhamentos, sinergias, follow-ups e reuniões sobre reuniões.

Feito para designers e devs que precisam testar telas, apresentações e e-mails com texto realista. Roda inteiro no navegador.

**Acesse online:** https://micdog22.github.io/lorem-corporativo/

## Recursos

- Sete tipos de texto: parágrafos, frases, palavras, títulos de slides, lista de tópicos, e-mail de follow-up e post motivacional de rede social profissional.
- Três intensidades: **leve** (quase um texto normal de empresa), **moderado** e **reunião de segunda-feira** (jargão no volume máximo, frases longas e "quick wins").
- Quantidade ajustável para cada tipo.
- Semente opcional: a mesma semente gera sempre o mesmo texto, útil para capturas de tela e testes visuais.
- Saída em texto puro ou em HTML (`<p>`, `<h2>`, `<ul>`, `<article>`), com botão de copiar.
- Frases originais, com acentos e palavras longas como "operacionalização" e "multidisciplinaridade". Humor leve, sem empresas ou pessoas reais.
- Sem dependências, sem rastreadores; as preferências ficam salvas só no seu navegador.

## Como usar

Escolha o tipo, a quantidade e a intensidade; o texto é gerado na hora. "Gerar outro texto" sorteia uma nova semente (a menos que você tenha digitado uma). Trocar o formato entre texto e HTML mantém o mesmo conteúdo.

Exemplo (parágrafo, intensidade moderada, semente 42):

> Vamos endereçar os pontos de atenção para gerar resultados sustentáveis conforme alinhado na última call. O time de produto vai mapear os gargalos a fim de otimizar os processos com total transparência; além disso, precisamos destravar as entregas com o objetivo de reduzir o retrabalho até o fim da sprint. A liderança quer ver mais protagonismo com foco total na experiência do cliente até o fim do mês. Olha só, o comitê sugeriu um mergulho profundo nos indicadores garantindo o engajamento de todos os envolvidos dentro do budget aprovado, e a equipe concluiu a primeira etapa para alavancar as sinergias sem perder o foco no cliente. O squad de inovação está prototipando soluções com calma e organização.

Títulos de slides (reunião de segunda-feira, semente 42):

```
5 Pilares para Destravar Valor
Roadmap Exponencial: O Que Vem por Aí
Agenda do Dia
```

### Como biblioteca

O gerador fica em `src/lorem.js`, um módulo ES sem dependências de DOM:

```js
import { gerar } from './src/lorem.js';

gerar({ tipo: 'paragrafos', quantidade: 3, intensidade: 'moderado', semente: 42 });
gerar({ tipo: 'topicos', quantidade: 5, intensidade: 'reuniao-de-segunda', formato: 'html' });
```

| Opção | Valores | Padrão |
| --- | --- | --- |
| `tipo` | `paragrafos`, `frases`, `palavras`, `titulos`, `topicos`, `email`, `post` | `paragrafos` |
| `quantidade` | inteiro de 1 até o limite do tipo (50 parágrafos, 100 frases, 1.000 palavras, 50 títulos ou tópicos, 10 e-mails ou posts) | depende do tipo |
| `intensidade` | `leve`, `moderado`, `reuniao-de-segunda` | `moderado` |
| `semente` | número ou texto; sem semente, uma é sorteada | — |
| `formato` | `texto` ou `html` | `texto` |

Opções inválidas geram um erro com a explicação em português. Também são exportadas `generateBlocks` (conteúdo estruturado e a semente usada), `renderText` e `renderHtml`.

## Como rodar localmente

```bash
python3 -m http.server 8000
```

Depois, abra http://localhost:8000 no navegador. Os módulos ES não carregam abrindo o arquivo direto (`file://`).

## Testes

```bash
npm test
```

Os testes usam o executor nativo do Node (`node --test`) e conferem a reprodutibilidade com semente, as quantidades, maiúsculas e pontuação final, a ausência de espaços duplos e a estrutura e o escape do HTML.

## Como funciona

Cada frase é montada com partes originais: uma abertura ("Precisamos alinhar as expectativas"), um propósito ("para alavancar as sinergias") e um complemento ("no próximo trimestre"). Cada parte tem um nível de intensidade; quanto maior a intensidade escolhida, mais partes de jargão pesado entram no sorteio e mais longas ficam as frases. O sorteio usa o gerador pseudoaleatório mulberry32, alimentado pela semente; sem semente, ela é sorteada com `crypto.getRandomValues`.

## Contribuindo

Issues e pull requests são bem-vindos, inclusive com novas frases (mantendo o humor leve e sem citar empresas ou pessoas reais).

## Licença

MIT — veja [LICENSE](LICENSE).
