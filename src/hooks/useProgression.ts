/**
 * Leitura derivada da progressão.
 *
 * Concentra num só lugar as perguntas que várias telas fazem ao estado —
 * quantos pontos faltam, qual é o próximo, o enigma já abriu. Os componentes
 * consomem respostas, não recalculam regras.
 */

import { useMemo } from 'react';

import { CHAPTERS } from '@content/chapters';
import {
  countCompletedChapters,
  getPointStatus,
  isChapterAccessible,
  isFinalRiddleUnlocked,
} from '@domain/rules/progression.ts';
import { countCompleteClues } from '@domain/rules/inventory.ts';
import type { Chapter, PointStatus } from '@domain/types';
import type { ChapterId } from '@domain/types';

import { useGame } from './useGame.ts';

export interface ProgressionView {
  readonly chapters: readonly Chapter[];
  readonly completedCount: number;
  readonly totalCount: number;
  readonly completeClueCount: number;
  readonly riddleUnlocked: boolean;
  /** Primeiro ponto ainda não concluído e já acessível. */
  readonly nextChapter: Chapter | null;
  readonly statusOf: (chapterId: ChapterId) => PointStatus;
  readonly canEnter: (chapterId: ChapterId) => boolean;
}

export const useProgression = (): ProgressionView => {
  const { state } = useGame();

  return useMemo(() => {
    const nextChapter =
      CHAPTERS.find(
        (chapter) =>
          getPointStatus(state, chapter.id) !== 'completed' && isChapterAccessible(state, chapter.id),
      ) ?? null;

    return {
      chapters: CHAPTERS,
      completedCount: countCompletedChapters(state, CHAPTERS),
      totalCount: CHAPTERS.length,
      completeClueCount: countCompleteClues(state),
      riddleUnlocked: isFinalRiddleUnlocked(state, CHAPTERS),
      nextChapter,
      statusOf: (chapterId) => getPointStatus(state, chapterId),
      canEnter: (chapterId) => isChapterAccessible(state, chapterId),
    };
  }, [state]);
};
