/**
 * Ênfase no texto do roteiro.
 *
 * O roteiro marca destaque com `**asteriscos**`, como em "Qual deusa **não**
 * disputou o Pomo?". Essa negação é o eixo da pergunta — perdê-la muda o
 * sentido. Em vez de arrastar uma biblioteca de Markdown inteira para isso,
 * convertemos só esse caso em `<strong>`.
 */

import type { ReactNode } from 'react';

const EMPHASIS_PATTERN = /\*\*([^*]+)\*\*/g;

export const withEmphasis = (text: string): ReactNode => {
  const parts = text.split(EMPHASIS_PATTERN);

  // `split` com grupo de captura alterna: texto, capturado, texto, capturado...
  return parts.map((part, position) =>
    position % 2 === 1 ? (
      <strong key={`${String(position)}-${part}`}>{part}</strong>
    ) : (
      part
    ),
  );
};
