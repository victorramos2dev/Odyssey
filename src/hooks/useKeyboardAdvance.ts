/**
 * Atalho de teclado para avançar a cena.
 *
 * Espaço, Enter e seta para a direita são o que se espera de uma visual novel.
 * O atalho é desligado quando o foco está num controle — senão Espaço
 * dispararia o botão *e* avançaria a cena de uma vez só.
 */

import { useEffect } from 'react';

const ADVANCE_KEYS = new Set([' ', 'Enter', 'ArrowRight']);
const INTERACTIVE_TAGS = new Set(['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA']);

export const useKeyboardAdvance = (onAdvance: () => void, isEnabled = true): void => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!ADVANCE_KEYS.has(event.key)) return;

      const target = event.target;
      if (target instanceof HTMLElement && INTERACTIVE_TAGS.has(target.tagName)) return;

      event.preventDefault();
      onAdvance();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, onAdvance]);
};
