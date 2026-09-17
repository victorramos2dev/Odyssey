/**
 * Executor de cena.
 *
 * Segura a posição atual dentro do capítulo, aplica os efeitos dos nós de
 * passagem no estado do jogo e expõe as três ações que o jogador tem numa
 * cena: avançar, escolher e sobreviver ao quiz.
 *
 * A lógica de travessia mora em `@domain/rules/scene-runner` e é pura. Este
 * hook é só a ponte entre ela, o React e o despacho de ações.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  findLastNodeOfKind,
  findNodeIndex,
  resolveEntryIndex,
  resolveResumeIndex,
  stepScene,
} from '@domain/rules/scene-runner.ts';
import type { SceneEffect } from '@domain/rules/scene-runner.ts';
import type {
  BackgroundId,
  ChoiceConsequence,
  ChoiceOption,
  Expression,
  NodeId,
  SceneNode,
} from '@domain/types';
import type { CharacterId } from '@domain/types';
import { useGame } from '@hooks/useGame.ts';

export interface StageSpeaker {
  readonly character: CharacterId;
  readonly expression: Expression;
}

export interface SceneRunner {
  /** Nó em exibição. `null` quando o capítulo terminou. */
  readonly node: SceneNode | null;
  readonly background: BackgroundId | null;
  /** Último personagem que falou; permanece em cena durante a narração. */
  readonly speaker: StageSpeaker | null;
  /** `true` enquanto a narração fala e o sprite fica em segundo plano. */
  readonly isNarrating: boolean;
  /** Reação exibida após uma escolha, antes da consequência. */
  readonly choiceResponse: string | null;
  /** Motivo do Fio Partido, ou `null` se Odisseu está vivo. */
  readonly deathReason: string | null;
  readonly isFinished: boolean;

  readonly advance: () => void;
  readonly choose: (option: ChoiceOption) => void;
  /** Chamado pelo quiz quando o Guardião aceita as três respostas. */
  readonly resolveQuiz: () => void;
  /** Chamado pelo minijogo do enigma quando a solução é aceita. */
  readonly resolveMinigame: () => void;
  /** Reata o fio e recomeça no checkpoint, com o inventário intacto. */
  readonly revive: () => void;
}

interface UseSceneRunnerOptions {
  readonly nodes: readonly SceneNode[];
  /** Nó do checkpoint: para onde o Fio Partido devolve. Ausente é o início. */
  readonly startNodeId?: NodeId;
  /** Posição gravada numa visita anterior. Tem precedência sobre o checkpoint. */
  readonly resumeIndex?: number;
  /** Avisado a cada nó em que a cena para — é o que alimenta o marcador. */
  readonly onPositionChange?: (nodeIndex: number) => void;
  /** Chamado quando o último nó é ultrapassado. */
  readonly onFinish: () => void;
  /** Chamado ao encontrar um nó `tutorial`. */
  readonly onTutorial?: () => void;
}

/** Último cenário declarado num lote de efeitos. */
const lastBackgroundOf = (effects: readonly SceneEffect[]): BackgroundId | null =>
  effects.reduce<BackgroundId | null>(
    (current, effect) => (effect.kind === 'background' ? effect.background : current),
    null,
  );

/** Quem entra em cena por causa deste nó. `null` mantém quem já estava. */
const speakerOf = (node: SceneNode | undefined): StageSpeaker | null => {
  if (node?.kind === 'speech') {
    return { character: node.speaker, expression: node.expression };
  }

  if (node?.kind === 'chorus') {
    return { character: 'tripulacao', expression: 'neutral' };
  }

  return null;
};

/**
 * Longo por natureza: é uma máquina de estados, e partir os seus pedaços em
 * hooks separados só espalharia o mesmo estado por mais arquivos.
 */
