/**
 * Endereços das telas.
 *
 * Centralizados para que nenhum componente escreva uma URL à mão: renomear uma
 * rota é mexer aqui e o compilador aponta o resto.
 */

import type { ChapterId } from '@domain/types';

export const ROUTES = {
  home: '/',
  tutorial: '/tutorial',
  prologue: '/prologo',
  map: '/mapa',
  inventory: '/inventario',
  riddle: '/enigma',
  ending: '/fim',
  chapter: (chapterId: ChapterId): string => `/capitulo/${chapterId}`,
} as const;

/** Padrão usado na definição das rotas; o valor real vem de `ROUTES.chapter`. */
export const CHAPTER_ROUTE_PATTERN = '/capitulo/:chapterId';
