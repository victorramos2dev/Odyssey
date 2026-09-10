/**
 * Tela do Enigma Final — obrigatória pela seção 7 do PDF.
 * Área para montagem da solução e validação da resposta.
 *
 * A porta é guardada: chegar aqui pela URL sem ter concluído os dez pontos
 * devolve o jogador ao mapa. A regra de progressão vale para a barra de
 * endereços também.
 */

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes.ts';
import { Button } from '@components/ui/Button/Button.tsx';
import { Screen } from '@components/layout/Screen/Screen.tsx';
import { getCollectedClues } from '@domain/rules/inventory.ts';
import { TwelveAxes } from '@features/riddle/components/TwelveAxes.tsx';
import { useGame } from '@hooks/useGame.ts';
import { useProgression } from '@hooks/useProgression.ts';

export function RiddleScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const { riddleUnlocked } = useProgression();

  const solve = () => {
    dispatch({ type: 'riddle/solve' });
    void navigate(ROUTES.ending);
  };

  if (!riddleUnlocked) {
    return (
      <Screen
        eyebrow="Ainda não"
        title="O salão está trancado"
        lead="Os Doze Machados só se alinham depois de concluídos os dez pontos da aventura."
        background="salao_machados"
        actions={
          <Button variant="primary" onClick={() => void navigate(ROUTES.map)}>
            Voltar ao mapa
          </Button>
        }
      >
        <p>Volta ao mar. Falta viagem.</p>
      </Screen>
    );
  }

  return (
    <Screen
      isWide
      eyebrow="Enigma Final"
      title="Os Doze Machados"
      lead="Doze olhais formando um único túnel escuro. Uma flecha. Uma chance."
      background="salao_machados"
      actions={
        <Button variant="ghost" onClick={() => void navigate(ROUTES.inventory)}>
          Rever pistas
        </Button>
      }
    >
      <TwelveAxes available={getCollectedClues(state)} onSolved={solve} />
    </Screen>
  );
}
