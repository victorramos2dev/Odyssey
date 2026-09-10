import { describe, expect, it } from 'vitest';

import { TREASURE_LIST } from '@content/treasures.ts';
import type { TreasureId } from '../types/treasure.ts';
import { getSolutionOrder, isSlotCorrect, isSolutionComplete } from './riddle.ts';

const SOLUTION = getSolutionOrder(TREASURE_LIST);

describe('Os Doze Machados', () => {
  it('a solução é a cronologia da viagem, de Troia a Ogígia', () => {
    expect(SOLUTION).toEqual([
      'lasca_cavalo',
      'anel_la_carneiro',
      'odre_couro',
      'ramo_moly',
      'obolo_caronte',
      'no_cera',
      'escama',
      'chifre_dourado',
      'tabua_jangada',
    ]);
  });

  it('aceita a peça apenas no machado correspondente', () => {
    expect(isSlotCorrect(TREASURE_LIST, 0, 'lasca_cavalo')).toBe(true);
    expect(isSlotCorrect(TREASURE_LIST, 1, 'lasca_cavalo')).toBe(false);
  });

  it('só valida a solução com os nove machados na ordem certa', () => {
    expect(isSolutionComplete(TREASURE_LIST, SOLUTION)).toBe(true);
  });

  it('recusa um tabuleiro incompleto', () => {
    const withHole: (TreasureId | null)[] = [...SOLUTION];
    withHole[4] = null;

    expect(isSolutionComplete(TREASURE_LIST, withHole)).toBe(false);
  });

  it('recusa duas peças trocadas de lugar', () => {
    const swapped = [...SOLUTION];
    [swapped[2], swapped[3]] = [swapped[3], swapped[2]] as [TreasureId, TreasureId];

    expect(isSolutionComplete(TREASURE_LIST, swapped)).toBe(false);
  });
});
