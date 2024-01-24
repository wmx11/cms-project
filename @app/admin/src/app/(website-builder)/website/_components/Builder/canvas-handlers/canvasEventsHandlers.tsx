import {
  DATA_CANVAS_OVERLAY,
  DATA_CANVAS_OVERLAY_HIGHLIGHT_LABEL,
  DATA_COMPONENT,
  DATA_LABEL,
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
      state.setSelectedElement(null);
      state.setSelectedComponentPath('');
      state.setSelectedComponent('');
    }

    if (!target.hasAttribute(DATA_COMPONENT)) {
      return null;
    }

    state.setSelectedElement(target);
    state.setSelectedComponentPath(target.id || '');
    state.setSelectedComponent(target.id || '');
  };

/**
 * @deprecated
 */
export const handleCanvasMouseOver =
  (props: {
    canvasRef: RefObject<HTMLDivElement>;
    canvasOverlayLabelRef: RefObject<HTMLDivElement>;
    canvasOverlayHighlightHoverRef: RefObject<HTMLDivElement>;
  }) =>
  (event: MouseEvent<HTMLDivElement>) => {
    const {
      canvasRef: { current: canvas },
      canvasOverlayLabelRef: { current: canvasOverlayLabel },
      canvasOverlayHighlightHoverRef: { current: canvasOverlayHighlightHover },
    } = props;

    if (!canvas || !canvasOverlayHighlightHover) {
      return null;
    }

    const target = event.target as HTMLBaseElement;

    if (!target) {
      return null;
    }

    const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

    const {
      height: targetHeight,
      width: targetWidth,
      x: targetX,
      y: targetY,
    } = target.getBoundingClientRect();

    if (target.hasAttribute(DATA_CANVAS_OVERLAY_HIGHLIGHT_LABEL)) {
      return null;
    }

    if (!target.hasAttribute(DATA_COMPONENT)) {
      canvasOverlayHighlightHover.style.display = 'none';
      return null;
    }

    if (canvasOverlayLabel) {
      canvasOverlayLabel.innerText = target.getAttribute(DATA_LABEL) || '';
      canvasOverlayLabel.classList.remove('hidden');
      canvasOverlayLabel.classList.add('block');
    }

    // Apply styles
    Object.assign(canvasOverlayHighlightHover.style, {
      display: 'flex',
      height: `${targetHeight}px`,
      width: `${targetWidth}px`,
      top: `${targetY - canvasY}px`,
      left: `${targetX - canvasX}px`,
    });
  };
