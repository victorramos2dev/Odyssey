/** Capítulo = um ponto do mapa = um checkpoint. */

import type { CharacterId } from './character.ts';
import type { BackgroundId, ChapterId, SceneNode } from './scene.ts';
import type { TreasureId } from './treasure.ts';

/** Estados de um ponto da aventura — seção 8 do PDF. */
export type PointStatus = 'locked' | 'available' | 'inProgress' | 'completed';

/** Coordenadas percentuais sobre a arte do mapa (0–100). */
export interface MapCoordinates {
  readonly x: number;
  readonly y: number;
}

export interface Chapter {
  readonly id: ChapterId;
  /** Posição na trilha, a partir de 1. */
  readonly order: number;
  /** Numeral do roteiro: "I", "II", ... */
  readonly numeral: string;
  readonly title: string;
  readonly guardian: CharacterId;
  /** Ausente em Ítaca: o Capítulo X culmina no Enigma Final, não num tesouro. */
  readonly treasure?: TreasureId;
  /** Tema do quiz, exibido no cartão do ponto no mapa. */
  readonly quizTheme: string;
  /** Chamada curta exibida no mapa antes de entrar. */
  readonly tagline: string;
  readonly mapCoordinates: MapCoordinates;
  /** Cenário de abertura, usado como miniatura do ponto. */
  readonly thumbnail: BackgroundId;
  readonly nodes: readonly SceneNode[];
  /** Capítulo liberado ao concluir este. `null` no último. */
  readonly unlocks: ChapterId | null;
}
