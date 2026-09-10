/**
 * Mapa da aventura — requisito 4.1 do PDF.
 *
 * A trilha é um `<polyline>` em SVG sobre coordenadas percentuais, o que
 * mantém o traçado colado aos pontos em qualquer resolução de desktop ou
 * tablet sem uma única medida em pixels.
 *
 * O trecho já percorrido é desenhado em linha cheia e o que falta em
 * tracejado: a trilha carrega a informação de progresso, não só a de caminho.
 */

import { hasContent } from '@content/chapters';
import type { Chapter, PointStatus } from '@domain/types';
import type { ChapterId } from '@domain/types';

import { MapPoint } from './MapPoint.tsx';
import styles from './AdventureMap.module.css';

interface AdventureMapProps {
  readonly chapters: readonly Chapter[];
  readonly statusOf: (chapterId: ChapterId) => PointStatus;
  readonly onSelect: (chapter: Chapter) => void;
}

const toPoints = (chapters: readonly Chapter[]): string =>
  chapters
    .map(({ mapCoordinates }) => `${String(mapCoordinates.x)},${String(mapCoordinates.y)}`)
    .join(' ');

export function AdventureMap({ chapters, statusOf, onSelect }: AdventureMapProps) {
  const ordered = [...chapters].sort((a, b) => a.order - b.order);

  // A trilha cheia vai até o último ponto já concluído.
  const lastCompleted = ordered.reduce(
    (furthest, chapter, position) =>
      statusOf(chapter.id) === 'completed' ? position : furthest,
    -1,
  );
  const travelled = ordered.slice(0, Math.max(lastCompleted + 1, 1));

  return (
    <div className={styles['map']}>
      <svg
        className={styles['trail']}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline className={styles['trailRemaining']} points={toPoints(ordered)} />
        {travelled.length > 1 && (
          <polyline className={styles['trailTravelled']} points={toPoints(travelled)} />
        )}
      </svg>

      <ul className={styles['points']} aria-label="Pontos da aventura">
        {ordered.map((chapter) => (
          <MapPoint
            key={chapter.id}
            chapter={chapter}
            status={statusOf(chapter.id)}
            isPlayable={hasContent(chapter)}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}
