/**
 * Máquina do Quiz dos Guardiões — requisito 4.4 do PDF.
 *
 * Regra que o roteiro sublinha: o quiz **nunca mata**. Errar não interrompe a
 * aventura, leva ao Altar; concluída a oferenda, o Guardião pergunta de novo
 * desde a primeira questão.
 */

import { useCallback, useState } from 'react';

import type { ChapterId, QuizQuestion } from '@domain/types';
import { useGame } from '@hooks/useGame.ts';

export type QuizPhase =
  /** Aguardando a resposta da questão atual. */
  | 'answering'
  /** Resposta correta: exibindo a explicação. */
  | 'correct'
  /** Resposta errada: o Guardião se ofende e exige a oferenda. */
  | 'ritual';

export interface QuizMachine {
  readonly question: QuizQuestion;
  readonly questionNumber: number;
  readonly questionCount: number;
  readonly phase: QuizPhase;
  readonly selectedAnswerId: string | null;
  /** Quantas vezes o Guardião já teve de ser aplacado. */
  readonly attemptCount: number;
  readonly answer: (answerId: string) => void;
  /** Avança para a próxima questão, ou conclui o quiz. */
  readonly proceed: () => void;
  /** Chamado pelo Altar quando a oferenda termina. */
  readonly completeRitual: () => void;
}

interface UseQuizOptions {
  readonly questions: readonly QuizQuestion[];
  readonly chapterId: ChapterId;
  /** Chamado quando as três questões são vencidas. */
  readonly onComplete: () => void;
}

export const useQuiz = ({ questions, chapterId, onComplete }: UseQuizOptions): QuizMachine => {
  const { dispatch } = useGame();

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<QuizPhase>('answering');
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const question = questions[index];

  if (question === undefined) {
    throw new Error(`useQuiz: o quiz de "${chapterId}" está sem questões.`);
  }

  const answer = useCallback(
    (answerId: string) => {
      if (phase !== 'answering') return;

      setSelectedAnswerId(answerId);

      if (answerId === question.correctAnswerId) {
        setPhase('correct');

        return;
      }

      dispatch({ type: 'quiz/answer', chapterId, status: 'answeredIncorrectly' });
      setPhase('ritual');
    },
    [chapterId, dispatch, phase, question.correctAnswerId],
  );

  const proceed = useCallback(() => {
    const isLastQuestion = index === questions.length - 1;

    if (isLastQuestion) {
      dispatch({ type: 'quiz/answer', chapterId, status: 'answeredCorrectly' });
      onComplete();

      return;
    }

    setIndex(index + 1);
    setSelectedAnswerId(null);
    setPhase('answering');
  }, [chapterId, dispatch, index, onComplete, questions.length]);

  const completeRitual = useCallback(() => {
    // O Guardião foi aplacado: a arguição recomeça do princípio.
    setAttemptCount((current) => current + 1);
    setIndex(0);
    setSelectedAnswerId(null);
    setPhase('answering');
  }, []);

  return {
    question,
    questionNumber: index + 1,
    questionCount: questions.length,
    phase,
    selectedAnswerId,
    attemptCount,
    answer,
    proceed,
    completeRitual,
  };
};
