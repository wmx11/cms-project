import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  DATA_CANVAS_OVERLAY,
  DATA_COMPONENT,
  DATA_TARGET_ID,
} from '@cms/packages/tiglee-engine/constants';
import { MouseEvent } from 'react';

export const useCanvasEvents = () => {
  const setSelectedElement = useBuilderProviderState(
    (state) => state.setSelectedElement
  );
  const setSelectedComponentPath = useBuilderProviderState(
    (state) => state.setSelectedComponentPath
  );
  const setSelectedComponent = useBuilderProviderState(
    (state) => state.setSelectedComponent
  );
  const resetSelection = useBuilderProviderState(
    (state) => state.resetSelection
  );

  const handleCanvasClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    let _target;

    if (target.hasAttribute(DATA_TARGET_ID)) {
      _target = document.getElementById(
        target?.getAttribute(DATA_TARGET_ID) as string
      );
    } else {
      _target = target;
    }

    if (!_target) {
      return null;
    }

    if (_target.hasAttribute(DATA_CANVAS_OVERLAY)) {
      resetSelection();
    }

    if (!_target.hasAttribute(DATA_COMPONENT)) {
      return null;
    }

    setSelectedElement(_target);
    setSelectedComponentPath(_target.id || '');
    setSelectedComponent(_target.id || '');
  };

  return {
    handleCanvasClick,
  };
};
