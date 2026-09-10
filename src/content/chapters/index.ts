/**
 * Os dez pontos da aventura, na ordem da trilha.
 *
 * Cada capítulo é um módulo próprio: o arquivo cresce com o roteiro sem que a
 * lista principal fique ilegível, e mexer no Capítulo VII não toca no I.
 *
 * `mapCoordinates` está em porcentagem sobre a arte do mapa e ainda precisa de
 * calibração fina contra `menus/mapa-completo.webp`.
 */

import type { Chapter, ChapterId } from '@domain/types';

import { CHAPTER_TROIA } from './ch01-troia.ts';

/**
 * Capítulos ainda não transcritos do roteiro para dados.
 * O esqueleto existe para que mapa, progressão, inventário e enigma final já
 * funcionem de ponta a ponta; `nodes` se enche capítulo a capítulo.
 */
const pending = (chapter: Omit<Chapter, 'nodes'>): Chapter => ({ ...chapter, nodes: [] });

export const CHAPTERS: readonly Chapter[] = [
  CHAPTER_TROIA,

  pending({
    id: 'ciclopes',
    order: 2,
    numeral: 'II',
    title: 'A Ilha dos Ciclopes',
    guardian: 'polifemo',
    treasure: 'anel_la_carneiro',
    quizTheme: 'Monstros e Poseidon',
    tagline: 'Três escolhas mortais e um nome que não devia ter sido dito.',
    mapCoordinates: { x: 74, y: 44 },
    thumbnail: 'praia_rochosa',
    unlocks: 'eolo',
  }),

  pending({
    id: 'eolo',
    order: 3,
    numeral: 'III',
    title: 'A Ilha de Éolo',
    guardian: 'eolo',
    treasure: 'odre_couro',
    quizTheme: 'Ventos e Titãs',
    tagline: 'Todos os ventos num odre, e uma lealdade que sai pela culatra.',
    mapCoordinates: { x: 62, y: 26 },
    thumbnail: 'ilha_voadora',
    unlocks: 'circe',
  }),

  pending({
    id: 'circe',
    order: 4,
    numeral: 'IV',
    title: 'Eeia, a Ilha de Circe',
    guardian: 'circe',
    treasure: 'ramo_moly',
    quizTheme: 'Metamorfoses',
    tagline: 'Uma flor que nenhum homem colhe e um ano que passa como uma noite.',
    mapCoordinates: { x: 52, y: 52 },
    thumbnail: 'floresta_eeia_palacio',
    unlocks: 'hades',
  }),

  pending({
    id: 'hades',
    order: 5,
    numeral: 'V',
    title: 'O Hades',
    guardian: 'tiresias',
    treasure: 'obolo_caronte',
    quizTheme: 'O Submundo',
    tagline: 'Atravessar o Estige vivo para ouvir o que ainda vai acontecer.',
    mapCoordinates: { x: 44, y: 72 },
    thumbnail: 'rio_estige',
    unlocks: 'sereias',
  }),

  pending({
    id: 'sereias',
    order: 6,
    numeral: 'VI',
    title: 'O Estreito das Sereias',
    guardian: 'sereias',
    treasure: 'no_cera',
    quizTheme: 'Musas e Apolo',
    tagline: 'Todos surdos, menos um. E o que ouve fica amarrado.',
    mapCoordinates: { x: 38, y: 44 },
    thumbnail: 'estreito_sereias',
    unlocks: 'scylla',
  }),

  pending({
    id: 'scylla',
    order: 7,
    numeral: 'VII',
    title: 'O Covil de Scylla',
    guardian: 'scylla',
    treasure: 'escama',
    quizTheme: 'Monstros marinhos',
    tagline: 'Seis homens por uma passagem — ou o navio inteiro de uma vez.',
    mapCoordinates: { x: 30, y: 54 },
    thumbnail: 'covil_scylla',
    unlocks: 'trinacia',
  }),

  pending({
    id: 'trinacia',
    order: 8,
    numeral: 'VIII',
    title: 'Trinácia',
    guardian: 'apolo',
    treasure: 'chifre_dourado',
    quizTheme: 'Hybris e punição',
    tagline: 'O gado de um deus, a fome de homens, e o raio que cobra a conta.',
    mapCoordinates: { x: 24, y: 66 },
    thumbnail: 'pastagem_trinacia',
    unlocks: 'ogigia',
  }),

  pending({
    id: 'ogigia',
    order: 9,
    numeral: 'IX',
    title: 'Ogígia',
    guardian: 'calipso',
    treasure: 'tabua_jangada',
    quizTheme: 'Titãs e ninfas',
    tagline: 'Sete anos onde nada envelhece, e a única astúcia sem mentira.',
    mapCoordinates: { x: 15, y: 38 },
    thumbnail: 'praia_ogigia',
    unlocks: 'itaca',
  }),

  pending({
    id: 'itaca',
    order: 10,
    numeral: 'X',
    title: 'Ítaca',
    guardian: 'penelope',
    quizTheme: 'Culmina no Enigma Final',
    tagline: 'A casa cheia de gente errada e um arco que só um homem arma.',
    mapCoordinates: { x: 7, y: 22 },
    thumbnail: 'praia_itaca',
    unlocks: null,
  }),
];

export const CHAPTERS_BY_ID: ReadonlyMap<ChapterId, Chapter> = new Map(
  CHAPTERS.map((chapter) => [chapter.id, chapter]),
);

export const getChapter = (id: ChapterId): Chapter | null => CHAPTERS_BY_ID.get(id) ?? null;

/** Um capítulo só é jogável depois de transcrito. */
export const hasContent = (chapter: Chapter): boolean => chapter.nodes.length > 0;

export { CHAPTER_TROIA };
