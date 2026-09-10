/**
 * Botão do jogo.
 *
 * Sempre um `<button>` real: recebe foco, responde a Enter e Espaço e é
 * anunciado corretamente por leitores de tela sem que precisemos remendar
 * nada com ARIA.
 */

import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly fullWidth?: boolean;
  /** No React 19 a ref é uma prop comum — não é preciso `forwardRef`. */
  readonly ref?: Ref<HTMLButtonElement>;
  readonly children: ReactNode;
}

export function Button({
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles['button'],
    styles[variant],
    styles[size],
    fullWidth ? styles['fullWidth'] : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
