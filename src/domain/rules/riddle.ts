/**
 * Enigma Final — Os Doze Machados. Requisito 4.6 do PDF.
 *
 * O jogador arrasta os nove tesouros para os machados na ordem cronológica da
 * viagem. Sem punição e sem limite de tentativas: o machado errado devolve a
 * peça.
 */

import type { Treasure, TreasureId } from '../types/treasure.ts';

/** Quantidade de olhais no salão. Nove recebem tesouro; os três primeiros são a mira. */
export const AXE_COUNT = 12;

/** A ordem correta é a ordem cronológica declarada em cada tesouro. */
export const getSolutionOrder = (treasures: readonly Treasure[]): readonly TreasureId[] =>
  [...treasures].sort((a, b) => a.chronologicalOrder - b.chronologicalOrder).map(({ id }) => id);

/**
 * Uma peça só assenta no machado cuja posição corresponde à sua ordem
 * cronológica. Valida um encaixe isolado, sem depender do resto do tabuleiro.
 */
export const isSlotCorrect = (
  treasures: readonly Treasure[],
  slotIndex: number,
  treasure: TreasureId,
): boolean => getSolutionOrder(treasures)[slotIndex] === treasure;

/** A flecha atravessa quando todos os nove slots estão corretos e preenchidos. */
export const isSolutionComplete = (
  treasures: readonly Treasure[],
  slots: readonly (TreasureId | null)[],
): boolean => {
  const solution = getSolutionOrder(treasures);

  return (
    slots.length === solution.length &&
    slots.every((treasure, index) => treasure !== null && treasure === solution[index])
  );
};
