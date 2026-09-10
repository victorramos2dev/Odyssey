/**
 * Tela de Conclusão — seção 7 do PDF.
 * Mensagem de sucesso, resumo da jornada e opção de reiniciar a aventura.
 */

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes.ts';
import { Button } from '@components/ui/Button/Button.tsx';
import { Screen } from '@components/layout/Screen/Screen.tsx';
import { TREASURE_LIST } from '@content/treasures.ts';
import { INITIAL_CREW_COUNT } from '@domain/rules/progression.ts';
import { useGame } from '@hooks/useGame.ts';
import { useProgression } from '@hooks/useProgression.ts';

import styles from './EndingScreen.module.css';

export function EndingScreen() {
  const navigate = useNavigate();
  const { state, resetGame } = useGame();
  const { completedCount, totalCount, completeClueCount } = useProgression();

  const restart = () => {
    resetGame();
    void navigate(ROUTES.home);
  };

  const lost = INITIAL_CREW_COUNT - state.crewCount;

  return (
    <Screen
      eyebrow="Epílogo"
      title="O leito de oliveira"
      lead="Vinte anos. Dez de guerra, dez de mar. E a casa continuava de pé."
      background="menu_fim"
      actions={
        <Button variant="primary" size="lg" onClick={restart}>
          Recomeçar a aventura
        </Button>
      }
    >
      <div className={styles['summary']}>
        <dl className={styles['stats']}>
          <div className={styles['stat']}>
            <dt>Pontos concluídos</dt>
            <dd>
              {completedCount} de {totalCount}
            </dd>
          </div>
          <div className={styles['stat']}>
            <dt>Pistas completas</dt>
            <dd>
              {completeClueCount} de {TREASURE_LIST.length}
            </dd>
          </div>
          <div className={styles['stat']}>
            <dt>Homens perdidos</dt>
            <dd>
              {lost} de {INITIAL_CREW_COUNT}
            </dd>
          </div>
          <div className={styles['stat']}>
            <dt>Rota do estreito</dt>
            <dd>{state.route === 'caribdis' ? 'Caríbdis' : 'Scylla'}</dd>
          </div>
        </dl>

        <blockquote className={styles['closing']}>
          Ele conta a viagem inteira, do princípio ao fim, sem saltar uma ilha. Ela ouve até ao
          amanhecer. Quando termina, nenhum dos dois está a dormir, e é a primeira noite em vinte
          anos em que isso não é um problema.
        </blockquote>

        <ol className={styles['journey']} aria-label="A jornada, em ordem">
          {TREASURE_LIST.map((treasure) => (
            <li key={treasure.id} className={styles['step']}>
              <span className={styles['stepName']}>{treasure.name}</span>
              <span className={styles['stepChapter']}>{treasure.chapter}</span>
            </li>
          ))}
        </ol>
      </div>
    </Screen>
  );
}
