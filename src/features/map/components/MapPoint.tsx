/**
 * Um ponto da trilha.
 *
 * O estado chega por `data-status`, e não por classe solta, para que a
 * folha de estilo, os testes e a inspeção do DOM leiam a mesma verdade.
 * Pontos bloqueados continuam presentes e focáveis, mas anunciam o motivo —
 * esconder o caminho adiante tiraria do jogador a noção do tamanho da viagem.
 */

import type { Chapter, PointStatus } from '@domain/types';

import styles from './MapPoint.module.css';

const STATUS_LABEL: Readonly<Record<PointStatus, string>> = {
  locked: 'Bloqueado',
  available: 'Disponível',
  inProgress: 'Em andamento',
  completed: 'Concluído',
};

interface MapPointProps {
  readonly chapter: Chapter;
  readonly status: PointStatus;
  /** `false` quando o capítulo ainda não foi transcrito do roteiro. */
  readonly isPlayable: boolean;
  readonly onSelect: (chapter: Chapter) => void;
}

export function MapPoint({ chapter, status, isPlayable, onSelect }: MapPointProps) {
  const isLocked = status === 'locked';
  const isDisabled = isLocked || !isPlayable;

  const description = isLocked
    ? 'Conclua o ponto anterior para desbloquear.'
    : isPlayable
      ? chapter.tagline
      : 'Capítulo ainda em transcrição.';

  return (
    <li
      className={styles['anchor']}
      style={{
        left: `${String(chapter.mapCoordinates.x)}%`,
        top: `${String(chapter.mapCoordinates.y)}%`,
      }}
    >
      <button
        type="button"
        className={styles['point']}
        data-status={status}
        disabled={isDisabled}
        aria-describedby={`map-point-${chapter.id}-detail`}
        onClick={() => {
          onSelect(chapter);
        }}
      >
        <span className={styles['marker']} aria-hidden="true">
          {chapter.numeral}
        </span>
        <span className={styles['name']}>{chapter.title}</span>
        <span className={styles['status']}>{STATUS_LABEL[status]}</span>
      </button>

      <span id={`map-point-${chapter.id}-detail`} className="visually-hidden">
        {description}
      </span>

      <span className={styles['tooltip']} aria-hidden="true">
        {description}
      </span>
    </li>
  );
}
