/**
 * Travessia da cena.
 *
 * Um capítulo é uma lista de nós. Alguns só mudam estado e seguem sozinhos
 * (trocar o fundo, gravar checkpoint, recolher um tesouro); outros param e
 * esperam o jogador (uma fala, uma escolha, um quiz).
 *
 * `stepScene` caminha pelos primeiros, junta o que eles causaram e devolve
 * onde a cena parou. É pura: não despacha nada, não toca no React. Quem chama
 * decide o que fazer com os efeitos.
 */

import { isPassthroughNode } from '../types/scene.ts';
import type { BackgroundId, ChapterId, NodeId, SceneNode } from '../types/scene.ts';
import type { TreasureId } from '../types/treasure.ts';

/** Mudança de estado causada por um nó de passagem. */
export type SceneEffect =
  | { readonly kind: 'background'; readonly background: BackgroundId }
  | { readonly kind: 'checkpoint'; readonly chapter: ChapterId; readonly nodeId?: NodeId }
  | { readonly kind: 'treasure'; readonly treasure: TreasureId }
  | { readonly kind: 'clue'; readonly treasure: TreasureId }
  | { readonly kind: 'crew'; readonly count: number; readonly note?: string };

export interface SceneStep {
  /** Onde a cena parou. `null` significa capítulo encerrado. */
  readonly index: number | null;
  /** O que aconteceu no caminho até aqui, na ordem em que aconteceu. */
  readonly effects: readonly SceneEffect[];
}

/**
 * Tabela de despacho: um ramo por tipo de nó. A "complexidade" aqui é a
 * exaustividade que queremos, não lógica emaranhada.
 */
/* eslint-disable-next-line complexity */
const toEffect = (node: SceneNode): SceneEffect | null => {
  switch (node.kind) {
    case 'background':
      return { kind: 'background', background: node.background };

    case 'checkpoint':
      return node.id === undefined
        ? { kind: 'checkpoint', chapter: node.chapter }
        : { kind: 'checkpoint', chapter: node.chapter, nodeId: node.id };

    case 'treasure':
      return { kind: 'treasure', treasure: node.treasure };

    case 'clue':
      return { kind: 'clue', treasure: node.treasure };

    case 'crew':
      return node.note === undefined
        ? { kind: 'crew', count: node.count }
        : { kind: 'crew', count: node.count, note: node.note };

    case 'narration':
    case 'speech':
    case 'chorus':
    case 'choice':
    case 'quiz':
    case 'minigame':
    case 'death':
    case 'tutorial':
      return null;
  }
};

/**
 * Avança a partir de `startIndex`, consumindo nós de passagem, e para no
 * primeiro nó que exige o jogador.
 */
export const stepScene = (nodes: readonly SceneNode[], startIndex: number): SceneStep => {
  const effects: SceneEffect[] = [];
  let index = Math.max(0, startIndex);

  while (index < nodes.length) {
    const node = nodes[index];
    if (node === undefined) break;

    if (!isPassthroughNode(node)) {
      return { index, effects };
    }

    const effect = toEffect(node);
    if (effect !== null) effects.push(effect);

    index += 1;
  }

  return { index: null, effects };
};

/** Índice de um nó rotulado. `-1` quando o rótulo não existe. */
export const findNodeIndex = (nodes: readonly SceneNode[], nodeId: NodeId): number =>
  nodes.findIndex((node) => node.id === nodeId);

/**
 * Ponto de entrada do capítulo: o começo, ou o nó do checkpoint quando o
 * jogador está retomando depois de um Fio Partido.
 */
export const resolveEntryIndex = (nodes: readonly SceneNode[], nodeId?: NodeId): number => {
  if (nodeId === undefined) return 0;

  const index = findNodeIndex(nodes, nodeId);

  return index >= 0 ? index : 0;
};
