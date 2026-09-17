import { describe, expect, it } from 'vitest';

import { isPersistedGameState, upgradePersistedState } from './game-state-schema.ts';

/** Um save gravado antes de o marcador de leitura existir. */
const LEGACY_SAVE = {
  schemaVersion: 1,
  points: { troia: 'inProgress' },
  clues: { lasca_cavalo: 'incomplete' },
  quizzes: { troia: 'unanswered' },
  inventoryOrder: ['lasca_cavalo'],
  crewCount: 46,
  route: null,
  checkpoint: { chapterId: 'troia' },
  riddleSolved: false,
  tutorialSeen: true,
  savedAt: 0,
};

describe('saves de versões anteriores', () => {
  it('um save sem marcador continua válido depois da atualização', () => {
    // Acrescentar um campo não pode apagar o progresso de quem já jogava.
    expect(isPersistedGameState(upgradePersistedState(LEGACY_SAVE))).toBe(true);
  });

  it('o marcador ausente vira nulo, e não indefinido', () => {
    expect(upgradePersistedState(LEGACY_SAVE)).toMatchObject({ bookmark: null });
  });

  it('um marcador presente é preservado', () => {
    const withBookmark = { ...LEGACY_SAVE, bookmark: { chapterId: 'troia', nodeIndex: 9 } };

    expect(upgradePersistedState(withBookmark)).toEqual(withBookmark);
  });

  it('um marcador corrompido invalida o save', () => {
    expect(isPersistedGameState({ ...LEGACY_SAVE, bookmark: { chapterId: 7 } })).toBe(false);
  });
});
