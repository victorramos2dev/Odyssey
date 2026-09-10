/**
 * Provedor do estado do jogo.
 *
 * Junta três peças que, sozinhas, não sabem nada uma da outra:
 * o redutor puro (`gameReducer`), o repositório de persistência
 * (`SaveRepository`) e a lista de capítulos (conteúdo).
 *
 * O salvamento é automático — requisito 4.7. Cada mudança de estado é gravada,
 * sem que nenhuma tela precise se lembrar de salvar.
 */

import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import type { ReactNode } from 'react';

import { gameReducer } from '@domain/state/game-reducer.ts';
import { createInitialGameState, hasProgress } from '@domain/rules/progression.ts';
import type { GameState } from '@domain/types';
import { CHAPTERS } from '@content/chapters';
import { createSaveRepository, type SaveRepository } from '@services/storage';

import { GameContext, type GameContextValue } from './game-context.ts';

interface GameProviderProps {
  readonly children: ReactNode;
  /** Injetável para testes. Em produção usa o LocalStorage. */
  readonly repository?: SaveRepository;
}

/** Retoma o save válido; se não houver, começa uma aventura nova. */
const initialiseState = (repository: SaveRepository): GameState =>
  repository.load() ?? createInitialGameState(CHAPTERS);

export function GameProvider({ children, repository }: GameProviderProps) {
  // `useState` com inicializador preguiçoso, e não `useRef`: o repositório é
  // criado uma única vez e pode ser lido durante o render sem ressalva.
  const [saveRepository] = useState<SaveRepository>(() => repository ?? createSaveRepository());

  const [state, dispatch] = useReducer(gameReducer, saveRepository, initialiseState);

  // Salvamento automático: grava a cada transição de estado.
  useEffect(() => {
    saveRepository.save(state);
  }, [saveRepository, state]);

  const resetGame = useCallback(() => {
    saveRepository.clear();
    dispatch({ type: 'game/reset', chapters: CHAPTERS });
  }, [saveRepository]);

  const hasSave = hasProgress(state);

  const value = useMemo<GameContextValue>(
    () => ({ state, dispatch, hasSave, resetGame }),
    [state, hasSave, resetGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
