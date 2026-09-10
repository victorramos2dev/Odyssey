/**
 * Tesouros e pistas — Apêndice A do roteiro.
 *
 * Ciclo de estados: `locked` → (tesouro encontrado) → `incomplete` → (quiz correto) → `complete`
 * Corresponde a *bloqueada · incompleta · completa* do PDF (seção 4.5).
 */

export const TREASURE_IDS = [
  'lasca_cavalo',
  'anel_la_carneiro',
  'odre_couro',
  'ramo_moly',
  'obolo_caronte',
  'no_cera',
  'escama',
  'chifre_dourado',
  'tabua_jangada',
] as const;

export type TreasureId = (typeof TREASURE_IDS)[number];

export type ClueState = 'locked' | 'incomplete' | 'complete';

export interface Treasure {
  readonly id: TreasureId;
  readonly name: string;
  /** Capítulo em que é obtido. */
  readonly chapter: string;
  /** Símbolo do Apêndice A, usado como ícone da carta no inventário. */
  readonly symbol: string;
  /** Texto exibido enquanto a pista está *incompleta*. */
  readonly partialText: string;
  /** Texto liberado quando a pista fica *completa*. */
  readonly fullText: string;
  /** Posição na ordem cronológica da viagem — gabarito do enigma final. */
  readonly chronologicalOrder: number;
}
