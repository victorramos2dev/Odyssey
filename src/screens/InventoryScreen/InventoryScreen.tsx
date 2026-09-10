/**
 * Tela do Inventário — seção 7 do PDF.
 * Lista de pistas, reorganização e visualização do progresso da investigação.
 */

import { useNavigate } from 'react-router-dom';

import { Button } from '@components/ui/Button/Button.tsx';
import { Screen } from '@components/layout/Screen/Screen.tsx';
import { TREASURE_LIST } from '@content/treasures.ts';
import { InventoryPanel } from '@features/inventory/components/InventoryPanel.tsx';
import { useProgression } from '@hooks/useProgression.ts';

export function InventoryScreen() {
  const navigate = useNavigate();
  const { completeClueCount } = useProgression();

  return (
    <Screen
      eyebrow="A investigação"
      title="Inventário de pistas"
      lead={`${String(completeClueCount)} de ${String(TREASURE_LIST.length)} pistas completas. A ordem que montares aqui é o rascunho da solução do enigma final.`}
      background="menu_mapa"
      actions={
        <Button variant="secondary" onClick={() => void navigate(-1)}>
          Voltar
        </Button>
      }
    >
      <InventoryPanel />
    </Screen>
  );
}
