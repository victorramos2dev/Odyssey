/**
 * Acesso ao estado do jogo.
 *
 * Falhar alto quando usado fora do provedor é intencional: é um erro de
 * montagem da árvore, e um erro claro em desenvolvimento vale mais que um
 * `undefined` silencioso em produção.
 */

import { useContext } from 'react';

import { GameContext, type GameContextValue } from '@app/providers/game-context.ts';

export const useGame = (): GameContextValue => {
  const context = useContext(GameContext);

  if (context === null) {
    throw new Error('useGame precisa estar dentro de <GameProvider>.');
  }

  return context;
};
