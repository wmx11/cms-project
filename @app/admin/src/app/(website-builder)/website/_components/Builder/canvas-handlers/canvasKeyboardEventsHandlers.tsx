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
import { useEffect, useRef } from 'react';

export const useKeyboardEvents = () => {
  const schema = useBuilderProviderState((state) => state.schema);
  const showGrid = useBuilderProviderState((state) => state.showGrid);
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
  const setSelectedElement = useBuilderProviderState(
    (state) => state.setSelectedElement
  );
  const setSelectedComponent = useBuilderProviderState(
    (state) => state.setSelectedComponent
  );
  const setSelectedComponentPath = useBuilderProviderState(
    (state) => state.setSelectedComponentPath
  );

  const resetSelection = () => {
    setSelectedElement(null);
    setSelectedComponentPath('');
    setSelectedComponent('');
  };

  const isCtrl = useRef(false);

  useEffect(() => {
    const handleMouseWheelEvents = (e: WheelEvent) => {
      if (!isCtrl.current) {
        return;
      }

      e.preventDefault();

      if (e.deltaY > 0) {
        setCanvasScale(-SCALE_INTENSITY);
      } else {
        setCanvasScale(SCALE_INTENSITY);
      }
    };

    const handleKeyUpEvents = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        isCtrl.current = false;
      }
    };

    const handleKeyboardEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        /**
         * Delete a selection
         */
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

        /**
         * Remove all selections
         */
        case KEY_RESET_SELECTION:
          selectedElement?.blur();
          resetSelection();
          break;

        default:
          break;
      }

      if (!e.ctrlKey) {
        return;
      }

      if (!isCtrl.current) {
        isCtrl.current = true;
      }

      switch (e.key) {
        /**
         * Add new element
         */
        case KEY_ADD_NEW_ELEMENT:
          setIsCommandOpen(true);
          break;

        /**
         * Duplicate element
         */
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

        /**
         * Toggle grid view on and off
         */
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

    document.addEventListener('keydown', handleKeyboardEvents);
    document.addEventListener('keyup', handleKeyUpEvents);
    window.addEventListener('wheel', handleMouseWheelEvents, {
      passive: false,
    });
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvents);
      document.removeEventListener('keyup', handleKeyUpEvents);
      window.removeEventListener('wheel', handleMouseWheelEvents);
    };
  }, [selectedComonentPath, showGrid]);
};
