/**
 * Caixa de diálogo.
 *
 * Acessibilidade: o bloco de texto é uma região `aria-live` — quando o nó
 * muda, o leitor de tela anuncia a fala nova sozinho, sem que o foco precise
 * saltar. O avanço tem botão próprio, além do atalho de teclado, porque
 * "clique em qualquer lugar" não é operável por teclado.
 */

import type { ReactNode } from 'react';

import { Button } from '@components/ui/Button/Button.tsx';

import styles from './DialogueBox.module.css';

export type DialogueTone = 'speech' | 'narration' | 'chorus';

interface DialogueBoxProps {
  /** Ausente na narração e no coro. */
  readonly speakerName?: string;
  readonly lines: readonly string[];
  readonly tone?: DialogueTone;
  readonly onAdvance?: () => void;
  /** Conteúdo no lugar do botão de avançar (escolhas, quiz). */
  readonly footer?: ReactNode;
}

export function DialogueBox({
  speakerName,
  lines,
  tone = 'speech',
  onAdvance,
  footer,
}: DialogueBoxProps) {
  return (
    <section
      className={[styles['box'], styles[tone]].filter(Boolean).join(' ')}
      aria-label={speakerName === undefined ? 'Narração' : `Fala de ${speakerName}`}
    >
      {speakerName !== undefined && <p className={styles['speaker']}>{speakerName}</p>}

      <div className={styles['lines']} aria-live="polite" aria-atomic="true">
        {lines.map((line, position) => (
          <p key={`${String(position)}-${line.slice(0, 24)}`} className={styles['line']}>
            {line}
          </p>
        ))}
      </div>

      <footer className={styles['footer']}>
        {footer ?? (
          <Button variant="ghost" size="sm" onClick={onAdvance}>
            Continuar
            <span className={styles['hint']} aria-hidden="true">
              Espaço
            </span>
          </Button>
        )}
      </footer>
    </section>
  );
}
