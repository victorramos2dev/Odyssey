/**
 * Otimização da arte.
 *
 * A arte-fonte em `img/` pesa cerca de 300 MB em JPG de resolução plena. Um
 * jogo que precisa funcionar offline não pode carregar isso: o service worker
 * teria de guardar 300 MB no navegador, e a primeira cena levaria minutos a
 * abrir.
 *
 * Este script lê `img/`, converte tudo para WebP em resolução de tela e grava
 * em `src/assets/img/` com nomes normalizados (minúsculas, sem acentos, sem
 * espaços) — que é exatamente a forma que `asset-resolver.ts` espera.
 *
 * A arte-fonte não é tocada. Rodar de novo é seguro: arquivos já convertidos e
 * mais recentes que a origem são pulados.
 *
 *   npm run assets:optimize
 *   npm run assets:optimize -- --force
 */

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE_DIR = join(ROOT, 'img');
const OUTPUT_DIR = join(ROOT, 'src', 'assets', 'img');

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const FORCE = process.argv.includes('--force');

/**
 * Perfis por tipo de arte. Cenários preenchem a tela inteira; sprites são
 * recortes verticais e podem ser mais leves na largura.
 */
const PROFILES = {
  cenarios: { width: 1920, height: 1080, quality: 76, fit: 'cover' },
  menus: { width: 1920, height: 1080, quality: 76, fit: 'cover' },
  personagens: { width: 1100, height: 1500, quality: 82, fit: 'inside' },
  default: { width: 1600, height: 1600, quality: 80, fit: 'inside' },
};

/**
 * `praiaHades.jpg` → `praia-hades`, `Athena_Intensa` → `athena-intensa`,
 * `Polyphemus - Fase 2` → `polyphemus-fase-2`, `Telêmaco` → `telemaco`.
 */
const slugify = (name) =>
  name
    .normalize('NFD')
    // Remove os sinais diacríticos separados pela normalização (ê → e + ̂).
    .replace(/[̀-ͯ]/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const listFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);

      return entry.isDirectory() ? listFiles(path) : [path];
    }),
  );

  return nested.flat();
};

/** Caminho de saída com todos os segmentos normalizados. */
const toOutputPath = (sourcePath) => {
  const segments = relative(SOURCE_DIR, sourcePath).split(sep);
  const fileName = segments.pop();
  const baseName = fileName.slice(0, -extname(fileName).length);

  return join(OUTPUT_DIR, ...segments.map(slugify), `${slugify(baseName)}.webp`);
};

const pickProfile = (sourcePath) => {
  const [topLevel] = relative(SOURCE_DIR, sourcePath).split(sep);

  return PROFILES[topLevel] ?? PROFILES.default;
};

const isUpToDate = async (sourcePath, outputPath) => {
  if (FORCE) return false;

  try {
    const [source, output] = await Promise.all([stat(sourcePath), stat(outputPath)]);

    return output.mtimeMs >= source.mtimeMs;
  } catch {
    return false;
  }
};

const convert = async (sourcePath) => {
  const outputPath = toOutputPath(sourcePath);

  if (await isUpToDate(sourcePath, outputPath)) {
    return { skipped: true, sourceBytes: 0, outputBytes: 0 };
  }

  const profile = pickProfile(sourcePath);
  await mkdir(dirname(outputPath), { recursive: true });

  const buffer = await sharp(sourcePath)
    .rotate()
    .resize({
      width: profile.width,
      height: profile.height,
      fit: profile.fit,
      withoutEnlargement: true,
    })
    .webp({ quality: profile.quality, effort: 5 })
    .toBuffer();

  await writeFile(outputPath, buffer);

  const { size: sourceBytes } = await stat(sourcePath);

  return { skipped: false, sourceBytes, outputBytes: buffer.byteLength };
};

const toMegabytes = (bytes) => (bytes / 1024 / 1024).toFixed(1);

const main = async () => {
  const files = (await listFiles(SOURCE_DIR)).filter((path) =>
    SUPPORTED.has(extname(path).toLowerCase()),
  );

  console.log(`Otimizando ${files.length} arquivos de img/ para src/assets/img/...`);

  let sourceTotal = 0;
  let outputTotal = 0;
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const result = await convert(file);

    if (result.skipped) {
      skipped += 1;
      continue;
    }

    converted += 1;
    sourceTotal += result.sourceBytes;
    outputTotal += result.outputBytes;
  }

  console.log(`Convertidos: ${converted} · Já atualizados: ${skipped}`);

  if (converted > 0) {
    const saved = 100 - (outputTotal / sourceTotal) * 100;
    console.log(
      `Origem: ${toMegabytes(sourceTotal)} MB → Saída: ${toMegabytes(outputTotal)} MB ` +
        `(redução de ${saved.toFixed(1)}%)`,
    );
  }
};

await main();
