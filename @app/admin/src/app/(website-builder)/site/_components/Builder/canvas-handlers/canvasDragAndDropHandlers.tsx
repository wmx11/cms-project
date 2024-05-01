import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  DATA_ACCEPTS_CHILDREN,
  DATA_DND_INITIALIZED,
  DATA_TARGET_ID,
  DRAGGABLE,
} from '@cms/packages/tiglee-engine/constants';
import dragAndDropComponent from '@cms/packages/tiglee-engine/modules/dragAndDropComponent';
import { RefObject, useEffect, useRef, useState } from 'react';
import { canvasDragAndDropHighlight } from './canvasOverlayElements';
import { iterativeCheckComponent } from '@admin/utils/iterativeCheck';

const RED = '#fee2e230';
const GREEN = '#dcfce730';

interface UseDragAndDropProps {
  canvasRef: RefObject<HTMLDivElement>;
  canvasOverlayRef: RefObject<HTMLDivElement>;
}

export const useDragAndDrop = ({
  canvasRef,
  canvasOverlayRef,
}: UseDragAndDropProps) => {
  const schema = useBuilderProviderState((state) => state.schema);

  const canvasScale = useBuilderProviderState((state) => state.canvasScale);

  const initialized = useBuilderProviderState((state) => state.initialized);

  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

  const draggableElement = useRef<{ element: HTMLElement | null }>({
    element: null,
  });

  useEffect(() => {
    console.log('dnd init');

    const scale = 1 / canvasScale || 1;

    const canvasRect = canvasRef.current?.getBoundingClientRect();

    const getElementInsertPosition = (item: Element, cursorY: number) => {
      const { y, height } = item.getBoundingClientRect();
      const elementHalfHeight = height / 2;
      const isCursorBeyondHalfElement = cursorY > y + elementHalfHeight;
      const acceptsChildren =
        item.getAttribute(DATA_ACCEPTS_CHILDREN) === 'true';

      if (acceptsChildren) {
        return isCursorBeyondHalfElement ? 'beforeend' : 'afterbegin';
      }

      if (!acceptsChildren) {
        return isCursorBeyondHalfElement ? 'afterend' : 'beforebegin';
      }

      return 'beforeend';
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLBaseElement;
      draggableElement.current.element = target;
      e.dataTransfer?.clearData();
      e.dataTransfer?.setData(
        'text/plain',
        target.getAttribute(DATA_TARGET_ID) || (target.id as string)
      );
    };

    const handleDragEnd = (e: DragEvent) => {
      draggableElement.current.element = null;
    };

    const handleDrag = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDragOver = (e: DragEvent) => {
      if (!canvasOverlayRef.current) {
        console.error('[handleDragOver]: Missing canvasOverlay element.');
        return;
      }

      e.preventDefault();

      const target = e.target as HTMLBaseElement;

      const position = getElementInsertPosition(target, e.clientY);

      const highlight = canvasDragAndDropHighlight({
        canvasOverlay: canvasOverlayRef.current,
      });

      if (highlight.element && canvasRect && draggableElement.current.element) {
        const { top, height, width, left } = target.getBoundingClientRect();

        const getTopPosition = () => {
          if (!canvasRect) {
            return 0;
          }

          if (position.includes('end')) {
            return (top + height - canvasRect?.y - 2) * scale;
          }

          return (top - canvasRect?.y) * scale;
        };
        Object.assign(highlight.element?.style, {
          position: 'absolute',
          width: `${width * scale}px`,
          zIndex: '100',
          height: '4px',
          top: `${getTopPosition()}px`,
          left: `${(left - canvasRect.x) * scale}px`,
        });
      }

      if (target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'false') {
        Object.assign(target.style, {
          background: RED,
        });

        return;
      }

      Object.assign(target.style, {
        background: GREEN,
      });
    };

    const handleDragEnter = (e: DragEvent) => {
      const target = e.target as HTMLBaseElement;

      if (target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'false') {
        Object.assign(target.style, {
          background: RED,
        });

        return;
      }

      Object.assign(target.style, {
        background: GREEN,
      });
    };

    const handleDragLeave = (e: DragEvent) => {
      const target = e.target as HTMLBaseElement;
      Object.assign(target.style, {
        background: '',
      });
    };

    const handleDrop = (e: DragEvent) => {
      if (!canvasOverlayRef.current) {
        console.error('[handleDragOver]: Missing canvasOverlayRef element.');
        return;
      }

      e.preventDefault();
      e.stopImmediatePropagation();

      const data = e.dataTransfer?.getData('text');
      const element = document.getElementById(data as string);
      const target = e.target as HTMLBaseElement;

      const elementInsertPosition = getElementInsertPosition(
        target as HTMLElement,
        e.clientY
      );

      const highlight = canvasDragAndDropHighlight({
        canvasOverlay: canvasOverlayRef.current,
      });

      if (highlight.element) {
        highlight.element.remove();
      }

      Object.assign(target.style, {
        borderColor: '',
        background: '',
      });

      const elementId = element?.getAttribute(DATA_TARGET_ID) || element?.id;

      const targetId = target?.getAttribute(DATA_TARGET_ID) || target?.id;

      const newSchema = dragAndDropComponent({
        schema,
        selectedComponentPath: elementId as string,
        targetComponentPath: targetId as string,
        insertPosition: elementInsertPosition,
      });

      if (!newSchema) {
        return null;
      }

      renderTemplate(newSchema);
    };

    let dropZones: HTMLBaseElement[] = [];
    let draggableItems: HTMLBaseElement[] = [];

    iterativeCheckComponent({
      callback: () => {
        /**
         * Get all new, non-initialized DND elements and add all necessary events to them
         */
        dropZones = document.querySelectorAll(
          `[${DATA_ACCEPTS_CHILDREN}=true]:not([${DATA_DND_INITIALIZED}=true])`
        ) as unknown as HTMLBaseElement[];

        draggableItems = document.querySelectorAll(
          `[${DRAGGABLE}]:not([${DATA_DND_INITIALIZED}=true])`
        ) as unknown as HTMLBaseElement[];

        dropZones.forEach((dropZone) => {
          dropZone.setAttribute(DATA_DND_INITIALIZED, 'true');
          dropZone.addEventListener('dragover', handleDragOver);
          dropZone.addEventListener('dragenter', handleDragEnter);
          dropZone.addEventListener('dragleave', handleDragLeave);
          dropZone.addEventListener('drop', handleDrop);
        });

        draggableItems.forEach((draggableItem) => {
          draggableItem.setAttribute(DATA_DND_INITIALIZED, 'true');
          draggableItem.addEventListener('dragstart', handleDragStart);
          draggableItem.addEventListener('drag', handleDrag);
          draggableItem.addEventListener('dragend', handleDragEnd);
        });
      },
    });

    /**
     * Return a clean up and remove all event listeners
     */
    // return () => {
    //   console.log('this is a dnd cleanup');

    //   dropZones?.forEach((dropZone) => {
    //     dropZone.setAttribute(DATA_DND_INITIALIZED, 'false');
    //     dropZone.removeEventListener('dragover', handleDragOver);
    //     dropZone.removeEventListener('dragenter', handleDragEnter);
    //     dropZone.removeEventListener('dragleave', handleDragLeave);
    //     dropZone.removeEventListener('drop', handleDrop);
    //   });

    //   draggableItems?.forEach((draggableItem) => {
    //     draggableItem.setAttribute(DATA_DND_INITIALIZED, 'false');
    //     draggableItem.removeEventListener('dragstart', handleDragStart);
    //     draggableItem.removeEventListener('drag', handleDrag);
    //     draggableItem.removeEventListener('dragend', handleDragEnd);
    //   });
    // };
  }, []);
};
