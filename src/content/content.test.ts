/**
 * Integridade do conteúdo.
 *
 * O roteiro é grande e é transcrito à mão. Estes testes são a rede que apanha
 * um erro de digitação antes de ele virar uma imagem quebrada em cena ou um
 * quiz sem resposta correta — coisas que o compilador não pega porque são
 * valores, não tipos.
 */

import { describe, expect, it } from 'vitest';

import { getBackground } from '@content/backgrounds.ts';
import { CHAPTERS, hasContent } from '@content/chapters';
import { CHARACTERS } from '@content/characters.ts';
import { TREASURES, TREASURE_LIST } from '@content/treasures.ts';
import type { SceneNode } from '@domain/types';

const playableChapters = CHAPTERS.filter(hasContent);

describe('capítulos', () => {
  it('têm ordem sequencial sem buracos nem repetições', () => {
    expect(CHAPTERS.map((chapter) => chapter.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('encadeiam-se num caminho único até o último', () => {
    for (const [position, chapter] of CHAPTERS.entries()) {
      const next = CHAPTERS[position + 1];

      expect(chapter.unlocks).toBe(next?.id ?? null);
    }
  });

  it('usam identificadores únicos', () => {
    expect(new Set(CHAPTERS.map((chapter) => chapter.id)).size).toBe(CHAPTERS.length);
  });

  it('mantêm as coordenadas do mapa dentro da tela', () => {
    for (const { mapCoordinates } of CHAPTERS) {
      expect(mapCoordinates.x).toBeGreaterThanOrEqual(0);
      expect(mapCoordinates.x).toBeLessThanOrEqual(100);
      expect(mapCoordinates.y).toBeGreaterThanOrEqual(0);
      expect(mapCoordinates.y).toBeLessThanOrEqual(100);
    }
  });
});

describe('tesouros', () => {
  it('cobrem os nove pontos com tesouro, sem ordem repetida', () => {
    const orders = TREASURE_LIST.map((treasure) => treasure.chronologicalOrder);

    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('todo capítulo com tesouro aponta para um tesouro existente', () => {
    for (const chapter of CHAPTERS) {
      if (chapter.treasure === undefined) continue;

      expect(TREASURES[chapter.treasure]).toBeDefined();
    }
  });

  it('têm texto diferente para pista incompleta e completa', () => {
    for (const treasure of TREASURE_LIST) {
      expect(treasure.partialText).not.toBe(treasure.fullText);
      expect(treasure.fullText.length).toBeGreaterThan(0);
    }
  });
});

describe('cenários referenciados', () => {
  const backgroundsIn = (nodes: readonly SceneNode[]): string[] =>
    nodes.filter((node) => node.kind === 'background').map((node) => node.background);

  it('todo `[FUNDO: x]` usado num capítulo está registrado', () => {
    for (const chapter of playableChapters) {
      for (const background of backgroundsIn(chapter.nodes)) {
        expect(getBackground(background), `cenário "${background}" não registrado`).not.toBeNull();
      }
    }
  });

  it('toda miniatura de ponto no mapa está registrada', () => {
    for (const chapter of CHAPTERS) {
      expect(getBackground(chapter.thumbnail), `miniatura de "${chapter.id}"`).not.toBeNull();
    }
  });

  it('todo cenário registrado descreve a cena para leitores de tela', () => {
    for (const chapter of CHAPTERS) {
      expect(getBackground(chapter.thumbnail)?.alt.length).toBeGreaterThan(0);
    }
  });
});

describe('quizzes', () => {
  it('têm três questões por Guardião', () => {
    for (const chapter of playableChapters) {
      for (const node of chapter.nodes) {
        if (node.kind !== 'quiz') continue;

        expect(node.questions, `quiz de "${chapter.id}"`).toHaveLength(3);
      }
    }
  });

  it('têm a resposta correta entre as alternativas', () => {
    for (const chapter of playableChapters) {
      for (const node of chapter.nodes) {
        if (node.kind !== 'quiz') continue;

        for (const question of node.questions) {
          const ids = question.answers.map((answer) => answer.id);

          expect(ids, question.prompt).toContain(question.correctAnswerId);
          expect(new Set(ids).size, `alternativas repetidas em "${question.id}"`).toBe(ids.length);
        }
      }
    }
  });

  it('trazem o Altar com três oferendas', () => {
    for (const chapter of playableChapters) {
      for (const node of chapter.nodes) {
        if (node.kind !== 'quiz') continue;

        expect(node.altar.offerings, `altar de "${chapter.id}"`).toHaveLength(3);
      }
    }
  });
});

describe('elenco', () => {
  it('todo personagem que fala num capítulo está no registro', () => {
    for (const chapter of playableChapters) {
      for (const node of chapter.nodes) {
        if (node.kind !== 'speech') continue;

        expect(CHARACTERS[node.speaker], `personagem "${node.speaker}"`).toBeDefined();
      }
    }
  });

  it('todo Guardião de capítulo está no registro', () => {
    for (const chapter of CHAPTERS) {
      expect(CHARACTERS[chapter.guardian], `guardião de "${chapter.id}"`).toBeDefined();
    }
  });

  it('todo personagem tem sprite para as quatro expressões', () => {
    for (const character of Object.values(CHARACTERS)) {
      for (const expression of ['neutral', 'intense', 'pleased', 'displeased'] as const) {
        expect(character.sprites[expression].length, `${character.id}/${expression}`).toBeGreaterThan(0);
      }
    }
  });
});
