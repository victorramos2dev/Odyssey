/**
 * Regras do inventário de pistas — requisito 4.5 do PDF.
 *
 * Ciclo: `locked` → `incomplete` (tesouro encontrado) → `complete` (quiz correto).
 * O inventário guarda também a ordem escolhida pelo jogador, que é o rascunho
 * da solução do enigma final.
 */

import type { GameState } from '../types/game-state.ts';
import type { ClueState, TreasureId } from '../types/treasure.ts';

export const getClueState = (state: GameState, treasure: TreasureId): ClueState => {
  // O tipo promete todas as chaves; um save gravado por uma versão anterior do
  // jogo não. A leitura passa por um tipo parcial para que a falta de uma
  // chave vire "bloqueada" em vez de `undefined` circulando pelo domínio.
  const clues: Partial<Record<TreasureId, ClueState>> = state.clues;

  return clues[treasure] ?? 'locked';
};

const withClueState = (
  state: GameState,
  treasure: TreasureId,
  clueState: ClueState,
): GameState => ({
  ...state,
  clues: { ...state.clues, [treasure]: clueState },
});

/**
 * Tesouro encontrado: a pista entra no inventário como *incompleta*.
 *
 * Idempotente e sem retrocesso — uma pista já completa não volta a incompleta
 * se o jogador refizer o capítulo após um Fio Partido.
 */
export const collectTreasure = (state: GameState, treasure: TreasureId): GameState => {
  if (getClueState(state, treasure) !== 'locked') return state;

  const collected = withClueState(state, treasure, 'incomplete');

  return {
    ...collected,
    inventoryOrder: collected.inventoryOrder.includes(treasure)
      ? collected.inventoryOrder
      : [...collected.inventoryOrder, treasure],
  };
};

/** Quiz vencido: a pista passa a *completa* e revela o texto integral. */
export const completeClue = (state: GameState, treasure: TreasureId): GameState => {
  if (getClueState(state, treasure) === 'complete') return state;

  return withClueState(state, treasure, 'complete');
};

/**
 * Move uma carta do inventário de uma posição para outra.
 *
 * Serve tanto ao arrastar-e-soltar quanto à navegação por teclado, que é a
 * alternativa acessível exigida pelo requisito 4.5.
 */
export const reorderClues = (
  order: readonly TreasureId[],
  fromIndex: number,
  toIndex: number,
): readonly TreasureId[] => {
  const isOutOfBounds = (index: number) => index < 0 || index >= order.length;
  if (isOutOfBounds(fromIndex) || isOutOfBounds(toIndex) || fromIndex === toIndex) {
    return order;
  }

  const moved = order[fromIndex];
  if (moved === undefined) return order;

  const remaining = order.filter((_, index) => index !== fromIndex);

  return [...remaining.slice(0, toIndex), moved, ...remaining.slice(toIndex)];
};

export const setInventoryOrder = (
  state: GameState,
  order: readonly TreasureId[],
): GameState => ({ ...state, inventoryOrder: order });

export const getCollectedClues = (state: GameState): readonly TreasureId[] =>
  state.inventoryOrder.filter((treasure) => getClueState(state, treasure) !== 'locked');

export const countCompleteClues = (state: GameState): number =>
  Object.values(state.clues).filter((clueState) => clueState === 'complete').length;
