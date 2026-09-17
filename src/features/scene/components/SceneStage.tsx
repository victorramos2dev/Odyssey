/**
 * Palco da visual novel.
 *
 * Monta cenário, sprite e o painel correspondente ao nó atual. O `switch`
 * abaixo é o único ponto do jogo que traduz "tipo de nó" em "interface" — e
 * é exaustivo por construção: acrescentar um `kind` em `SceneNode` sem tratar
 * aqui quebra a compilação, não o jogo em produção.
 */

import { getCharacter } from '@content/characters.ts';
import type { ChapterId, SceneNode } from '@domain/types';
import { useKeyboardAdvance } from '@hooks/useKeyboardAdvance.ts';
import { QuizPanel } from '@features/quiz/components/QuizPanel.tsx';
import type { MouseEvent, ReactNode } from 'react';

import type { SceneRunner } from '../hooks/useSceneRunner.ts';
import { Backdrop } from './Backdrop.tsx';
import { CharacterSprite } from './CharacterSprite.tsx';
import { ChoicePrompt } from './ChoicePrompt.tsx';
import { DialogueBox } from './DialogueBox.tsx';
import { FateOverlay } from './FateOverlay.tsx';
import styles from './SceneStage.module.css';

/** Controles que tratam o próprio clique e não devem, também, avançar a cena. */
const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [role="button"]';

interface SceneStageProps {
  readonly runner: SceneRunner;
  readonly chapterId: ChapterId;
  /** Barra superior com contador de tripulação e navegação. */
  readonly hud?: ReactNode;
  /** Saída para o mapa, também usada quando o jogador desiste após morrer. */
  readonly onLeave: () => void;
}

export function SceneStage({ runner, chapterId, hud, onLeave }: SceneStageProps) {
  // Enquanto um painel espera decisão, o atalho de avançar cala-se: senão a
  // barra de espaço passaria por cima da escolha ou do quiz.
  const isBlocked =
    runner.deathReason !== null ||
    runner.node?.kind === 'choice' ||
    runner.node?.kind === 'quiz';

  useKeyboardAdvance(runner.advance, !isBlocked);

  /**
   * Clique com o botão esquerdo em qualquer parte do palco avança a fala.
   *
   * Cliques que nascem num controle (o botão Continuar, o HUD, uma opção de
   * escolha) são ignorados aqui — senão um único clique no Continuar valeria
   * por dois e pularia uma fala.
   */
  const advanceOnClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isBlocked || event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) return;

    runner.advance();
  };

  return (
    // `role="presentation"`: o clique no palco é um atalho de mouse. O caminho
    // acessível equivalente já existe — o botão Continuar e o teclado.
    <div className={styles['stage']} role="presentation" onClick={advanceOnClick}>
      <Backdrop background={runner.background} dimmed />

      {runner.speaker !== null && (
        <CharacterSprite
          character={runner.speaker.character}
          expression={runner.speaker.expression}
          isBackgrounded={runner.isNarrating}
        />
      )}

      {hud}

      <div className={styles['foreground']}>
        <SceneNodeView runner={runner} chapterId={chapterId} />
      </div>

      {runner.deathReason !== null && (
        <FateOverlay reason={runner.deathReason} onRevive={runner.revive} onLeave={onLeave} />
      )}
    </div>
  );
}

interface SceneNodeViewProps {
  readonly runner: SceneRunner;
  readonly chapterId: ChapterId;
}

/** Tradução nó→interface: um ramo por `kind` é o desenho, não excesso. */
/* eslint-disable-next-line complexity */
function SceneNodeView({ runner, chapterId }: SceneNodeViewProps) {
  // A reação a uma escolha tem prioridade: ela ocupa o palco até ser lida.
  if (runner.choiceResponse !== null) {
    return (
      <DialogueBox tone="narration" lines={[runner.choiceResponse]} onAdvance={runner.advance} />
    );
  }

  const node: SceneNode | null = runner.node;
  if (node === null) return null;

  switch (node.kind) {
    case 'narration':
      return <DialogueBox tone="narration" lines={node.lines} onAdvance={runner.advance} />;

    case 'speech':
      return (
        <DialogueBox
          tone="speech"
          speakerName={getCharacter(node.speaker).displayName}
          lines={node.lines}
          onAdvance={runner.advance}
        />
      );

    case 'chorus':
      return <DialogueBox tone="chorus" lines={node.lines} onAdvance={runner.advance} />;

    case 'choice':
      return (
        <ChoicePrompt prompt={node.prompt} options={node.options} onChoose={runner.choose} />
      );

    case 'quiz':
      return <QuizPanel node={node} chapterId={chapterId} onComplete={runner.resolveQuiz} />;

    case 'death':
      // O `FateOverlay` cobre a tela; o palco só precisa não mostrar mais nada.
      return null;

    case 'tutorial':
    case 'minigame':
      // Levam a outra tela. O palco ainda precisa oferecer a saída, senão a
      // cena fica parada num quadro sem nada em que clicar.
      return (
        <DialogueBox
          tone="narration"
          lines={['A viagem começa aqui.']}
          onAdvance={runner.advance}
        />
      );

    // Nós de passagem nunca ficam em cena — `stepScene` os consome antes.
    case 'background':
    case 'checkpoint':
    case 'treasure':
    case 'clue':
    case 'crew':
      return null;
  }
}
