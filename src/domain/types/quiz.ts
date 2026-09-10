/** Quiz dos Guardiões — três perguntas por capítulo. Errar nunca mata. */

export interface QuizAnswer {
  readonly id: string;
  readonly label: string;
}

export interface QuizQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly answers: readonly QuizAnswer[];
  /** Deve corresponder ao `id` de uma das `answers`. Ver `validateQuizQuestion`. */
  readonly correctAnswerId: string;
  /** Texto exibido após a resposta correta. Roteiro: bloco *Explicação*. */
  readonly explanation: string;
}

/** Estado de um quiz, conforme seção 8 do PDF. */
export type QuizStatus = 'unanswered' | 'answeredCorrectly' | 'answeredIncorrectly';
