/**
 * Validação do save lido do disco.
 *
 * Dado vindo do LocalStorage é entrada não confiável: pode ter sido editado à
 * mão, ter vindo de uma versão anterior do jogo ou estar truncado. Um save
 * inválido é descartado em silêncio e a aventura recomeça, em vez de a
 * aplicação quebrar em tempo de execução.
 */

import { SAVE_SCHEMA_VERSION, type GameState } from '@domain/types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isStringRecord = (value: unknown): value is Record<string, string> =>
  isRecord(value) && Object.values(value).every((item) => typeof item === 'string');

/**
 * Verifica a forma do save. Não valida os valores um a um: as regras de
 * domínio já tratam estados desconhecidos com padrões seguros
 * (`getPointStatus` devolve `locked`, `getClueState` devolve `locked`).
 */
const hasValidCollections = (value: Record<string, unknown>): boolean =>
  isStringRecord(value['points']) &&
  isStringRecord(value['clues']) &&
  isStringRecord(value['quizzes']) &&
  isStringArray(value['inventoryOrder']);

const hasValidScalars = (value: Record<string, unknown>): boolean =>
  typeof value['crewCount'] === 'number' &&
  typeof value['riddleSolved'] === 'boolean' &&
  typeof value['tutorialSeen'] === 'boolean' &&
  typeof value['savedAt'] === 'number' &&
  (value['route'] === null || typeof value['route'] === 'string');

const hasValidCheckpoint = (value: Record<string, unknown>): boolean => {
  const checkpoint = value['checkpoint'];

  return isRecord(checkpoint) && typeof checkpoint['chapterId'] === 'string';
};

export const isPersistedGameState = (value: unknown): value is GameState =>
  isRecord(value) &&
  value['schemaVersion'] === SAVE_SCHEMA_VERSION &&
  hasValidCollections(value) &&
  hasValidScalars(value) &&
  hasValidCheckpoint(value);
