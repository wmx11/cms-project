'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { DATA_EDITABLE } from '@cms/packages/template-engine/constants';
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

    // if (selectedElement.getAttribute('contenteditable') === 'true') {
    //   return;
    // }

    const handleEditableContentInput = (event: Event) => {
      const target = event.target as HTMLBaseElement;

      const componentValue = selectedComponent?.props.find(
        (item) => item.type === 'string' && item.name === 'children'
      );

      if (componentValue) {
        componentValue.value = target.innerHTML;
      }
    };

    const handleEditableContentBlur = (event: Event) => {
      const target = event.target as HTMLBaseElement;
      // target.classList.add(...STYLES_CONTENT_EDITABLE.split(' '));
      // target.removeAttribute('contenteditable');
      target.removeEventListener('input', handleEditableContentInput, true);
      target.removeEventListener('blur', handleEditableContentBlur, true);
    };

    // selectedElement.classList.remove(...STYLES_CONTENT_EDITABLE.split(' '));
    selectedElement.addEventListener('input', handleEditableContentInput, true);
    selectedElement.addEventListener('blur', handleEditableContentBlur, true);
    // selectedElement.setAttribute('contenteditable', 'true');
    selectedElement.focus();

    return () => {
      selectedElement.removeEventListener(
        'input',
        handleEditableContentInput,
        true
      );
      selectedElement.removeEventListener(
        'blur',
        handleEditableContentBlur,
        true
      );
    };
  }, [selectedElement, renderedTemplate]);
};
