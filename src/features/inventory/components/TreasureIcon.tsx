/**
 * Símbolo do tesouro — Apêndice A do roteiro.
 *
 * Desenhos inline em SVG, e não arquivos de imagem: são nove glifos
 * geométricos, herdam a cor do texto (portanto acompanham o estado da pista)
 * e não custam uma requisição de rede cada.
 *
 * Decorativos por definição — o nome do tesouro está sempre escrito ao lado.
 */

import type { TreasureSymbol } from '@content/treasures.ts';

const PATHS: Readonly<Record<TreasureSymbol, string>> = {
  // Cavalo de madeira — a lasca de Troia.
  horse: 'M4 18h16M7 18V9l5-4 5 4v9M10 9h4M12 5V2',
  // Olho fechado — Polifemo.
  'closed-eye': 'M3 12s4-5 9-5 9 5 9 5M7 14l-2 3M12 15v3M17 14l2 3',
  // Espiral de vento — o odre de Éolo.
  'wind-spiral': 'M3 8h12a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 18h9',
  // Flor branca de raiz negra — o moly.
  'white-flower': 'M12 13v8M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6M12 7V3M9 10H4M15 10h5',
  // Moeda — o óbolo de Caronte.
  coin: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M9 9h6M9 15h6M12 8v8',
  // Onda sonora abafada — o nó de cera.
  'sound-wave': 'M4 12h2m3-5v10m4-13v16m4-11v6m4-3h2',
  // Seis pontos — as seis gargantas de Scylla.
  'six-points': 'M7 7h.01M12 7h.01M17 7h.01M7 15h.01M12 15h.01M17 15h.01M4 11h16',
  // Sol — o gado de Apolo.
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
  // Vela — a tábua da jangada.
  sail: 'M12 3v18M12 3 4 18h8M12 8l6 10h-6M3 21h18',
};

interface TreasureIconProps {
  readonly symbol: TreasureSymbol;
  readonly size?: number;
}

export function TreasureIcon({ symbol, size = 28 }: TreasureIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[symbol]} />
    </svg>
  );
}
