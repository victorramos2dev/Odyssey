/**
 * Tela do capítulo: a cena propriamente dita.
 *
 * Junta capítulo (dados), motor (`useSceneRunner`), palco (`SceneStage`) e HUD.
 * Ao chegar ao fim dos nós, marca o ponto como concluído — o que desbloqueia o
 * seguinte, conforme o requisito 4.2 — e devolve o jogador ao mapa.
 */

import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@app/router/routes.ts';
import { Button } from '@components/ui/Button/Button.tsx';
import { Screen } from '@components/layout/Screen/Screen.tsx';
import { getChapter, hasContent } from '@content/chapters';
import { SceneStage } from '@features/scene/components/SceneStage.tsx';
import { useSceneRunner } from '@features/scene/hooks/useSceneRunner.ts';
import { GameHud } from '@features/hud/components/GameHud.tsx';
import { useGame } from '@hooks/useGame.ts';

export function ChapterScreen() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const chapter = chapterId === undefined ? null : getChapter(chapterId);

  if (chapter === null) return <Navigate to={ROUTES.map} replace />;

  // A chave remonta o motor ao trocar de capítulo, zerando a posição da cena.
  return <ChapterStage key={chapter.id} chapterId={chapter.id} />;
}

interface ChapterStageProps {
  readonly chapterId: string;
}

function ChapterStage({ chapterId }: ChapterStageProps) {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  const chapter = getChapter(chapterId);

  const goToMap = useCallback(() => {
    void navigate(ROUTES.map);
  }, [navigate]);

  const finishChapter = useCallback(() => {
    if (chapter === null) return;

    dispatch({ type: 'chapter/complete', chapter });
    goToMap();
  }, [chapter, dispatch, goToMap]);

  // Retoma do checkpoint apenas quando ele pertence a este capítulo.
  const resumeNodeId =
    state.checkpoint.chapterId === chapterId ? state.checkpoint.nodeId : undefined;

  const runner = useSceneRunner({
    nodes: chapter?.nodes ?? [],
    ...(resumeNodeId === undefined ? {} : { startNodeId: resumeNodeId }),
    onFinish: finishChapter,
  });

  useEffect(() => {
    dispatch({ type: 'chapter/start', chapterId });
  }, [chapterId, dispatch]);

  if (chapter === null) return <Navigate to={ROUTES.map} replace />;

  if (!hasContent(chapter)) {
    return (
      <Screen
        eyebrow={`Capítulo ${chapter.numeral}`}
        title={chapter.title}
        lead="Este capítulo ainda está sendo transcrito do roteiro para o motor."
        background={chapter.thumbnail}
        actions={
          <Button variant="primary" onClick={goToMap}>
            Voltar ao mapa
          </Button>
        }
      >
        <p>
          Guardião: {chapter.guardian} · Tema do quiz: {chapter.quizTheme}
        </p>
      </Screen>
    );
  }

  return (
    <SceneStage
      runner={runner}
      chapterId={chapter.id}
      onLeave={goToMap}
      hud={
        <GameHud
          chapterNumeral={chapter.numeral}
          chapterTitle={chapter.title}
          crewCount={state.crewCount}
          onOpenMap={goToMap}
          onOpenInventory={() => void navigate(ROUTES.inventory)}
        />
      }
    />
  );
}
