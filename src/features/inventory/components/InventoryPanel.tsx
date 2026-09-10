/**
 * Inventário de pistas — requisito 4.5 do PDF.
 *
 * Reordenar é uma ação de jogo, não um enfeite: a ordem que o jogador monta
 * aqui é o rascunho da solução do enigma final, e é persistida junto ao resto
 * do estado.
 *
 * Três formas de reordenar, todas sobre o mesmo estado:
 *   • arrastar com o mouse;
 *   • pegar e soltar com Espaço/Enter;
 *   • Alt + setas, o atalho de quem já sabe onde a carta deve ficar.
 */

import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

import { TREASURES } from '@content/treasures.ts';
import { getClueState } from '@domain/rules/inventory.ts';
import type { TreasureId } from '@domain/types';
import { useDragAndDrop } from '@hooks/useDragAndDrop.ts';
import { useGame } from '@hooks/useGame.ts';

import { ClueCard } from './ClueCard.tsx';
import styles from './InventoryPanel.module.css';

export function InventoryPanel() {
  const { state, dispatch } = useGame();
  const dnd = useDragAndDrop<number>();

  const order = state.inventoryOrder;

  const move = useCallback(
    (from: number, to: number) => {
      dispatch({ type: 'inventory/reorder', from, to });
    },
    [dispatch],
  );

  /**
   * Alt + setas move a carta um lugar. Devolve `true` quando tratou a tecla,
   * para que o arrasto por teclado não a receba também.
   */
  const handleShortcut = useCallback(
    (event: KeyboardEvent<HTMLElement>, position: number): boolean => {
      if (!event.altKey) return false;

      const direction = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;
      if (direction === 0) return false;

      const target = position + direction;
      if (target < 0 || target >= order.length) return false;

      event.preventDefault();
      move(position, target);

      return true;
    },
    [move, order.length],
  );

  if (order.length === 0) {
    return (
      <p className={styles['empty']}>
        Nenhuma pista ainda. Elas chegam ao vencer os Guardiões de cada ponto.
      </p>
    );
  }

  return (
    <div className={styles['inventory']}>
      <p className={styles['instructions']}>
        Arraste para reordenar. Com o teclado: Espaço pega a carta, Tab escolhe o destino, Espaço
        solta. Alt + setas move um lugar de cada vez.
      </p>

      <ol className={styles['list']} aria-label="Pistas coletadas, em ordem">
        {order.map((treasure: TreasureId, position) => {
          const sourceProps = dnd.getSourceProps(position, TREASURES[treasure].name);
          const targetProps = dnd.getTargetProps(
            `slot-${String(position)}`,
            (from) => {
              move(from, position);
            },
            `posição ${String(position + 1)}`,
          );

          return (
            <li key={treasure} className={styles['item']}>
              <div
                {...sourceProps}
                {...targetProps}
                role="button"
                tabIndex={0}
                aria-label={`${TREASURES[treasure].name}, posição ${String(position + 1)} de ${String(order.length)}`}
                // O espalhamento de `targetProps` sobrescreveria o clique de
                // `sourceProps`. Sem carta na mão, clicar pega; com carta na
                // mão, clicar solta.
                onClick={() => {
                  if (dnd.grabbed === null) {
                    sourceProps.onClick();

                    return;
                  }

                  targetProps.onClick();
                }}
                onKeyDown={(event) => {
                  if (handleShortcut(event, position)) return;

                  // Soltar sobre uma carta tem prioridade sobre pegá-la: é o
                  // gesto de "colocar aqui" quando já existe peça na mão.
                  if (dnd.grabbed !== null && dnd.grabbed !== position) {
                    targetProps.onKeyDown(event);

                    return;
                  }

                  sourceProps.onKeyDown(event);
                }}
              >
                <ClueCard
                  treasure={treasure}
                  state={getClueState(state, treasure)}
                  position={position + 1}
                  total={order.length}
                  isGrabbed={dnd.grabbed === position}
                  isDropTarget={dnd.hoveredTarget === `slot-${String(position)}`}
                />
              </div>
            </li>
          );
        })}
      </ol>

      <p className="visually-hidden" role="status" aria-live="polite">
        {dnd.announcement}
      </p>
    </div>
  );
}
