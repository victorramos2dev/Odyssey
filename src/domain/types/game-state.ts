/**
 * Estado persistido do jogo.
 *
 * Cobre os seis itens mínimos do requisito 4.7 do PDF:
 * pontos concluídos · pontos desbloqueados · quizzes respondidos ·
 * tesouros encontrados · pistas coletadas · organização do inventário.
 */

import type { PointStatus } from './chapter.ts';
import type { QuizStatus } from './quiz.ts';
import type { ChapterId, NodeId, RouteId } from './scene.ts';
import type { ClueState, TreasureId } from './treasure.ts';

/** Versão do formato do save. Incrementar quebra a compatibilidade. */
export const SAVE_SCHEMA_VERSION = 1;

/** Onde o jogador retoma após um Fio Partido ou ao recarregar a página. */
export interface Checkpoint {
  readonly chapterId: ChapterId;
  /** Rótulo do nó de retomada; ausente significa o início do capítulo. */
  readonly nodeId?: NodeId;
}

/**
 * Marcador de leitura: em que nó da cena o jogador parou.
 *
 * Diferente do checkpoint. O checkpoint é para onde o Fio Partido devolve —
 * o início do capítulo. O marcador é onde o jogador *estava*, e é o que faz
 * uma ida ao mapa ou ao inventário não custar a cena inteira.
 */
export interface SceneBookmark {
  readonly chapterId: ChapterId;
  readonly nodeIndex: number;
}

export interface GameState {
  readonly schemaVersion: number;
  /** Estado de cada ponto do mapa. */
  readonly points: Readonly<Record<ChapterId, PointStatus>>;
  /** Estado de cada pista. Requisito 4.5. */
  readonly clues: Readonly<Record<TreasureId, ClueState>>;
  /** Ordem das cartas no inventário, definida por arrastar e soltar. */
  readonly inventoryOrder: readonly TreasureId[];
  /** Resultado do quiz de cada capítulo. */
  readonly quizzes: Readonly<Record<ChapterId, QuizStatus>>;
  /** Homens vivos. Nunca sobe. */
  readonly crewCount: number;
  /** Rota escolhida no Capítulo VII; `null` antes da bifurcação. */
  readonly route: RouteId | null;
  readonly checkpoint: Checkpoint;
  /** Posição dentro do capítulo em curso; `null` fora de qualquer cena. */
  readonly bookmark: SceneBookmark | null;
  readonly riddleSolved: boolean;
  readonly tutorialSeen: boolean;
  /** Milissegundos desde a época, do último salvamento. */
  readonly savedAt: number;
}
