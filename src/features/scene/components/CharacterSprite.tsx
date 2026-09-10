/**
 * Sprite do personagem em cena.
 *
 * Decorativo por definição: quem fala e o que diz já está na caixa de diálogo,
 * então o sprite é `aria-hidden` para não duplicar a informação em leitores de
 * tela.
 */

import { getCharacter } from '@content/characters.ts';
import type { CharacterId, Expression } from '@domain/types';
import { resolveAsset } from '@services/assets/asset-resolver.ts';

import styles from './CharacterSprite.module.css';

interface CharacterSpriteProps {
  readonly character: CharacterId;
  readonly expression: Expression;
  /** Recua o sprite quando quem fala é a narração. */
  readonly isBackgrounded?: boolean;
}

export function CharacterSprite({
  character,
  expression,
  isBackgrounded = false,
}: CharacterSpriteProps) {
  const definition = getCharacter(character);
  const source = resolveAsset(definition.sprites[expression]);

  if (source === null) return null;

  const classes = [
    styles['sprite'],
    styles[definition.defaultPosition],
    isBackgrounded ? styles['backgrounded'] : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} aria-hidden="true">
      <img
        // A chave força a reanimação quando a expressão muda.
        key={`${character}-${expression}`}
        className={styles['image']}
        src={source}
        alt=""
        decoding="async"
      />
    </div>
  );
}
