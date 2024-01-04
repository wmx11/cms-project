import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import duplicateComponent from '@cms/template-engine/modules/duplicateComponent';
import removeComponent from '@cms/template-engine/modules/removeComponent';
import { useEffect } from 'react';

export const useKeyboardEvents = () => {
  const {
    schema,
    selectedComonentPath,
    setIsCommandOpen,
    setSelectedElement,
    setSelectedComponentPath,
    setSelectedComponent,
    renderTemplate,
  } = useBuilderProviderState();

  const resetSelection = () => {
    setSelectedElement(null);
    setSelectedComponentPath('');
    setSelectedComponent('');
  };

  useEffect(() => {
    const handleKeyboardEvents = (e: KeyboardEvent) => {
      switch (e.key) {
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

        case 'Escape':
          resetSelection();
          break;

        default:
          break;
      }

      if (!e.ctrlKey) {
        return;
      }

      switch (e.key) {
        case '/':
          setIsCommandOpen(true);
          break;

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

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyboardEvents);
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvents);
    };
  }, [selectedComonentPath]);
};
