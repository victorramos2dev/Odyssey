/**
 * O Altar — ritual de retentativa após erro no quiz.
 *
 * Componente único, reutilizado nos dez capítulos: muda a divindade e as três
 * oferendas, não a mecânica. Cobre a exigência do requisito 4.4 de que a nova
 * tentativa venha "depois de algum tipo de ação".
 *
 * As oferendas têm de ser depositadas na ordem declarada. Uma peça fora de
 * hora é recusada com explicação, sem punição — errar aqui nunca custa nada.
 */

import { useCallback, useState } from 'react';

import { Button } from '@components/ui/Button/Button.tsx';
import { getCharacter } from '@content/characters.ts';
import type { AltarRitual as AltarRitualData } from '@domain/types';
import { useDragAndDrop } from '@hooks/useDragAndDrop.ts';

import styles from './AltarRitual.module.css';

interface AltarRitualProps {
  readonly ritual: AltarRitualData;
  /** Chamado quando as três oferendas estão no altar. */
  readonly onComplete: () => void;
}

export function AltarRitual({ ritual, onComplete }: AltarRitualProps) {
  const [placedCount, setPlacedCount] = useState(0);
  const [rejection, setRejection] = useState<string | null>(null);

  const dnd = useDragAndDrop<number>();
  const deity = getCharacter(ritual.deity);
  const isComplete = placedCount === ritual.offerings.length;

  const receiveOffering = useCallback(
    (offeringIndex: number) => {
      if (offeringIndex !== placedCount) {
        setRejection(
          `A ordem importa. ${deity.displayName} espera ${ritual.offerings[placedCount] ?? ''} agora.`,
        );

        return;
      }

      setRejection(null);
      setPlacedCount(placedCount + 1);
    },
    [deity.displayName, placedCount, ritual.offerings],
  );

  const remaining = ritual.offerings
    .map((label, position) => ({ label, position }))
    .filter(({ position }) => position >= placedCount);

  return (
    <section className={styles['altar']} aria-labelledby="altar-title">
      <header className={styles['header']}>
        <p className={styles['eyebrow']}>Altar de {deity.displayName}</p>
        <h2 id="altar-title" className={styles['title']}>
          Faça a oferenda
        </h2>
        {ritual.reproach.map((line) => (
          <p key={line.slice(0, 24)} className={styles['reproach']}>
            {line}
          </p>
        ))}
      </header>

      <div className={styles['board']}>
        <ol className={styles['offerings']} aria-label="Oferendas disponíveis">
          {remaining.map(({ label, position }) => (
            <li key={label}>
              <div
                className={[styles['offering'], dnd.grabbed === position ? styles['grabbed'] : null]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={`${label}. Oferenda ${String(position + 1)} de ${String(ritual.offerings.length)}.`}
                {...dnd.getSourceProps(position, label)}
              >
                {label}
              </div>
            </li>
          ))}
          {remaining.length === 0 && <li className={styles['emptyNote']}>Tudo entregue.</li>}
        </ol>

        <div
          className={[styles['plinth'], dnd.hoveredTarget === 'altar' ? styles['active'] : null]
            .filter(Boolean)
            .join(' ')}
          tabIndex={0}
          role="button"
          aria-label={`Altar de ${deity.displayName}. ${String(placedCount)} de ${String(ritual.offerings.length)} oferendas depositadas.`}
          {...dnd.getTargetProps('altar', receiveOffering, 'o altar')}
        >
          <span className={styles['flame']} aria-hidden="true" data-lit={placedCount > 0} />
          <ol className={styles['placed']} aria-hidden="true">
            {ritual.offerings.slice(0, placedCount).map((label) => (
              <li key={label} className={styles['placedItem']}>
                {label}
              </li>
            ))}
          </ol>
          <p className={styles['plinthHint']}>
            {isComplete ? 'A oferenda está completa.' : 'Deposite aqui, na ordem.'}
          </p>
        </div>
      </div>

      <p className={styles['keyboardHint']}>
        Com o teclado: Espaço para pegar a oferenda, Tab até o altar, Espaço para depositar.
      </p>

      {rejection !== null && (
        <p className={styles['rejection']} role="alert">
          {rejection}
        </p>
      )}

      {/* Região viva: narra cada movimento a quem usa leitor de tela. */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {dnd.announcement}
      </p>

      <footer className={styles['footer']}>
        <Button variant="primary" size="lg" disabled={!isComplete} onClick={onComplete}>
          {isComplete ? 'Responder novamente' : 'Complete a oferenda'}
        </Button>
      </footer>
    </section>
  );
}
