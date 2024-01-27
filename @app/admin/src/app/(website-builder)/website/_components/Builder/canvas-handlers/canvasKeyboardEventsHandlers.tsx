'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import duplicateComponent from '@cms/template-engine/modules/duplicateComponent';
import removeComponent from '@cms/template-engine/modules/removeComponent';
import { useEffect } from 'react';

export const useKeyboardEvents = () => {
  const schema = useBuilderProviderState((state) => state.schema);
  const showGrid = useBuilderProviderState((state) => state.showGrid);
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );
  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );
  const setShowGrid = useBuilderProviderState((state) => state.setShowGrid);
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

  let isCtrl = false;

  useEffect(() => {
    const handleMouseWheelEvents = (e: WheelEvent) => {
      if (!isCtrl) {
        return;
      }

      const INTENSITY = 0.01;

      if (e.deltaY > 0) {
        setCanvasScale(INTENSITY);
      } else {
        setCanvasScale(-INTENSITY);
      }
    };

    const handleKeyUpEvents = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        isCtrl = false;
      }
    };

    const handleKeyboardEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        /**
         * Delete a selection
         */
        case 'Delete':
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
        case 'Escape':
          selectedElement?.blur();
          resetSelection();
          break;

        default:
          break;
      }

      if (!e.ctrlKey) {
        return;
      }

      if (!isCtrl) {
        isCtrl = true;
      }

      switch (e.key) {
        /**
         * Add new element
         */
        case '/':
          setIsCommandOpen(true);
          break;

        /**
         * Duplicate element
         */
        case 'd':
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
        case ';':
          setShowGrid(showGrid ? false : true);
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyboardEvents);
    document.addEventListener('keyup', handleKeyUpEvents);
    window.addEventListener('wheel', handleMouseWheelEvents, { passive: true });
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvents);
      document.removeEventListener('keyup', handleKeyUpEvents);
      window.removeEventListener('wheel', handleMouseWheelEvents);
    };
  }, [selectedComonentPath, showGrid]);
};
