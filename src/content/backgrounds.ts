/**
 * Registro de cenários.
 *
 * Traduz os identificadores usados no roteiro (`[FUNDO: praia_rochosa]`) para
 * arquivos de arte. Variações de hora do dia reaproveitam a mesma pintura com
 * um tratamento de cor aplicado por CSS — o roteiro pede 37 fundos e a arte
 * entrega 28; o tratamento cobre a diferença sem custo de banda.
 *
 * `alt` é obrigatório: cenário é informação narrativa e precisa chegar a quem
 * usa leitor de tela (critério de acessibilidade do PDF).
 */

import type { AssetPath } from '@services/assets/asset-resolver.ts';
import type { BackgroundId } from '@domain/types';

/** Filtro de cor aplicado sobre a arte. Ver `Backdrop.module.css`. */
export type BackgroundTreatment = 'golden' | 'night' | 'storm' | 'fog' | 'ember' | 'underworld';

export interface BackgroundDefinition {
  readonly path: AssetPath;
  readonly alt: string;
  readonly treatment?: BackgroundTreatment;
  /** `true` quando a arte é um empréstimo de outro cenário. Ver `ART_GAPS`. */
  readonly isPlaceholder?: boolean;
}

const CENARIOS = 'cenarios';
const MENUS = 'menus';

