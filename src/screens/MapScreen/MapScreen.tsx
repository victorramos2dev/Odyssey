/**
 * Tela do Mapa — obrigatória pela seção 7 do PDF.
 * Trilha de progressão, pontos da aventura e status dos locais.
 */

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes.ts';
import { Button } from '@components/ui/Button/Button.tsx';
import { Screen } from '@components/layout/Screen/Screen.tsx';
import { AdventureMap } from '@features/map/components/AdventureMap.tsx';
import type { Chapter } from '@domain/types';
import { useGame } from '@hooks/useGame.ts';
import { useProgression } from '@hooks/useProgression.ts';

import styles from './MapScreen.module.css';

export function MapScreen() {
  const navigate = useNavigate();
  const { state } = useGame();
  const progression = useProgression();

  const enterChapter = (chapter: Chapter) => {
    void navigate(ROUTES.chapter(chapter.id));
  };

  return (
    <Screen
      isWide
      eyebrow="A viagem de volta"
      title="Mapa da aventura"
      lead={`${String(progression.completedCount)} de ${String(progression.totalCount)} pontos concluídos · ${String(progression.completeClueCount)} de 9 pistas completas · Tripulação: ${String(state.crewCount)}`}
      background="menu_mapa"
      actions={
        <>
          <Button variant="ghost" onClick={() => void navigate(ROUTES.inventory)}>
            Inventário
          </Button>
          <Button
            variant={progression.riddleUnlocked ? 'primary' : 'secondary'}
            disabled={!progression.riddleUnlocked}
            onClick={() => void navigate(ROUTES.riddle)}
          >
            Enigma final
          </Button>
        </>
      }
    >
      <AdventureMap
        chapters={progression.chapters}
        statusOf={progression.statusOf}
        onSelect={enterChapter}
      />

      {!progression.riddleUnlocked && (
        <p className={styles['hint']} role="status">
          O salão dos Doze Machados abre quando os dez pontos estiverem concluídos.
        </p>
      )}
    </Screen>
  );
}
