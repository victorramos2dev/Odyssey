/**
 * Barra de estado da cena.
 *
 * Mostra onde o jogador está, quantos homens ainda vivem e as saídas para o
 * mapa e o inventário. O contador de tripulação é persistido e nunca sobe —
 * ver Apêndice C do roteiro.
 */

import { Button } from '@components/ui/Button/Button.tsx';

import styles from './GameHud.module.css';

interface GameHudProps {
  readonly chapterNumeral: string;
  readonly chapterTitle: string;
  readonly crewCount: number;
  readonly onOpenMap: () => void;
  readonly onOpenInventory: () => void;
}

export function GameHud({
  chapterNumeral,
  chapterTitle,
  crewCount,
  onOpenMap,
  onOpenInventory,
}: GameHudProps) {
  return (
    <header className={styles['hud']}>
      <div className={styles['location']}>
        <span className={styles['numeral']}>Capítulo {chapterNumeral}</span>
        <h1 className={styles['title']}>{chapterTitle}</h1>
      </div>

      <div className={styles['crew']}>
        <span className={styles['crewLabel']}>Tripulação</span>
        <output className={styles['crewCount']} aria-label={`${String(crewCount)} homens vivos`}>
          {crewCount}
        </output>
      </div>

      <nav className={styles['actions']} aria-label="Navegação do jogo">
        <Button variant="ghost" size="sm" onClick={onOpenInventory}>
          Inventário
        </Button>
        <Button variant="ghost" size="sm" onClick={onOpenMap}>
          Mapa
        </Button>
      </nav>
    </header>
  );
}