export const BACKGROUNDS = {
  // — Prólogo ————————————————————————————————————————————————
  mar_noite: {
    path: `${CENARIOS}/prologo/prologo.webp`,
    alt: 'Mar aberto sob a noite, sem terra à vista.',
  },

  // — Capítulo I: Troia ——————————————————————————————————————
  muralhas_troia_amanhecer: {
    path: `${CENARIOS}/troia/troia-destruida.webp`,
    alt: 'As muralhas de Troia em ruínas, ardendo desde a madrugada.',
  },
  muralhas_troia_luz_dourada: {
    path: `${CENARIOS}/troia/troia-atena-chega.webp`,
    alt: 'A fumaça sobre Troia ganha o brilho frio do bronze polido.',
    treatment: 'golden',
  },
  praia_troia: {
    path: `${CENARIOS}/navio/conves-navio.webp`,
    alt: 'A praia de Troia, com o navio carregado junto à prancha.',
    isPlaceholder: true,
  },

  // — Capítulo II: Ciclopes ——————————————————————————————————
  praia_rochosa: {
    path: `${CENARIOS}/ciclopes/caverna-poliphemus-1.webp`,
    alt: 'Praia rochosa da ilha dos Ciclopes, diante da boca de uma caverna.',
  },
  caverna_interior: {
    path: `${CENARIOS}/ciclopes/interior-da-caverna.webp`,
    alt: 'Interior da caverna, cheiro de queijo e de rebanho.',
  },
  caverna_bloqueada: {
    path: `${CENARIOS}/ciclopes/caverna-bloquada.webp`,
    alt: 'A entrada da caverna vedada por uma pedra imensa.',
  },
  caverna_fogo: {
    path: `${CENARIOS}/ciclopes/interior-da-caverna.webp`,
    alt: 'A caverna iluminada pela fogueira; a estaca aquece nas brasas.',
    treatment: 'ember',
  },

  // — Capítulo III: Éolo —————————————————————————————————————
  mar_aberto: {
    path: `${CENARIOS}/navio/conves-navio.webp`,
    alt: 'O convés do navio em mar aberto.',
  },
  ilha_voadora: {
    path: `${CENARIOS}/ilha-no-ceu/palacio-eolu.webp`,
    alt: 'O palácio de Éolo sobre a ilha suspensa no céu.',
  },

  // — Capítulo IV: Circe —————————————————————————————————————
  praia_eeia: {
    path: `${CENARIOS}/ilha-eea/ilha-circe.webp`,
    alt: 'A praia de Eeia, floresta fechada logo adiante.',
  },
  floresta_eeia: {
    path: `${CENARIOS}/ilha-eea/ilha-circe.webp`,
    alt: 'A floresta de Eeia, silenciosa demais para o tamanho que tem.',
    treatment: 'fog',
  },
  floresta_eeia_palacio: {
    path: `${CENARIOS}/ilha-eea/palacio-circe.webp`,
    alt: 'O palácio de Circe entre as árvores, fumaça saindo do telhado.',
  },
  palacio_circe: {
    path: `${CENARIOS}/ilha-eea/palacio-circe.webp`,
    alt: 'O salão do palácio de Circe.',
  },

  // — Capítulo V: Hades ——————————————————————————————————————
  praia_submundo: {
    path: `${CENARIOS}/hades/praia-hades.webp`,
    alt: 'A praia cinzenta do submundo.',
    treatment: 'underworld',
  },
  rio_estige: {
    path: `${CENARIOS}/hades/rio-estige.webp`,
    alt: 'As águas paradas do rio Estige.',
    treatment: 'underworld',
  },

  // — Capítulo VI: Sereias ———————————————————————————————————
  estreito_neblina: {
    path: `${MENUS}/nevoa.webp`,
    alt: 'Um estreito tomado por neblina densa.',
  },
  estreito_sereias: {
    path: `${CENARIOS}/sereias/estreito-sereias.webp`,
    alt: 'O estreito das Sereias, rochas brancas de ossos na margem.',
  },
  canto_sereias: {
    path: `${CENARIOS}/sereias/canto-sereias.webp`,
    alt: 'As Sereias cantando sobre as rochas.',
  },

  // — Capítulo VII: Scylla / Caríbdis ————————————————————————
  covil_scylla: {
    path: `${CENARIOS}/carybdis-scylla/scylla.webp`,
    alt: 'O covil de Scylla, seis gargantas na rocha.',
  },
  caribdis_redemoinho: {
    path: `${CENARIOS}/carybdis-scylla/caribdis.webp`,
    alt: 'O redemoinho de Caríbdis engolindo o mar.',
  },
  figueira_penhasco: {
    path: `${CENARIOS}/carybdis-scylla/caribdis.webp`,
    alt: 'Uma figueira solitária agarrada ao penhasco sobre o redemoinho.',
    isPlaceholder: true,
  },

  // — Capítulo VIII: Trinácia ————————————————————————————————
  pastagem_trinacia: {
    path: `${CENARIOS}/trinacia/gado-apolo.webp`,
    alt: 'A pastagem de Trinácia e o gado de Apolo.',
  },
  pastagem_fogueira: {
    path: `${CENARIOS}/trinacia/fogueira-para-ogado.webp`,
    alt: 'A fogueira acesa na pastagem, o rebanho abatido ao redor.',
  },
  pastagem_luz_dourada: {
    path: `${CENARIOS}/trinacia/gado-apolo.webp`,
    alt: 'A pastagem tomada por uma luz dourada insuportável.',
    treatment: 'golden',
  },
  mar_tempestade: {
    path: `${CENARIOS}/navio/tempestade-navio.webp`,
    alt: 'O navio despedaçado pela tempestade.',
    treatment: 'storm',
  },

  // — Capítulo IX: Ogígia ————————————————————————————————————
  praia_ogigia: {
    path: `${CENARIOS}/ogigia/gruta-calypso.webp`,
    alt: 'A praia de Ogígia, diante da gruta de Calipso.',
  },
  praia_ogigia_noite: {
    path: `${CENARIOS}/ogigia/anoitecer-gruta-calypso.webp`,
    alt: 'A gruta de Calipso ao anoitecer.',
  },
  praia_ogigia_dourado: {
    path: `${CENARIOS}/ogigia/gruta-calypso.webp`,
    alt: 'A praia de Ogígia sob a luz dourada da oferta de imortalidade.',
    treatment: 'golden',
  },

  // — Capítulo X: Ítaca ——————————————————————————————————————
  praia_itaca: {
    path: `${CENARIOS}/itaca/praia-itaca.webp`,
    alt: 'A praia de Ítaca, finalmente.',
  },
  salao_palacio: {
    path: `${CENARIOS}/itaca/palacio-odisseu.webp`,
    alt: 'O salão do palácio de Odisseu, tomado pelos pretendentes.',
  },
  salao_trono: {
    path: `${CENARIOS}/itaca/palacio-odisseu.webp`,
    alt: 'O trono vazio no fundo do salão.',
    treatment: 'night',
  },
  patio_palacio: {
    path: `${CENARIOS}/itaca/desafio-do-arco.webp`,
    alt: 'O pátio do palácio, onde se arma o desafio do arco.',
  },

  // — Enigma final e epílogo —————————————————————————————————
  salao_machados: {
    path: `${CENARIOS}/itaca/os-doze-machados.webp`,
    alt: 'Doze machados alinhados, os olhais formando um único túnel escuro.',
  },
  aposento_leito: {
    path: `${CENARIOS}/itaca/aposentos-odisseu.webp`,
    alt: 'O aposento do leito de oliveira.',
  },
  aposento_amanhecer: {
    path: `${CENARIOS}/itaca/amanhecer-com-penelope.webp`,
    alt: 'O aposento ao amanhecer, Penélope à janela.',
  },

  // — Telas de menu ——————————————————————————————————————————
  menu_inicio: {
    path: `${MENUS}/inicio-jogo.webp`,
    alt: 'Tela inicial da aventura.',
  },
  menu_mapa: {
    path: `${MENUS}/mapa-completo.webp`,
    alt: 'Mapa completo da viagem de Odisseu.',
  },
  menu_fim: {
    path: `${MENUS}/final-do-jogo.webp`,
    alt: 'Tela de conclusão da aventura.',
  },
  menu_fio_partido: {
    path: `${MENUS}/game-over.webp`,
    alt: 'As três Moiras diante do fio partido.',
  },
  menu_altar: {
    path: `${MENUS}/tela-sacrificio.webp`,
    alt: 'Altar preparado para a oferenda.',
  },
} as const satisfies Record<string, BackgroundDefinition>;

export type KnownBackgroundId = keyof typeof BACKGROUNDS;

export const getBackground = (id: BackgroundId): BackgroundDefinition | null =>
  (BACKGROUNDS as Record<string, BackgroundDefinition>)[id] ?? null;

/**
 * Cenários pedidos pelo roteiro que ainda não têm arte própria e estão
 * emprestando a pintura de outro ponto. Lista viva: some conforme a arte chega.
 */
export const ART_GAPS: readonly KnownBackgroundId[] = Object.entries(
  BACKGROUNDS as Record<KnownBackgroundId, BackgroundDefinition>,
)
  .filter(([, definition]) => definition.isPlaceholder === true)
  .map(([id]) => id as KnownBackgroundId);
