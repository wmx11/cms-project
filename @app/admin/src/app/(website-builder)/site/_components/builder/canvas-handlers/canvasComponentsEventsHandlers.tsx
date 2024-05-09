'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { handleEditableContentOnDoubleClick } from '@admin/utils/handleEditableContentOnDoubleClick';
import {
  DATA_CANVAS_OVERLAY,
  DATA_EDITABLE,
} from '@cms/packages/tiglee-engine/constants';
import { RefObject, useEffect } from 'react';

interface UseEditableContentControlsProps {
  canvasOverlayRef: RefObject<HTMLDivElement>;
}

/**
 * Hook responsible for making sure the editable content can be edited by double clicking on it.
 * It will set the new value on the Schema
 */
export const useEditableContentControls = ({
  canvasOverlayRef: { current: canvasOverlay },
}: UseEditableContentControlsProps) => {
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );

  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  const renderedTemplate = useBuilderProviderState(
    (state) => state.renderedTemplate
  );

  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

  useEffect(() => {
    if (!selectedElement) {
      return;
    }

    if (!selectedElement.hasAttribute(DATA_EDITABLE)) {
      return;
    }

    const _selectedElement =
      selectedComponent?.category === 'button'
        ? (selectedElement.firstChild as HTMLElement)
        : selectedElement;

    const componentValue = selectedComponent?.props.find(
      (item) => item.type === 'string' && item.name === 'children'
    );

    const handleEditableContentInput = (event: Event) => {
      const target = event.target as HTMLBaseElement;

      if (componentValue) {
        componentValue.value = target.innerText;
      }

      if (canvasOverlay) {
        canvasOverlay.classList.add('hidden');
      }
    };

    const handleEditableContentBlur = (event: Event) => {
      const target = event.target as HTMLBaseElement;
      target.removeEventListener('input', handleEditableContentInput, true);
      target.removeEventListener('blur', handleEditableContentBlur, true);
      target.removeAttribute('contenteditable');

      if (canvasOverlay) {
        canvasOverlay.classList.remove('hidden');
      }

      renderTemplate();
    };

    _selectedElement.addEventListener(
      'input',
      handleEditableContentInput,
      true
    );

    _selectedElement.addEventListener('blur', handleEditableContentBlur, true);

    _selectedElement.addEventListener(
      'dblclick',
      handleEditableContentOnDoubleClick,
      true
    );

    return () => {
      _selectedElement.removeEventListener(
        'input',
        handleEditableContentInput,
        true
      );
      _selectedElement.removeEventListener(
        'blur',
        handleEditableContentBlur,
        true
      );
      _selectedElement.removeEventListener(
        'dblclick',
        handleEditableContentOnDoubleClick,
        true
      );
    };
  }, [selectedComponent, renderedTemplate]);
};
