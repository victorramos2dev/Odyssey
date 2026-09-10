/**
 * Cenário de fundo.
 *
 * A imagem entra como `<img>` e não como `background-image` de propósito:
 * assim ela carrega `alt`, participa da árvore de acessibilidade e ganha
 * `decoding`/`loading` nativos.
 */

import { getBackground } from '@content/backgrounds.ts';
import type { BackgroundId } from '@domain/types';
import { resolveAsset } from '@services/assets/asset-resolver.ts';

import styles from './Backdrop.module.css';

interface BackdropProps {
  readonly background: BackgroundId | null;
  /** Escurece o cenário para dar contraste à caixa de diálogo. */
  readonly dimmed?: boolean;
}

export function Backdrop({ background, dimmed = false }: BackdropProps) {
  const definition = background === null ? null : getBackground(background);
  const source = resolveAsset(definition?.path);

  const classes = [
    styles['backdrop'],
    definition?.treatment ? styles[definition.treatment] : null,
    dimmed ? styles['dimmed'] : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-testid="backdrop">
      {source === null ? (
        <div className={styles['fallback']} aria-hidden="true" />
      ) : (
        <img
          // A chave é o próprio cenário: trocá-lo remonta o `<img>` e o fade
          // de entrada roda de novo, sem estado auxiliar nenhum.
          key={background ?? 'none'}
          className={styles['image']}
          src={source}
          alt={definition?.alt ?? ''}
          decoding="async"
          fetchPriority="high"
        />
      )}
      <div className={styles['vignette']} aria-hidden="true" />
    </div>
  );
}