/* eslint-disable-next-line max-lines-per-function */
export const useSceneRunner = ({
  nodes,
  startNodeId,
  resumeIndex,
  onPositionChange,
  onFinish,
  onTutorial,
}: UseSceneRunnerOptions): SceneRunner => {
  const { dispatch } = useGame();

  /**
   * A entrada da cena é calculada uma única vez, na montagem, e de forma
   * síncrona: o primeiro quadro já sai com o cenário e o sprite certos.
   *
   * "Uma única vez" importa. Esta própria cena grava o marcador a cada passo,
   * o que muda `resumeIndex` lá em cima — se a entrada dependesse dele, a cena
   * recomeçaria a cada fala.
   */
  const [entry] = useState(() =>
    stepScene(nodes, resolveResumeIndex(nodes, resumeIndex, startNodeId)),
  );

  const [index, setIndex] = useState(() => entry.index ?? nodes.length);

  // Ao retomar no meio da cena, o palco é remontado a partir do que já passou:
  // o último cenário trocado e o último personagem que falou.
  const [background, setBackground] = useState<BackgroundId | null>(
    () =>
      findLastNodeOfKind(nodes, (entry.index ?? nodes.length) - 1, ['background'])?.background ??
      null,
  );
  const [speaker, setSpeaker] = useState<StageSpeaker | null>(() =>
    entry.index === null
      ? null
      : speakerOf(findLastNodeOfKind(nodes, entry.index, ['speech', 'chorus']) ?? undefined),
  );
  const [choiceResponse, setChoiceResponse] = useState<string | null>(null);
  const [pendingConsequence, setPendingConsequence] = useState<ChoiceConsequence | null>(null);
  const [deathReason, setDeathReason] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(() => entry.index === null);

  // `onFinish` pode ser recriado a cada render da tela; guardá-lo numa ref
  // evita reiniciar a cena por causa de uma identidade de função nova.
  const onFinishRef = useRef(onFinish);
  const onPositionChangeRef = useRef(onPositionChange);
  useEffect(() => {
    onFinishRef.current = onFinish;
    onPositionChangeRef.current = onPositionChange;
  }, [onFinish, onPositionChange]);

  /** Leva os efeitos ao estado do jogo. Só despacha — não mexe no palco. */
  const dispatchEffects = useCallback(
    (effects: readonly SceneEffect[]) => {
      for (const effect of effects) {
        switch (effect.kind) {
          case 'checkpoint':
            dispatch({
              type: 'checkpoint/set',
              checkpoint:
                effect.nodeId === undefined
                  ? { chapterId: effect.chapter }
                  : { chapterId: effect.chapter, nodeId: effect.nodeId },
            });
            break;
          case 'treasure':
            dispatch({ type: 'treasure/collect', treasure: effect.treasure });
            break;
          case 'clue':
            dispatch({ type: 'clue/complete', treasure: effect.treasure });
            break;
          case 'crew':
            dispatch({ type: 'crew/set', count: effect.count });
            break;
          // O cenário é estado do palco, tratado por `lastBackgroundOf`.
          case 'background':
            break;
        }
      }
    },
    [dispatch],
  );

  // Os efeitos da entrada só chegam ao estado do jogo depois da montagem.
  useEffect(() => {
    dispatchEffects(entry.effects);
    if (entry.index !== null) onPositionChangeRef.current?.(entry.index);
  }, [dispatchEffects, entry]);

  /** Caminha a partir de `from` e assenta a cena no primeiro nó interativo. */
  const goTo = useCallback(
    (from: number) => {
      const step = stepScene(nodes, from);
      dispatchEffects(step.effects);

      const nextBackground = lastBackgroundOf(step.effects);
      if (nextBackground !== null) setBackground(nextBackground);

      if (step.index === null) {
        setIsFinished(true);
        onFinishRef.current();

        return;
      }

      const nextSpeaker = speakerOf(nodes[step.index]);
      if (nextSpeaker !== null) setSpeaker(nextSpeaker);

      setIndex(step.index);
      onPositionChangeRef.current?.(step.index);
    },
    [dispatchEffects, nodes],
  );

  /**
   * O fio parte-se.
   *
   * O marcador volta ao checkpoint no mesmo instante, e não só ao reatar: se o
   * jogador fugir para o mapa a partir do diálogo das Moiras, reentrar no
   * capítulo não pode devolvê-lo à escolha que o matou — isso tornaria a morte
   * uma segunda tentativa grátis em vez de um recomeço.
   */
  const breakThread = useCallback(
    (reason: string) => {
      setDeathReason(reason);
      onPositionChangeRef.current?.(resolveEntryIndex(nodes, startNodeId));
    },
    [nodes, startNodeId],
  );

  const applyConsequence = useCallback(
    (consequence: ChoiceConsequence, fromIndex: number) => {
      switch (consequence.kind) {
        case 'continue':
          goTo(fromIndex + 1);
          break;
        case 'goto':
          goTo(findNodeIndex(nodes, consequence.target));
          break;
        case 'route':
          dispatch({ type: 'route/select', route: consequence.route });
          goTo(findNodeIndex(nodes, consequence.target));
          break;
        case 'death':
          breakThread(consequence.reason);
          break;
      }
    },
    [breakThread, dispatch, goTo, nodes],
  );

  const advance = useCallback(() => {
    if (deathReason !== null || isFinished) return;

    // Uma reação de escolha está no ar: avançar aplica a consequência dela.
    if (pendingConsequence !== null) {
      const consequence = pendingConsequence;
      setChoiceResponse(null);
      setPendingConsequence(null);
      applyConsequence(consequence, index);

      return;
    }

    const node = nodes[index];

    if (node?.kind === 'death') {
      breakThread(node.reason);

      return;
    }

    if (node?.kind === 'tutorial') {
      onTutorial?.();

      return;
    }

    goTo(index + 1);
  }, [
    applyConsequence,
    breakThread,
    deathReason,
    goTo,
    index,
    isFinished,
    nodes,
    onTutorial,
    pendingConsequence,
  ]);

  const choose = useCallback(
    (option: ChoiceOption) => {
      // Sem reação escrita, a consequência é imediata.
      if (option.response === undefined) {
        applyConsequence(option.consequence, index);

        return;
      }

      setChoiceResponse(option.response);
      setPendingConsequence(option.consequence);
    },
    [applyConsequence, index],
  );

  const resolveQuiz = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  const revive = useCallback(() => {
    setDeathReason(null);
    setChoiceResponse(null);
    setPendingConsequence(null);
    setSpeaker(null);
    goTo(resolveEntryIndex(nodes, startNodeId));
  }, [goTo, nodes, startNodeId]);

  const node = nodes[index] ?? null;

  return {
    node: isFinished ? null : node,
    background,
    speaker,
    isNarrating: node?.kind === 'narration',
    choiceResponse,
    deathReason,
    isFinished,
    advance,
    choose,
    resolveQuiz,
    resolveMinigame: resolveQuiz,
    revive,
  };
};
