# A ODISSEIA — Prompts de arte
### Guia de geração de imagens para a visual novel
**Versão 1.0** · complementa `roteiro-odisseia-v1.md`

---

## COMO USAR ESTE DOCUMENTO

1. Copie o **bloco de estilo** (abaixo) **sem alterar uma palavra**.
2. Cole o bloco antes do prompt específico da cena.
3. Acrescente os **parâmetros técnicos** no fim.

A consistência entre 20+ imagens depende de o bloco de estilo ser **literalmente idêntico** em todas as gerações. Qualquer variação de palavra muda o resultado. Não reescreva, não resuma, não traduza.

**Estrutura final de cada prompt:**

```
[BLOCO DE ESTILO] + [PROMPT DA CENA] + [PARÂMETROS TÉCNICOS]
```

---

## BLOCO DE ESTILO (usar sempre, sem modificar)

```
Hand-painted digital illustration in a stylized graphic-novel manner. Bold
confident ink linework with varying line weight, thick contour outlines around
major shapes. Cel-shaded painting with visible painterly brush texture inside
the flats. Highly saturated limited palette built on complementary contrast:
deep indigo, violet and teal shadows against hot orange, magenta and gold
highlights. Strong rim lighting and glowing luminous accents on the focal
point. Dramatic chiaroscuro, dark ambient environment with one dominant light
source. Decorative Art Nouveau influence with ancient Greek ornamental motifs:
gold filigree, meander key patterns, black-figure pottery flourishes. Strong
readable silhouettes. Rich vignette darkening the edges. Elegant, theatrical,
mythic mood. Not photorealistic, not 3D render, not anime.
```

---

## PARÂMETROS TÉCNICOS

**Para cenários de diálogo (a maioria):**

```
Wide 16:9 environment background plate. No characters, no people, no figures.
Empty stage. Composition keeps the lower third visually simple and uncluttered
for a UI dialogue box overlay. Focal point positioned in the upper two-thirds,
off-center. --ar 16:9
```

**Para telas de interface (menu, mapa, conclusão):**

```
Wide 16:9 illustrated game interface background plate. No text, no lettering,
no words, no UI elements, no buttons. Central area kept calm and low-contrast
to receive overlaid interface. --ar 16:9
```

**Negative prompt (usar em todas):**

```
text, letters, words, watermark, signature, photorealistic, 3D render,
photograph, anime, manga, chibi, modern clothing, modern objects, blurry,
low contrast, washed out, cluttered lower third
```

---

## ⚠️ REGRAS QUE ECONOMIZAM RETRABALHO

**Gere sempre sem personagens.** Os sprites entram por cima em camada separada. Um cenário com gente desenhada dentro é inútil numa visual novel — o personagem fica preso ali para sempre e não pode mudar de expressão.

**O terço inferior é sagrado.** É onde vai a caixa de diálogo. Se a imagem tiver detalhe importante ali, ele será coberto. Todo prompt deste documento já pede isso, mas confira no resultado.

**Reaproveite bases.** Onde este documento marca `VARIANTE`, você gera **uma** imagem e faz ajuste de cor/camada, em vez de gerar do zero. Isso corta o volume de arte quase pela metade.

**Guarde a seed.** Quando sair um resultado bom, anote a seed. Variantes da mesma base devem usar a mesma seed.

---

# PARTE 1 — TELAS DE INTERFACE

## 1.1 · Tela Inicial (menu)

> **Uso:** primeira tela do jogo. Botões "Zarpar" e "Retomar a viagem" sobrepostos.

```
A lone dark-hulled ancient Greek galley silhouetted on a vast night sea, seen
from a low distant angle. The ship is small against an enormous star-filled
sky. A constellation shaped like a stylized owl glows faintly among the stars
in gold. The sea is deep indigo with magenta and teal reflected highlights on
the wave crests. On the far right horizon, one tiny warm amber light — a
distant island fire, almost too small to notice. Ornamental gold Greek meander
border framing the outer edges of the image, art nouveau flourishes in the
corners. Vast, lonely, inviting.
```

**Nota de composição:** o centro precisa ficar escuro e vazio para os botões e o título caberem.

---

## 1.2 · Tela do Mapa

> **Uso:** seleção de capítulos. Os pontos e a trilha são desenhados em SVG **por cima** — a imagem é só o fundo.

```
An ancient nautical chart of the Mediterranean Sea rendered as a weathered
illuminated manuscript. Aged parchment texture in warm cream and amber, edges
darkened and cracked. Coastlines of Greece, Italy and Anatolia drawn in
confident dark ink linework with hand-painted stylization. The sea is a deep
teal-indigo wash with fine engraved wave hatching. Decorative gold compass
rose in one corner, ornamental sea monster illustrations in the empty water in
black-figure pottery style, gold Greek meander border framing the whole chart.
No place names, no labels, no text anywhere. Painterly, mythic, tactile.
```

