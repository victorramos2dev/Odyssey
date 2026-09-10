/**
 * Contexto do jogo.
 *
 * Fica num arquivo próprio, separado do provedor, porque o Fast Refresh do
 * Vite só preserva estado em módulos que exportam apenas componentes.
 */

import { createContext } from 'react';

import type { GameAction } from '@domain/state/game-actions.ts';
import type { GameState } from '@domain/types';

export interface GameContextValue {
  readonly state: GameState;
  readonly dispatch: (action: GameAction) => void;
  /** Há progresso gravado? Alimenta o botão "Continuar" da tela inicial. */
  readonly hasSave: boolean;
  /** Apaga o save e recomeça a aventura. */
  readonly resetGame: () => void;
}

export const GameContext = createContext<GameContextValue | null>(null);
