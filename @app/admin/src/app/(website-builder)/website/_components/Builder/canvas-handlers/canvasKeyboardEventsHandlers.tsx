'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import duplicateComponent from '@cms/template-engine/modules/duplicateComponent';
import removeComponent from '@cms/template-engine/modules/removeComponent';
import { useEffect } from 'react';

export const useKeyboardEvents = () => {
  const {
    schema,
    showGrid,
    selectedElement,
    selectedComonentPath,
    setShowGrid,
    renderTemplate,
    setIsCommandOpen,
    setSelectedElement,
    setSelectedComponent,
    setSelectedComponentPath,
  } = useBuilderProviderState();

  const resetSelection = () => {
    setSelectedElement(null);
    setSelectedComponentPath('');
    setSelectedComponent('');
  };

  useEffect(() => {
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
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvents);
    };
  }, [selectedComonentPath, showGrid]);
};