### VARIANTE — camada de névoa

Gere uma segunda imagem para sobrepor com opacidade nas regiões bloqueadas:

```
Seamless texture of thick dark indigo mist and drifting fog, semi-transparent,
soft edges, painterly brush texture, deep violet and near-black tones, subtle
gold sparkle particles. Abstract atmospheric layer. --ar 16:9
```

**Implementação do meio-termo:** aplique esta névoa em CSS sobre a região dos pontos ainda bloqueados. Concluídos e o ponto atual ficam limpos e com nome legível; os futuros aparecem como silhuetas sob a névoa, sem nome.

---

## 1.3 · O Altar (retentativa após erro no quiz)

> **Uso:** overlay do minigame de oferenda. Reutilizado nos 10 capítulos com troca de cor.

```
A weathered stone altar of ancient Greek design seen from directly in front,
centered, isolated against near-black darkness. Carved marble with gold
meander inlay along the base, worn and chipped. A shallow bronze offering bowl
rests on top, empty. Small flames burn at the two front corners casting warm
orange rim light up the stone. Wisps of incense smoke curl upward into the
black. Behind the altar, a faint vertical column of divine light. Solemn,
ritual, expectant.
```

**Nota:** gere **uma** vez. Recolora a luz divina por CSS filter conforme o deus — dourado (Atena, Apolo), verde-mar (Poseidon), violeta (Hades), branco-frio (Musas), rosa (Circe, Calipso).

---

## 1.4 · O Fio Partido (tela de morte)

```
Three enormous spindles of golden thread floating in absolute void darkness.
One thread is taut and glowing, one is being measured, one is severed and
drifting apart with the cut ends still luminous. Around them, a slowly turning
constellation of faint stars. Deep violet and near-black background with the
gold thread as the only real light source. Cold, impersonal, vast. No figures,
no hands, no people.
```

---

## 1.5 · Tela de Conclusão

```
Warm dawn light over a small rocky Greek island seen from the sea at a gentle
distance. Olive trees on the slopes, a modest stone palace on the ridge, thin
smoke rising from a hearth. The sky is soft rose, amber and pale gold — the
first genuinely warm and peaceful light in the entire journey. Calm water with
gold ripples. Ornamental gold Greek meander border framing the edges. Serene,
earned, homecoming.
```

---

# PARTE 2 — CENÁRIOS DOS CAPÍTULOS

## 2.1 · Prólogo — Mar noturno

```
Open black sea under a heavy star field, viewed from just above the water
surface. Long slow swells in deep indigo with faint teal crests. No land in
any direction. A single distant flicker of lightning far on the horizon.
Overwhelming emptiness, vast scale, quiet dread.
```

---

## 2.2 · Troia — Muralhas ao amanhecer

```
The ruined walls of an ancient burning city at dawn, seen from atop the
rubble. Massive cyclopean stone blocks toppled and scattered. Columns of black
smoke rising against a bruised violet and orange sunrise sky. Distant fires
glowing amber between broken walls. Scattered bronze shields and broken spears
half-buried in ash. Desolate aftermath, monumental scale, morning cold.
```

### VARIANTE — Chegada de Atena
Mesma base, adicione:
```
The smoke in the center foreground is unnaturally bright, gathering into a
column of brilliant polished-gold divine light, casting hard warm rim light
across the surrounding stones. Faint owl-shaped shadows in the glow.
```

---

## 2.3 · Ciclopes — Praia rochosa

```
A harsh volcanic beach of black rock and grey sand at overcast midday. Jagged
basalt formations rising from the shore. A towering dark cliff face behind
with one enormous cave mouth, disproportionately large, unsettlingly big for
any human dwelling. Sparse dry grass. Sickly pale sky. No harbor, no docks, no
signs of civilization. Wrong scale, quietly threatening.
```

---

## 2.4 · Ciclopes — Interior da caverna

```
Interior of an enormous cave lit by a low central fire. Everything is at the
wrong scale: wheels of cheese stacked chest-high like masonry, wooden pails
the size of barrels, coiled rope thick as a man's arm. Rough stone walls
receding into darkness far overhead. Warm orange firelight from below casting
long distorted shadows up the walls. Straw and animal pens along the sides.
Domestic and monstrous at once.
```

### VARIANTE A — Entrada bloqueada
```
The cave entrance in the background is sealed by a colossal boulder. All
natural daylight is gone. Only the fire remains, and the darkness beyond it is
absolute. Claustrophobic, sealed, airless.
```

