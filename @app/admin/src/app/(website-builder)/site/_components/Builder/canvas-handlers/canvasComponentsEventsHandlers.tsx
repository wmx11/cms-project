'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { handleEditableContentOnDoubleClick } from '@admin/utils/handleEditableContentOnDoubleClick';
import { DATA_EDITABLE } from '@cms/packages/tiglee-engine/constants';
import { useEffect } from 'react';

export const useEditableContentControls = () => {
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );

  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  const renderedTemplate = useBuilderProviderState(
    (state) => state.renderedTemplate
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
    };

    const handleEditableContentBlur = (event: Event) => {
      const target = event.target as HTMLBaseElement;
      target.removeEventListener('input', handleEditableContentInput, true);
      target.removeEventListener('blur', handleEditableContentBlur, true);
      target.removeAttribute('contenteditable');
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
