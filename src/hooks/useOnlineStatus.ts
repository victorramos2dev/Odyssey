/**
 * Estado de conexão da aplicação — seção 8 do PDF ("Aplicação: Online/Offline").
 *
 * O jogo funciona offline por desenho: o progresso é local e a arte fica em
 * cache pelo service worker. O aviso existe para tranquilizar, não para
 * bloquear — nada aqui interrompe a partida.
 */

import { useEffect, useState } from 'react';

export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
    };
    const goOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline;
};