### VARIANTE B — A estaca no fogo
```
The central fire burns fiercely, roaring high. A massive olive-wood stake with
a sharpened blackened tip rests in the coals, glowing red-hot at the point.
Harsh violent orange light. Deep hard-edged shadows. Tense.
```

---

## 2.5 · Éolo — Ilha voadora

```
An impossible island floating in open sky, seen from below and to the side.
Sheer polished bronze walls encircle the island's rim, gleaming. Beneath the
island: nothing but clouds and open air, its rocky underside trailing vines
and streams of falling water that dissolve into mist. Spiraling currents of
visible wind curl around it in pale teal and white. Bright high-altitude
daylight, unnervingly clear. Awe, vertigo, divine architecture.
```

---

## 2.6 · Convés do navio

> **Base compartilhada — usada em 3 capítulos.** Gere uma vez.

```
The deck of an ancient Greek galley seen from the stern looking forward. Rows
of empty wooden benches and oars, a single square sail on a tall mast, coiled
rope and stacked amphorae. Weathered timber with visible grain and salt
staining. Open sea and clear sky beyond the bow. No people. Functional,
worn, lived-in.
```

### VARIANTE A — Dia calmo (Éolo, capítulo III)
```
Bright steady daylight, calm blue-teal water, sail full and taut with a
following wind. Warm, hopeful, uneventful.
```

### VARIANTE B — Tempestade
```
Violent storm. Black clouds churning low overhead, sheets of rain, the sail
torn and whipping, water flooding across the deck boards. Lightning
illuminating everything in harsh blue-white flashes. Chaos, terror, loss of
control.
```

### VARIANTE C — Noite de vigília
```
Deep night, single oil lamp burning low, everything else in blue-black
shadow. Stars overhead. Utterly still and silent. Exhaustion, loneliness,
the weight of long hours.
```

---

## 2.7 · Circe — Floresta de Eeia

```
A dense unnaturally lush forest at golden hour. Enormous ancient trees with
twisting trunks, thick moss, ferns and flowering vines in impossible
saturation. Shafts of warm gold light cutting down through the canopy. Between
the trunks in the middle distance, the pale marble roofline of a palace, only
partly visible. Too green, too quiet, too beautiful. Seductive and wrong.
```

---

## 2.8 · Circe — Palácio

```
Interior hall of a Greek palace at night. Polished marble floor reflecting
light, fluted columns, walls painted with vivid frescoes of animals — wolves,
lions, boars — rendered in black-figure pottery style. A long low table set
with a golden mixing bowl, cups and fruit. Braziers burning with a faint
violet-pink flame casting rose-colored light. Loom in the corner with a
half-finished weaving. Opulent, warm, subtly predatory.
```

---

## 2.9 · Hades — Rio Estige

```
A black river flowing through a colossal underground cavern. The water is
perfectly still and reflects nothing. Along both banks, dense crowds of pale
translucent human silhouettes stand motionless, faceless, watching — rendered
as abstract glowing shapes, not detailed figures. Enormous stalactites
overhead vanishing into darkness. Cold violet and cyan light with no visible
source. Absolute silence. Dread, scale, the wrongness of the dead.
```

---

## 2.10 · Hades — Praia do submundo

```
A wide shore of fine grey ash beside black water, in an endless cavern. Bare
white asphodel flowers growing in sparse patches from the ash. Twisted dead
trees. A low horizon of cold violet mist. Faint cyan light with no source. No
sky, only distant blackness above. Bleak, still, ancient, sorrowful.
```

---

## 2.11 · Sereias — Estreito enevoado

```
A narrow sea passage between two sheer cliff walls, choked with thick pale
fog. The water is glassy, mirror-flat, unnaturally motionless. No wind. The
cliffs above disappear into white mist. Weak diffuse grey-blue light.
Everything muffled and colorless. Silence made visible. Suffocating stillness.
```

### VARIANTE — O canto
```
The fog now glows from within with shifting bands of iridescent color — rose,
gold, pale green — pulsing like sound made visible. Faint spiral patterns
rippling through the mist. Beautiful and deeply unsettling.
```

---

## 2.12 · Scylla — Covil

```
Looking up at a colossal jagged cave mouth set high in a black cliff face
above churning water. The opening is impossibly deep and dark, six smaller
hollows visible around its rim like sockets. Sharp broken rock. Below, violent
white foam against black stone. Harsh cold blue-grey light with deep red
accents in the cave depths. Predatory, waiting, wrong.
```

---

## 2.13 · Caríbdis — Redemoinho *(rota B)*

