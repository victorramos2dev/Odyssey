/**
 * Ações do jogo (padrão Command).
 *
 * Toda mutação de estado passa por uma ação nomeada. Nenhum componente
 * escreve no estado diretamente — eles despacham intenções.
 */

import type { Chapter } from '../types/chapter.ts';
import type { Checkpoint, GameState } from '../types/game-state.ts';
import type { QuizStatus } from '../types/quiz.ts';
import type { ChapterId, RouteId } from '../types/scene.ts';
import type { TreasureId } from '../types/treasure.ts';

export type GameAction =
  /** Recomeça a aventura do zero. */
  | { readonly type: 'game/reset'; readonly chapters: readonly Chapter[] }
  /** Restaura um estado vindo do armazenamento local. */
  | { readonly type: 'game/load'; readonly state: GameState }
  | { readonly type: 'chapter/start'; readonly chapterId: ChapterId }
  | { readonly type: 'chapter/complete'; readonly chapter: Chapter }
  | { readonly type: 'treasure/collect'; readonly treasure: TreasureId }
  | { readonly type: 'clue/complete'; readonly treasure: TreasureId }
  | { readonly type: 'inventory/reorder'; readonly from: number; readonly to: number }
  | { readonly type: 'quiz/answer'; readonly chapterId: ChapterId; readonly status: QuizStatus }
  | { readonly type: 'crew/set'; readonly count: number }
  | { readonly type: 'route/select'; readonly route: RouteId }
  | { readonly type: 'checkpoint/set'; readonly checkpoint: Checkpoint }
  | { readonly type: 'riddle/solve' }
  | { readonly type: 'tutorial/seen' };
