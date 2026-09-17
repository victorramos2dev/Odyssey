# Imagens necessárias

Lista de arte que o roteiro v1.1 pede e que ainda não existe em `img/`.
Levantada cruzando o roteiro com a pasta de arte em 17/09/2026.

| Grupo | Quantidade | Prioridade |
|---|---|---|
| [Tesouros](#1-tesouros) | 9 | Alta |
| [Oferendas do Altar](#2-oferendas-do-altar) | 23 novas + 2 reaproveitadas | Alta |
| [Itens dos minijogos](#3-itens-dos-minijogos) | 19 | Média |
| [Cenários faltando](#4-cenários-faltando) | 3 | Média |
| [Opcionais](#5-opcionais) | 6 | Baixa |

> **Alta:** sem ela, o capítulo roda com um ícone genérico no lugar.
> **Média:** necessária quando o capítulo correspondente for transcrito.
> **Baixa:** melhora, mas nada fica quebrado sem ela.

---

## Especificação técnica

Vale para tudo abaixo, salvo indicação na própria seção.

| Item | Regra |
|---|---|
| Formato | **PNG com fundo transparente** para objetos; PNG ou JPG para cenários |
| Tamanho de objeto | **1024 × 1024 px**, quadrado, objeto centralizado com ~10% de margem |
| Tamanho de cenário | **1920 × 1080 px** ou maior, proporção **16:9** |
| Estilo | O mesmo pintado dos cenários atuais; luz quente vindo de cima à esquerda |
| Sombra | **Sem sombra no chão** — os objetos flutuam sobre a interface escura |
| Fundo | Nada de moldura, texto, carimbo ou marca-d'água dentro da imagem |
| Nome do arquivo | Livre (o otimizador normaliza), mas usar o sugerido poupa trabalho de registro |

**Contraste.** A interface é azul-noite (`#0b1b2b`). Objeto escuro some sobre
ela — madeira, couro, sangue negro e cinza precisam de uma borda de luz
(*rim light*) para se destacar do fundo.

**Depois de colocar os arquivos:**

```bash
npm run assets:optimize
npm test          # acusa qualquer caminho registrado que não bata
```

---

## 1. Tesouros

**Pasta:** `img/tesouros/`

Aparecem na carta do inventário, na apresentação do tesouro ao fim do quiz e
nos Doze Machados. Hoje o jogo usa um glifo geométrico no lugar de cada um.

O **símbolo** é o do Apêndice A do roteiro. Não precisa estar desenhado no
objeto — é a ideia visual que o tesouro deve evocar de relance. No enigma
final os nove aparecem lado a lado, pequenos, e precisam ser distinguíveis.

| # | Arquivo sugerido | Tesouro | Capítulo | Símbolo | Como deve parecer |
|---|---|---|---|---|---|
| 1 | `lasca-cavalo.png` | Lasca do Cavalo | I · Troia | Cavalo de madeira | Lasca de pinho claro, lascada à mão, com um resto de entalhe que sugere a crina ou o flanco do cavalo |
| 2 | `anel-la-carneiro.png` | Anel de lã do carneiro | II · Ciclopes | Olho fechado | Anel torcido de lã grossa e encaracolada, cor de creme sujo; a volta fechada lembra uma pálpebra cerrada |
| 3 | `odre-couro.png` | Odre de couro | III · Éolo | Espiral de vento | Odre **vazio e murcho**, boca ainda marcada pela corda de prata; um vinco em espiral no couro |
| 4 | `ramo-moly.png` | Ramo de moly | IV · Circe | Flor branca | Flor branca de pétalas finas sobre **raiz negra** exposta — o contraste branco/preto é o que a identifica |
| 5 | `obolo-caronte.png` | Óbolo de Caronte | V · Hades | Moeda | Moeda de bronze pequena e gasta, bordas irregulares, pátina esverdeada |
| 6 | `no-cera.png` | Nó de cera | VI · Sereias | Onda sonora | Pedaço de cera de abelha amarelada, moldado no formato de um ouvido, com marcas de dedos |
| 7 | `escama.png` | Escama | VII · Scylla | Seis pontos | Escama larga e iridescente, verde-escuro para violeta, com seis saliências na borda |
| 8 | `chifre-dourado.png` | Chifre dourado | VIII · Trinácia | Sol | Chifre de rês, curvo, com a ponta dourada como se tivesse sido tocada pelo sol |
| 9 | `tabua-jangada.png` | Tábua da jangada | IX · Ogígia | Vela | Tábua de amieiro aplainada, com um furo e um resto de corda onde se prendia a vela |

> **Ítaca não tem tesouro** — por desenho do roteiro, o Capítulo X culmina no
> enigma final.

---

## 2. Oferendas do Altar

**Pasta:** `img/oferendas/` · **Tamanho:** 512 × 512 px basta (aparecem pequenas)

Cada Guardião, ofendido por uma resposta errada, pede três oferendas que o
jogador arrasta ao altar **nesta ordem**.

### Por altar

| Cap. | Altar | 1ª oferenda | 2ª oferenda | 3ª oferenda |
|---|---|---|---|---|
| I | Atena | Azeite | Cevada | Ramo de oliveira |
| II | Poseidon | Água salgada | Sal | Alga |
| III | Éolo | Pena | Incenso | Cinza |
| IV | Circe | Mel | Ervas | Cera |
| V | Hades | Sangue negro | Óbolo ♻ | Romã |
| VI | Musas | Corda de lira | Louro | Água de fonte |
| VII | Scylla | Sangue | Escama ♻ | Sal |
| VIII | Apolo | Louro | Lira | Luz |
| IX | Calipso | Flor de cedro | Água doce | Cinza |
| X | Penélope | Fio de lã | Azeite | Ramo de oliveira |

♻ = reaproveita a imagem do tesouro de mesmo nome; não precisa desenhar de novo.

### Lista única para desenhar

Várias oferendas se repetem entre altares — cada uma é desenhada **uma vez**.

| Arquivo sugerido | Oferenda | Usada em | Como deve parecer |
|---|---|---|---|
| `azeite.png` | Azeite | Atena, Penélope | Pequena ânfora de barro com azeite dourado escorrendo pela borda |
| `cevada.png` | Cevada | Atena | Punhado de grãos de cevada numa tigela rasa de barro |
| `ramo-oliveira.png` | Ramo de oliveira | Atena, Penélope | Ramo curto com folhas prateadas e duas ou três azeitonas |
| `agua-salgada.png` | Água salgada | Poseidon | Concha grande cheia d'água, com espuma na borda |
| `sal.png` | Sal | Poseidon, Scylla | Monte de sal grosso cristalino sobre uma pedra chata |
| `alga.png` | Alga | Poseidon | Tira de alga marinha escura e brilhante, ainda molhada |
| `pena.png` | Pena | Éolo | Pena longa e branca, com a ponta levemente desfiada pelo vento |
| `incenso.png` | Incenso | Éolo | Queimador de bronze com um fio de fumaça subindo em espiral |
| `cinza.png` | Cinza | Éolo, Calipso | Pequena tigela com cinza e uma brasa quase apagada |
| `mel.png` | Mel | Circe | Favo de mel partido, pingando |
| `ervas.png` | Ervas | Circe | Maço de ervas amarrado com cordão, folhas de formas variadas |
| `cera.png` | Cera | Circe | Bloco de cera de abelha **bruto** — diferente do Nó de cera, que é moldado |
| `sangue-negro.png` | Sangue negro | Hades | Taça rasa com líquido quase preto, reflexo avermelhado só na borda |
| `roma.png` | Romã | Hades | Romã aberta ao meio, sementes vermelho-escuras à mostra |
| `corda-lira.png` | Corda de lira | Musas | Corda de tripa enrolada, pontas soltas |
| `louro.png` | Louro | Musas, Apolo | Ramo de louro, folhas verde-escuras e lustrosas |
| `agua-fonte.png` | Água de fonte | Musas | Cântaro de pedra clara com água transparente e fria |
| `sangue.png` | Sangue | Scylla | Taça com sangue **vermelho vivo** — precisa se distinguir do sangue negro de Hades |
| `lira.png` | Lira | Apolo | Lira pequena de casco de tartaruga com braços curvos |
| `luz.png` | Luz | Apolo | Pequena chama dourada presa numa taça de ouro |
| `flor-cedro.png` | Flor de cedro | Calipso | Raminho de cedro com pinhas pequenas |
| `agua-doce.png` | Água doce | Calipso | Taça de barro com água límpida e uma folha boiando |
| `fio-la.png` | Fio de lã | Penélope | Meada de lã tingida com o fio solto — é a teia que ela desfazia de noite |

> **Três águas, dois sangues.** Água salgada, água de fonte e água doce
> precisam ser distinguíveis só pelo recipiente; sangue e sangue negro, só pela
> cor. No altar elas aparecem pequenas — o jogador escolhe pela imagem.

---

## 3. Itens dos minijogos

**Pasta:** `img/minijogos/<nome-do-minijogo>/` · PNG transparente, 1024 × 1024 px

O roteiro tem sete interações de arrastar e soltar. Os Doze Machados usam os
tesouros; as outras seis precisam de itens próprios.

### II · Ciclopes — `fuga_carneiros`

*Arrastar cada companheiro para debaixo de um carneiro antes que a mão de
Polifemo apalpe o rebanho na saída.*

| Arquivo sugerido | O que é |
|---|---|
| `carneiro.png` | Carneiro grande, de perfil, lã muito espessa pendendo por baixo da barriga |
| `companheiro.png` | Tripulante encolhido, pronto para se agarrar — pose de quem se esconde |
| `mao-polifemo.png` | A mão gigante do ciclope, dedos abertos, descendo para apalpar |

### III · Éolo — `selar_odre`

*Arrastar as amarras de prata sobre os nós do odre. O odre se move e resiste.*

| Arquivo sugerido | O que é |
|---|---|
| `odre-cheio.png` | O odre **inflado**, tenso, com os nós visíveis — o oposto do tesouro murcho |
| `amarra-prata.png` | Uma volta de corda de prata brilhante |

### III · Éolo — `vigilia`

*Manter Odisseu acordado arrastando as pálpebras para cima. Impossível de
vencer — é proposital.*

| Arquivo sugerido | O que é |
|---|---|
| `olhos-odisseu.png` | Close dos olhos de Odisseu **abertos**, cansados, vermelhos |
| `palpebras.png` | **Só as pálpebras**, em camada separada e transparente, para deslizar por cima |

> As duas peças precisam se alinhar exatamente — desenhar no mesmo quadro e
> exportar em duas camadas.

### IV · Circe — `achar_moly`

*Localizar a flor de moly escondida no cenário e arrastá-la ao inventário.*

| Arquivo sugerido | O que é |
|---|---|
| `moly-escondida.png` | A moly **pequena**, meio encoberta por folhagem, para camuflar no cenário |

### VI · Sereias — `cera_e_cordas`

*Fase 1: cera nos ouvidos de cada tripulante. Fase 2: cordas ao mastro.*

| Arquivo sugerido | O que é |
|---|---|
| `bola-cera.png` | Bolinha de cera amolecida, pronta para tapar um ouvido |
| `tripulante-perfil.png` | Cabeça de tripulante **de perfil**, orelha bem visível como alvo |
| `corda.png` | Rolo de corda grossa de navio |
| `mastro.png` | O mastro na vertical, com espaço para Odisseu amarrado |

### IX · Ogígia — `montar_jangada`

*Arrastar as peças para as silhuetas corretas da jangada. Mesma mecânica do
enigma final — funciona como tutorial disfarçado.*

| Arquivo sugerido | O que é |
|---|---|
| `tora.png` | Tronco de amieiro descascado |
| `pregos.png` | Punhado de pregos de bronze |
| `vela.png` | Vela de pano dobrada |
| `leme.png` | Remo-leme de madeira |
| `jangada-silhueta.png` | A jangada vista de cima, **só em contorno tracejado**, com os encaixes das quatro peças |

### Enigma final — `doze_machados`

| Arquivo sugerido | O que é |
|---|---|
| `machado.png` | **Um** machado de pé, cabo cravado no chão, com o olhal de ferro vazado visível — repetido doze vezes |
| `flecha.png` | Flecha longa, horizontal, para a animação de atravessar os olhais |

---

## 4. Cenários faltando

**Pasta:** `img/cenarios/<capítulo>/` · 1920 × 1080 px, 16:9

Hoje estes emprestam a pintura de outro cenário ou nem estão registrados.

| Identificador no roteiro | Capítulo | Hoje usa | O que precisa mostrar |
|---|---|---|---|
| `praia_troia` | I | Convés do navio | Praia de Troia com o navio carregado, **prancha baixada**, fumaça da cidade ao fundo |
| `conves_dia` | III | *não registrado* | Convés ao sol, mar calmo e vela cheia — os nove dias de vento perfeito |
| `figueira_penhasco` | VII · Rota B | Redemoinho de Caríbdis | Figueira solitária agarrada ao penhasco, **acima** do redemoinho, raízes expostas |

---

## 5. Opcionais

| Arquivo sugerido | Pasta | Por quê |
|---|---|---|
| `floresta-eeia.png` | `cenarios/ilhaEea/` | Hoje a floresta é a praia de Eeia com névoa aplicada por CSS; o minijogo da moly pede um cenário cheio de folhagem para esconder a flor |
| `tripulacao.png` | `personagens/Eoriluco/` | O roteiro define o coro como **sem nome e sem rosto individual**. A arte atual é o bando com Euríloco; uma versão só da tripulação, em silhueta ou contraluz, fica fiel à regra |
| `altar-base.png` | `oferendas/` | O altar de pedra em si, vazio, de frente — hoje é um retângulo desenhado em CSS |
| `poseidon.png` | `oferendas/` | Retrato ou símbolo para o altar de Poseidon, que não está no elenco |
| `hades.png` | `oferendas/` | Idem, para o altar de Hades |
| `musas.png` | `oferendas/` | Idem, para o altar das Musas |

---

## Arte já existente sem uso

| Arquivo | Observação |
|---|---|
| `personagens/odisseu/Odisseu_Feliz_Ao_Sol.png` | As quatro expressões de Odisseu já estão preenchidas; espera uma cena própria |
| `personagens/odisseu/Arco de Odisseu.png` | Candidato natural ao desafio do arco em Ítaca |
| `personagens/odisseu/Odisseu armando o arco.png` | Idem |
| `personagens/odisseu/Odisseu atirando.png` | Encaixa no momento em que a flecha atravessa os doze machados |
| `cenarios/navio/noiteNoNavio.jpg` | Nenhum `[FUNDO]` do roteiro aponta para ele; serviria à vigília de Éolo |
