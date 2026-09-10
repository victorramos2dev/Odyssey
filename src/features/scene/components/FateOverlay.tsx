/**
 * O Fio Partido.
 *
 * Cloto fia, Láquesis mede, Átropos corta — e então o fio é reatado. A regra
 * que o roteiro chama de fundamental está garantida pelo próprio desenho do
 * estado: nada aqui despacha ação nenhuma, então **as pistas já coletadas
 * nunca se perdem**. O jogador volta ao checkpoint com o inventário intacto.
 */

import { useEffect, useRef } from 'react';

import { Button } from '@components/ui/Button/Button.tsx';

import styles from './FateOverlay.module.css';

interface FateOverlayProps {
  readonly reason: string;
  readonly onRevive: () => void;
  readonly onLeave: () => void;
}

export function FateOverlay({ reason, onRevive, onLeave }: FateOverlayProps) {
  const reviveRef = useRef<HTMLButtonElement>(null);

  // O diálogo interrompe a cena, então o foco tem de vir junto — senão quem
  // navega por teclado continua preso no palco que já não responde.
  useEffect(() => {
    reviveRef.current?.focus();
  }, []);

  return (
    <div
      className={styles['overlay']}
      role="alertdialog"
      aria-labelledby="fate-title"
      aria-modal="true"
    >
      <div className={styles['panel']}>
        <p className={styles['eyebrow']}>As três Moiras</p>
        <h2 id="fate-title" className={styles['title']}>
          O fio partiu-se
        </h2>

        <p className={styles['reason']}>{reason}</p>

        <blockquote className={styles['moirai']}>
          Ainda não. O fio deste homem é longo demais para acabar aqui.
        </blockquote>

        <p className={styles['reassurance']}>
          As pistas que já recolheste permanecem contigo. Só a cena recomeça.
        </p>

        <div className={styles['actions']}>
          <Button ref={reviveRef} variant="primary" size="lg" onClick={onRevive}>
            Reatar o fio
          </Button>
          <Button variant="ghost" onClick={onLeave}>
            Voltar ao mapa
          </Button>
        </div>
      </div>
    </div>
  );
}
