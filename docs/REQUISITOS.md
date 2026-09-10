# Checklist de requisitos — 5.01-FR-97 v.4

Rastreamento item a item do PDF da atividade. Cada linha aponta para o arquivo
que cumpre o requisito, para que a verificação seja feita no código e não na
memória.

**Legenda:** ✅ pronto · 🟡 estrutura pronta, conteúdo pendente · ⬜ não iniciado
**Obrigatoriedade:** `OBR` obrigatório · `DES` desejável

---

## 4. Requisitos funcionais

### 4.1 Mapa da Aventura `OBR` ✅

| Regra | Estado | Onde |
|---|---|---|
| Tela principal com mapa de progressão | ✅ | `src/screens/MapScreen/MapScreen.tsx` |
| Primeiro ponto inicia desbloqueado | ✅ | `buildInitialPoints` em `src/domain/rules/progression.ts` |
| Demais pontos iniciam bloqueados | ✅ | idem · teste em `progression.test.ts` |
| Locais conectados por trilha visual | ✅ | `<polyline>` em `src/features/map/components/AdventureMap.tsx` |
| Usuário visualiza todos os pontos | ✅ | pontos bloqueados ficam visíveis, com motivo anunciado |
| Apenas pontos liberados são acessáveis | ✅ | `isChapterAccessible` + `disabled` em `MapPoint.tsx` |
| Estados: bloqueado · disponível · concluído | ✅ | `data-status` em `MapPoint.module.css` |

### 4.2 Sistema de Progressão `OBR` ✅

| Regra | Estado | Onde |
|---|---|---|
| Progressão sequencial | ✅ | `completeChapter` libera só `chapter.unlocks` |
| Próximo ponto só após conclusão do atual | ✅ | teste "desbloqueia apenas o ponto seguinte" |
| Reconcluir não rebaixa pontos já feitos | ✅ | teste "não rebaixa um ponto já concluído" |

### 4.3 Sistema de Tesouros `DES` ✅

| Regra | Estado | Onde |
|---|---|---|
| Cada ponto tem tesouro associado | ✅ | `src/content/treasures.ts` (9 tesouros, Apêndice A) |
| Tesouro relacionado à pista | ✅ | `partialText` (incompleta) → `fullText` (completa) |

> Ítaca não tem tesouro por desenho do roteiro: o Capítulo X culmina no Enigma Final.

### 4.4 Quiz dos Guardiões `OBR` 🟡

| Regra | Estado | Onde |
|---|---|---|
| Quiz exclusivo por local | 🟡 | Cap. I pronto; II–X pendentes de transcrição |
| Correta → libera pista completa | ✅ | nó `clue` após o quiz em `ch01-troia.ts` |
| Correta → permite concluir o ponto | ✅ | `useQuiz.proceed` → `resolveQuiz` → segue a cena |
| Correta → desbloqueia próximo local | ✅ | `chapter/complete` ao fim dos nós |
| Incorreta → exibe feedback | ✅ | `AltarRitual` com a repreensão do Guardião |
| Incorreta → não permite concluir | ✅ | o quiz reinicia da primeira questão |
| Incorreta → nova tentativa após uma ação | ✅ | ritual de oferenda em `src/features/altar/` |

### 4.5 Inventário de Pistas `OBR` ✅

| Regra | Estado | Onde |
|---|---|---|
| Área de inventário | ✅ | `src/screens/InventoryScreen/` |
| Visualizar pistas coletadas | ✅ | `ClueCard.tsx` |
| Reorganizar pistas | ✅ | `InventoryPanel.tsx` + `reorderClues` |
| Preparar solução do enigma `DES` | ✅ | a ordem do inventário é persistida e reaproveitada |
| Estados: bloqueada · incompleta · completa | ✅ | `ClueState` em `src/domain/types/treasure.ts` |
| Drag and Drop | ✅ | `src/hooks/useDragAndDrop.ts` (API nativa HTML5) |
| Reordenação de elementos | ✅ | mouse, Espaço/Enter e `Alt` + setas |
| Navegação por teclado | ✅ | idem — nenhuma interação exige apontador |
| Recursos de acessibilidade com ARIA | ✅ | `role="status"` + `aria-live` a cada movimento |

### 4.6 Enigma Final `OBR` ✅

| Regra | Estado | Onde |
|---|---|---|
| Acessível após concluir todos os pontos | ✅ | `isFinalRiddleUnlocked`; a rota também é guardada |
| Pistas analisadas e organizadas | ✅ | `TwelveAxes.tsx` — 9 tesouros em ordem cronológica |
| Sistema valida a solução | ✅ | `src/domain/rules/riddle.ts` + `riddle.test.ts` |

### 4.7 Salvamento Automático `DES` ✅

| Informação persistida | Estado | Campo |
|---|---|---|
| Pontos concluídos | ✅ | `points` |
| Pontos desbloqueados | ✅ | `points` |
| Quizes respondidos | ✅ | `quizzes` |
| Tesouros encontrados | ✅ | `clues` (estado `incomplete`) |
| Pistas coletadas | ✅ | `clues` (estado `complete`) |
| Organização das pistas | ✅ | `inventoryOrder` |
| LocalStorage | ✅ | `LocalStorageSaveRepository` |

> Extras persistidos: contador de tripulação, rota do estreito, checkpoint e
> enigma resolvido. Gravação automática a cada transição de estado, em
> `GameProvider.tsx`.

---

## 5. Estrutura dos pontos

