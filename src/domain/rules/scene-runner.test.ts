import { describe, expect, it } from 'vitest';

import type { SceneNode } from '../types/scene.ts';
import {
  findLastNodeOfKind,
  findNodeIndex,
  resolveEntryIndex,
  resolveResumeIndex,
  stepScene,
} from './scene-runner.ts';

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

describe('retomada no meio da cena', () => {
  it('volta ao nó gravado quando ele ainda existe', () => {
    expect(resolveResumeIndex(NODES, 6)).toBe(6);
  });

  it('prefere a posição gravada ao checkpoint', () => {
    expect(resolveResumeIndex(NODES, 2, 'partida')).toBe(2);
  });

  it('cai no checkpoint quando a posição gravada saiu do capítulo', () => {
    // Um capítulo encurtado numa revisão do roteiro não pode prender o jogador.
    expect(resolveResumeIndex(NODES, 99, 'partida')).toBe(6);
    expect(resolveResumeIndex(NODES, -1)).toBe(0);
    expect(resolveResumeIndex(NODES, 2.5)).toBe(0);
  });

  it('sem posição gravada, usa o checkpoint', () => {
    expect(resolveResumeIndex(NODES, undefined)).toBe(0);
  });

  it('remonta o cenário a partir do último já passado', () => {
    expect(findLastNodeOfKind(NODES, 5, ['background'])?.background).toBe(
      'muralhas_troia_amanhecer',
    );
  });

  it('não olha para a frente de onde o jogador está', () => {
    expect(findLastNodeOfKind(NODES, 0, ['background'])).toBeNull();
  });
});
