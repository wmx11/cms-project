import {
  ACTIVE,
  DATA_CANVAS_OVERLAY,
  DATA_CANVAS_OVERLAY_HIGHLIGHT,
  DATA_CANVAS_OVERLAY_HIGHLIGHT_LABEL,
  DATA_COMPONENT,
  DATA_TARGET_ID,
  HOVER,
} from '@cms/template-engine/constants';
import { MouseEvent, RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import { BuilderState, HandleSelect } from '@admin/types';
import CanvasElementControlButtons from '../canvas-controls/element-overlay-controls/CanvasElementControlButtons';
import { handleEditableContentClick } from './canvasComponentsEventsHandlers';
import {
  canvasContextMenuTarget,
  canvasControls,
  canvasHighlight,
  canvasHighlightLabel,
} from './canvasOverlayElements';

export type CanvasHandlerProps = {
  canvasRef: RefObject<HTMLDivElement>;
  canvasOverlayRef: RefObject<HTMLDivElement>;
};

export const handleCanvasClick =
  (props: CanvasHandlerProps & HandleSelect & BuilderState) =>
  (event: MouseEvent<HTMLDivElement>) => {
    const {
      canvasRef: { current: canvas },
      canvasOverlayRef: { current: canvasOverlay },
      state,
      handleSelect,
    } = props;

    if (!canvas || !canvasOverlay) {
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

    // Reset the whole canvas overlay state if the click happens outside of the element
    if (target.hasAttribute(DATA_CANVAS_OVERLAY)) {
      canvasOverlay.innerHTML = '';
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

    handleEditableContentClick(target);

    // Reset the whole canvas overlay state
    canvasOverlay.innerHTML = '';

    const highlight = canvasHighlight(ACTIVE);

    const controls = canvasControls();

    if (!highlight.element || !controls.element) {
      return;
    }

    highlight.element.setAttribute(DATA_CANVAS_OVERLAY_HIGHLIGHT, ACTIVE);
    highlight.element.setAttribute(DATA_TARGET_ID, target.id);

    // Apply styles
    Object.assign(highlight.element.style, {
      position: 'absolute',
      height: `${targetHeight}px`,
      width: `${targetWidth}px`,
      top: `${targetY - canvasY}px`,
      left: `${targetX - canvasX}px`,
    });

    Object.assign(controls.element.style, {
      transform: `translateY(-46px) translateX(-2px)`,
      position: 'absolute',
      top: '0',
      zIndex: '100',
    });

    // Add element control buttons
    createRoot(controls.element).render(
      CanvasElementControlButtons({
        target,
        state,
        handleSelect,
      })
    );

    canvasOverlay.appendChild(highlight.element);

    highlight.element.appendChild(controls.element);
  };

export const handleCanvasMouseOver =
  (props: CanvasHandlerProps) => (event: MouseEvent<HTMLDivElement>) => {
    const {
      canvasRef: { current: canvas },
      canvasOverlayRef: { current: canvasOverlay },
    } = props;

    if (!canvas || !canvasOverlay) {
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

    const highlight = canvasHighlight(HOVER);
    const highlightLabel = canvasHighlightLabel(target);

    if (!highlight.element) {
      return null;
    }

    if (target.hasAttribute(DATA_CANVAS_OVERLAY_HIGHLIGHT_LABEL)) {
      return null;
    }

    if (!target.hasAttribute(DATA_COMPONENT)) {
      highlight.element.remove();
      return null;
    }

    highlight.element.setAttribute(DATA_CANVAS_OVERLAY_HIGHLIGHT, HOVER);

    // Apply styles
    Object.assign(highlight.element.style, {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: `${targetHeight}px`,
      width: `${targetWidth}px`,
      top: `${targetY - canvasY}px`,
      left: `${targetX - canvasX}px`,
    });

    if (highlightLabel.element && !highlight.existing) {
      highlight.element.appendChild(highlightLabel.element);
    }

    if (!highlight.existing) {
      canvasOverlay.appendChild(highlight.element);
    }
  };

export const handleCanvasContextMenu =
  (props: CanvasHandlerProps & BuilderState) =>
  (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const {
      canvasRef: { current: canvas },
      canvasOverlayRef: { current: canvasOverlay },
      state,
    } = props;

    if (!canvas || !canvasOverlay) {
      return;
    }

    const target = event.target as HTMLBaseElement;

    if (!target) {
      return;
    }

    if (!target.hasAttribute(DATA_COMPONENT)) {
      return;
    }

    const { x: canvasX } = canvas.getBoundingClientRect();

    state.setTriggerRef({ current: null });

    const contextMenuTarget = canvasContextMenuTarget();

    if (!contextMenuTarget.element) {
      return;
    }

    Object.assign(contextMenuTarget.element.style, {
      position: 'absolute',
      top: `${event.pageY - canvas.offsetTop * 2}px`,
      left: `${event.pageX - canvasX}px`,
      width: '100px',
      height: '1px',
    });

    contextMenuTarget.element.setAttribute(DATA_TARGET_ID, target.id);

    if (!contextMenuTarget.existing) {
      canvasOverlay.appendChild(contextMenuTarget.element);
    }

    state.setTriggerRef({ current: contextMenuTarget.element });
    state.setIsOpen(true);
    state.setSelectedElement(target);
    state.setSelectedComponentPath(target.id || '');
    state.setSelectedComponent(target.id || '');
  };

export const handleCanvasResize =
  (props: CanvasHandlerProps) => (event: UIEvent) => {
    const {
      canvasRef: { current: canvas },
      canvasOverlayRef: { current: canvasOverlay },
    } = props;

    if (!canvas || !canvasOverlay) {
      return null;
    }

    const highlight = canvasHighlight(ACTIVE);

    if (!highlight.element) {
      return null;
    }

    if (!highlight.existing) {
      return null;
    }

    const target = document.getElementById(
      `${highlight.element.getAttribute(DATA_TARGET_ID)}`
    ) as HTMLBaseElement;

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

    // Apply styles
    Object.assign(highlight.element.style, {
      position: 'absolute',
      height: `${targetHeight}px`,
      width: `${targetWidth}px`,
      top: `${targetY - canvasY}px`,
      left: `${targetX - canvasX}px`,
    });
  };

export const handleCanvasUpdate = () => {};
