'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  KEY_ADD_NEW_ELEMENT,
  KEY_DELETE_ELEMENT,
  KEY_DUPLICATE,
  KEY_RESET_SELECTION,
  KEY_TOGGLE_GRID,
  KEY_ZOOM_IN,
  KEY_ZOOM_OUT,
  SCALE_INTENSITY,
} from '@cms/packages/tiglee-engine/constants';
import duplicateComponent from '@cms/packages/tiglee-engine/modules/duplicateComponent';
import removeComponent from '@cms/packages/tiglee-engine/modules/removeComponent';
import { RefObject, useEffect, useRef } from 'react';

interface UseKeyboardEventsProps {
  canvasWrapperRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLDivElement>;
  canvasBackgroundRef: RefObject<HTMLDivElement>;
}

export const useKeyboardEvents = ({
  canvasRef,
  canvasWrapperRef,
  canvasBackgroundRef,
}: UseKeyboardEventsProps) => {
  const schema = useBuilderProviderState((state) => state.schema);

  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );

  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );

  const toggleGrid = useBuilderProviderState((state) => state.toggleGrid);

  const setCanvasScale = useBuilderProviderState(
    (state) => state.setCanvasScale
  );

  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

  const setIsCommandOpen = useBuilderProviderState(
    (state) => state.setIsCommandOpen
  );

  const resetSelection = useBuilderProviderState(
    (state) => state.resetSelection
  );

  const canvasWrapperRect = canvasWrapperRef.current?.getBoundingClientRect();

  const isCtrlDown = useRef(false);
  const isMouseDown = useRef(false);
  const isSpaceDown = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseDownPosition = useRef({ x: 0, y: 0 });

  const canvasWrapperPosition = useRef({
    x: 0,
    y: 0,
    isSet: false,
  });

  useEffect(() => {
    /**
     * On page load, set data-x and data-y attributes with the computed values of Transform Origin.
     * We need this to avoid using getBoundingClientRect() x and y values as they are different.
     * By setting data- attributes we achieve a smooth dragging motion without jumps.
     */
    if (canvasWrapperRef.current && !canvasWrapperPosition.current.isSet) {
      const [x, y] = window
        .getComputedStyle(canvasWrapperRef.current)
        .transformOrigin.split(' ')
        .map((item) => parseFloat(item));
      canvasWrapperRef.current.setAttribute('data-x', x.toString());
      canvasWrapperRef.current.setAttribute('data-y', y.toString());
      canvasWrapperPosition.current.isSet = true;
    }

    const handleMouseWheelEvents = (e: WheelEvent) => {
      if (!isCtrlDown.current) {
        return;
      }

      e.preventDefault();

      if (canvasWrapperRef.current && canvasWrapperRect) {
        const { x: mx, y: my } = e;

        if (mx <= canvasWrapperRect?.width / 2) {
          canvasWrapperPosition.current.x += 5;
        } else {
          canvasWrapperPosition.current.x -= 5;
        }

        if (my <= canvasWrapperRect?.height / 2) {
          canvasWrapperPosition.current.y += 5;
        } else {
          canvasWrapperPosition.current.y -= 5;
        }

        canvasWrapperRef.current.setAttribute(
          'data-x',
          canvasWrapperPosition.current.x.toString()
        );

        canvasWrapperRef.current.setAttribute(
          'data-y',
          canvasWrapperPosition.current.y.toString()
        );

        canvasWrapperRef.current.style.transformOrigin = `${canvasWrapperPosition.current.x}px ${canvasWrapperPosition.current.y}px`;
      }

      if (e.deltaY > 0) {
        setCanvasScale(-SCALE_INTENSITY);
      } else {
        setCanvasScale(SCALE_INTENSITY);
      }
    };

    const handleKeyUpEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Control':
          isCtrlDown.current = false;
          break;
        case ' ':
          isSpaceDown.current = false;
          isMouseDown.current = false;
          if (canvasBackgroundRef.current) {
            canvasBackgroundRef.current.classList.remove(
              'tg-grabbing',
              'tg-grab'
            );
          }
          break;
        default:
          break;
      }
    };

    const handleKeyDownEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEY_DELETE_ELEMENT:
          const newSchema = removeComponent({
            schema,
            path: selectedComonentPath,
          });

          if (!newSchema) {
            return null;
          }

          renderTemplate(newSchema);
          resetSelection();
          break;

        case KEY_RESET_SELECTION:
          selectedElement?.blur();
          resetSelection();
          break;

        case ' ':
          console.log(e);

          if (
            selectedElement?.hasAttribute('contenteditable') ||
            (e.target as HTMLBaseElement).localName === 'textarea'
          ) {
            return;
          }

          isSpaceDown.current = true;

          if (isSpaceDown.current) {
            if (!canvasBackgroundRef.current) {
              return;
            }

            e.preventDefault();

            if (!isMouseDown.current) {
              canvasBackgroundRef.current.classList.add('tg-grab');
            }
          }
          break;
        default:
          break;
      }

      if (!e.ctrlKey) {
        return;
      }

      if (!isCtrlDown.current) {
        isCtrlDown.current = true;
      }

      switch (e.key) {
        case KEY_ADD_NEW_ELEMENT:
          setIsCommandOpen(true);
          break;

        case KEY_DUPLICATE:
          e.preventDefault();
          const newSchema = duplicateComponent({
            schema,
            path: selectedComonentPath,
          });

          if (!newSchema) {
            return null;
          }

          renderTemplate(newSchema);
          break;

        case KEY_TOGGLE_GRID:
          toggleGrid();
          break;

        case KEY_ZOOM_IN:
          e.preventDefault();
          setCanvasScale(SCALE_INTENSITY);
          break;

        case KEY_ZOOM_OUT:
          e.preventDefault();
          setCanvasScale(-SCALE_INTENSITY);
          break;

        default:
          break;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!isMouseDown.current) {
        isMouseDown.current = true;
      }

      mouseDownPosition.current.x = e.x;
      mouseDownPosition.current.y = e.y;

      if (!canvasBackgroundRef.current) {
        return;
      }

      if (isSpaceDown.current) {
        canvasBackgroundRef.current.classList.add('tg-grabbing');
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isMouseDown.current) {
        isMouseDown.current = false;
      }

      canvasWrapperPosition.current.x = parseFloat(
        canvasWrapperRef.current?.getAttribute('data-x') || '0'
      );

      canvasWrapperPosition.current.y = parseFloat(
        canvasWrapperRef.current?.getAttribute('data-y') || '0'
      );

      if (!canvasBackgroundRef.current) {
        return;
      }

      canvasBackgroundRef.current.classList.remove('tg-grabbing', 'tg-grab');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current && !isSpaceDown.current && !isCtrlDown.current) {
        mousePosition.current.x = e.x;
        mousePosition.current.y = e.y;
      }

      if (!isMouseDown.current || !isSpaceDown.current) {
        return;
      }

      e.preventDefault();

      if (!canvasWrapperRef.current) {
        return;
      }

      const moveX =
        canvasWrapperPosition.current.x - (mouseDownPosition.current.x - e.x);
      const moveY =
        canvasWrapperPosition.current.y - (mouseDownPosition.current.y - e.y);

      canvasWrapperRef.current.setAttribute('data-x', moveX.toString());
      canvasWrapperRef.current.setAttribute('data-y', moveY.toString());
      canvasWrapperRef.current.style.transformOrigin = `${moveX}px ${moveY}px`;
    };

    canvasBackgroundRef.current?.addEventListener('mousedown', handleMouseDown);
    canvasBackgroundRef.current?.addEventListener('mouseup', handleMouseUp);
    canvasBackgroundRef.current?.addEventListener('mousemove', handleMouseMove);

    document.addEventListener('keydown', handleKeyDownEvents);
    document.addEventListener('keyup', handleKeyUpEvents);

    window.addEventListener('wheel', handleMouseWheelEvents, {
      passive: false,
    });

    return () => {
      canvasBackgroundRef.current?.removeEventListener(
        'mousedown',
        handleMouseDown
      );
      canvasBackgroundRef.current?.removeEventListener(
        'mouseup',
        handleMouseUp
      );
      canvasBackgroundRef.current?.removeEventListener(
        'mousemove',
        handleMouseMove
      );
      document.removeEventListener('keydown', handleKeyDownEvents);
      document.removeEventListener('keyup', handleKeyUpEvents);
      window.removeEventListener('wheel', handleMouseWheelEvents);
    };
  }, [selectedComonentPath]);
};
