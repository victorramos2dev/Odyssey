/**
 * Porta de persistência (padrão Repository).
 *
 * O domínio depende desta interface, não do LocalStorage. Trocar por
 * IndexedDB ou por uma API remota é implementar outro adaptador — nenhum
 * componente ou regra muda.
 */

import type { GameState } from '@domain/types';

export interface SaveRepository {
  /** Devolve o save gravado ou `null` se não houver nenhum válido. */
  load(): GameState | null;
  save(state: GameState): void;
  clear(): void;
  /** Há progresso salvo? Alimenta o botão "Continuar" da tela inicial. */
  hasSave(): boolean;
}
