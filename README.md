# A Odisseia — Caça ao Tesouro

Visual novel investigativa em React. O jogador atravessa o mar de Odisseu em
dez capítulos, vence os Guardiões de cada ilha, recolhe nove pistas e resolve o
enigma dos Doze Machados.

Atividade somativa de Front-End — Escola SENAI "Roberto Mange".
Requisitos rastreados em [`docs/REQUISITOS.md`](docs/REQUISITOS.md).

---

## Como rodar

Requer **Node 20+**.

```bash
npm install
npm run assets:optimize   # gera src/assets/img a partir de img/ (só na 1ª vez)
npm run dev               # http://localhost:5173
```

A otimização da arte só precisa ser refeita quando `img/` mudar. Ela converte
os arquivos-fonte para WebP em resolução de tela — **220 MB viram 12 MB**, o
que é o que torna o modo offline viável.

### Demais comandos

| Comando | O que faz |
|---|---|
| `npm run build` | Verifica os tipos e gera `dist/` |
| `npm run preview` | Serve o build, com o service worker ativo |
| `npm test` | Roda os testes do núcleo de regras |
| `npm run lint` | ESLint com regras estritas e de acessibilidade |
| `npm run format` | Prettier |
| `npm run assets:optimize` | Reconverte a arte (`-- --force` refaz tudo) |
| `npm run assets:icons` | Regera os ícones do PWA |

---

## Como jogar

Nova aventura → prólogo → tutorial → mapa. Cada ponto do mapa é um capítulo;
só o primeiro começa aberto.

Dentro de um capítulo:

- **Clique** no palco, **Espaço**, **Enter** ou **→** avançam a fala.
- Ir ao **mapa** ou ao **inventário** no meio de uma cena não perde o lugar:
  voltar ao capítulo retoma na mesma fala. Só entrar noutro capítulo troca o
  marcador.
- **Escolhas** de Odisseu podem matar. Morrer devolve ao início do capítulo —
  **as pistas já coletadas nunca se perdem**.
- **Quizzes** nunca matam. Errar leva ao Altar: arraste as três oferendas na
  ordem pedida e o Guardião pergunta de novo, sem limite de tentativas.
- Vencer o quiz completa a pista e desbloqueia o próximo ponto.

Concluídos os dez pontos, o enigma final abre: arraste os nove tesouros para os
machados na ordem cronológica da viagem.

**Nada exige mouse.** Espaço pega a peça, Tab escolhe o destino, Espaço solta,
Escape cancela. No inventário, `Alt` + setas movem uma carta de cada vez.

---

## Arquitetura

O jogo é **orientado a dados**: o roteiro é conteúdo, não código. Um capítulo é
uma lista de nós tipados, e o motor não sabe o que está encenando — é a mesma
peça que roda o prólogo, os dez capítulos e o epílogo.

```
src/
├── domain/          Regras puras. Sem React, sem navegador, sem I/O.
│   ├── types/       Os tipos do jogo — nós de cena, capítulo, estado
│   ├── rules/       Progressão, inventário, enigma, travessia da cena
│   └── state/       Redutor e ações (padrão Command)
├── services/        Fronteiras com o mundo externo
│   ├── storage/     Repositório de save (porta + adaptadores)
│   └── assets/      Resolução de arte por identificador (Adapter)
├── content/         O roteiro como dados
│   ├── chapters/    Um arquivo por capítulo
│   ├── scenes/      Prólogo e epílogo
│   ├── characters   Elenco e sprites por expressão
│   ├── treasures    Os nove tesouros e o gabarito cronológico
│   └── backgrounds  Cenários do roteiro → arquivos de arte
├── features/        Blocos de domínio, cada um com componentes e hooks
│   ├── scene/       O motor da visual novel
│   ├── quiz/  altar/  inventory/  map/  riddle/  hud/
├── components/      Design system sem regra de negócio
├── screens/         Uma pasta por tela do PDF
├── hooks/           Hooks transversais
├── styles/          Fichas de design e base global
└── assets/img/      Arte otimizada (gerada — não editar à mão)
```

### A regra que sustenta o resto

**A dependência aponta sempre para dentro.** `domain` não importa nada de
`features`, `services` ou `react`. `content` só conhece `domain`. As telas
conhecem tudo. Por isso as regras do jogo são testáveis sem montar um
componente — e os 46 testes rodam em menos de um segundo.

### Padrões aplicados

| Padrão | Onde | Por quê |
|---|---|---|
| União discriminada | `SceneNode` | Um `kind` novo sem renderizador quebra a compilação, não o jogo |
| Command | `GameAction` | Nenhum componente escreve no estado; todos despacham intenção |
| Repository | `SaveRepository` | O domínio depende da interface, não do LocalStorage |
| Null Object | `InMemorySaveRepository` | Sem armazenamento, o jogo roda; não há `if` espalhado |
| Adapter | `asset-resolver` | Um único ponto conhece caminhos de arquivo |
| Provider | `GameProvider` | Injeta estado e repositório na árvore |
| Facade | `useProgression` | As telas fazem perguntas, não recalculam regras |

### Decisões que valem explicação

**O quiz nunca mata; a escolha pode.** São dois tipos de falha diferentes e o
código os separa: `ChoiceConsequence` tem o caso `death`, `QuizNode` não tem.
Não há como confundir os dois por engano.

**O Altar vive dentro do quiz.** Ele só existe se o jogador errar, então é um
campo de `QuizNode` e não um nó da sequência — que seria encenado sempre.

**As pistas não se perdem ao morrer.** Não por uma verificação em algum lugar:
o Fio Partido simplesmente não despacha ação nenhuma. A garantia está na
ausência de código, que é onde ela é mais difícil de quebrar por acidente.

**O contador de tripulação só desce.** `setCrewCount` aplica `Math.min` contra
o valor atual. A regra do roteiro virou invariante do domínio.

**Arrastar e soltar tem sempre caminho por teclado.** `useDragAndDrop` mantém
os dois modos sobre o mesmo estado e anuncia cada passo numa região viva.
Um arrasto silencioso é, para quem usa leitor de tela, um arrasto invisível.

---

## Estado atual

O motor está completo e o **Capítulo I (Troia) é jogável de ponta a ponta** —
cena, quiz, Altar, tesouro, pista e conclusão. Os capítulos II a X têm mapa,
metadados e progressão prontos, e aguardam a transcrição do roteiro para
`src/content/chapters/`. `ch01-troia.ts` é o modelo a seguir.

Ver as pendências em [`docs/REQUISITOS.md`](docs/REQUISITOS.md#pendências).

---

## Arte

`img/` é a arte-fonte e **não é versionada** (300 MB). O build consome
`src/assets/img/`, gerado por `npm run assets:optimize`. `ImgBase/` e
`Personagens/` são material de conceito e não entram no jogo.

Para acrescentar arte: coloque em `img/`, rode a otimização e registre o
caminho em `src/content/backgrounds.ts` ou `src/content/characters.ts`. Nenhum
componente referencia arquivo diretamente.
