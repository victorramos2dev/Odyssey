/**
 * Nós de cena — o vocabulário do motor da visual novel.
 *
 * Cada marcador do roteiro corresponde a exatamente um `kind` aqui. A união
 * discriminada faz o compilador exigir que todo novo tipo de nó ganhe seu
 * renderizador e sua regra de avanço (ver `NodeRendererRegistry`).
 *
 * | Roteiro            | kind          |
 * |--------------------|---------------|
 * | `NARRAÇÃO:`        | `narration`   |
 * | `NOME (expressão)` | `speech`      |
 * | `[CORO]`           | `chorus`      |
 * | `[ESCOLHA]`        | `choice`      |
 * | `[QUIZ]`           | `quiz`        |
 * | `[ALTAR]`          | campo `altar` de `quiz` |
 * | `[TESOURO]`        | `treasure`    |
 * | `[PISTA COMPLETA]` | `clue`        |
 * | `[D&D]`            | `minigame`    |
 * | `[FUNDO: x]`       | `background`  |
 * | `[CHECKPOINT]`     | `checkpoint`  |
 * | `[FIO PARTIDO]`    | `death`       |
 * | `[TRIPULAÇÃO: n]`  | `crew`        |
 * | `[TUTORIAL]`       | `tutorial`    |
 */

import type { CharacterId, Expression, StagePosition } from './character.ts';
import type { QuizQuestion } from './quiz.ts';
import type { TreasureId } from './treasure.ts';

/** Rótulo opcional de um nó, usado como alvo de desvio. */
export type NodeId = string;

/** Identificador de cenário, resolvido para um arquivo por `AssetResolver`. */
export type BackgroundId = string;

/** Identificador de capítulo. Roteiro: `[CHECKPOINT: troia]`. */
export type ChapterId = string;

/** Bifurcação do Capítulo VII. */
export type RouteId = 'scylla' | 'caribdis';

// ---------------------------------------------------------------------------
// Consequências de escolha
// ---------------------------------------------------------------------------

/**
 * O que acontece depois que o jogador escolhe uma opção.
 *
 * Regra do roteiro: `[ESCOLHA]` pode matar; `[QUIZ]` nunca mata.
 */
export type ChoiceConsequence =
  /** Segue para o próximo nó da sequência. */
  | { readonly kind: 'continue' }
  /** Desvia para um nó rotulado do mesmo capítulo. */
  | { readonly kind: 'goto'; readonly target: NodeId }
  /** Fio Partido: volta ao checkpoint mantendo o inventário. */
  | { readonly kind: 'death'; readonly reason: string }
  /** Fixa a rota (Scylla/Caríbdis) e desvia. */
  | { readonly kind: 'route'; readonly route: RouteId; readonly target: NodeId };

export interface ChoiceOption {
  readonly id: string;
  /** Texto do botão. */
  readonly label: string;
  /** Reação exibida antes de aplicar a consequência. */
  readonly response?: string;
  readonly consequence: ChoiceConsequence;
}

// ---------------------------------------------------------------------------
// Nós
// ---------------------------------------------------------------------------

interface BaseNode {
  /** Rótulo para desvios. Só é necessário em nós que são alvo de `goto`. */
  readonly id?: NodeId;
}

/** Texto sem personagem em cena. */
export interface NarrationNode extends BaseNode {
  readonly kind: 'narration';
  readonly lines: readonly string[];
}

/** Fala com sprite e expressão. */
export interface SpeechNode extends BaseNode {
  readonly kind: 'speech';
  readonly speaker: CharacterId;
  readonly expression: Expression;
  readonly lines: readonly string[];
  readonly position?: StagePosition;
}

/** Fala coletiva da tripulação: sprite de grupo, sem nome na caixa. */
export interface ChorusNode extends BaseNode {
  readonly kind: 'chorus';
  readonly lines: readonly string[];
}

/** Bifurcação narrativa. Pode matar. */
export interface ChoiceNode extends BaseNode {
  readonly kind: 'choice';
  readonly prompt: string;
  readonly options: readonly ChoiceOption[];
}

/**
 * Ritual de retentativa após erro no quiz.
 *
 * Não é um nó: o Altar só existe se o jogador errar, então ele viaja dentro do
 * quiz a que pertence, em vez de ocupar um lugar fixo na sequência.
 */
export interface AltarRitual {
  readonly deity: CharacterId;
  /** Três oferendas, arrastadas nesta ordem. */
  readonly offerings: readonly [string, string, string];
  /** O que o Guardião diz ao se ofender. */
  readonly reproach: readonly string[];
}

/** Quiz dos Guardiões. Nunca mata: errar leva ao Altar e repete. */
export interface QuizNode extends BaseNode {
  readonly kind: 'quiz';
  readonly guardian: CharacterId;
  readonly questions: readonly QuizQuestion[];
  readonly altar: AltarRitual;
}

/** Tesouro encontrado: a pista entra no inventário como *incompleta*. */
export interface TreasureNode extends BaseNode {
  readonly kind: 'treasure';
  readonly treasure: TreasureId;
}

/** Quiz vencido: a pista passa a *completa*. */
export interface ClueNode extends BaseNode {
  readonly kind: 'clue';
  readonly treasure: TreasureId;
}

/** Interação de arrastar e soltar (enigma final). */
export interface MinigameNode extends BaseNode {
  readonly kind: 'minigame';
  readonly minigame: 'doze_machados';
}

/** Troca de cenário. */
export interface BackgroundNode extends BaseNode {
  readonly kind: 'background';
  readonly background: BackgroundId;
}

/** Ponto de retorno gravado no armazenamento local. */
export interface CheckpointNode extends BaseNode {
  readonly kind: 'checkpoint';
  readonly chapter: ChapterId;
}

/** Fio Partido roteirizado (morte inevitável dentro da narrativa). */
export interface DeathNode extends BaseNode {
  readonly kind: 'death';
  readonly reason: string;
}

/** Atualiza o contador de homens vivos no HUD. Nunca sobe. */
export interface CrewNode extends BaseNode {
  readonly kind: 'crew';
  readonly count: number;
  /** Legenda da queda, exibida no HUD. */
  readonly note?: string;
}

/** Abre o tutorial (prólogo). */
export interface TutorialNode extends BaseNode {
  readonly kind: 'tutorial';
}

export type SceneNode =
  | NarrationNode
  | SpeechNode
  | ChorusNode
  | ChoiceNode
  | QuizNode
  | TreasureNode
  | ClueNode
  | MinigameNode
  | BackgroundNode
  | CheckpointNode
  | DeathNode
  | CrewNode
  | TutorialNode;

export type SceneNodeKind = SceneNode['kind'];

/**
 * Nós que apenas mutam estado e avançam sozinhos, sem esperar o jogador.
 * O motor os processa em cadeia até parar num nó interativo.
 */
export const PASSTHROUGH_KINDS = [
  'background',
  'checkpoint',
  'treasure',
  'clue',
  'crew',
] as const satisfies readonly SceneNodeKind[];

export type PassthroughKind = (typeof PASSTHROUGH_KINDS)[number];

export const isPassthroughNode = (node: SceneNode): boolean =>
  (PASSTHROUGH_KINDS as readonly string[]).includes(node.kind);
