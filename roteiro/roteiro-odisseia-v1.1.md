# A ODISSEIA — Roteiro da Visual Novel
### Caça ao Tesouro | Front-End | SENAI "Roberto Mange"
**Versão 1.1**

---

## SUMÁRIO

- [Convenções do roteiro](#convenções-do-roteiro)
- [Sistemas do jogo](#sistemas-do-jogo)
- [Personagens](#personagens)
- [Notas de licença poética](#notas-de-licença-poética)
- [Prólogo](#prólogo)
- [Capítulo I — Troia](#capítulo-i--troia)
- [Capítulo II — A Ilha dos Ciclopes](#capítulo-ii--a-ilha-dos-ciclopes)
- [Capítulo III — A Ilha de Éolo](#capítulo-iii--a-ilha-de-éolo)
- [Capítulo IV — Eeia, a Ilha de Circe](#capítulo-iv--eeia-a-ilha-de-circe)
- [Capítulo V — O Hades](#capítulo-v--o-hades)
- [Capítulo VI — O Estreito das Sereias](#capítulo-vi--o-estreito-das-sereias)
- [Capítulo VII — O Covil de Scylla](#capítulo-vii--o-covil-de-scylla)
- [Capítulo VIII — Trinácia](#capítulo-viii--trinácia)
- [Capítulo IX — Ogígia](#capítulo-ix--ogígia)
- [Capítulo X — Ítaca](#capítulo-x--ítaca)
- [Enigma Final — Os Doze Machados](#enigma-final--os-doze-machados)
- [Epílogo — O Leito de Oliveira](#epílogo--o-leito-de-oliveira)
- [Apêndice A — Tabela de tesouros](#apêndice-a--tabela-de-tesouros)
- [Apêndice B — Gabarito dos quizzes](#apêndice-b--gabarito-dos-quizzes)
- [Apêndice C — Contador de tripulação](#apêndice-c--contador-de-tripulação)

---

## CONVENÇÕES DO ROTEIRO

Cada marcador abaixo corresponde a um tipo de nó (`t`) na estrutura de dados do motor.

| Marcador | Nó | Significado |
|---|---|---|
| `NARRAÇÃO:` | `narracao` | Texto sem personagem em cena |
| `NOME (expressão):` | `fala` | Fala com sprite e expressão |
| `[ESCOLHA]` | `escolha` | Bifurcação narrativa — **pode matar** |
| `[QUIZ]` | `quiz` | Quiz dos Guardiões — **nunca mata** |
| `[TESOURO]` | `tesouro` | Pista entra no inventário como *incompleta* |
| `[PISTA COMPLETA]` | `pista` | Quiz correto — pista vira *completa* |
| `[D&D]` | `minigame` | Interação de arrastar e soltar |
| `[FUNDO: x]` | `fundo` | Troca de cenário |
| `[CHECKPOINT]` | `checkpoint` | Ponto de retorno gravado no LocalStorage |
| `[FIO PARTIDO]` | `morte` | Falha narrativa — volta ao checkpoint |
| `[ALTAR]` | `altar` | Ritual de retentativa após erro no quiz |
| `[CORO]` | `coro` | Fala coletiva da tripulação (sprite de grupo, sem nome) |
| `[TRIPULAÇÃO: n]` | `tripulacao` | Atualiza o contador de homens vivos no HUD |

Expressões disponíveis para todos os personagens: **neutro**, **intenso**, **satisfeito**, **contrariado**.

---

## SISTEMAS DO JOGO

### Os dois tipos de falha

O jogo distingue dois erros. Confundi-los quebra tanto o ritmo quanto os requisitos do projeto.

**1. Falha narrativa — `[ESCOLHA]`**
São as decisões de Odisseu como personagem: o que oferecer ao ciclope, que nome dar, dormir ou vigiar, qual monstro enfrentar. Estas **podem matar**. São o drama do jogo.
→ Dispara `[FIO PARTIDO]` e retorna ao `[CHECKPOINT]` do capítulo atual.

**2. Falha de conhecimento — `[QUIZ]`**
São as perguntas dos Guardiões sobre mitologia. Estas **nunca matam**.
→ Exibe feedback → `[ALTAR]` → repete o quiz.

### O Altar

Componente único, reutilizado nos dez capítulos, mudando apenas a divindade e a oferenda. Ao errar um quiz, o Guardião se ofende e Odisseu deve fazer uma oferenda: arrastar **libação**, **grão** e **louro** para o altar, nesta ordem. Concluído o ritual, o quiz recomeça.

> Cobre o requisito 4.4 do PDF: *"O jogador poderá tentar novamente, depois de algum tipo de ação."*

### O Fio Partido

Quando Odisseu morre, a tela escurece e as três Moiras aparecem. Cloto fia, Láquesis mede, Átropos corta. Então o fio é reatado e a cena recomeça no último checkpoint.

**MOIRAS (intenso):**
> Ainda não. O fio deste homem é longo demais para acabar aqui.

**Regra fundamental: as pistas já coletadas NUNCA se perdem.** O jogador retorna ao início do capítulo com o inventário intacto. Isso é o que separa frustração de desafio.

### Checkpoints

Cada ilha é um capítulo e um checkpoint. Ao concluir um capítulo, o estado é gravado: pontos concluídos, pontos desbloqueados, quizzes respondidos, tesouros encontrados, pistas coletadas e a organização do inventário.

### A Tripulação

A tripulação existe em duas camadas.

**Euríloco** é o rosto. Sprite nomeado, quatro expressões, presente em sete dos dez capítulos. Ele é o homem que conta — literalmente: conta cabeças, conta mortos, conta em voz alta quando fica nervoso. É a única personagem além de Odisseu que atravessa a viagem inteira, e a função dele é ser a consciência prática do capitão: aquele que diz "vamos embora" antes de cada desastre e é ignorado.

**A Tripulação** é a massa. Sprite de grupo, sem nome e sem rosto individual, duas expressões bastam. Fala apenas em `[CORO]`, e só quando quer algo que Odisseu não quer dar.

**Custo total de arte: cinco imagens.** É a personagem mais barata do elenco e a que mais rende.

#### Duas regras invioláveis

**1. A tripulação nunca informa. Só pede, duvida ou desobedece.**
Se um tripulante estiver explicando mitologia ou contexto ao jogador, a fala está errada — isso é trabalho da narração.

**2. A tripulação nunca entra em cena de Guardião.**
Nos quizzes o palco é de Odisseu e do deus. Nenhum tripulante aparece em cena com Atena, Circe, Tirésias, as Sereias, Scylla, Apolo ou Calipso.

#### O contador

O HUD exibe **Tripulação: N** durante toda a viagem. O número só desce, e cada queda tem cena própria. É persistido junto ao resto do estado.

`46 → 40 → 34 → 0`

Na Rota B (Caríbdis), o contador salta de `40` direto para `0` numa única cena. A perda é mais rápida e mais brutal, e é isso que compensa a rota ser mais curta.

⚠️ **Regra de ouro:** o contador nunca sobe. Não há reforços, não há resgates. A única direção possível é para baixo, e o jogador percebe isso por volta do terceiro capítulo.

---

## PERSONAGENS

| Personagem | Papel | Aparições |
|---|---|---|
| **Odisseu** | Protagonista | Todos |
| **Euríloco** | Imediato; o rosto da tripulação | I, II, III, IV, VI, VII, VIII |
| **A Tripulação** | Coro coletivo (sprite de grupo) | II, III, VI, VIII |
| **Atena** | Guardiã de Troia; retorna em Ítaca | I, X |
| **Polifemo** | Guardião dos Ciclopes | II |
| **Éolo** | Guardião dos Ventos | III |
| **Hermes** | Mensageiro | IV |
| **Circe** | Guardiã de Eeia | IV |
| **Anticleia** | Mãe de Odisseu | V |
| **Tirésias** | Profeta cego | V |
| **As Sereias** | Guardiãs do Estreito | VI |
| **Scylla** | Guardiã do Covil | VII |
| **Apolo** | Guardião de Trinácia | VIII |
| **Calipso** | Guardiã de Ogígia | IX |
| **Telêmaco** | Filho de Odisseu | X |
| **Penélope** | Esposa de Odisseu | X, Epílogo |

Expressões disponíveis para todos os personagens: **neutro**, **intenso**, **satisfeito**, **contrariado**.

**Os seis perdidos para Scylla** *(mencionados, sem sprite)*: Polites — irmão de Euríloco —, Perimedes, Antifos, Elpenor, Egíalo e Léucon.

**Cenários necessários:** muralhas de Troia · praia de Troia · praia rochosa · caverna · convés do navio · ilha voadora · floresta de Eeia · praia de Eeia · palácio de Circe · rio Estige · praia do submundo · estreito enevoado · covil de Scylla · pastagem de Trinácia · praia de Ogígia · salão do palácio de Ítaca · aposento do leito.

---

## NOTAS DE LICENÇA POÉTICA

Decisões conscientes de afastamento da fonte original, para registro na apresentação:

1. **O rebanho de Trinácia pertence a Apolo.** No poema homérico o gado é de Hélios. A escolha por Apolo é de identidade visual e coerência do elenco. Apolo é, na tradição, também deus pastor — o desvio é defensável.
2. **A ordem dos episódios foi ajustada.** Lotófagos, Lestrigões e os Feácios foram cortados por escopo. Trinácia foi separada de Scylla como capítulo próprio para equilibrar o ritmo.
3. **A bifurcação Scylla/Caríbdis é original.** No poema, Odisseu escolhe Scylla por conselho de Circe. Aqui, ambas as escolhas são jogáveis e levam a consequências distintas.
4. **Odisseu narra em tempo real.** No original, os episódios II a IX são contados em retrospecto na corte dos feácios. Aqui são vividos linearmente, por clareza de progressão.
5. **Euríloco concentra vários papéis.** No poema ele é o imediato que se recusa a entrar no palácio de Circe e que convence os homens a abater o gado de Trinácia. Aqui recebe também a abertura do odre de Éolo (no original, feita por marinheiros anônimos) e um irmão, Polites, para dar peso à cena de Scylla. É uma condensação deliberada: um rosto reincidente vale mais que cinco anônimos.
6. **Todos os episódios acontecem num único navio.** No poema Odisseu comanda doze. A frota foi reduzida a um para que o contador de tripulação seja legível e para que cada perda seja sentida.

---

## PRÓLOGO

`[FUNDO: mar_noite]`

**NARRAÇÃO:**
> Conta-se que há homens que os deuses amam.
>
> Conta-se também que há homens que os deuses não conseguem esquecer.
>
> Este é sobre um deles.

**NARRAÇÃO:**
> Vinte anos. Dez de guerra, dez de mar.
>
> Uma ilha à espera. Uma mulher à espera. Um filho que já não é criança.
>
> E entre ele e tudo isso: o oceano inteiro, e a memória rancorosa de um deus.

**NARRAÇÃO:**
> Ele tem um nome, e o nome é conhecido em toda a Grécia.
>
> Guarde-o. Haverá um momento nesta história em que dá-lo será a coisa mais perigosa que ele pode fazer.

`[TUTORIAL]` — Explicação das regras, objetivos e navegação.

---

## CAPÍTULO I — TROIA

> **Guardiã:** Atena · **Tesouro:** Lasca do Cavalo · **Tema do quiz:** A Guerra de Troia

`[CHECKPOINT: troia]`
`[FUNDO: muralhas_troia_amanhecer]`

**NARRAÇÃO:**
> Fumaça. A cidade que resistiu dez anos arde desde a madrugada.
>
> Sobre os escombros, um homem observa a própria obra com o cuidado de quem confere um nó.

**ODISSEU (satisfeito):**
> Dez anos de lanças. Dez anos de homens melhores que eu morrendo no pó desta planície.
>
> E no fim... madeira. Madeira e paciência.

**ODISSEU (neutro):**
> Aquiles teria rido de mim. Ájax teria cuspido.
>
> Mas nenhum dos dois está aqui para ver as portas abertas.

`[FUNDO: muralhas_troia_luz_dourada]`

**NARRAÇÃO:**
> A fumaça à sua frente se recusa a dispersar. Ela se adensa, toma forma, ganha o brilho frio do bronze polido.

**ATENA (neutro):**
> Não. Ele não teria rido.

**ODISSEU (intenso):**
> ...Senhora.

**ATENA (neutro):**
> Levante-se, filho de Laertes. Não vim colher reverências.
>
> Vim colher uma dúvida.

**ODISSEU (neutro):**
> Dúvida, senhora?

**ATENA (contrariado):**
> Toda a Grécia repete que Odisseu é o mais astuto dos homens.
>
> A fama é uma criatura curiosa. Cresce sozinha, come sozinha, e raramente se parece com aquele que a gerou.

**ATENA (neutro):**
> Então eu pergunto: o cavalo foi obra da tua mente... ou do teu desespero?

**ODISSEU (contrariado):**
> Há diferença?

**ATENA (satisfeito):**
> Toda.
>
> O desespero acerta uma vez. A mente acerta sempre.

**ATENA (intenso):**
> Prove-me qual dos dois te trouxe até aqui. Responde.

`[QUIZ: atena]`

**Q1.** Qual deusa **não** disputou o Pomo da Discórdia?
- Hera
- Afrodite
- Atena
- **✓ Ártemis**

*Explicação: o pomo, inscrito "à mais bela", foi disputado por Hera, Atena e Afrodite. Páris escolheu Afrodite — e ganhou Helena, e Troia ganhou uma guerra.*

**Q2.** Que guerreiro grego era invulnerável, exceto por um ponto do corpo?
- Ájax
- **✓ Aquiles**
- Diomedes
- Agamêmnon

*Explicação: Tétis mergulhou o filho no Estige segurando-o pelo calcanhar. A água protegeu tudo o que tocou.*

**Q3.** Que princesa troiana profetizava a verdade sem jamais ser acreditada?
- Helena
- Andrômaca
- **✓ Cassandra**
- Briseida

*Explicação: Apolo deu-lhe a profecia; ao ser recusado, acrescentou a maldição da descrença. Ela avisou sobre o cavalo. Ninguém ouviu.*

`[ALTAR: atena | oferenda: azeite, cevada, oliveira]`

**ATENA (contrariado):**
> Eu esperava mais.
>
> Não de um herói. De um homem que se diz pensante.

**ATENA (neutro):**
> Faça a oferenda. E pense antes de falar, desta vez.

---

**ATENA (satisfeito):**
> Bom.
>
> A fama não te inventou. Isso é raro.

**NARRAÇÃO:**
> Ela se abaixa entre os escombros e recolhe uma lasca de madeira — pinho troiano, ainda cheirando a resina.

`[TESOURO: lasca_cavalo]`

**ATENA (neutro):**
> Leve isto. Da tua melhor mentira.

**ODISSEU (neutro):**
> Um pedaço de madeira, senhora?

**ATENA (satisfeito):**
> Um pedaço de prova.
>
> Haverá um dia, muito longe daqui, em que ninguém acreditará que és quem dizes ser. Nem tua própria casa.

`[PISTA COMPLETA: lasca_cavalo]`

**ODISSEU (contrariado):**
> Falas como se a viagem de volta fosse longa. Ítaca está a poucos dias de mar.

**ATENA (neutro):**
> Está.

**ATENA (contrariado):**
> Poseidon é que não está de acordo.

**ODISSEU (intenso):**
> Senhora—

**ATENA (neutro):**
> Boa viagem, Odisseu.
>
> Volta a olhar para esta lasca quando o mar te ensinar humildade. Ela vai lembrar-te de que já foste esperto uma vez.

**NARRAÇÃO:**
> Ela se desfaz na luz.
>
> Ele guarda a lasca no cinto sem entender por quê. Levará vinte anos para entender.

`[FUNDO: praia_troia]`

**NARRAÇÃO:**
> Na praia, o navio já está carregado. Um homem de barba grisalha espera junto à prancha, contando cabeças pela terceira vez.

**EURÍLOCO (neutro):**
> Quarenta e seis. Contei três vezes, capitão, e três vezes deu quarenta e seis.

**ODISSEU (satisfeito):**
> Então estão todos.

**EURÍLOCO (satisfeito):**
> Estão todos. Dez anos de guerra e estão todos.
>
> Vamos para casa antes que alguém lá em cima mude de ideia.

`[TRIPULAÇÃO: 46]`

**NARRAÇÃO:**
> Alguém lá em cima já mudou.

`[FIM DO CAPÍTULO]` → desbloqueia **Ilha dos Ciclopes**

---

## CAPÍTULO II — A ILHA DOS CICLOPES

> **Guardião:** Polifemo · **Tesouro:** Anel de lã do carneiro · **Tema do quiz:** Monstros e Poseidon
> ⚠️ Capítulo com três escolhas mortais e consequência diferida.

`[CHECKPOINT: ciclopes]`
`[FUNDO: praia_rochosa]`

**NARRAÇÃO:**
> A ilha não tem porto, não tem cais, não tem fumaça de lareira. Apenas pedra e o balido distante de um rebanho grande demais.

**ODISSEU (neutro):**
> Há um rebanho. Onde há rebanho, há pastor. Onde há pastor, há hospitalidade.
>
> É a lei de Zeus. Nem os selvagens a quebram.

**NARRAÇÃO:**
> Ele diria depois que foi a curiosidade. Diria também que foi a fome. As duas coisas seriam meias verdades.

`[FUNDO: caverna_interior]`

**NARRAÇÃO:**
> A caverna é enorme. Queijos empilhados como tijolos. Baldes de leite ainda mornos. Cordeiros separados por idade, com cuidado quase paternal.
>
> Tudo em escala errada. Tudo grande demais.

**EURÍLOCO (contrariado):**
> Capitão. Há queijo, há leite, há cordeiro no curral.
>
> Pegamos o que dá para carregar e estamos no navio antes de escurecer.

**ODISSEU (contrariado):**
> Isso é roubo, Euríloco.

**EURÍLOCO (neutro):**
> Isso é jantar. Roubo é como o dono vai chamar, esteja a gente aqui ou não.

**ODISSEU (satisfeito):**
> Quero ver quem vive assim. Quero saber se dá presente de hóspede.

**EURÍLOCO (contrariado):**
> ...Anota isso, capitão. Anota que eu quis ir embora.

**ODISSEU (satisfeito):**
> Sentem-se. Comam. Deixaremos uma oferta em troca — somos hóspedes, não ladrões.

**NARRAÇÃO:**
> Foi então que a luz da entrada desapareceu.
>
> Não escureceu. **Desapareceu.** Algo do tamanho da abertura acabara de fechá-la.

`[FUNDO: caverna_bloqueada]`

**POLIFEMO (intenso):**
> Estranhos.
>
> Na minha caverna. Comendo o meu queijo.

**POLIFEMO (contrariado):**
> Quem são vocês? Mercadores? Ou piratas, daqueles que vagam o mar oferecendo a própria vida?

**ODISSEU (neutro):**
> Somos gregos. Voltamos de Troia, desviados pelos ventos.
>
> Pedimos hospitalidade em nome de Zeus, protetor dos suplicantes—

**POLIFEMO (intenso):**
> Zeus.

**NARRAÇÃO:**
> O ciclope ri. É um som que faz cair pó do teto.

**POLIFEMO (satisfeito):**
> Nós, ciclopes, não damos atenção a Zeus. Somos mais fortes que ele.
>
> Meu pai agita o mar inteiro. O que teu Zeus faz? Troveja?

**POLIFEMO (contrariado):**
> Tenho fome, grego. E tu és pequeno, mas são dois bocados.
>
> Dê-me uma razão para não te comer agora.

`[ESCOLHA: oferta_polifemo]`

> **A)** Oferecer **ouro** de Troia
> **B)** Oferecer **vinho** — *(✓ correta)*
> **C)** Oferecer **armas**

**Se A ou C:**

**POLIFEMO (intenso):**
> Metal. Não se come metal.

`[FIO PARTIDO: devorado]`

**Se B:**

**ODISSEU (neutro):**
> Vinho. Não a água tinta que bebem os homens — vinho dos deuses, tão forte que se mistura com vinte partes de água e ainda queima.

**NARRAÇÃO:**
> A mão desce. Para. Hesita.

**POLIFEMO (neutro):**
> ...Mostra.

**NARRAÇÃO:**
> Ele bebe. Bebe de novo. E de novo. Os olhos — o olho — perdem o foco.

**POLIFEMO (satisfeito):**
> Isto... isto é bom. Isto é muito bom.
>
> Dá-me mais, pequeno. E diz-me: qual é o teu nome? Quero saber a quem devo o meu presente de hóspede.

`[ESCOLHA: nome]`

> **A)** "Odisseu, filho de Laertes"
> **B)** "**Ninguém**" — *(✓ correta)*
> **C)** "Um mercador de Micenas"

⚠️ **Nota de design:** esta escolha **não mata agora**. A consequência aparece 4 cenas depois. É a mecânica assinatura deste capítulo — o jogador deve sentir que uma decisão antiga o alcançou.

**POLIFEMO (satisfeito):**
> {nome_escolhido}. Então ouve, {nome_escolhido}: eis o meu presente de hóspede.
>
> Vou comer-te **por último**.

**NARRAÇÃO:**
> Ele ri da própria piada até o riso virar ronco. E o ronco, sono.
>
> Mas antes de dormir, janta. Faz isso sem pressa e sem raiva, como quem tira frutas de um cesto.
>
> Seis vezes.

`[TRIPULAÇÃO: 40]`

**EURÍLOCO (intenso):**
> Seis, capitão. Foram **seis**.

**ODISSEU (contrariado):**
> Eu contei.

**EURÍLOCO (intenso):**
> Eu também. É a única coisa que eu sei fazer aqui dentro.

**ODISSEU (intenso):**
> A pedra da entrada... nem vinte homens a moveriam.
>
> Se o matarmos dormindo, morremos aqui dentro com ele.

**POLIFEMO (neutro):**
> Antes de dormir, pequeno... uma última coisa. Prometeste conhecimento em troca da tua vida.
>
> Vivo aqui há mais tempo do que consigo contar. Ensina-me algo do mundo lá fora.

`[QUIZ: polifemo]`

**Q1.** Quem é o pai de Polifemo?
- Zeus
- **✓ Poseidon**
- Hades
- Cronos

**Q2.** Que criatura de cabeça de touro habitava o Labirinto de Creta?
- Centauro
- Quimera
- **✓ Minotauro**
- Cérbero

**Q3.** Que arma Poseidon empunha para agitar os mares?
- Raio
- Arco de prata
- **✓ Tridente**
- Foice

`[ALTAR: poseidon | oferenda: água salgada, sal, alga]`

**POLIFEMO (contrariado):**
> Errado. E eu, que ia poupar-te por saberes coisas.
>
> Faz oferenda ao meu pai. Talvez ele te empreste algum juízo.

---

`[TESOURO: anel_la]`

**NARRAÇÃO:**
> Odisseu recolhe um tufo de lã preso na parede — do maior carneiro do rebanho, o líder, aquele que sai por último.

**ODISSEU (neutro):**
> Lã.
>
> ...Lã.
>
> Ele conta os carneiros ao abrir a pedra. Ele os **conta**, mas não os vê.

`[ESCOLHA: fuga]`

> **A)** Matar Polifemo enquanto dorme
> **B)** Tentar mover a pedra em silêncio
> **C)** **Cegar** Polifemo — *(✓ correta)*

**Se A:** a pedra permanece. Os homens morrem de fome no escuro. `[FIO PARTIDO: enterrado_vivo]`
**Se B:** o ruído o acorda. `[FIO PARTIDO: devorado]`

**Se C:**

`[FUNDO: caverna_fogo]`

**NARRAÇÃO:**
> Uma estaca de oliveira, a ponta endurecida no fogo. Seis homens para erguê-la. Um homem para mirar.

**POLIFEMO (intenso):**
> **AAAAAAH—**

`[FUNDO: caverna_bloqueada]`

**NARRAÇÃO:**
> A pedra rola. Lá fora, vozes: os outros ciclopes, acorrendo ao grito do irmão.

> **VOZES:** Polifemo! Quem te ataca? Quem te fere?

**POLIFEMO (intenso):**
> **{nome_escolhido} me feriu! {nome_escolhido} me cegou!**

---

**→ Se o jogador respondeu "Ninguém":**

**NARRAÇÃO:**
> Silêncio do lado de fora. Depois, o som de passos se afastando.

> **VOZES:** Ninguém te feriu? Então é doença, irmão. Doença vem de Zeus. Reza ao teu pai e não nos acordes mais.

**ODISSEU (satisfeito):**
> ...Funcionou.
>
> Funcionou porque ele repetiu exatamente o que eu disse. Um homem só é enganado pela própria boca.

`[D&D: fuga_carneiros]`

> **Objetivo:** arrastar cada companheiro para debaixo de um carneiro antes que a mão de Polifemo apalpe o rebanho na saída.
> **Falha:** `[FIO PARTIDO]` — retorna ao início do capítulo.

`[PISTA COMPLETA: anel_la]`

`[FUNDO: praia_rochosa]`

**ODISSEU (satisfeito):**
> **Ciclope!**
>
> Se alguém te perguntar quem te arrancou a visão, não digas "Ninguém".
>
> Diz que foi **Odisseu, saqueador de cidades, filho de Laertes, senhor de Ítaca!**

**NARRAÇÃO:**
> Os homens o encaram, pálidos. Ele acaba de dar ao inimigo cego a única coisa que faltava: um endereço.

**EURÍLOCO (intenso):**
> Cala a boca. Cala a boca, cala a boca—
>
> Perdão, capitão. **Cala a boca.**

**ODISSEU (satisfeito):**
> Ele tinha de saber quem foi.

**EURÍLOCO (contrariado):**
> Ele tinha de **não** saber. Era esse o plano inteiro.

**POLIFEMO (intenso):**
> Pai! Poseidon, que abraças a terra! Ouve o teu filho!
>
> Que esse homem nunca chegue a casa. E se chegar — que chegue tarde, sozinho, quebrado, em navio alheio, e encontre a desgraça esperando por ele.

**NARRAÇÃO:**
> No fundo do mar, algo se moveu.

---

**→ Se o jogador respondeu "Odisseu" ou "mercador de Micenas":**

**NARRAÇÃO:**
> A pedra treme. Não é Polifemo movendo-a.
>
> São os irmãos dele.

> **VOZES:** {nome_escolhido}? Conhecemos esse nome agora. E agora ele tem rosto.

`[FIO PARTIDO: cercado_pelos_ciclopes]`

**MOIRAS (neutro):**
> Um nome dado é uma porta aberta.
>
> Volta. E desta vez, seja **ninguém**.

`[FIM DO CAPÍTULO]` → desbloqueia **Ilha de Éolo**

---

## CAPÍTULO III — A ILHA DE ÉOLO

> **Guardião:** Éolo · **Tesouro:** Odre de couro · **Tema do quiz:** Ventos e Titãs
> ⚠️ Capítulo em que **perder é o roteiro correto**. Ver nota de design ao final.

`[CHECKPOINT: eolo]`
`[FUNDO: mar_aberto]`

**NARRAÇÃO:**
> Três dias longe da ilha dos ciclopes. O vigia grita e aponta — não para a frente, mas para **cima**.

**ODISSEU (intenso):**
> ...Aquilo é uma ilha.

**NARRAÇÃO:**
> Uma muralha de bronze, uma rocha lisa, e sob ela: nada. Céu. A ilha inteira flutua.

**ODISSEU (neutro):**
> Arpéus. Todos eles.

**EURÍLOCO (intenso):**
> Capitão, isso é morada de deus. Subir ali é desafiar—

**ODISSEU (satisfeito):**
> É desafiar o quê? Já cegamos o filho de Poseidon esta semana.

**EURÍLOCO (contrariado):**
> E correu lindamente. Só perdemos seis.

`[FUNDO: ilha_voadora]`

**ÉOLO (satisfeito):**
> Um mortal! Um mortal de verdade, subindo pelo lado de fora da minha casa!
>
> Há quanto tempo não recebo ninguém. Entra, entra. E fala. Fala muito.

**NARRAÇÃO:**
> Éolo escuta a história de Troia como criança escuta relato de guerra: interrompendo, pedindo detalhes, rindo alto na parte do cavalo.

**ÉOLO (satisfeito):**
> E o ciclope? Comeu-te? Não, obviamente não, estás aqui. Mas quase, não é?
>
> Ah, esta é boa. Esta eu vou contar aos ventos durante séculos.

**ÉOLO (neutro):**
> Mas antes de te dar o que vim buscar, deixa-me ver se és só sorte, ou se és sabedoria.
>
> Governo os ventos. Os ventos são filhos de coisas muito antigas. Diz-me o que sabes das coisas antigas.

`[QUIZ: eolo]`

**Q1.** Qual vento sopra do Norte, frio e violento?
- Zéfiro
- Noto
- **✓ Bóreas**
- Euro

**Q2.** Que Titã foi condenado a sustentar o céu sobre os ombros?
- Prometeu
- Cronos
- **✓ Atlas**
- Hipérion

**Q3.** Que Titã roubou o fogo dos deuses e o deu aos homens?
- Epimeteu
- **✓ Prometeu**
- Oceano
- Jápeto

`[ALTAR: eolo | oferenda: pena, incenso, cinza]`

**ÉOLO (contrariado):**
> Não, não, não. Isso qualquer criança de Tessália sabe.
>
> Faz a oferenda e tenta outra vez. Tenho tempo. Tenho todo o tempo.

---

**ÉOLO (satisfeito):**
> Excelente! Então mereces o meu presente.

`[TESOURO: odre_couro]`

**NARRAÇÃO:**
> Ele traz um odre de couro de boi, amarrado com fio de prata. O saco **se move**. Empurra de dentro para fora, como se contivesse algo vivo e furioso.

**ÉOLO (neutro):**
> Aqui dentro estão todos os ventos que te levariam para longe de casa. Todos. Presos.
>
> Deixei apenas Zéfiro solto, o vento do oeste, que te empurra direto para Ítaca.

**ÉOLO (intenso):**
> Uma condição. Uma só.
>
> **Ninguém abre este odre até tuas sandálias tocarem a areia de Ítaca.** Nem tu. Nem os teus homens. Ninguém.

**ODISSEU (satisfeito):**
> É uma tarefa simples, senhor dos ventos.

**ÉOLO (contrariado):**
> É.
>
> É por isso que me preocupa.

`[D&D: selar_odre]`

> **Objetivo:** arrastar as amarras de prata sobre os nós do odre para selá-lo. O odre se move e resiste — as amarras precisam ser aplicadas em sequência.

`[PISTA COMPLETA: odre_couro]`

`[FUNDO: convés_dia]`

**NARRAÇÃO:**
> Nove dias. Nove dias de vento perfeito.

`[CORO]`

> **A TRIPULAÇÃO:** O que há no saco, capitão?
>
> **A TRIPULAÇÃO:** Ouro de Troia. Só pode ser. Ele dividiu o saque com todos, menos com a gente.
>
> **A TRIPULAÇÃO:** Vinte anos de guerra, e voltamos com o quê? Cicatrizes?

**EURÍLOCO (neutro):**
> Deixem o homem em paz. Ele contou os nossos mortos um por um. Vocês não.

**EURÍLOCO (contrariado):**
> ...Mas mostre, capitão. Abra um dedo, deixe-os espreitar, e acaba-se a conversa hoje.

**ODISSEU (contrariado):**
> São ventos. É só o que há aí dentro. Ventos.
>
> ...Vocês não acreditam em mim.

`[D&D: vigilia]`

> **Objetivo:** manter Odisseu acordado. As pálpebras descem — arrastá-las de volta para cima. A cada dia que passa, descem mais rápido.
> **Vitória:** impossível. O medidor sempre vence no décimo dia.

⚠️ **NOTA DE DESIGN — leia antes de implementar:**
Este minigame **não pode ser vencido**. É proposital.
A tragédia de Éolo não é falha de habilidade: é o limite do corpo humano. Nenhum homem fica dez dias acordado.
**Não puna o jogador.** Não há `[FIO PARTIDO]`. A narrativa continua exatamente igual.
O objetivo é fazer o jogador *sentir* a exaustão de Odisseu antes de vê-la escrita.

`[FUNDO: convés_tempestade]`

**NARRAÇÃO:**
> Ele acorda com o grito do vento.
>
> Do outro lado da amurada, tão perto que dá para ver a fumaça das lareiras, está Ítaca.
>
> E no convés, o odre aberto.

**ODISSEU (intenso):**
> **NÃO—**

**NARRAÇÃO:**
> Ele se atira sobre o couro, tenta fechá-lo com as mãos, com o peso do corpo, com tudo.
>
> Os ventos passam por ele como se ele não existisse.

**NARRAÇÃO:**
> Quando a tempestade termina, Ítaca não está no horizonte.
>
> Não está em horizonte nenhum.

**ODISSEU (contrariado):**
> ...Eu vi a fumaça das casas.
>
> Eu vi a fumaça das casas e adormeci.

**NARRAÇÃO:**
> Euríloco está de joelhos no convés, com o couro vazio nas mãos. Não tenta esconder.

**EURÍLOCO (neutro):**
> Fui eu.

**ODISSEU (intenso):**
> ...

**EURÍLOCO (contrariado):**
> Não abri por ouro, capitão. Abri para lhes mostrar que **não havia** ouro.
>
> Eu ia defendê-lo.

**ODISSEU (contrariado):**
> Eu sei.

**EURÍLOCO (intenso):**
> Então bata em mim. Atire-me ao mar. Faça alguma coisa.

**ODISSEU (neutro):**
> Não.
>
> Vais remar. Vais remar até eu mandar parar, e vais lembrar-te disto todos os dias.

**NARRAÇÃO:**
> Foi o castigo mais cruel que Odisseu conseguiu inventar.
>
> Nenhum dos dois percebeu isso na hora.

`[FIM DO CAPÍTULO]` → desbloqueia **Eeia**

---

## CAPÍTULO IV — EEIA, A ILHA DE CIRCE

> **Guardiã:** Circe · **Tesouro:** Ramo de moly · **Tema do quiz:** Metamorfoses

`[CHECKPOINT: circe]`
`[FUNDO: floresta_eeia]`

**NARRAÇÃO:**
> Dias sem rumo. Água racionada. Homens que já não perguntam quando chegam.
>
> A ilha surge verde demais, calma demais, e ninguém tem forças para desconfiar disso.

**NARRAÇÃO:**
> Vinte e dois homens partem em busca de suprimentos. Euríloco vai à frente.
>
> Volta um.

`[FUNDO: praia_eeia]`

**EURÍLOCO (intenso):**
> Havia uma casa no meio da floresta. Havia uma mulher a cantar e a tecer, e a voz era—
>
> Eles entraram. Todos entraram. Ela abriu a porta e eles entraram como se fosse a casa da mãe deles.

**ODISSEU (neutro):**
> E tu?

**EURÍLOCO (contrariado):**
> Eu fiquei atrás de uma árvore.

**EURÍLOCO (intenso):**
> Fiquei atrás de uma árvore, capitão. Ouvi os gritos virarem outra coisa — outra coisa, capitão, nem sei dizer o quê — e não saí de trás da árvore.

**ODISSEU (neutro):**
> Foi por isso que voltaste.

**EURÍLOCO (contrariado):**
> Foi por isso que voltei.
>
> Não me chame de sortudo. Chame pelo nome certo.

**NARRAÇÃO:**
> Odisseu não diz o nome certo. Nunca dirá.

**ODISSEU (intenso):**
> Não vou perder mais ninguém.

`[FUNDO: floresta_eeia_palacio]`

**NARRAÇÃO:**
> Há animais entre as árvores. Leões que não atacam. Lobos que se aproximam mansos, quase implorando.
>
> Eles olham Odisseu com uma atenção que nenhum animal deveria ter.

**HERMES (satisfeito):**
> Estás indo na direção errada, herói. A direção certa é para trás.

**ODISSEU (contrariado):**
> Quem—

**HERMES (neutro):**
> Alguém que passa por aqui frequentemente. Ouve, porque não repito.
>
> Naquele palácio vive Circe, filha do Sol. Ela transforma homens em bestas. Os teus vinte e dois já grunhem no chiqueiro.

**HERMES (contrariado):**
> Vai-te embora. Salva os que ainda tens.

**ODISSEU (intenso):**
> Não.

**HERMES (neutro):**
> ...Vocês, mortais, são exaustivos.

**HERMES (satisfeito):**
> Muito bem. Há uma erva nesta floresta: raiz negra, flor branca como leite. Os deuses a chamam **moly**. Homem nenhum consegue arrancá-la.
>
> Tu vais conseguir. Considera isso um empréstimo.

`[D&D: achar_moly]`

> **Objetivo:** localizar a flor de moly escondida no cenário e arrastá-la para o inventário.
> **Sem punição.** Uma dica visual aparece após 30 segundos.

`[TESOURO: ramo_moly]`

**HERMES (neutro):**
> A moly quebra a magia dela. Não quebra **ela**.
>
> A poção vai falhar, e nesse instante ela vai te oferecer outra coisa. Algo mais macio. Mais difícil de recusar.

**HERMES (contrariado):**
> Muitos homens sobreviveram à feitiçaria de Circe.
>
> Bem poucos sobreviveram à hospitalidade dela.

`[FUNDO: palacio_circe]`

**CIRCE (satisfeito):**
> Um visitante. E de pé, ainda por cima.
>
> Senta-te. Come. Deves estar exausto do mar.

**ODISSEU (neutro):**
> Vinte e dois homens meus entraram nesta ilha. Onde estão?

**NARRAÇÃO:**
> Do lado de fora, muito claramente, porcos grunhem.

**CIRCE (neutro):**
> Não vi homem nenhum.

**ODISSEU (intenso):**
> Onde. Estão. Os meus. Homens.

**CIRCE (contrariado):**
> Bebe.

**NARRAÇÃO:**
> Ele bebe. A taça esvazia. Ela ergue a varinha e toca o ombro dele.

**CIRCE (satisfeito):**
> Agora vai. Vai para o chiqueiro juntar-te aos teus irmãos—

**NARRAÇÃO:**
> Nada acontece.

**CIRCE (intenso):**
> ...Impossível.
>
> Nenhum homem resiste àquela taça. Nenhum.

**CIRCE (neutro):**
> A não ser que...
>
> Hermes. Hermes falou-me de ti, há muito tempo. Disse que um dia chegaria um homem que a minha magia não tocaria.

**CIRCE (satisfeito):**
> Então guarda essa espada, Odisseu, e sobe. Há vinho melhor lá em cima, e não estou sozinha há muito tempo—

**ODISSEU (contrariado):**
> Devolve os meus homens.

**CIRCE (contrariado):**
> ...Sempre a mesma frase, com vocês.

**CIRCE (neutro):**
> Muito bem. Mas não de graça.
>
> Eu transformo homens em porcos porque a maioria já vive como tal. Prova-me que és diferente. Prova que há algo aí dentro além de fome e força.

`[QUIZ: circe]`

**Q1.** Em que se transformou Dafne ao fugir de Apolo?
- Girassol
- **✓ Loureiro**
- Cipreste
- Videira

**Q2.** Que tecelã mortal desafiou Atena e foi transformada em aranha?
- Ariadne
- Filomela
- **✓ Aracne**
- Níobe

**Q3.** Que jovem se apaixonou pelo próprio reflexo e virou flor?
- Jacinto
- Adônis
- **✓ Narciso**
- Ganimedes

`[ALTAR: circe | oferenda: mel, ervas, cera]`

**CIRCE (contrariado):**
> Errado.
>
> Sabes o que os porcos têm em comum? Nunca sabem quando estão errados.

---

**CIRCE (satisfeito):**
> Bom. És mesmo diferente.

**NARRAÇÃO:**
> Ela passa entre os porcos com um óleo, e cada um que toca se estica, se ergue, chora.

**NARRAÇÃO:**
> Vinte e dois homens nus e a chorar no chiqueiro.
>
> Euríloco abraça cada um deles, um por um, contando alto enquanto abraça. Chega a vinte e dois, para, e recomeça do início — porque não confia na própria contagem, e porque parar significaria acreditar nela.

**CIRCE (neutro):**
> Fica comigo, Odisseu. Esta ilha é boa. Eu sou boa companhia. Ninguém envelhece aqui.

**ODISSEU (neutro):**
> Há uma mulher em Ítaca.

**CIRCE (contrariado):**
> Sempre há.

**CIRCE (neutro):**
> ...Vinte anos, disseste?
>
> Está bem. Está bem, herói. Não te ajudo por bondade. Ajudo porque quero ver como isso acaba.

**CIRCE (intenso):**
> Só uma criatura pode dizer-te o caminho de casa. E ele está morto.
>
> **Tirésias**, o profeta cego de Tebas. Vais ao Hades.

**ODISSEU (intenso):**
> Ao—

**CIRCE (neutro):**
> Ao mundo dos mortos, sim. Vivo. Sem morrer no caminho, de preferência.

**CIRCE (contrariado):**
> E ouve isto agora, porque quando saíres de lá não haverá tempo:
>
> No caminho de volta há um estreito. Nele cantam as Sereias. Nenhum homem que ouviu o canto voltou para contar como era.

`[TESOURO: cera_abelha]`

**CIRCE (neutro):**
> Leva cera de abelha. Tapa os ouvidos dos teus homens. **Todos** eles.

`[PISTA COMPLETA: ramo_moly]`

**CIRCE (satisfeito):**
> Vai. E Odisseu — quando chegares a Ítaca, não contes a ela sobre mim.

**ODISSEU (neutro):**
> Não pretendia.

**CIRCE (contrariado):**
> Eu sei. Foi por isso que ajudei.

`[FIM DO CAPÍTULO]` → desbloqueia **O Hades**

---

## CAPÍTULO V — O HADES

> **Guardião:** Tirésias · **Tesouro:** Óbolo de Caronte · **Tema do quiz:** O Submundo
> ⚠️ Contém a bifurcação **Scylla / Caríbdis**, que altera os capítulos VII e VIII.

`[CHECKPOINT: hades]`
`[FUNDO: rio_estige]`

**NARRAÇÃO:**
> Não há sol aqui. Não há vento. A água não faz som contra o casco.

**ODISSEU (neutro):**
> Olhos no remo. Todos. Não olhem para a margem.
>
> Os mortos mentem melhor que os vivos, porque não têm nada a perder.

**NARRAÇÃO:**
> Na margem, formas pálidas se aglomeram. Estendem as mãos. Chamam nomes.
>
> E uma das vozes ele conhece.

**ANTICLEIA (neutro):**
> Odisseu.

**NARRAÇÃO:**
> Ele se vira antes de decidir se virar.

**ODISSEU (intenso):**
> ...Mãe?

**ODISSEU (contrariado):**
> Não. Não, tu estavas viva. Quando parti para Troia estavas viva, estavas na porta, acenaste—

**ANTICLEIA (contrariado):**
> Eu acenei durante muito tempo, meu filho.

**ANTICLEIA (neutro):**
> Não foi doença que me matou. Não foi velhice.
>
> Foi a espera. Foi olhar para o mar todos os dias durante anos e não ver vela nenhuma.

**ODISSEU (intenso):**
> Perdoa-me. Perdoa-me, eu tentei voltar, eu—

**NARRAÇÃO:**
> Ele avança para abraçá-la. Os braços atravessam o ar.
>
> Tenta de novo. E de novo.

**ANTICLEIA (contrariado):**
> Não podes. Não é crueldade — é apenas o que somos aqui. Fumaça e memória.

**ANTICLEIA (satisfeito):**
> Escuta-me. Penélope ainda espera. Telêmaco cresceu, e é bom rapaz, e tem os teus olhos e a teimosia dela.

**ANTICLEIA (neutro):**
> Não chores por mim. Chorar por mortos é fácil.
>
> **Vai para casa antes que eu tenha companhia lá.**

`[FUNDO: praia_submundo]`

`[TESOURO: obolo]`

**NARRAÇÃO:**
> Na areia cinzenta, uma moeda. O óbolo que se põe na boca dos mortos para pagar a travessia.

**TIRÉSIAS (neutro):**
> Sei quem és antes de perguntares. É a vantagem de não ter olhos: nunca me distraio com aparências.

**ODISSEU (neutro):**
> Profeta. Quero voltar para casa.

**TIRÉSIAS (contrariado):**
> Vais voltar.

**TIRÉSIAS (intenso):**
> **Sozinho.**

**ODISSEU (intenso):**
> O que queres dizer com sozinho? Tenho homens. Tenho um navio—

**TIRÉSIAS (neutro):**
> Tens homens. Sim.
>
> Terás menos amanhã. Menos depois de amanhã. E num dia que ainda não vejo bem, terás nenhum.

**ODISSEU (contrariado):**
> Quantos.

**TIRÉSIAS (neutro):**
> Perguntaste *quantos*. Não perguntaste *quem*.
>
> É o que fazem os comandantes, e é por isso que conseguem dormir durante a guerra.

**TIRÉSIAS (contrariado):**
> Em casa não vai funcionar. Em casa vais lembrar-te dos nomes, um por um, e não haverá mais ninguém a bordo para os contar por ti.

**TIRÉSIAS (neutro):**
> Ouve as três coisas que te aguardam, e ouve bem, porque só as digo uma vez.
>
> Um estreito onde a música mata. Uma escolha entre dois horrores. E uma ilha de gado que não deves tocar.

**TIRÉSIAS (intenso):**
> Prova-me que ouviste. Responde.

`[QUIZ: tiresias]`

**Q1.** Quem transporta as almas através dos rios do submundo?
- Hermes
- **✓ Caronte**
- Tânatos
- Hipnos

**Q2.** Quantas cabeças tem Cérbero, o cão que guarda os portões?
- Uma
- Duas
- **✓ Três**
- Sete

**Q3.** Que deusa comeu sementes de romã e ficou presa a retornar ao submundo?
- Deméter
- Hécate
- **✓ Perséfone**
- Ártemis

`[ALTAR: hades | oferenda: sangue negro, óbolo, romã]`

**TIRÉSIAS (contrariado):**
> Erras aqui, entre os mortos, sobre os mortos.
>
> Faz a oferenda. Eles estão ouvindo.

---

**TIRÉSIAS (neutro):**
> Bom. Então agora as decisões.

**TIRÉSIAS (intenso):**
> **Primeira:** o estreito das Sereias. Como passarás?

`[ESCOLHA: sereias_metodo]`

> **A)** Remar mais rápido que o canto
> **B)** Tapar os ouvidos com **cera de abelha** — *(✓ correta)*
> **C)** Ordenar que ninguém escute

**Se A ou C:**

**TIRÉSIAS (contrariado):**
> Não se decide não ouvir. É por isso que elas ganham.

`[FIO PARTIDO: naufragio_sereias]` — retorna ao checkpoint do Hades.

**Se B:**

**TIRÉSIAS (neutro):**
> Circe ensinou-te bem.

**TIRÉSIAS (intenso):**
> **Segunda:** o estreito guardado por dois monstros. De um lado, **Scylla** — seis cabeças, seis bocas, e um preço fixo em homens. Do outro, **Caríbdis** — a garganta que engole o mar três vezes por dia.
>
> Por qual passarás?

`[ESCOLHA: monstro]` — ⚠️ **Ambas as rotas são jogáveis.** Não há resposta errada.

> **A) Scylla** — perdes seis homens, salvas o navio → **Rota do Luto**
> **B) Caríbdis** — arriscas tudo em uma só jogada → **Rota do Náufrago**

**Se A:**

**TIRÉSIAS (neutro):**
> A escolha do comandante. Seis morrem para que os outros vivam.
>
> Vais carregar esses seis nomes até morreres. Mas vais carregá-los **em casa**.

**Se B:**

**TIRÉSIAS (contrariado):**
> A escolha do jogador.
>
> Não é covardia. É esperança — e a esperança, no mar, custa mais caro que o medo.

**TIRÉSIAS (neutro):**
> Que assim seja. Já não é da minha conta.

`[PISTA COMPLETA: obolo]`

**TIRÉSIAS (neutro):**
> Vai, filho de Laertes.
>
> E quando chegares a Ítaca — e chegarás — lembra-te de que voltar não é o mesmo que ser recebido.

`[FIM DO CAPÍTULO]` → desbloqueia **As Sereias**

---

## CAPÍTULO VI — O ESTREITO DAS SEREIAS

> **Guardiãs:** As Sereias · **Tesouro:** Nó de cera · **Tema do quiz:** Musas e Apolo
> Capítulo curto. Todo o peso está no minigame.

`[CHECKPOINT: sereias]`
`[FUNDO: estreito_neblina]`

**NARRAÇÃO:**
> O vento morre de uma vez, como se alguém o tivesse desligado.
>
> A água fica lisa. O silêncio é tão completo que os homens ouvem o próprio sangue.

**ODISSEU (intenso):**
> É aqui. Cera nos ouvidos. Todos. **Agora.**

**ODISSEU (neutro):**
> E depois... amarrem-me ao mastro.

**EURÍLOCO (neutro):**
> Capitão?

**ODISSEU (neutro):**
> Eu vou ouvir.

**EURÍLOCO (intenso):**
> Capitão, isso é loucura—

**ODISSEU (contrariado):**
> Passei dez anos numa guerra que ninguém vai lembrar direito. Vou passar mais não sei quantos neste mar.
>
> Se há uma coisa neste mundo que homem nenhum ouviu e sobreviveu para contar — eu quero contar.

**EURÍLOCO (contrariado):**
> Da última vez que o senhor quis saber como era uma coisa, perdemos seis homens numa caverna.

**ODISSEU (intenso):**
> Eu sei.

**EURÍLOCO (neutro):**
> Eu sei que o senhor sabe. Só queria dizer em voz alta, para constar.

**ODISSEU (intenso):**
> E ouçam bem: eu **vou** pedir para ser solto. Vou implorar. Vou ordenar. Vou prometer-lhes ouro e ameaçá-los de morte.
>
> Não me soltem. Apertem mais.

`[D&D: cera_e_cordas]`

> **Fase 1:** arrastar cera para os ouvidos de **cada** tripulante. Qualquer um deixado de fora causa falha.
> **Fase 2:** arrastar cordas para o mastro — número mínimo de voltas exigido.
> **Falha:** `[FIO PARTIDO: naufragio]`

`[FUNDO: estreito_sereias]`

**NARRAÇÃO:**
> Elas não são o que ele esperava. Não há beleza. Há apenas som.

**SEREIAS (satisfeito):**
> Vem, Odisseu. Glória dos aqueus.
>
> Nenhum navio passou por aqui sem que ouvíssemos. Nós sabemos tudo o que aconteceu em Troia. Sabemos tudo o que **vai** acontecer.

**SEREIAS (neutro):**
> Fica. Escuta até o fim.
>
> Podemos dizer-te o que Penélope está a fazer neste exato momento.

**ODISSEU (intenso):**
> **Soltem-me. É uma ordem. SOLTEM-ME—**

**NARRAÇÃO:**
> Os homens remam. Não ouvem nada.
>
> Euríloco vê o capitão debater-se, gritar, implorar com o rosto todo desfeito — e aperta mais as cordas, exatamente como lhe foi mandado.
>
> É a única ordem que ele cumpre à letra em toda a viagem. Ninguém jamais o parabenizará por isso.

**SEREIAS (contrariado):**
> Amarrado. Que covardia elegante.

**SEREIAS (neutro):**
> Muito bem, herói atado. Se não podes ficar, paga a passagem com o que sabes.
>
> Nós somos música. Prova que compreendes música.

`[QUIZ: sereias]`

**Q1.** Quantas são as Musas?
- Três
- Sete
- **✓ Nove**
- Doze

**Q2.** Que músico desceu ao Hades para resgatar a esposa e a perdeu por olhar para trás?
- Anfião
- **✓ Orfeu**
- Lino
- Tâmiris

**Q3.** Que sátiro desafiou Apolo para um duelo musical e foi punido por sua arrogância?
- Pã
- Sileno
- **✓ Mársias**
- Príapo

`[ALTAR: musas | oferenda: corda de lira, louro, água de fonte]`

**SEREIAS (contrariado):**
> Desafinado.
>
> Faz a tua oferenda às Musas, mortal. Elas são menos pacientes que nós.

---

`[TESOURO: no_cera]`
`[PISTA COMPLETA: no_cera]`

**SEREIAS (neutro):**
> Passa, então.
>
> Mas leva isto contigo: um dia vais desejar ter ficado.

**NARRAÇÃO:**
> O vento volta. Os homens tiram a cera. Ninguém pergunta o que ele ouviu.
>
> E ele nunca conta.

`[FIM DO CAPÍTULO]` → desbloqueia **Covil de Scylla** *(rota A)* ou **Caríbdis** *(rota B)*

---

## CAPÍTULO VII — O COVIL DE SCYLLA

> **Guardiã:** Scylla · **Tesouro:** Escama · **Tema do quiz:** Monstros marinhos
> ⚠️ Este capítulo tem **duas versões**, definidas pela escolha no Hades.

---

### ROTA A — SCYLLA *(escolha padrão)*

`[CHECKPOINT: scylla]`
`[FUNDO: covil_scylla]`

**NARRAÇÃO:**
> As paredes do estreito se fecham. À esquerda, o rugido de água que Caríbdis faz ao respirar.
>
> À direita, uma caverna alta demais para se ver o fundo.

**ODISSEU (contrariado):**
> Remem. Não olhem para cima. Não parem por nada.

**NARRAÇÃO:**
> Ele não avisou os homens sobre Scylla. Decidiu que seria pior se soubessem.
>
> Passará o resto da vida sem saber se estava certo.

**SCYLLA (intenso):**
> Alguém acordou.

**SCYLLA (satisfeito):**
> Que educado. Bateram à porta com os remos.

**ODISSEU (neutro):**
> Deixa-nos passar.

**SCYLLA (contrariado):**
> Passar é grátis.
>
> **Sair inteiro** é que custa.

**ODISSEU (intenso):**
> Que preço?

**SCYLLA (satisfeito):**
> Seis. É sempre seis. Tenho seis bocas, e nenhuma delas gosta de esperar.

**SCYLLA (neutro):**
> Ouvi dizer que és o homem esperto. O do cavalo.
>
> Então vamos combinar: eu faço perguntas. Cada acerto teu é uma boca que fica fechada por hoje.

`[QUIZ: scylla]`

**Q1.** O que é Caríbdis, do outro lado do estreito?
- Uma serpente alada
- **✓ Um redemoinho que engole o mar**
- Uma sereia gigante
- Um rochedo vivo

**Q2.** Que Górgona transformava em pedra quem a olhasse nos olhos?
- Esteno
- Euríale
- **✓ Medusa**
- Equidna

**Q3.** O que acontecia ao se cortar uma cabeça da Hidra de Lerna?
- Ela morria
- **✓ Nasciam duas no lugar**
- Ela regenerava a mesma
- Ela fugia

`[ALTAR: scylla | oferenda: sangue, escama, sal]`

**SCYLLA (satisfeito):**
> Errado!
>
> Fico feliz, sabes? Eu **quero** que erres.

---

`[TESOURO: escama]`

**NARRAÇÃO:**
> Os tentáculos descem. Odisseu conta.
>
> Um. Dois. Três. Quatro. Cinco. Seis.
>
> Seis homens, erguidos no ar, gritando o nome dele.

**ODISSEU (contrariado):**
> ...Seis.

`[TRIPULAÇÃO: 34]`

**NARRAÇÃO:**
> **Polites. Perimedes. Antifos. Elpenor. Egíalo. Léucon.**
>
> Odisseu talhará esses seis nomes na madeira do banco com a ponta da faca, e passará a mão por cima deles todas as noites até não haver mais noites.

**SCYLLA (neutro):**
> Combinado é combinado, herói. Podias ter perdido dezoito.

**EURÍLOCO (neutro):**
> Polites era meu irmão.

**ODISSEU (intenso):**
> Euríloco—

**EURÍLOCO (neutro):**
> Não diga nada. Por favor, não diga nada.

**EURÍLOCO (contrariado):**
> O senhor sabia que eram seis. Sabia antes de entrarmos neste estreito, e entrou na mesma.
>
> Porque seis é menos que trinta e quatro.

**EURÍLOCO (intenso):**
> E o pior é que eu teria feito igual.
>
> É isso que não me sai da cabeça, capitão. Eu teria feito exatamente igual.

**NARRAÇÃO:**
> De todas as coisas que ele viu — Troia, o ciclope, o mundo dos mortos — dirá depois que aquela foi a pior.
>
> Porque foi a única em que ele sabia o que ia acontecer e remou mesmo assim.

`[PISTA COMPLETA: escama]`

`[FIM DO CAPÍTULO]` → desbloqueia **Trinácia** *(com tripulação)*

---

### ROTA B — CARÍBDIS *(rota alternativa)*

`[CHECKPOINT: caribdis]`
`[FUNDO: caribdis_redemoinho]`

**ODISSEU (intenso):**
> À esquerda! **Todos os remos à esquerda!**

**NARRAÇÃO:**
> A água à frente não é água. É um funil, e no fundo do funil há pedra nua e escura.
>
> O mar inteiro está a ser bebido.

**NARRAÇÃO:**
> O navio não afunda. É **puxado**, com uma velocidade que nenhum vento jamais deu.

**ODISSEU (intenso):**
> Segurem-se! Segurem-se em qualquer—

`[FUNDO: figueira_penhasco]`

**NARRAÇÃO:**
> Há uma figueira presa à rocha, sobre a garganta.
>
> Ele salta. Agarra. Segura.

**NARRAÇÃO:**
> E de lá, pendurado, vê o navio girar, inclinar e desaparecer com todos os homens que ainda lhe restavam.

`[TRIPULAÇÃO: 0]`

**NARRAÇÃO:**
> Quarenta homens em três segundos. Nenhum deles teve tempo de gritar coisa que se entendesse.
>
> A última imagem, antes de a água fechar por cima, é Euríloco de pé no banco com as mãos nos remos — ainda a remar, contra a garganta do mundo, porque ninguém lhe tinha mandado parar.

**NARRAÇÃO:**
> Ele espera horas. Quando Caríbdis vomita o mar de volta, cospe também os destroços.
>
> Ele desce sobre uma tábua da própria quilha.

**ODISSEU (contrariado):**
> "Sozinho", disse o profeta.
>
> Eu pensei que fosse uma profecia. Era só uma descrição.

`[TESOURO: escama]` — *(escama arrancada da parede pela sucção)*

`[QUIZ: scylla]` — *(mesmo quiz; Scylla fala do outro lado do estreito, sem atacar)*

**SCYLLA (satisfeito):**
> Escolheste a **outra**.
>
> Ninguém escolhe a outra. Estou quase ofendida.

**SCYLLA (neutro):**
> Vou fazer-te as perguntas mesmo assim. Não tenho com quem conversar há séculos, e tu já não tens ninguém para eu comer.

`[PISTA COMPLETA: escama]`

⚠️ **Efeito permanente da rota B:** Odisseu chega a Trinácia **sem tripulação**.
O capítulo VIII usa a variante marcada abaixo. Não há massacre do rebanho — há tentação individual.

`[FIM DO CAPÍTULO]` → desbloqueia **Trinácia** *(sozinho)*

---

## CAPÍTULO VIII — TRINÁCIA

> **Guardião:** Apolo · **Tesouro:** Chifre dourado · **Tema do quiz:** Hybris e punição

`[CHECKPOINT: trinacia]`
`[FUNDO: pastagem_trinacia]`

### Variante da Rota A — com tripulação

**NARRAÇÃO:**
> Os homens já não obedecem por respeito. Obedecem por hábito, e o hábito está a acabar.
>
> Seis lugares vazios ao remo. Comida para dois dias.

**EURÍLOCO (neutro):**
> Capitão. Terra. Por favor.

**ODISSEU (contrariado):**
> ...Atracamos.

**NARRAÇÃO:**
> O rebanho é a coisa mais bonita que qualquer um deles já viu. O pelo branco tem brilho próprio, os chifres são de ouro verdadeiro.
>
> Os animais não fogem. Nunca aprenderam a ter medo.

**ODISSEU (intenso):**
> Escutem-me. Este gado é de Apolo.
>
> Podem comer raízes. Podem comer peixe, casca de árvore, couro fervido. Podem passar fome.
>
> **Não toquem nos animais.**

**EURÍLOCO (contrariado):**
> E se a fome durar mais que a paciência dos deuses?

**ODISSEU (intenso):**
> Então morremos com fome, e é uma morte melhor que a alternativa.

**EURÍLOCO (neutro):**
> ...Anota isso, capitão.

**ODISSEU (neutro):**
> Anoto o quê?

**EURÍLOCO (satisfeito):**
> Nada. Uma piada velha. O senhor não se lembra.

**NARRAÇÃO:**
> Ele sobe a colina para caçar. Demora horas.
>
> No caminho de volta, sente cheiro de carne assada.

`[FUNDO: pastagem_fogueira]`

**ODISSEU (intenso):**
> **O que foi que vocês fizeram.**

**NARRAÇÃO:**
> Há um bezerro aberto sobre as pedras e trinta e três homens à volta do fogo.
>
> De pé, com a faca ainda na mão e sangue até ao cotovelo, está o homem que passou dez anos a contar os mortos um por um.

**EURÍLOCO (intenso):**
> Estávamos a morrer, capitão! Um animal! Um só!

**ODISSEU (intenso):**
> Tolos. Seus tolos. Vocês não roubaram carne. Vocês roubaram de um **deus**.

**EURÍLOCO (contrariado):**
> Eles pediram a **mim**. Olharam para mim e não para o senhor.
>
> Sabe há quanto tempo ninguém olha para o senhor assim?

**EURÍLOCO (neutro):**
> Alguém tinha de decidir. O senhor tinha ido caçar.

**ODISSEU (contrariado):**
> Eu tinha ido caçar **para vocês**.

**EURÍLOCO (intenso):**
> Pois. E voltou com três lebres.
>
> Três lebres, capitão. Para trinta e três homens.

**NARRAÇÃO:**
> Ele baixa a faca. E no instante exato em que a faca desce, deixa de estar com raiva e passa a estar aterrorizado.

**EURÍLOCO (neutro):**
> ...Anota, capitão.
>
> Anota que eu quis ir embora todas as vezes.
>
> E anota que desta vez fui eu que quis ficar.

---

### Variante da Rota B — sozinho

**NARRAÇÃO:**
> Ele chega sem navio, sem homens, sem voz para dar ordens a ninguém.
>
> A ilha está silenciosa. O rebanho pasta.

**ODISSEU (contrariado):**
> Três dias sem comer.
>
> E aqui está: comida que não foge, que não se defende, que ninguém veria eu tomar.

**NARRAÇÃO:**
> Ele tira a faca. Aproxima-se. Um bezerro o olha com a calma dos animais que nunca foram caçados.

**NARRAÇÃO:**
> Ele fica ali muito tempo.

**ODISSEU (neutro):**
> ...Não.
>
> Não porque seja errado. Porque eu **disse** que era errado, e eu não estava a mentir naquele dia.

**NARRAÇÃO:**
> Ele guarda a faca. Come raiz amarga.
>
> Ninguém vê. Ninguém saberá jamais.
>
> Exceto quem sempre vê.

---

### Ambas as rotas convergem

`[FUNDO: pastagem_luz_dourada]`

**APOLO (contrariado):**
> Eu conto o meu rebanho todas as manhãs.

**APOLO (intenso):**
> Sabem quantas vezes o número mudou, em toda a história do mundo?
>
> Até hoje: nenhuma.

**APOLO (neutro):**
> Vocês não têm ideia do que fizeram. Nunca têm.
>
> Não é a carne. Carne se repõe. É que vocês olharam para algo intocável e concluíram que a vossa fome importava mais.

**APOLO (contrariado):**
> Isso tem nome, mortais. Chama-se **hybris**.
>
> E não sou eu quem a pune. A punição já estava aí desde o começo. Eu apenas assino.

**APOLO (neutro):**
> Antes disso — uma última pergunta, filho de Laertes. Para saber se compreendes o que estou prestes a fazer.

`[QUIZ: apolo]`

**Q1.** Que jovem voou perto demais do sol e caiu no mar?
- Faetonte
- **✓ Ícaro**
- Belerofonte
- Endimião

**Q2.** Quem conduziu o carro do sol sem saber governá-lo e quase incendiou a Terra?
- Ícaro
- **✓ Faetonte**
- Hipérion
- Automedonte

**Q3.** Quem foi condenado a empurrar eternamente uma pedra montanha acima?
- Tântalo
- Prometeu
- **✓ Sísifo**
- Íxion

`[ALTAR: apolo | oferenda: louro, lira, luz]`

**APOLO (contrariado):**
> Nem isso.
>
> Faz a oferenda. Vou dar-te o tempo que não dei aos teus homens.

---

`[TESOURO: chifre_dourado]`

**APOLO (neutro):**
> Compreendes. Ótimo. Isso torna tudo pior para ti, e é justo que assim seja.

**APOLO (intenso):**
> Aquele que não tocou no rebanho será poupado.
>
> **Apenas** aquele.

`[FUNDO: mar_tempestade]`

**NARRAÇÃO:**
> O céu escurece ao meio-dia.
>
> O primeiro raio parte o mastro. O segundo parte o navio.

**NARRAÇÃO:**
> *(Rota A)* Euríloco não tenta nadar. Fica de pé sobre o convés partido, olhando o capitão na água, e faz a única coisa que sabe fazer.

**EURÍLOCO (intenso):**
> **Trinta e três!**
>
> Trinta e três, capitão! Contei duas vezes!

**NARRAÇÃO:**
> *(Rota A)* Não eram trinta e três. Eram menos, e depois menos ainda, e depois só ele.
>
> Mas contou em voz alta até ao fim, porque era o que sabia fazer — e porque o capitão precisava de saber quantos.

`[TRIPULAÇÃO: 0]`

**NARRAÇÃO:**
> *(Rota A)* Quando a água acalma, há um homem agarrado a uma tábua, e mais ninguém em lugar nenhum.
>
> *(Rota B)* Nada resta para destruir. A tempestade o arrasta assim mesmo, como se fosse uma formalidade.

`[PISTA COMPLETA: chifre_dourado]`

**ODISSEU (contrariado):**
> Eu avisei.
>
> ...De que serve ter avisado.

`[FIM DO CAPÍTULO]` → desbloqueia **Ogígia**

---

## CAPÍTULO IX — OGÍGIA

> **Guardiã:** Calipso · **Tesouro:** Tábua da jangada · **Tema do quiz:** Titãs e ninfas
> Contém a escolha temática central do jogo.

`[CHECKPOINT: ogigia]`
`[FUNDO: praia_ogigia]`

**NARRAÇÃO:**
> Areia branca. Sol morno. Um cheiro de cedro e flores que não existem em lugar nenhum do mundo conhecido.
>
> Ele acorda sem saber há quanto tempo dorme.

**CALIPSO (satisfeito):**
> Já estava a achar que não acordavas.

**ODISSEU (intenso):**
> Onde—

**CALIPSO (neutro):**
> Ogígia. A minha ilha. Não a encontrarás em mapa nenhum, porque não há mapas onde ela está.

**CALIPSO (satisfeito):**
> Sou Calipso, filha de Atlas.
>
> E tu és o meu marido.

**ODISSEU (contrariado):**
> Senhora, eu tenho—

**CALIPSO (neutro):**
> Uma esposa. Sim, falaste dela enquanto dormias.
>
> Vais parar de falar dela, com o tempo.

**NARRAÇÃO:**
> Ele não a contraria. Aprendeu, com o ciclope e com a feiticeira, que contrariar uma criatura poderosa no primeiro dia é o mesmo que morrer no primeiro dia.
>
> Aprendeu tarde demais o que custa não morrer.

`[FUNDO: praia_ogigia_noite]`

**NARRAÇÃO:**
> **Ano um.** Ele constrói uma jangada. Ela desmonta-se sozinha ao tocar a água.
>
> **Ano dois.** Ele conta os dias numa rocha. Depois para de contar.
>
> **Ano quatro.** Já não sonha com Ítaca. Sonha que sonhava com Ítaca.
>
> **Ano sete.** Todas as noites, na mesma pedra, olhando na mesma direção.

**CALIPSO (contrariado):**
> Sete anos.
>
> Sete anos de comida perfeita, de clima perfeito, de uma deusa que te quer.
>
> E tu vens para esta pedra chorar por uma ilha de cabras.

**ODISSEU (neutro):**
> É a minha ilha de cabras.

**CALIPSO (neutro):**
> Não é só a ilha. Tu falas a dormir, já te disse.
>
> Dizes um nome que não é o dela. Dizes **Euríloco** — e depois dizes um número.

**ODISSEU (contrariado):**
> Quarenta e seis.

**CALIPSO (neutro):**
> Todas as noites, há sete anos. Quarenta e seis.

**ODISSEU (neutro):**
> É quantos éramos ao sair de Troia.
>
> Ele contou três vezes para ter a certeza. Foi a última vez que alguém teve certeza de alguma coisa.

`[FUNDO: praia_ogigia]`

**CALIPSO (contrariado):**
> Hermes esteve aqui esta manhã.

**CALIPSO (intenso):**
> Ordem de Zeus. A pedido de Atena, que aparentemente ainda se lembra de ti.
>
> Devo deixar-te partir.

**ODISSEU (intenso):**
> ...Partir.

**CALIPSO (neutro):**
> Não hoje. Primeiro ouve a minha proposta. Deves-me isso.

**CALIPSO (satisfeito):**
> Fica.
>
> Come ambrosia. Bebe néctar. **Nunca envelheces.** Nunca adoeces. Nunca morres.
>
> Nada do que temes te alcança, porque nada te alcança de todo.

**CALIPSO (contrariado):**
> Ou volta para uma mulher que já não é jovem, para um filho que não te reconhece, para um palácio que talvez já não seja teu.
>
> E envelhece. E morre.

**CALIPSO (neutro):**
> Sabes que ela vai morrer, não sabes? Mesmo que a alcances. Mesmo que tudo corra bem.
>
> Eu ofereço-te para sempre. Ela oferece-te **algumas décadas**.

`[ESCOLHA: imortalidade]` — ⚠️ **A escolha temática central do jogo.**

> **A)** Aceitar a imortalidade
> **B)** Recusar e voltar para casa — *(✓ correta)*

**Se A:**

`[FUNDO: praia_ogigia_dourado]`

**NARRAÇÃO:**
> Ele fica.
>
> A ilha é bonita. Os anos param de contar. Ítaca torna-se uma palavra, depois um som, depois nada.
>
> Em algum lugar muito distante, uma mulher desmancha uma mortalha à noite, por um homem que já não existe.

**NARRAÇÃO:**
> Este não é um final ruim.
>
> É só um final que não é o teu.

`[FIO PARTIDO: esquecido]`

**MOIRAS (contrariado):**
> Este fio não acaba. É esse o problema.
>
> Um fio que não acaba não é uma vida. É um bordado.
>
> Volta atrás.

**Se B:**

**ODISSEU (neutro):**
> Senhora, eu sei o que estou a recusar.

**ODISSEU (neutro):**
> Sei que és mais bela do que ela. Sei que és uma deusa e ela é uma mulher que a esta altura tem cabelos brancos e mãos cansadas de tear.
>
> Não estou a comparar-vos. Não há comparação a fazer.

**ODISSEU (intenso):**
> É que uma eternidade em que eu não volto para casa não é uma eternidade.
>
> É uma sala muito grande.

**CALIPSO (contrariado):**
> ...

**CALIPSO (neutro):**
> Vocês, mortais, valorizam as coisas por serem breves.
>
> Nunca vou entender isso. E acho que é por isso que ganham.

**CALIPSO (neutro):**
> Antes de ires — quero saber com quem passei sete anos.
>
> Falaste da tua ilha o tempo todo. Fala-me do meu mundo, por uma vez.

`[QUIZ: calipso]`

**Q1.** De quem Calipso é filha?
- Oceano
- **✓ Atlas**
- Hélios
- Nereu

**Q2.** Qual é o alimento dos deuses, que confere imortalidade?
- Hidromel
- **✓ Ambrosia**
- Néctar de romã
- Vinho de Dionísio

**Q3.** Que Titã liderou a geração anterior aos deuses olímpicos e foi destronado por Zeus?
- Atlas
- Hipérion
- **✓ Cronos**
- Prometeu

`[ALTAR: calipso | oferenda: flor de cedro, água doce, cinza]`

**CALIPSO (contrariado):**
> Sete anos na minha casa e não sabes isto.
>
> Talvez não estivesses tão presente quanto eu pensava.

---

`[D&D: montar_jangada]`

> **Objetivo:** arrastar toras, pregos, vela e leme para as silhuetas corretas na jangada.
> **Nota de design:** esta é a mesma mecânica de encaixe do Enigma Final. Funciona como tutorial disfarçado.

`[TESOURO: tabua_jangada]`
`[PISTA COMPLETA: tabua_jangada]`

**CALIPSO (neutro):**
> Vai.
>
> E Odisseu — quando fores velho, e ela também, e estiverem os dois numa casa fria com os ossos a doer...

**CALIPSO (satisfeito):**
> ...espero que ainda aches que valeu a pena.

**ODISSEU (satisfeito):**
> Vou achar.

`[FIM DO CAPÍTULO]` → desbloqueia **Ítaca**

---

## CAPÍTULO X — ÍTACA

> **Guardiã:** Penélope · **Tesouro:** — · Culmina no **Enigma Final**

`[CHECKPOINT: itaca]`
`[FUNDO: praia_itaca]`

**NARRAÇÃO:**
> Vinte anos.
>
> A areia é a mesma. O cheiro é o mesmo. Há uma oliveira na encosta que ele plantou antes de partir e que agora dá sombra.

**ODISSEU (intenso):**
> Estou em casa.
>
> ...Estou em casa.

**NARRAÇÃO:**
> Ele diz isso em voz alta, virado para trás, para quarenta e cinco homens que não estão ali.

**ATENA (neutro):**
> Ainda não.

**ODISSEU (intenso):**
> Senhora! Vinte anos, e agora—

**ATENA (contrariado):**
> Vinte anos e a primeira coisa que fazes é gritar o teu nome numa praia aberta. Não aprendeste nada com o ciclope?

**ATENA (neutro):**
> Escuta. O teu palácio está cheio de homens que vieram cortejar a tua mulher.
>
> Comem o teu gado. Bebem o teu vinho. Dormem nas tuas camas.

**ATENA (intenso):**
> E há entre eles quem prefira encontrar-te morto a encontrar-te vivo.

**ODISSEU (contrariado):**
> Então que me encontrem. Tenho espada.

**ATENA (contrariado):**
> Tens **uma** espada. Eles são mais de cem.

**ATENA (neutro):**
> Não. Vais entrar da forma que sempre te serviu melhor.
>
> Vais entrar como ninguém.

**NARRAÇÃO:**
> Ela toca a testa dele. A pele enruga. As costas curvam. As roupas se desfazem em trapos.
>
> No reflexo da água há um mendigo velho.

**ATENA (satisfeito):**
> Já foste "Ninguém" uma vez e resultou.
>
> Sê "Ninguém" outra vez. E desta vez, **não grites o teu nome no fim**.

`[FUNDO: salao_palacio]`

**NARRAÇÃO:**
> O salão cheira a carne velha e vinho entornado. Homens que ele não conhece jogam dados na mesa onde o pai dele comia.

> **CRIADO:** Coitado do velho. Queres pão?
>
> **ODISSEU:** Quero notícias. Quem são estes?

> **CRIADO:** Pretendentes. Vieram de toda parte, quando se soube que o rei tinha morrido no mar.

> **ODISSEU:** E a rainha?

> **CRIADO:** Segurou-os três anos com um truque. Disse que escolheria marido quando acabasse a mortalha do sogro. Tecia de dia...
>
> **CRIADO:** ...e desmanchava à noite.

**ODISSEU (satisfeito):**
> ...Claro que sim.

> **CRIADO:** Uma criada contou. Descobriram há um mês. Agora ela não tem mais desculpas.

`[FUNDO: salao_trono]`

**NARRAÇÃO:**
> Ela entra.
>
> Ele não vê os cabelos brancos. Vê a forma como ela atravessa o salão — a mesma de vinte anos atrás, exatamente a mesma.

**PENÉLOPE (neutro):**
> Basta.

**PENÉLOPE (contrariado):**
> Vocês querem uma decisão. Terão uma decisão.

**NARRAÇÃO:**
> Ela deposita um arco no chão. Um arco enorme, de chifre e tendão, que não é retesado há vinte anos.

**PENÉLOPE (neutro):**
> Este arco era do meu marido.
>
> Havia um jogo que ele fazia neste salão: alinhava doze machados e disparava uma flecha através dos doze olhais, sem tocar em nenhum.

**PENÉLOPE (intenso):**
> Aquele que conseguir armar este arco e repetir o feito — casarei com ele.

**PENÉLOPE (contrariado):**
> Boa sorte.

**NARRAÇÃO:**
> Ela sai antes que alguém responda. Ela sabe exatamente o que está a fazer.

`[FUNDO: patio_palacio]`

**NARRAÇÃO:**
> Um rapaz observa o mendigo há um tempo. Olhos escuros. Queixo teimoso.

> **TELÊMACO:** Velho. Estás a olhar para o arco como quem já o segurou.

**ODISSEU (intenso):**
> Telêmaco.

> **TELÊMACO:** Como sabes o meu—

**ODISSEU (contrariado):**
> Tinhas um ano. Estavas ao colo da tua mãe no cais, e choraste porque o vento estava frio, e eu disse a ela que voltaria antes de tu aprenderes a andar.

**NARRAÇÃO:**
> Atena desfaz o feitiço por um instante. Um instante só.

> **TELÊMACO:** ...Pai?

**ODISSEU (neutro):**
> Não chores. Não agora. Depois há tempo para chorar.

**ODISSEU (intenso):**
> Agora ouve. Vou pedir para tentar o arco. Eles vão rir.
>
> Quando eu o armar, tranca as portas do salão.

> **TELÊMACO:** Vais matá-los.
>
> **ODISSEU:** Vou.

> **TELÊMACO:** São mais de cem.
>
> **ODISSEU (satisfeito):** Já enfrentei coisa pior com menos gente.

`[FUNDO: salao_palacio]`

**NARRAÇÃO:**
> Um por um, eles tentam. Untam o arco com sebo. Aquecem-no ao fogo. Puxam com as duas mãos, com o pé no arco, com o peso todo do corpo.
>
> A corda não chega nem perto do entalhe.

> **PRETENDENTE:** Este arco é uma piada. Nenhum homem vivo consegue.

**ODISSEU (neutro):**
> Deixem-me tentar.

**NARRAÇÃO:**
> O salão inteiro ri.

> **PRETENDENTE:** O mendigo! O mendigo quer casar com a rainha!
>
> **PRETENDENTE:** Toma, velho. Não partas os braços.

**NARRAÇÃO:**
> Atiram o arco aos pés dele.

**ODISSEU (neutro):**
> Disseste que nenhum homem **vivo** consegue.

**ODISSEU (intenso):**
> E um homem que está morto?

**NARRAÇÃO:**
> Ele levanta o arco com uma mão.
>
> E arma-o com a facilidade de quem afina um instrumento.

**NARRAÇÃO:**
> O salão fica em silêncio.
>
> Alguém, no fundo, tenta a porta. Está trancada.

→ **ENIGMA FINAL**

---

## ENIGMA FINAL — OS DOZE MACHADOS

> Requisito 4.6 do PDF: área para montagem da solução + validação da resposta.

`[FUNDO: salao_machados]`

**NARRAÇÃO:**
> Doze machados alinhados. Doze olhais de metal formando um único túnel escuro.
>
> Uma flecha. Uma chance.

**ATENA (neutro):**
> A flecha não vai passar sozinha, Odisseu.
>
> Tudo o que sofreste te trouxe até aqui. **Ordena a tua jornada.** Cada coisa no seu lugar, na ordem em que aconteceu.
>
> Um homem que não sabe de onde veio não acerta onde quer chegar.

**ATENA (contrariado):**
> E não te enganes sobre o que estás a fazer aqui.
>
> Não estás a arrumar recordações. Estás a contar os teus mortos pela última vez, em ordem, um por um.

**ATENA (neutro):**
> Havia um homem a bordo que fazia isso por ti.
>
> Agora fá-lo tu.

`[D&D: doze_machados]`

> **Mecânica:** o jogador arrasta os **9 tesouros** do inventário para os machados, na **ordem cronológica** da viagem.
> **Validação:** ao acertar a sequência completa, os doze olhais se alinham e a flecha atravessa.
> **Erro:** o machado correspondente treme e devolve a peça. Sem punição, sem limite de tentativas.
> **Acessibilidade:** operável por teclado (Tab/Setas/Espaço) com anúncios ARIA a cada movimento.

**Ordem correta:**

1. Lasca do Cavalo — *Troia*
2. Anel de lã do carneiro — *Ciclopes*
3. Odre de couro — *Éolo*
4. Ramo de moly — *Circe*
5. Óbolo de Caronte — *Hades*
6. Nó de cera — *Sereias*
7. Escama — *Scylla / Caríbdis*
8. Chifre dourado — *Trinácia*
9. Tábua da jangada — *Ogígia*

**NARRAÇÃO:**
> A flecha atravessa os doze.
>
> Ninguém a ouve tocar o chão do outro lado, porque ninguém no salão está a respirar.

**NARRAÇÃO:**
> Quando os pretendentes se viram para o mendigo, o mendigo não está lá.
>
> Está um homem de ombros largos e barba escura, e todos ali sabem exatamente quem é.

> **PRETENDENTE:** ...Não. Não, tu morreste. Toda a gente disse—

**ODISSEU (intenso):**
> Eu morri.
>
> Morri na primeira noite fora deste palácio, e cada vez que perdi um homem, e no dia em que vi a fumaça de Ítaca e adormeci.

**ODISSEU (contrariado):**
> E voltei mesmo assim.

> **PRETENDENTE:** Podemos pagar! Devolvemos tudo, o dobro, o triplo—

**ODISSEU (neutro):**
> Vocês não comeram o meu gado.
>
> Comeram os vinte anos em que eu não estive aqui. E isso não se paga com gado.

**NARRAÇÃO:**
> *(Cinemática — sem interação do jogador.)*
>
> O salão está trancado. Telêmaco guarda a porta.
>
> Nenhum deles sai.

---

## EPÍLOGO — O LEITO DE OLIVEIRA

`[FUNDO: aposento_leito]`

**NARRAÇÃO:**
> Ele lava as mãos três vezes. Continuam a tremer.
>
> Sobe as escadas que subiu mil vezes e nunca lhe pareceram tão longas.

**PENÉLOPE (neutro):**
> Não te aproximes.

**ODISSEU (intenso):**
> Penélope—

**PENÉLOPE (contrariado):**
> Vinte anos.
>
> Nesses vinte anos, quatro homens entraram por aquela porta a dizer que eram meu marido.

**PENÉLOPE (neutro):**
> Um deles sabia o nome do meu pai. Outro sabia a cor dos olhos do meu filho.
>
> Um deles chorou. Chorou muito bem.

**PENÉLOPE (intenso):**
> Os deuses mudam rostos como quem muda de manto. Já me enganaram antes.
>
> Se és quem dizes, responde.

`[QUIZ: penelope]`

**Q1.** Quem são as três Moiras que fiam, medem e cortam o fio de cada vida?
- As Graças
- **✓ Cloto, Láquesis e Átropos**
- As Erínias
- As Hespérides

**Q2.** Que herói venceu o Minotauro e escapou do Labirinto graças a um fio?
- Perseu
- Belerofonte
- **✓ Teseu**
- Jasão

`[ALTAR: penelope | oferenda: fio de lã, azeite, oliveira]`

**PENÉLOPE (contrariado):**
> Não.
>
> Sai da minha casa.

---

**PENÉLOPE (neutro):**
> Sabes de mitologia. Qualquer aedo sabe de mitologia.

**PENÉLOPE (intenso):**
> A última pergunta não é sobre deuses.

**NARRAÇÃO:**
> Ela se vira para a porta.

**PENÉLOPE (neutro):**
> Euricleia. Tira o leito do quarto dele e faz a cama no corredor, para que o hóspede descanse.

**NARRAÇÃO:**
> Ele reage antes de pensar.

**ODISSEU (intenso):**
> **Quem moveu o meu leito.**

**ODISSEU (contrariado):**
> Quem foi? Que homem? Nem vinte homens moveriam aquela cama, mulher, e tu sabes disso melhor que ninguém—

`[QUIZ FINAL: leito]`

**Q3.** Por que o leito de Odisseu não pode ser movido?

- Porque é de mármore maciço
- Porque foi selado com bronze ao chão
- **✓ Porque foi talhado de uma oliveira viva, cuja raiz ainda está na terra**
- Porque é grande demais para passar pela porta

*Não há altar para esta pergunta. Errar significa apenas que ele não é Odisseu.*

**ODISSEU (neutro):**
> Havia uma oliveira neste terreno. Grossa como uma coluna, viva, com raiz funda.
>
> Construí o quarto à volta dela. Cortei os ramos, aplainei o tronco, e desse tronco fiz o pé da cama.

**ODISSEU (contrariado):**
> Aquele leito tem raiz. Está preso ao chão de Ítaca.
>
> Ninguém pode movê-lo sem cortar a árvore. E ninguém sabe disso além de ti, de mim, e da criada que estava lá no dia.

**NARRAÇÃO:**
> Os joelhos dela cedem.

**PENÉLOPE (intenso):**
> ...És tu.

**PENÉLOPE (contrariado):**
> Não te zangues comigo. Por favor não te zangues comigo, eu tinha de perguntar, eu tinha de—

**ODISSEU (satisfeito):**
> Eu sei.
>
> Foi a coisa mais inteligente que alguém me fez em vinte anos.

**NARRAÇÃO:**
> Ela atravessa o quarto e agarra-se a ele como náufrago a uma tábua.
>
> E é exatamente isso que ela é. E ele também.

**PENÉLOPE (neutro):**
> Vinte anos.

**ODISSEU (neutro):**
> Não houve um dia.
>
> Uma deusa ofereceu-me a eternidade. Recusei porque a eternidade não te incluía.

**PENÉLOPE (satisfeito):**
> ...Ainda mentes muito bem.

**ODISSEU (satisfeito):**
> Esta é verdade.

**PENÉLOPE (neutro):**
> Eu sei.

`[FUNDO: aposento_amanhecer]`

**NARRAÇÃO:**
> Do lado de fora, o mar continua onde sempre esteve.
>
> Pela primeira vez em vinte anos, ele não significa nada. É só água.

**NARRAÇÃO:**
> Conta-se que há homens que os deuses amam.
>
> Conta-se que há homens que os deuses não conseguem esquecer.
>
> E conta-se, embora raramente, que um deles chegou em casa.

**FIM**

---

## APÊNDICE A — TABELA DE TESOUROS

| # | Capítulo | Tesouro | Símbolo | Estado inicial |
|---|---|---|---|---|
| 1 | Troia | Lasca do Cavalo | Cavalo de madeira | bloqueada |
| 2 | Ciclopes | Anel de lã do carneiro | Olho fechado | bloqueada |
| 3 | Éolo | Odre de couro | Espiral de vento | bloqueada |
| 4 | Circe | Ramo de moly | Flor branca | bloqueada |
| 5 | Hades | Óbolo de Caronte | Moeda | bloqueada |
| 6 | Sereias | Nó de cera | Onda sonora | bloqueada |
| 7 | Scylla | Escama | Seis pontos | bloqueada |
| 8 | Trinácia | Chifre dourado | Sol | bloqueada |
| 9 | Ogígia | Tábua da jangada | Vela | bloqueada |

**Ciclo de estados:** `bloqueada` → (tesouro encontrado) → `incompleta` → (quiz correto) → `completa`

---

## APÊNDICE B — GABARITO DOS QUIZZES

| Cap. | Guardião | Q1 | Q2 | Q3 |
|---|---|---|---|---|
| I | Atena | Ártemis | Aquiles | Cassandra |
| II | Polifemo | Poseidon | Minotauro | Tridente |
| III | Éolo | Bóreas | Atlas | Prometeu |
| IV | Circe | Loureiro | Aracne | Narciso |
| V | Tirésias | Caronte | Três | Perséfone |
| VI | Sereias | Nove | Orfeu | Mársias |
| VII | Scylla | Redemoinho | Medusa | Nascem duas |
| VIII | Apolo | Ícaro | Faetonte | Sísifo |
| IX | Calipso | Atlas | Ambrosia | Cronos |
| X | Penélope | As três Moiras | Teseu | Oliveira viva |

### Escolhas narrativas (podem matar)

| Capítulo | Escolha | Resposta correta | Falha |
|---|---|---|---|
| II | Oferta ao ciclope | Vinho | Devorado |
| II | O nome | Ninguém | Morte diferida na saída |
| II | A fuga | Cegar Polifemo | Devorado / enterrado |
| III | A vigília | *(invencível — por design)* | Sem punição |
| V | Método das Sereias | Cera de abelha | Naufrágio |
| V | Scylla ou Caríbdis | *(ambas válidas)* | Rotas distintas |
| IX | A imortalidade | Recusar | Final "Esquecido" |

---

## APÊNDICE C — CONTADOR DE TRIPULAÇÃO

Exibido no HUD durante toda a viagem. Persistido junto ao restante do estado.

| Cap. | Evento | Antes | Depois |
|---|---|---|---|
| I | Partida de Troia | — | **46** |
| II | Polifemo janta seis vezes | 46 | **40** |
| III | Éolo — sem perdas | 40 | 40 |
| IV | Circe — os 22 são devolvidos | 40 | 40 |
| V | Hades — sem perdas | 40 | 40 |
| VI | Sereias — sem perdas | 40 | 40 |
| VII-A | Scylla cobra o preço | 40 | **34** |
| VII-B | Caríbdis engole o navio | 40 | **0** |
| VIII-A | O raio de Zeus | 34 | **0** |
| VIII-B | *(já em zero)* | 0 | 0 |
| IX–X | — | 0 | 0 |

**O número nunca sobe.** Não há reforços nem resgates. O jogador percebe a regra por volta do Capítulo III, e a partir daí cada atracagem passa a ser lida com medo.

### Os seis de Scylla

Nomeados em cena, sem sprite. Servem para que a perda tenha som de gente e não de estatística.

| Nome | Nota |
|---|---|
| **Polites** | Irmão de Euríloco. É o nome que ele diz em voz alta. |
| Perimedes | — |
| Antifos | — |
| Elpenor | — |
| Egíalo | — |
| Léucon | — |

---

## APÊNDICE D — ARCO DE EURÍLOCO

Referência rápida para manter a voz consistente entre capítulos.

| Cap. | Função na cena | Estado interno |
|---|---|---|
| I | Conta 46 e sorri | Alívio. A guerra acabou. |
| II | Quer levar o queijo e ir embora — **está certo** | Prudência ignorada |
| III | Duvida do odre e o abre para defender o capitão | Lealdade que sai pela culatra |
| IV | Sobrevive a Circe escondido atrás de uma árvore | Vergonha |
| VI | Aperta as cordas do mastro como mandado | Obediência perfeita, tarde demais |
| VII-A | Perde o irmão e admite que teria decidido igual | Luto sem culpado |
| VIII | Ergue a faca sobre o gado de Apolo | Comando roubado, e o preço dele |
| VIII | Conta em voz alta enquanto morre | Fidelidade ao próprio ofício |

**A frase-motivo:** *"Anota isso, capitão. Anota que eu quis ir embora."*
Dita em tom de piada no Capítulo II. Devolvida invertida no Capítulo VIII, quando ele é o único que quis ficar.

**Regra de escrita:** Euríloco nunca está errado por burrice. Está errado por cansaço, por medo ou por lealdade mal aplicada. Se uma fala dele soar estúpida, reescreva.

---

## CONTROLE DE VERSÃO

| Versão | Data | Alterações |
|---|---|---|
| 1.0 | — | Versão inicial. 10 capítulos, prólogo, enigma final e epílogo. |
| 1.1 | — | Tripulação promovida a personagem. Euríloco criado como rosto nomeado (7 capítulos) e *A Tripulação* como coro coletivo. Contador de tripulação (46→40→34→0) adicionado ao HUD e ao estado persistido. Os seis perdidos para Scylla foram nomeados. Novos apêndices C e D. Corrigidas duas marcações de fala quebradas no Epílogo. |

### Pendências para as próximas versões

- [x] ~~Nomear os seis tripulantes perdidos para Scylla~~ — feito na v1.1
- [x] ~~Escrever as falas dos tripulantes genéricos com mais personalidade~~ — resolvido pela criação de Euríloco
- [x] ~~Revisar duração da Rota B (Caríbdis)~~ — continua mais curta, mas agora perde 40 homens de uma vez; o peso compensa a extensão
- [ ] Definir textos de feedback de erro para cada quiz individualmente
- [ ] Decidir se o Prólogo é pulável em jogadas subsequentes
- [ ] Definir a arte do sprite de grupo de *A Tripulação* (silhueta? três figuras? recorte no canto da tela?)
- [ ] Avaliar se o contador de tripulação aparece também na tela do Mapa ou só no HUD de cena
- [ ] Decidir se os seis nomes de Scylla aparecem no inventário como item narrativo
