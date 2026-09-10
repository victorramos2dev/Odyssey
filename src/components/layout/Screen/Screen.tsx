/**
 * Moldura comum das telas fora da cena.
 *
 * Mapa, inventário, tutorial e conclusão partilham a mesma estrutura: um
 * cenário ao fundo, um cabeçalho e uma área de conteúdo. Centralizar isso aqui
 * é o que faz as telas parecerem o mesmo jogo.
 *
 * O `<h1>` é único por tela e a área de conteúdo é um `<main>` — a ordem de
 * leitura para tecnologias assistivas sai correta sem esforço extra.
 */

import type { ReactNode } from 'react';

import { Backdrop } from '@features/scene/components/Backdrop.tsx';
import type { BackgroundId } from '@domain/types';

import styles from './Screen.module.css';

interface ScreenProps {
  readonly title: string;
  readonly eyebrow?: string;
  readonly lead?: string;
  readonly background?: BackgroundId;
  /** Botões alinhados ao cabeçalho. */
  readonly actions?: ReactNode;
  /** Ocupa a largura toda, sem a coluna de leitura. Usado pelo mapa. */
  readonly isWide?: boolean;
  readonly children: ReactNode;
}

export function Screen({
  title,
  eyebrow,
  lead,
  background,
  actions,
  isWide = false,
  children,
}: ScreenProps) {
  return (
    <div className={styles['screen']}>
      <Backdrop background={background ?? null} dimmed />

      <div
        className={[styles['content'], isWide ? styles['wide'] : null].filter(Boolean).join(' ')}
      >
        <header className={styles['header']}>
          <div className={styles['heading']}>
            {eyebrow !== undefined && <p className={styles['eyebrow']}>{eyebrow}</p>}
            <h1 className={styles['title']}>{title}</h1>
            {lead !== undefined && <p className={styles['lead']}>{lead}</p>}
          </div>

          {actions !== undefined && <div className={styles['actions']}>{actions}</div>}
        </header>

        <main className={styles['main']}>{children}</main>
      </div>
    </div>
  );
}