```
An enormous whirlpool viewed from its rim, the sea draining into a spiraling
funnel so deep that bare black rock is exposed at the bottom. Concentric rings
of churning white foam. A twisted ancient fig tree clinging to the cliff wall
above the void, roots gripping bare stone. Violent motion, catastrophic scale,
the sea itself being swallowed.
```

---

## 2.14 · Trinácia — Pastagem

```
A wide green upland meadow at late afternoon under a warm sky. Impossibly
lush grass. A herd of cattle grazing in the middle distance, their hides pure
luminous white and their horns visibly solid gold, faintly glowing. Everything
soft, golden, peaceful, safe. Distant sea beyond the ridge. Idyllic to the
point of unease. Nothing threatening visible.
```

### VARIANTE — A fogueira
```
Dusk. In the foreground a crude cooking fire burns with dark greasy smoke.
Sky above darkening prematurely to bruised violet. The remaining cattle in the
distance have all turned to face the fire. Sacrilege, dread, consequence
gathering.
```

---

## 2.15 · Ogígia — Praia

```
A small paradise island beach at soft warm daylight. White sand, gentle
turquoise water, cypress and cedar trees, flowering vines in violet and gold,
a cave mouth draped in blossoms. Beautiful, temperate, perfect. But the
horizon is featureless in every direction — no other land anywhere. A single
weathered rock at the water's edge sits worn smooth by long use. Gilded cage,
paradise as prison.
```

### VARIANTE — Noite do sétimo ano
```
Night. Cool blue-violet moonlight. The same beach, the same rock, the sea
black and endless. Melancholy, exhaustion, seven years of the same view.
```

---

## 2.16 · Ítaca — Praia

```
A small rocky Greek island shore at early morning. Olive groves climbing the
slope, low stone walls, a goat path winding up the hill. Modest and
unglamorous — no grandeur, just home. Soft warm gold light. One ancient olive
tree in the foreground, thick-trunked and gnarled. Quiet, real, deeply
familiar.
```

---

## 2.17 · Ítaca — Salão do palácio

```
The great hall of a Greek palace, seen from the entrance looking in. Long
tables in disarray with overturned cups, spilled wine staining the floor, bones
and scraps left on platters. Torches guttering in wall brackets. Painted
columns, faded frescoes, a large hearth at the center. Rich architecture
treated with contempt — the room is beautiful and being ruined. Warm orange
torchlight, deep shadows in the corners. Decadence, disrespect, occupation.
```

### VARIANTE A — O arco
```
The tables have been pushed back to clear the center of the floor. A single
great composite bow of horn and sinew lies alone in the cleared space. All
torchlight concentrated on it. Everything else in shadow. Ceremonial, charged,
a challenge laid down.
```

### VARIANTE B — Os doze machados
```
Twelve iron axe heads stand embedded upright in a perfectly straight line
across the cleared floor, their ring-shaped sockets aligned to form a single
dark tunnel receding into the distance. Torchlight glints off the metal edges.
Precise, geometric, impossible.
```

---

## 2.18 · Ítaca — Aposento do leito

```
A private bedchamber in a Greek palace, lit by a single oil lamp. Simple
plastered walls, a woven rug, a loom in the corner. At the center, a large bed
whose thick corner post is visibly a living olive tree trunk — bark still
present near the base, roots disappearing into the stone floor, carved and
polished higher up, inlaid with gold and silver. Warm intimate amber light.
Small, private, irreplaceable.
```

### VARIANTE — Amanhecer
```
First light through a small window. Cool blue night giving way to warm rose
and gold. The lamp burned out. Peaceful, finished, safe.
```

---

# PARTE 3 — ORÇAMENTO DE ARTE

| Tipo | Bases | Variantes | Total |
|---|---|---|---|
| Interface | 5 | 1 | 6 |
| Cenários | 14 | 10 | 24 |
| **Total de imagens** | | | **30** |
| **Gerações do zero** | **19** | | |

As 11 variantes saem por ajuste de cor, camada ou edição da base — não precisam de geração nova. É aí que está a economia real.

### Ordem sugerida de produção

1. **Tela do Mapa** e **Tela Inicial** — são as duas obrigatórias no PDF
2. **Troia** e **Salão de Ítaca** — primeiro e último capítulo, definem as pontas do estilo
3. **Convés do navio** — mais reaproveitado, resolve três capítulos
4. **Altar** e **Fio Partido** — sistemas, aparecem o tempo todo
5. O resto, na ordem dos capítulos

Se a arte atrasar, os capítulos do meio podem rodar com placeholder. Mapa, Troia e Ítaca não podem.

---

## CONTROLE DE VERSÃO

| Versão | Data | Alterações |
|---|---|---|
| 1.0 | — | Versão inicial. 19 prompts base, 11 variantes. |
