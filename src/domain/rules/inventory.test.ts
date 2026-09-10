import { describe, expect, it } from 'vitest';

import type { Chapter } from '../types/chapter.ts';
import { collectTreasure, completeClue, getClueState, reorderClues } from './inventory.ts';
import { createInitialGameState } from './progression.ts';

const CHAPTERS: readonly Chapter[] = [
  {
    id: 'troia',
    order: 1,
    numeral: 'I',
    title: 'Troia',
    guardian: 'atena',
    quizTheme: 'teste',
    tagline: 'teste',
    mapCoordinates: { x: 0, y: 0 },
    thumbnail: 'mar_noite',
    nodes: [],
    unlocks: null,
  },
];

const fresh = () => createInitialGameState(CHAPTERS);

describe('ciclo de estados da pista', () => {
  it('começa bloqueada', () => {
    expect(getClueState(fresh(), 'lasca_cavalo')).toBe('locked');
  });

  it('vira incompleta ao encontrar o tesouro e entra no inventário', () => {
    const state = collectTreasure(fresh(), 'lasca_cavalo');

    expect(getClueState(state, 'lasca_cavalo')).toBe('incomplete');
    expect(state.inventoryOrder).toEqual(['lasca_cavalo']);
  });

  it('vira completa ao vencer o quiz', () => {
    const state = completeClue(collectTreasure(fresh(), 'lasca_cavalo'), 'lasca_cavalo');

    expect(getClueState(state, 'lasca_cavalo')).toBe('complete');
  });

  it('não retrocede quando o capítulo é refeito após um Fio Partido', () => {
    const completed = completeClue(collectTreasure(fresh(), 'lasca_cavalo'), 'lasca_cavalo');
    const replayed = collectTreasure(completed, 'lasca_cavalo');

    expect(getClueState(replayed, 'lasca_cavalo')).toBe('complete');
    expect(replayed.inventoryOrder).toEqual(['lasca_cavalo']);
  });
});

describe('reordenação do inventário', () => {
  const order = ['lasca_cavalo', 'anel_la_carneiro', 'odre_couro'] as const;

  it('move uma carta para frente', () => {
    expect(reorderClues(order, 0, 2)).toEqual(['anel_la_carneiro', 'odre_couro', 'lasca_cavalo']);
  });

  it('move uma carta para trás', () => {
    expect(reorderClues(order, 2, 0)).toEqual(['odre_couro', 'lasca_cavalo', 'anel_la_carneiro']);
  });

  it('devolve a mesma ordem quando o índice é inválido ou não muda nada', () => {
    expect(reorderClues(order, 1, 1)).toBe(order);
    expect(reorderClues(order, -1, 0)).toBe(order);
    expect(reorderClues(order, 0, 9)).toBe(order);
  });
});
