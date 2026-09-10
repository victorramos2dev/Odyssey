/**
 * Elenco da aventura.
 *
 * Os identificadores são conteúdo narrativo e por isso ficam em português,
 * espelhando a tabela de PERSONAGENS do roteiro. O código que os manipula
 * está em inglês.
 */

export const CHARACTER_IDS = [
  'odisseu',
  'euriloco',
  'tripulacao',
  'atena',
  'polifemo',
  'eolo',
  'hermes',
  'circe',
  'anticleia',
  'tiresias',
  'sereias',
  'scylla',
  'apolo',
  'calipso',
  'telemaco',
  'penelope',
] as const;

export type CharacterId = (typeof CHARACTER_IDS)[number];

/**
 * Quatro expressões disponíveis para todo o elenco.
 * Roteiro: "neutro, intenso, satisfeito, contrariado".
 */
export const EXPRESSIONS = ['neutral', 'intense', 'pleased', 'displeased'] as const;

export type Expression = (typeof EXPRESSIONS)[number];

/** Posição do sprite em cena. */
export type StagePosition = 'left' | 'center' | 'right';

export interface Character {
  readonly id: CharacterId;
  /** Nome exibido na caixa de diálogo. */
  readonly displayName: string;
  /** Um sprite por expressão. Caminho relativo à raiz de assets. */
  readonly sprites: Readonly<Record<Expression, string>>;
  /** Onde o sprite entra em cena por padrão. */
  readonly defaultPosition: StagePosition;
  /**
   * Coro coletivo (A Tripulação) não exibe nome na caixa de diálogo.
   * Roteiro: "sprite de grupo, sem nome".
   */
  readonly isChorus?: boolean;
}
