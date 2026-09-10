/**
 * Enigma Final — Os Doze Machados. Requisito 4.6 do PDF.
 *
 * O jogador arrasta os nove tesouros para os machados, na ordem cronológica da
 * viagem. O roteiro é explícito quanto à mecânica: o machado errado treme e
 * devolve a peça — **sem punição e sem limite de tentativas**. Não há contador
 * de erros aqui de propósito.
 *
 * Operável por teclado do início ao fim, com anúncio ARIA a cada movimento.
 */

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@components/ui/Button/Button.tsx';
import { TREASURES, TREASURE_LIST, type TreasureSymbol } from '@content/treasures.ts';
import { isSlotCorrect, isSolutionComplete } from '@domain/rules/riddle.ts';
import type { TreasureId } from '@domain/types';
import { TreasureIcon } from '@features/inventory/components/TreasureIcon.tsx';
import { useDragAndDrop } from '@hooks/useDragAndDrop.ts';

import styles from './TwelveAxes.module.css';

const SLOT_COUNT = TREASURE_LIST.length;

interface TwelveAxesProps {
  /** Pistas completas, na ordem que o jogador montou no inventário. */
  readonly available: readonly TreasureId[];
  readonly onSolved: () => void;
}

export function TwelveAxes({ available, onSolved }: TwelveAxesProps) {
  const [slots, setSlots] = useState<readonly (TreasureId | null)[]>(() =>
    Array.from({ length: SLOT_COUNT }, () => null),
  );
  const [rejectedSlot, setRejectedSlot] = useState<number | null>(null);

  const dnd = useDragAndDrop<TreasureId>();

  const placed = useMemo(() => new Set(slots.filter((slot) => slot !== null)), [slots]);
  const tray = available.filter((treasure) => !placed.has(treasure));
  const isSolved = isSolutionComplete(TREASURE_LIST, slots);

  const attemptPlacement = useCallback((slotIndex: number, treasure: TreasureId) => {
    // O machado só aceita a peça que lhe cabe. Errar devolve, e nada mais.
    if (!isSlotCorrect(TREASURE_LIST, slotIndex, treasure)) {
      setRejectedSlot(slotIndex);
      window.setTimeout(() => {
        setRejectedSlot(null);
      }, 500);

      return;
    }

    setRejectedSlot(null);
    setSlots((current) => current.map((slot, index) => (index === slotIndex ? treasure : slot)));
  }, []);

  return (
    <section className={styles['riddle']} aria-labelledby="riddle-title">
      <header className={styles['header']}>
        <h2 id="riddle-title" className={styles['title']}>
          Ordena a tua jornada
        </h2>
        <p className={styles['subtitle']}>
          Cada coisa no seu lugar, na ordem em que aconteceu. Um homem que não sabe de onde veio
          não acerta onde quer chegar.
        </p>
        <p className={styles['progress']} role="status">
          {placed.size} de {SLOT_COUNT} machados alinhados.
        </p>
      </header>

      <ol className={styles['axes']} aria-label="Os doze machados">
        {slots.map((treasure, index) => {
          const targetProps = dnd.getTargetProps(
            `axe-${String(index)}`,
            (item) => {
              attemptPlacement(index, item);
            },
            `machado ${String(index + 1)}`,
          );

          return (
            <li key={`axe-${String(index)}`}>
              <div
                {...targetProps}
                className={[
                  styles['axe'],
                  treasure !== null ? styles['filled'] : null,
                  rejectedSlot === index ? styles['rejected'] : null,
                  dnd.hoveredTarget === `axe-${String(index)}` ? styles['active'] : null,
                ]
                  .filter(Boolean)
                  .join(' ')}
                tabIndex={0}
                role="button"
                aria-label={
                  treasure === null
                    ? `Machado ${String(index + 1)}, vazio.`
                    : `Machado ${String(index + 1)}: ${TREASURES[treasure].name}.`
                }
              >
                <span className={styles['axeNumber']} aria-hidden="true">
                  {index + 1}
                </span>
                {treasure === null ? (
                  <span className={styles['eyelet']} aria-hidden="true" />
                ) : (
                  <span className={styles['axeTreasure']}>
                    <TreasureIcon symbol={TREASURES[treasure].symbol as TreasureSymbol} size={20} />
                    <span className={styles['axeName']}>{TREASURES[treasure].name}</span>
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className={styles['tray']}>
        <h3 className={styles['trayTitle']}>Tesouros por colocar</h3>
        {tray.length === 0 ? (
          <p className={styles['trayEmpty']}>Nada resta na mão.</p>
        ) : (
          <ul className={styles['trayList']} role="list">
            {tray.map((treasure) => (
              <li key={treasure}>
                <div
                  {...dnd.getSourceProps(treasure, TREASURES[treasure].name)}
                  className={[styles['piece'], dnd.grabbed === treasure ? styles['grabbed'] : null]
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={TREASURES[treasure].name}
                >
                  <TreasureIcon symbol={TREASURES[treasure].symbol as TreasureSymbol} size={20} />
                  <span>{TREASURES[treasure].name}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {dnd.announcement}
      </p>

      {isSolved && (
        <footer className={styles['footer']}>
          <p className={styles['solved']}>Os doze olhais se alinham. A flecha atravessa.</p>
          <Button variant="primary" size="lg" onClick={onSolved}>
            Soltar a flecha
          </Button>
        </footer>
      )}
    </section>
  );
}
