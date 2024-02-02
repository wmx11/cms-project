import {
  DATA_CANVAS_OVERLAY,
  DATA_COMPONENT,
  DATA_TARGET_ID,
} from '@cms/packages/template-engine/constants';
import { MouseEvent, RefObject } from 'react';

export type CanvasHandlerProps = {
  canvasRef: RefObject<HTMLDivElement>;
  canvasOverlayRef: RefObject<HTMLDivElement>;
};

export const handleCanvasClick =
  (state: {
    setSelectedElement: (target: HTMLElement | null) => void;
    setSelectedComponentPath: (value: string) => void;
    setSelectedComponent: (value: string) => void;
    resetSelection: () => void;
  }) =>
  (event: MouseEvent<HTMLDivElement>) => {
    const _target = event.target as HTMLElement;

    let target;

    if (_target.hasAttribute(DATA_TARGET_ID)) {
      target = document.getElementById(
        _target?.getAttribute(DATA_TARGET_ID) as string
      );
    } else {
      target = _target;
    }

    if (!target) {
      return null;
    }

    if (target.hasAttribute(DATA_CANVAS_OVERLAY)) {
      state.resetSelection();
    }

    if (!target.hasAttribute(DATA_COMPONENT)) {
      return null;
    }

    state.setSelectedElement(target);
    state.setSelectedComponentPath(target.id || '');
    state.setSelectedComponent(target.id || '');
  };
