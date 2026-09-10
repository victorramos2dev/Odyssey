/**
 * Carta de pista no inventário.
 *
 * Três estados, conforme o requisito 4.5: *bloqueada* (nem encontrada),
 * *incompleta* (tesouro achado, quiz por vencer) e *completa*. Cada estado
 * mostra um texto diferente — é a diferença entre eles que dá sentido ao
 * ciclo.
 */

import { TREASURES, type TreasureSymbol } from '@content/treasures.ts';
import type { ClueState, TreasureId } from '@domain/types';

import { TreasureIcon } from './TreasureIcon.tsx';
import styles from './ClueCard.module.css';

const STATE_LABEL: Readonly<Record<ClueState, string>> = {
  locked: 'Bloqueada',
  incomplete: 'Incompleta',
  complete: 'Completa',
};

interface ClueCardProps {
  readonly treasure: TreasureId;
  readonly state: ClueState;
  /** Posição na ordem escolhida pelo jogador, a partir de 1. */
  readonly position: number;
  readonly total: number;
  readonly isGrabbed?: boolean;
  readonly isDropTarget?: boolean;
}

export function ClueCard({
  treasure,
  state,
  position,
  total,
  isGrabbed = false,
  isDropTarget = false,
}: ClueCardProps) {
  const definition = TREASURES[treasure];

  const body =
    state === 'complete'
      ? definition.fullText
      : state === 'incomplete'
        ? definition.partialText
        : 'Ainda não recolhida.';

  const classes = [
    styles['card'],
    isGrabbed ? styles['grabbed'] : null,
    isDropTarget ? styles['dropTarget'] : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes} data-state={state}>
      <span className={styles['position']} aria-hidden="true">
        {position}
      </span>

      <span className={styles['icon']}>
        <TreasureIcon symbol={definition.symbol as TreasureSymbol} />
      </span>

      <div className={styles['body']}>
        <h3 className={styles['name']}>{definition.name}</h3>
        <p className={styles['text']}>{body}</p>
      </div>

      <span className={styles['state']}>{STATE_LABEL[state]}</span>

      {/* Contexto completo para leitor de tela, sem poluir a carta. */}
      <span className="visually-hidden">
        Posição {position} de {total}. Pista {STATE_LABEL[state].toLowerCase()}.
      </span>
    </article>
  );
}