O exemplo do PDF (`id`, `nome`, `status`, `tesouro`, `quiz`, `recompensa`) está
coberto e ampliado pela interface `Chapter` em `src/domain/types/chapter.ts`.
O `status` não vive no capítulo: é estado de jogo, e mora em `GameState.points`
— o que permite reiniciar a aventura sem tocar no conteúdo.

---

## 6. Fluxo da experiência

| # | Passo | Estado | Onde |
|---|---|---|---|
| 1 | Abrir o aplicativo | ✅ | `/` |
| 2 | Visualizar a tela inicial | ✅ | `HomeScreen` |
| 3 | Ler o tutorial | ✅ | `TutorialScreen` |
| 4 | Acessar o mapa | ✅ | `MapScreen` |
| 5 | Selecionar o ponto disponível | ✅ | `MapPoint` |
| 6 | Encontrar o tesouro | ✅ | nó `treasure` |
| 7 | Responder ao quiz | 🟡 | Cap. I pronto |
| 8 | Receber a pista | ✅ | nó `clue` |
| 9 | Concluir o ponto | ✅ | `chapter/complete` |
| 10 | Desbloquear o próximo local | ✅ | `completeChapter` |
| 11 | Organizar pistas no inventário | ✅ | `InventoryScreen` |
| 12 | Resolver o enigma final | ✅ | `RiddleScreen` |
| 13 | Finalizar a aventura | ✅ | `EndingScreen` |

---

## 7. Telas obrigatórias

| Tela | Obrig. | Estado | Itens exigidos |
|---|---|---|---|
| Inicial | `OBR` | ✅ | nome ✅ · iniciar ✅ · continuar ✅ |
| Tutorial | `DES` | ✅ | regras ✅ · objetivos ✅ · navegação ✅ |
| Mapa | `OBR` | ✅ | trilha ✅ · pontos ✅ · status ✅ |
| Quiz | `OBR` | ✅ | pergunta ✅ · alternativas ✅ · feedback ✅ · tesouro ✅ |
| Inventário | `DES` | ✅ | lista ✅ · reorganização ✅ · progresso ✅ |
| Enigma Final | `OBR` | ✅ | área de montagem ✅ · validação ✅ |
| Conclusão | `DES` | ✅ | sucesso ✅ · resumo ✅ · reiniciar ✅ |

---

## 8. Estados da interface

| Grupo | Estados | Estado | Onde |
|---|---|---|---|
| Pontos | bloqueado · disponível · em andamento · concluído | ✅ | `PointStatus` |
| Pistas | bloqueada · incompleta · completa | ✅ | `ClueState` |
| Quiz | não respondido · correto · incorreto | ✅ | `QuizStatus` |
| Aplicação | online · offline | ✅ | `useOnlineStatus` + `ConnectionBanner` |

---

## 9. Requisitos de interface

| Requisito | Estado | Nota |
|---|---|---|
| Desktop | ✅ | layout base |
| Tablet | ✅ | pontos de quebra em 1000px e 900px |
| Navegação clara | ✅ | HUD com saídas fixas para mapa e inventário |
| Componentes visuais consistentes | ✅ | `src/styles/tokens.css` como fonte única |
| Feedback ao usuário | ✅ | `role="status"`, `aria-live`, `role="alert"` |
| Responsiva | ✅ | unidades relativas; nenhuma medida fixa de tela |
| Boas práticas de acessibilidade | ✅ | ver quadro abaixo |

### Acessibilidade — WCAG AA

| Item | Estado | Nota |
|---|---|---|
| Navegação por teclado | ✅ | toda interação tem caminho sem mouse |
| Uso adequado de ARIA | ✅ | regiões vivas, `alertdialog`, rótulos descritivos |
| Contraste AA | ✅ | pares auditados no topo de `tokens.css` (mín. 7,1:1) |
| Foco visível | ✅ | `:focus-visible` global com contorno de 2px |
| Cor não é o único sinal | ✅ | estado do ponto sempre acompanhado de rótulo textual |
| `prefers-reduced-motion` | ✅ | animações reduzidas a 1ms |
| Imagens com texto alternativo | ✅ | `alt` obrigatório em cenários; sprites `aria-hidden` |

---

## Conteúdo formativo declarado

| Tema | Estado | Onde |
|---|---|---|
| Semântica | ✅ | `header`/`main`/`nav`/`section`/`article`/`dl`; um `h1` por tela |
| Frameworks | ✅ | React 19 + Vite + React Router |
| Drag and Drop | ✅ | `useDragAndDrop` — Altar, Inventário e Enigma Final |
| PWA | ✅ | `vite-plugin-pwa`, manifesto, service worker, ícones |
| Geolocalização | ⬜ | **não previsto no roteiro — decisão pendente** |

---

## Pendências

1. **Capítulos II a X** — transcrever do roteiro para `src/content/chapters/`.
   O Capítulo I é o modelo; o formato já está validado por testes.
2. **Geolocalização** — consta do conteúdo formativo do cabeçalho do PDF, mas
   não aparece em nenhum requisito funcional nem no roteiro. Precisa de
   decisão: ignorar, ou criar um uso com sentido narrativo.
3. **Coordenadas do mapa** — calibrar `mapCoordinates` contra a arte de
   `menus/mapa-completo.webp`.
4. **Lacunas de arte** — `praia_troia` e `figueira_penhasco` emprestam a
   pintura de outro cenário. Ver `ART_GAPS` em `src/content/backgrounds.ts`.
5. **Sprite de Scylla** — não existe em `img/personagens`; usa a arte do covil.
