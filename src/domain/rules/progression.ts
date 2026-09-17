/**
 * Regras de progressão — requisito 4.2 do PDF.
 *
 * Funções puras: recebem estado, devolvem estado novo. Não conhecem React,
 * armazenamento nem o conteúdo do roteiro — os capítulos chegam por parâmetro.
 */

import { SAVE_SCHEMA_VERSION } from '../types/game-state.ts';
import { TREASURE_IDS } from '../types/treasure.ts';
import type { Chapter, PointStatus } from '../types/chapter.ts';
import type { GameState } from '../types/game-state.ts';
import type { QuizStatus } from '../types/quiz.ts';
import type { ChapterId } from '../types/scene.ts';
import type { ClueState, TreasureId } from '../types/treasure.ts';

/** Tripulação na partida de Troia. Apêndice C. */
export const INITIAL_CREW_COUNT = 46;

const buildInitialPoints = (chapters: readonly Chapter[]): Record<ChapterId, PointStatus> => {
  const ordered = [...chapters].sort((a, b) => a.order - b.order);

  return Object.fromEntries(
    // O primeiro ponto inicia desbloqueado; os demais, bloqueados. Requisito 4.1.
    ordered.map((chapter, index) => [chapter.id, index === 0 ? 'available' : 'locked']),
  );
};

const buildInitialClues = (): Record<TreasureId, ClueState> =>
  Object.fromEntries(TREASURE_IDS.map((id) => [id, 'locked'])) as Record<TreasureId, ClueState>;

const buildInitialQuizzes = (chapters: readonly Chapter[]): Record<ChapterId, QuizStatus> =>
  Object.fromEntries(chapters.map((chapter) => [chapter.id, 'unanswered']));

/** Estado de uma aventura nunca jogada. */
export const createInitialGameState = (chapters: readonly Chapter[]): GameState => {
  const first = [...chapters].sort((a, b) => a.order - b.order)[0];

  if (!first) {
    throw new Error('createInitialGameState: a lista de capítulos está vazia.');
  }

  return {
    schemaVersion: SAVE_SCHEMA_VERSION,
    points: buildInitialPoints(chapters),
    clues: buildInitialClues(),
    inventoryOrder: [],
    quizzes: buildInitialQuizzes(chapters),
    crewCount: INITIAL_CREW_COUNT,
    route: null,
    checkpoint: { chapterId: first.id },
    bookmark: null,
    riddleSolved: false,
    tutorialSeen: false,
    savedAt: Date.now(),
  };
};

/**
 * Há progresso digno de ser retomado?
 *
 * Não basta existir um arquivo salvo: o salvamento é automático e grava já no
 * primeiro instante, então "existe save" seria sempre verdadeiro. O que
 * interessa é se o jogador chegou a andar — é isso que o botão "Continuar" da
 * tela inicial promete.
 */
export const hasProgress = (state: GameState): boolean =>
  state.tutorialSeen ||
  state.riddleSolved ||
  state.inventoryOrder.length > 0 ||
  Object.values(state.points).some((status) => status === 'completed' || status === 'inProgress');

export const getPointStatus = (state: GameState, chapterId: ChapterId): PointStatus =>
  state.points[chapterId] ?? 'locked';

/** Apenas os pontos liberados podem ser acessados. Requisito 4.1. */
export const isChapterAccessible = (state: GameState, chapterId: ChapterId): boolean =>
  getPointStatus(state, chapterId) !== 'locked';

const withPointStatus = (
  state: GameState,
  chapterId: ChapterId,
  status: PointStatus,
): GameState => ({
  ...state,
  points: { ...state.points, [chapterId]: status },
});

/** Marca o ponto como *em andamento* ao entrar nele. */
export const startChapter = (state: GameState, chapterId: ChapterId): GameState => {
  if (!isChapterAccessible(state, chapterId)) return state;
  if (getPointStatus(state, chapterId) === 'completed') return state;

  return withPointStatus(state, chapterId, 'inProgress');
};

/**
 * Conclui o capítulo e desbloqueia o próximo.
 *
 * O desbloqueio é sequencial: só o `unlocks` deste capítulo é liberado, e
 * apenas se ainda estiver bloqueado — reconcluir não rebaixa um ponto já feito.
 */
export const completeChapter = (state: GameState, chapter: Chapter): GameState => {
  // Capítulo terminado não tem onde retomar: voltar a ele recomeça do início.
  const withoutBookmark =
    state.bookmark?.chapterId === chapter.id ? { ...state, bookmark: null } : state;
  const completed = withPointStatus(withoutBookmark, chapter.id, 'completed');

  if (chapter.unlocks === null) return completed;

  const nextStatus = getPointStatus(completed, chapter.unlocks);
  if (nextStatus !== 'locked') return completed;

  return withPointStatus(completed, chapter.unlocks, 'available');
};

/** A aventura termina quando todos os pontos estão concluídos. */
export const areAllChaptersCompleted = (state: GameState, chapters: readonly Chapter[]): boolean =>
  chapters.every((chapter) => getPointStatus(state, chapter.id) === 'completed');

/** O enigma final só abre depois de todos os pontos. Requisito 4.6. */
export const isFinalRiddleUnlocked = (state: GameState, chapters: readonly Chapter[]): boolean =>
  areAllChaptersCompleted(state, chapters);

export const countCompletedChapters = (state: GameState, chapters: readonly Chapter[]): number =>
  chapters.filter((chapter) => getPointStatus(state, chapter.id) === 'completed').length;

/**
 * Atualiza o contador de tripulação.
 *
 * Regra de ouro do roteiro: o número nunca sobe.
 */
export const setCrewCount = (state: GameState, count: number): GameState => ({
  ...state,
  crewCount: Math.min(state.crewCount, Math.max(0, count)),
});
