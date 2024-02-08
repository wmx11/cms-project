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
} from '@cms/template-engine/constants';
import duplicateComponent from '@cms/template-engine/modules/duplicateComponent';
import removeComponent from '@cms/template-engine/modules/removeComponent';
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

  const isCtrlDown = useRef(false);
  const isMouseDown = useRef(false);
  const isSpaceDown = useRef(false);

  useEffect(() => {
    const handleMouseWheelEvents = (e: WheelEvent) => {
      if (!isCtrlDown.current) {
        return;
      }

      if (canvasRef.current) {
        canvasRef.current.style.translate = `${e.x / 2}px ${e.y / 2}px`;
      }

      e.preventDefault();

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
          if (isSpaceDown.current && isMouseDown.current) {
            e.preventDefault();
            if (!canvasRef.current) {
              return;
            }
            canvasRef.current.style.pointerEvents = 'none';
            canvasRef.current.style.userSelect = 'none';
          }

          isSpaceDown.current = true;
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
        return;
      }

      if (!canvasWrapperRef.current || !canvasRef.current) {
        return;
      }
      
      canvasWrapperRef.current.style.cursor = 'grabbing';
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isMouseDown.current) {
        isMouseDown.current = false;

        if (!canvasWrapperRef.current || !canvasRef.current) {
          return;
        }
        canvasRef.current.style.pointerEvents = 'auto';
        canvasRef.current.style.userSelect = 'auto';
        canvasWrapperRef.current.style.cursor = 'auto';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown.current && isSpaceDown.current) {
        e.preventDefault();

        if (!canvasWrapperRef.current) {
          return;
        }
        canvasWrapperRef.current.style.transformOrigin = `${e.x}px ${e.y}px`;
      }
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
