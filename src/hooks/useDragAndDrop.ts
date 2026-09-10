/**
 * Arrastar e soltar acessível.
 *
 * O requisito 4.5 do PDF pede *Drag and Drop*, *navegação por teclado* e
 * *recursos de acessibilidade com ARIA* na mesma interação. Arrastar com o
 * mouse é intransponível para quem não usa mouse, então este hook expõe os
 * dois caminhos sobre o mesmo estado:
 *
 *   • Mouse — API nativa de arrasto do HTML5.
 *   • Teclado — Espaço/Enter pega a peça, Tab caminha até o destino,
 *     Espaço/Enter solta, Escape cancela.
 *
 * Cada passo produz um texto para a região `aria-live`, de modo que quem usa
 * leitor de tela ouve o que aconteceu — sem isso o arrasto é silencioso e,
 * portanto, invisível.
 */

import { useCallback, useMemo, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';

/** Formato usado no `dataTransfer`. Evita conflito com arrastos de fora da página. */
const MIME_TYPE = 'application/x-odyssey-item';

export interface DragSourceProps {
  readonly draggable: true;
  readonly tabIndex: 0;
  readonly role: 'button';
  readonly 'aria-pressed': boolean;
  readonly onDragStart: (event: DragEvent<HTMLElement>) => void;
  readonly onDragEnd: () => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  readonly onClick: () => void;
}

export interface DropTargetProps {
  readonly onDragOver: (event: DragEvent<HTMLElement>) => void;
  readonly onDragLeave: () => void;
  readonly onDrop: (event: DragEvent<HTMLElement>) => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  readonly onClick: () => void;
  readonly 'data-drop-active': boolean;
}

export interface DragAndDrop<TItem> {
  /** Peça na mão, por mouse ou por teclado. */
  readonly grabbed: TItem | null;
  /** Alvo sob o cursor durante o arrasto. */
  readonly hoveredTarget: string | null;
  /** Texto para a região `aria-live` da tela. */
  readonly announcement: string;
  readonly cancel: () => void;
  /** Props do elemento que se arrasta. `label` alimenta o anúncio. */
  readonly getSourceProps: (item: TItem, label: string) => DragSourceProps;
  /** Props da área que recebe. `onDrop` só é chamado se houver peça na mão. */
  readonly getTargetProps: (
    targetId: string,
    onDrop: (item: TItem) => void,
    label: string,
  ) => DropTargetProps;
}

export const useDragAndDrop = <TItem,>(): DragAndDrop<TItem> => {
  const [grabbed, setGrabbed] = useState<TItem | null>(null);
  const [grabbedLabel, setGrabbedLabel] = useState('');
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const cancel = useCallback(() => {
    setGrabbed(null);
    setGrabbedLabel('');
    setHoveredTarget(null);
  }, []);

  const pickUp = useCallback((item: TItem, label: string) => {
    setGrabbed(item);
    setGrabbedLabel(label);
    setAnnouncement(`${label} na mão. Escolha um destino e confirme, ou pressione Escape.`);
  }, []);

  const getSourceProps = useCallback(
    (item: TItem, label: string): DragSourceProps => ({
      draggable: true,
      tabIndex: 0,
      role: 'button',
      'aria-pressed': grabbed === item,
      onDragStart: (event) => {
        event.dataTransfer.setData(MIME_TYPE, label);
        event.dataTransfer.effectAllowed = 'move';
        pickUp(item, label);
      },
      onDragEnd: () => {
        setHoveredTarget(null);
      },
      onClick: () => {
        if (grabbed === item) {
          cancel();
          setAnnouncement(`${label} devolvida.`);

          return;
        }
        pickUp(item, label);
      },
      onKeyDown: (event) => {
        if (event.key === 'Escape' && grabbed !== null) {
          event.preventDefault();
          cancel();
          setAnnouncement('Movimento cancelado.');

          return;
        }

        if (event.key !== ' ' && event.key !== 'Enter') return;

        event.preventDefault();
        if (grabbed === item) {
          cancel();
          setAnnouncement(`${label} devolvida.`);

          return;
        }
        pickUp(item, label);
      },
    }),
    [cancel, grabbed, pickUp],
  );

  const getTargetProps = useCallback(
    (targetId: string, onDrop: (item: TItem) => void, label: string): DropTargetProps => {
      const release = () => {
        if (grabbed === null) return;

        const item = grabbed;
        const movedLabel = grabbedLabel;
        cancel();
        onDrop(item);
        setAnnouncement(`${movedLabel} colocada em ${label}.`);
      };

      return {
        'data-drop-active': hoveredTarget === targetId,
        onDragOver: (event) => {
          if (grabbed === null) return;

          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
          setHoveredTarget(targetId);
        },
        onDragLeave: () => {
          setHoveredTarget((current) => (current === targetId ? null : current));
        },
        onDrop: (event) => {
          event.preventDefault();
          release();
        },
        onClick: release,
        onKeyDown: (event) => {
          if (event.key !== ' ' && event.key !== 'Enter') return;
          if (grabbed === null) return;

          event.preventDefault();
          release();
        },
      };
    },
    [cancel, grabbed, grabbedLabel, hoveredTarget],
  );

  return useMemo(
    () => ({ grabbed, hoveredTarget, announcement, cancel, getSourceProps, getTargetProps }),
    [announcement, cancel, getSourceProps, getTargetProps, grabbed, hoveredTarget],
  );
};
