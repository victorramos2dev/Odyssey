/**
 * Tela do Quiz — requisito 4.4 e "Tela do Quiz" da seção 7 do PDF.
 *
 * Traz pergunta, alternativas, feedback da resposta e, na conclusão, a
 * apresentação do tesouro. Errar troca o painel pelo Altar; o quiz volta
 * inteiro quando a oferenda termina.
 */

import { Button } from '@components/ui/Button/Button.tsx';
import { getCharacter } from '@content/characters.ts';
import { AltarRitual } from '@features/altar/components/AltarRitual.tsx';
import { useQuiz } from '@features/quiz/hooks/useQuiz.ts';
import type { ChapterId, QuizNode } from '@domain/types';
import { withEmphasis } from '@lib/emphasis.tsx';

import styles from './QuizPanel.module.css';

interface QuizPanelProps {
  readonly node: QuizNode;
  readonly chapterId: ChapterId;
  readonly onComplete: () => void;
}

export function QuizPanel({ node, chapterId, onComplete }: QuizPanelProps) {
  const quiz = useQuiz({ questions: node.questions, chapterId, onComplete });
  const guardian = getCharacter(node.guardian);

  if (quiz.phase === 'ritual') {
    return <AltarRitual ritual={node.altar} onComplete={quiz.completeRitual} />;
  }

  const isAnswered = quiz.phase === 'correct';

  return (
    <section className={styles['quiz']} aria-labelledby="quiz-question">
      <header className={styles['header']}>
        <p className={styles['guardian']}>Quiz dos Guardiões · {guardian.displayName}</p>
        <p className={styles['counter']}>
          Pergunta {quiz.questionNumber} de {quiz.questionCount}
          {quiz.attemptCount > 0 && (
            <span className={styles['attempt']}>
              {' '}
              · {quiz.attemptCount}ª retomada após a oferenda
            </span>
          )}
        </p>
      </header>

      <h2 id="quiz-question" className={styles['prompt']}>
        {withEmphasis(quiz.question.prompt)}
      </h2>

      <ul className={styles['answers']} role="list">
        {quiz.question.answers.map((answer) => {
          const isSelected = quiz.selectedAnswerId === answer.id;
          const isCorrect = answer.id === quiz.question.correctAnswerId;

          const state = !isAnswered ? null : isCorrect ? 'correct' : 'muted';

          return (
            <li key={answer.id}>
              <button
                type="button"
                className={[styles['answer'], state ? styles[state] : null]
                  .filter(Boolean)
                  .join(' ')}
                disabled={isAnswered}
                aria-pressed={isSelected}
                onClick={() => {
                  quiz.answer(answer.id);
                }}
              >
                {answer.label}
              </button>
            </li>
          );
        })}
      </ul>

      {isAnswered && (
        <div className={styles['feedback']} role="status">
          <p className={styles['verdict']}>Resposta aceita.</p>
          <p className={styles['explanation']}>{quiz.question.explanation}</p>
        </div>
      )}

      <footer className={styles['footer']}>
        {isAnswered && (
          <Button variant="primary" size="lg" onClick={quiz.proceed}>
            {quiz.questionNumber === quiz.questionCount ? 'Receber a pista' : 'Próxima pergunta'}
          </Button>
        )}
      </footer>
    </section>
  );
}
