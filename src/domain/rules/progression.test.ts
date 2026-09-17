import { describe, expect, it } from 'vitest';

import type { Chapter } from '../types/chapter.ts';
import {
  areAllChaptersCompleted,
  completeChapter,
  createInitialGameState,
  getPointStatus,
  hasProgress,
  isChapterAccessible,
  setCrewCount,
  startChapter,
} from './progression.ts';

/** Capítulos mínimos: as regras não dependem do conteúdo real do roteiro. */
const chapterAt = (order: number, id: string, unlocks: string | null): Chapter => ({
  id,
  order,
  numeral: String(order),
  title: id,
  guardian: 'atena',
  quizTheme: 'teste',
  tagline: 'teste',
  mapCoordinates: { x: 0, y: 0 },
  thumbnail: 'mar_noite',
  nodes: [],
  unlocks,
});

const CHAPTERS: readonly Chapter[] = [
  chapterAt(1, 'primeiro', 'segundo'),
  chapterAt(2, 'segundo', 'terceiro'),
  chapterAt(3, 'terceiro', null),
];

const [first, second, third] = CHAPTERS as [Chapter, Chapter, Chapter];

describe('estado inicial', () => {
  it('deixa o primeiro ponto disponível e os demais bloqueados', () => {
    const state = createInitialGameState(CHAPTERS);

    expect(getPointStatus(state, 'primeiro')).toBe('available');
    expect(getPointStatus(state, 'segundo')).toBe('locked');
    expect(getPointStatus(state, 'terceiro')).toBe('locked');
  });

  it('não conta como progresso a retomar', () => {
    expect(hasProgress(createInitialGameState(CHAPTERS))).toBe(false);
  });
});

describe('progressão sequencial', () => {
  it('impede entrar num ponto bloqueado', () => {
    const state = createInitialGameState(CHAPTERS);

    expect(isChapterAccessible(state, 'segundo')).toBe(false);
    expect(getPointStatus(startChapter(state, 'segundo'), 'segundo')).toBe('locked');
  });

  it('desbloqueia apenas o ponto seguinte ao concluir', () => {
    const state = completeChapter(createInitialGameState(CHAPTERS), first);

    expect(getPointStatus(state, 'primeiro')).toBe('completed');
    expect(getPointStatus(state, 'segundo')).toBe('available');
    // O terceiro continua fechado: um capítulo não abre dois de uma vez.
    expect(getPointStatus(state, 'terceiro')).toBe('locked');
  });

  it('não rebaixa um ponto já concluído ao reconcluir o anterior', () => {
    const played = completeChapter(
      completeChapter(createInitialGameState(CHAPTERS), first),
      second,
    );

    const replayed = completeChapter(played, first);

    expect(getPointStatus(replayed, 'segundo')).toBe('completed');
  });

  it('reconhece a aventura inteira concluída', () => {
    const finished = [first, second, third].reduce(
      (state, chapter) => completeChapter(state, chapter),
      createInitialGameState(CHAPTERS),
    );

    expect(areAllChaptersCompleted(finished, CHAPTERS)).toBe(true);
  });
});

describe('contador de tripulação', () => {
  it('começa com quarenta e seis homens', () => {
    expect(createInitialGameState(CHAPTERS).crewCount).toBe(46);
  });

  it('nunca sobe — a regra de ouro do roteiro', () => {
    const afterLoss = setCrewCount(createInitialGameState(CHAPTERS), 40);

    expect(setCrewCount(afterLoss, 46).crewCount).toBe(40);
  });

  it('não desce abaixo de zero', () => {
    expect(setCrewCount(createInitialGameState(CHAPTERS), -10).crewCount).toBe(0);
  });
});

describe('marcador de leitura', () => {
  it('começa vazio', () => {
    expect(createInitialGameState(CHAPTERS).bookmark).toBeNull();
  });

  it('é apagado quando o capítulo marcado termina', () => {
    const reading = {
      ...createInitialGameState(CHAPTERS),
      bookmark: { chapterId: 'primeiro', nodeIndex: 12 },
    };

    expect(completeChapter(reading, first).bookmark).toBeNull();
  });

  it('sobrevive quando termina um capítulo diferente do marcado', () => {
    const reading = {
      ...createInitialGameState(CHAPTERS),
      bookmark: { chapterId: 'segundo', nodeIndex: 3 },
    };

    expect(completeChapter(reading, first).bookmark).toEqual({
      chapterId: 'segundo',
      nodeIndex: 3,
    });
  });
});
