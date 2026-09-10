/**
 * Tela Inicial — obrigatória pela seção 7 do PDF.
 * Nome da aventura, botão para iniciar e botão para continuar o progresso.
 */

import { useNavigate } from 'react-router-dom';

import { Button } from '@components/ui/Button/Button.tsx';
import { Backdrop } from '@features/scene/components/Backdrop.tsx';
import { ROUTES } from '@app/router/routes.ts';
import { useGame } from '@hooks/useGame.ts';
import { useProgression } from '@hooks/useProgression.ts';

import styles from './HomeScreen.module.css';

export function HomeScreen() {
  const navigate = useNavigate();
  const { hasSave, resetGame } = useGame();
  const { completedCount, totalCount, nextChapter } = useProgression();

  const startNewAdventure = () => {
    resetGame();
    void navigate(ROUTES.prologue);
  };

  // Continuar leva sempre ao mapa: é lá que o progresso está visível e é de lá
  // que o jogador escolhe onde retomar.
  const continueAdventure = () => {
    void navigate(ROUTES.map);
  };

  return (
    <div className={styles['home']}>
      <Backdrop background="menu_inicio" dimmed />

      <main className={styles['panel']}>
        <p className={styles['eyebrow']}>Uma caça ao tesouro pelo mar de Homero</p>
        <h1 className={styles['title']}>A Odisseia</h1>
        <p className={styles['tagline']}>
          Dez ilhas. Dez Guardiões. Nove pistas e um enigma que só se resolve quando a viagem
          inteira estiver em ordem.
        </p>

        <div className={styles['actions']}>
          <Button variant="primary" size="lg" onClick={startNewAdventure}>
            {hasSave ? 'Nova aventura' : 'Iniciar aventura'}
          </Button>

          <Button variant="secondary" size="lg" disabled={!hasSave} onClick={continueAdventure}>
            Continuar progresso
          </Button>
        </div>

        {hasSave && (
          <p className={styles['saveNote']} role="status">
            Progresso encontrado: {completedCount} de {totalCount} pontos concluídos
            {nextChapter !== null && <> · próximo: {nextChapter.title}</>}.
          </p>
        )}

        <nav className={styles['secondary']} aria-label="Atalhos">
          <Button variant="ghost" size="sm" onClick={() => void navigate(ROUTES.tutorial)}>
            Como se joga
          </Button>
        </nav>
      </main>
    </div>
  );
}
