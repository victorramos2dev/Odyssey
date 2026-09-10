import { describe, expect, it } from 'vitest';

import type { SceneNode } from '../types/scene.ts';
import { findNodeIndex, resolveEntryIndex, stepScene } from './scene-runner.ts';

const NODES: readonly SceneNode[] = [
  { kind: 'checkpoint', chapter: 'troia' },
  { kind: 'background', background: 'muralhas_troia_amanhecer' },
  { kind: 'narration', lines: ['Fumaça.'] },
  { kind: 'treasure', treasure: 'lasca_cavalo' },
  { kind: 'clue', treasure: 'lasca_cavalo' },
  { kind: 'crew', count: 46 },
  { id: 'partida', kind: 'narration', lines: ['Alguém lá em cima já mudou.'] },
];

describe('travessia da cena', () => {
  it('consome os nós de passagem e para no primeiro interativo', () => {
    const step = stepScene(NODES, 0);

    expect(step.index).toBe(2);
    expect(step.effects).toEqual([
      { kind: 'checkpoint', chapter: 'troia' },
      { kind: 'background', background: 'muralhas_troia_amanhecer' },
    ]);
  });

  it('junta os efeitos na ordem em que aparecem', () => {
    const step = stepScene(NODES, 3);

    expect(step.index).toBe(6);
    expect(step.effects.map((effect) => effect.kind)).toEqual(['treasure', 'clue', 'crew']);
  });

  it('devolve índice nulo quando a cena acaba', () => {
    expect(stepScene(NODES, 7).index).toBeNull();
  });

  it('não devolve efeito nenhum para um nó interativo', () => {
    expect(stepScene(NODES, 2)).toEqual({ index: 2, effects: [] });
  });
});

describe('desvios e retomada', () => {
  it('encontra um nó pelo rótulo', () => {
    expect(findNodeIndex(NODES, 'partida')).toBe(6);
  });

  it('devolve -1 para rótulo inexistente', () => {
    expect(findNodeIndex(NODES, 'inexistente')).toBe(-1);
  });

  it('começa do zero sem checkpoint', () => {
    expect(resolveEntryIndex(NODES)).toBe(0);
  });

  it('retoma no nó do checkpoint', () => {
    expect(resolveEntryIndex(NODES, 'partida')).toBe(6);
  });

  it('cai no início quando o checkpoint aponta para um nó que sumiu', () => {
    expect(resolveEntryIndex(NODES, 'removido-numa-revisao')).toBe(0);
  });
});
