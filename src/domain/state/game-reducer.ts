/**
 * Redutor do jogo — o único lugar onde o estado muda de forma.
 *
 * É uma função pura: mesma entrada, mesma saída, sem efeitos colaterais.
 * A persistência é responsabilidade da camada de serviços, não daqui.
 */

import { collectTreasure, completeClue, reorderClues, setInventoryOrder } from '../rules/inventory.ts';
import {
  completeChapter,
  createInitialGameState,
  setCrewCount,
  startChapter,
} from '../rules/progression.ts';
import type { GameState } from '../types/game-state.ts';
import type { GameAction } from './game-actions.ts';

/** Um redutor é uma tabela de despacho: a métrica conta ações, não lógica. */
/* eslint-disable-next-line complexity */
export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'game/reset':
      return createInitialGameState(action.chapters);

    case 'game/load':
      return action.state;

    case 'chapter/start':
      return startChapter(state, action.chapterId);

    case 'chapter/complete':
      return completeChapter(state, action.chapter);

    case 'treasure/collect':
      return collectTreasure(state, action.treasure);

    case 'clue/complete':
      return completeClue(state, action.treasure);

    case 'inventory/reorder':
      return setInventoryOrder(state, reorderClues(state.inventoryOrder, action.from, action.to));

    case 'quiz/answer':
      return { ...state, quizzes: { ...state.quizzes, [action.chapterId]: action.status } };

    case 'crew/set':
      return setCrewCount(state, action.count);

    case 'route/select':
      return { ...state, route: action.route };

    case 'checkpoint/set':
      return { ...state, checkpoint: action.checkpoint };

    case 'riddle/solve':
      return { ...state, riddleSolved: true };

    case 'tutorial/seen':
      return { ...state, tutorialSeen: true };
  }
};
