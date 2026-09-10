/**
 * Adaptador de persistência sobre o LocalStorage.
 * Tecnologia sugerida pelo requisito 4.7 do PDF.
 *
 * Todo acesso é protegido: em janela anônima, com cookies bloqueados ou com a
 * cota estourada, o LocalStorage lança. O jogo continua jogável sem save em
 * vez de quebrar.
 */

import type { GameState } from '@domain/types';
import { isPersistedGameState } from './game-state-schema.ts';
import type { SaveRepository } from './save-repository.ts';

export const SAVE_STORAGE_KEY = 'odyssey:save:v1';

export class LocalStorageSaveRepository implements SaveRepository {
  constructor(
    private readonly storage: Storage,
    private readonly key: string = SAVE_STORAGE_KEY,
  ) {}

  load(): GameState | null {
    const raw = this.read();
    if (raw === null) return null;

    try {
      const parsed: unknown = JSON.parse(raw);

      return isPersistedGameState(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  save(state: GameState): void {
    try {
      this.storage.setItem(this.key, JSON.stringify({ ...state, savedAt: Date.now() }));
    } catch (error) {
      console.warn('[odyssey] Não foi possível gravar o progresso.', error);
    }
  }

  clear(): void {
    try {
      this.storage.removeItem(this.key);
    } catch (error) {
      console.warn('[odyssey] Não foi possível limpar o progresso.', error);
    }
  }

  hasSave(): boolean {
    return this.load() !== null;
  }

  private read(): string | null {
    try {
      return this.storage.getItem(this.key);
    } catch {
      return null;
    }
  }
}

/**
 * Repositório inerte, usado quando o navegador não expõe LocalStorage.
 * Padrão Null Object: evita `if (repository)` espalhado pelo código.
 */
export class InMemorySaveRepository implements SaveRepository {
  private state: GameState | null = null;

  load(): GameState | null {
    return this.state;
  }

  save(state: GameState): void {
    this.state = state;
  }

  clear(): void {
    this.state = null;
  }

  hasSave(): boolean {
    return this.state !== null;
  }
}

const isStorageAvailable = (): boolean => {
  try {
    const probe = '__odyssey_probe__';
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);

    return true;
  } catch {
    return false;
  }
};

/** Escolhe o adaptador viável no navegador atual. */
export const createSaveRepository = (): SaveRepository =>
  isStorageAvailable()
    ? new LocalStorageSaveRepository(window.localStorage)
    : new InMemorySaveRepository();
