/** Ponto de entrada. Ordem dos estilos importa: fichas antes do global. */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@app/App.tsx';

import '@styles/tokens.css';
import '@styles/global.css';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Elemento #root não encontrado em index.html.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
