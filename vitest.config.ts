import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

/**
 * Os testes cobrem o núcleo puro do jogo — regras de domínio, sem React nem
 * navegador. É por isso que o ambiente é `node`: nada aqui precisa de DOM.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': resolvePath('./src'),
      '@domain': resolvePath('./src/domain'),
      '@content': resolvePath('./src/content'),
      '@services': resolvePath('./src/services'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
