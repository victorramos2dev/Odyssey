/**
 * Aviso de conexão.
 *
 * Aparece só quando o navegador perde a rede, e diz a única coisa que importa
 * saber nesse momento: que a aventura continua igual.
 */

import { useOnlineStatus } from '@hooks/useOnlineStatus.ts';

import styles from './ConnectionBanner.module.css';

export function ConnectionBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <p className={styles['banner']} role="status" aria-live="polite">
      Sem conexão — a aventura continua. O progresso está gravado neste navegador.
    </p>
  );
}
