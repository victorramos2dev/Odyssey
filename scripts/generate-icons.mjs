/**
 * Ícones do PWA.
 *
 * Renderiza `public/favicon.svg` nos tamanhos que o manifesto declara. O
 * ícone *maskable* ganha margem interna própria: o Android recorta o ícone em
 * formatos variados e come as bordas de quem não deixa folga.
 *
 *   npm run assets:icons
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE = join(ROOT, 'public', 'favicon.svg');
const OUTPUT_DIR = join(ROOT, 'public', 'icons');

/** Fundo do manifesto: o ícone precisa ser opaco nas telas de instalação. */
const BACKGROUND = { r: 11, g: 27, b: 43, alpha: 1 };

const TARGETS = [
  { name: 'icon-192.png', size: 192, padding: 0.12 },
  { name: 'icon-512.png', size: 512, padding: 0.12 },
  // Zona segura do maskable: o desenho fica no círculo central de 80%.
  { name: 'icon-512-maskable.png', size: 512, padding: 0.22 },
];

const render = async ({ name, size, padding }) => {
  const inner = Math.round(size * (1 - padding * 2));
  const margin = Math.round((size - inner) / 2);

  const glyph = await sharp(SOURCE, { density: 512 })
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const buffer = await sharp({
    create: { width: size, height: size, channels: 4, background: BACKGROUND },
  })
    .composite([{ input: glyph, top: margin, left: margin }])
    .png()
    .toBuffer();

  await writeFile(join(OUTPUT_DIR, name), buffer);

  return name;
};

await mkdir(OUTPUT_DIR, { recursive: true });

for (const target of TARGETS) {
  console.log(`Gerado public/icons/${await render(target)}`);
}
