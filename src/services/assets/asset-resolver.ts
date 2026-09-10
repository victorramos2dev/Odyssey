/**
 * Resolução de arte (padrão Adapter).
 *
 * O conteúdo do roteiro refere-se a cenários e sprites por identificador
 * (`muralhas_troia_amanhecer`), nunca por caminho de arquivo. Este módulo é o
 * único ponto que conhece a árvore de `src/assets/img` — trocar, renomear ou
 * reexportar arte não toca em nenhum capítulo.
 *
 * Os arquivos são registrados em tempo de build por `import.meta.glob`, o que
 * garante hash no nome, cache eterno e falha de build caso um arquivo suma.
 */

const ASSET_MODULES = import.meta.glob<string>('/src/assets/img/**/*.{webp,png,jpg,jpeg,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const ASSET_ROOT = '/src/assets/img/';

/** Caminho relativo a `src/assets/img`, por exemplo `cenarios/troia/muralhas.webp`. */
export type AssetPath = string;

const missingAssets = new Set<string>();

const warnOnce = (path: AssetPath): void => {
  if (!import.meta.env.DEV || missingAssets.has(path)) return;

  missingAssets.add(path);
  console.warn(
    `[odyssey] Arte não encontrada: "${path}". ` +
      'Rode `npm run assets:optimize` para gerar src/assets/img a partir de img/.',
  );
};

/**
 * Devolve a URL final de um arquivo de arte, ou `null` se ele não existir.
 *
 * O `null` é intencional: a interface decide o que mostrar no lugar (um fundo
 * de cor sólida, um sprite vazio), em vez de o jogo quebrar por causa de uma
 * imagem faltando.
 */
export const resolveAsset = (path: AssetPath | undefined): string | null => {
  if (!path) return null;

  const url = ASSET_MODULES[`${ASSET_ROOT}${path}`];

  if (url === undefined) {
    warnOnce(path);

    return null;
  }

  return url;
};

/** Lista tudo que foi registrado. Útil para pré-carregamento e diagnóstico. */
export const listAssetPaths = (): readonly AssetPath[] =>
  Object.keys(ASSET_MODULES).map((key) => key.slice(ASSET_ROOT.length));

/**
 * Pré-carrega imagens para que a troca de cenário não pisque.
 * Falhas são ignoradas de propósito: pré-carregar é otimização, não requisito.
 */
export const preloadAssets = (paths: readonly AssetPath[]): void => {
  for (const path of paths) {
    const url = resolveAsset(path);
    if (url === null) continue;

    const image = new Image();
    image.decoding = 'async';
    image.src = url;
  }
};
