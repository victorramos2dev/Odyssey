/**
 * Prólogo.
 *
 * Usa o mesmo motor de cena dos capítulos — é a prova de que o motor não sabe
 * nem precisa saber o que está a encenar.
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes.ts';
import { PROLOGUE_NODES } from '@content/scenes/prologue.ts';
import { SceneStage } from '@features/scene/components/SceneStage.tsx';
import { useSceneRunner } from '@features/scene/hooks/useSceneRunner.ts';

export function PrologueScreen() {
  const navigate = useNavigate();

  const goToTutorial = useCallback(() => {
    void navigate(ROUTES.tutorial);
  }, [navigate]);

  const runner = useSceneRunner({
    nodes: PROLOGUE_NODES,
    onFinish: goToTutorial,
    onTutorial: goToTutorial,
  });

  return (
    <SceneStage
      runner={runner}
      chapterId="prologo"
      onLeave={() => {
        void navigate(ROUTES.home);
      }}
    />
  );
}
