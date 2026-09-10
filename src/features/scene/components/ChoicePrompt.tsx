/**
 * Escolha narrativa.
 *
 * É uma lista de botões dentro de um grupo rotulado: o leitor de tela anuncia
 * "1 de 3" ao percorrer, e o Tab caminha entre as opções na ordem natural.
 * Nada aqui depende do mouse.
 */

import type { ChoiceOption } from '@domain/types';

import styles from './ChoicePrompt.module.css';

interface ChoicePromptProps {
  readonly prompt: string;
  readonly options: readonly ChoiceOption[];
  readonly onChoose: (option: ChoiceOption) => void;
}

export function ChoicePrompt({ prompt, options, onChoose }: ChoicePromptProps) {
  return (
    <section className={styles['prompt']} aria-labelledby="choice-prompt-title">
      <h2 id="choice-prompt-title" className={styles['title']}>
        {prompt}
      </h2>

      <ul className={styles['options']} role="list">
        {options.map((option, position) => (
          <li key={option.id}>
            <button
              type="button"
              className={styles['option']}
              onClick={() => {
                onChoose(option);
              }}
            >
              <span className={styles['ordinal']} aria-hidden="true">
                {position + 1}
              </span>
              <span className={styles['label']}>{option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
