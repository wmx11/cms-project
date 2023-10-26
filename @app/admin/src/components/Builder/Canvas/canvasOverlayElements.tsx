import {
  ACTIVE,
  DATA_CANVAS_OVERLAY_CONTEXT_MENU_TARGET,
  DATA_CANVAS_OVERLAY_CONTROLS,
  DATA_CANVAS_OVERLAY_HIGHLIGHT,
} from '@cms/template-engine/constants/dataAttributes';

export const canvasHighlight = (state: string = ACTIVE) => {
  if (typeof document === undefined) {
    return { element: null, existing: false };
  }

  const existingHighlight = document.querySelector(
    `[${DATA_CANVAS_OVERLAY_HIGHLIGHT}=${state}]`
  );

  if (existingHighlight) {
    return { element: existingHighlight as HTMLDivElement, existing: true };
  }

  const highlight = document.createElement('div');

  highlight.setAttribute(DATA_CANVAS_OVERLAY_HIGHLIGHT, '');

  highlight.classList.add('border', 'border-violet-900', 'bg-violet-400/10');

  return { element: highlight as HTMLDivElement, existing: false };
};

export const canvasControls = () => {
  if (typeof document === undefined) {
    return { element: null, existing: false };
  }

  const existingControls = document.querySelector(
    `[${DATA_CANVAS_OVERLAY_CONTROLS}]`
  );

  if (existingControls) {
    return { element: existingControls as HTMLDivElement, existing: true };
  }

  const controls = document.createElement('div');

  controls.classList.add(
    'border',
    'border-violet-900',
    'shadow-lg',
    'rounded-lg',
    'overflow-hidden'
  );

  return { element: controls as HTMLDivElement, existing: false };
};

export const canvasContextMenuTarget = () => {
  if (typeof document === undefined) {
    return { element: null, existing: false };
  }

  const existingContextMenuTarget = document.querySelector(
    `[${DATA_CANVAS_OVERLAY_CONTEXT_MENU_TARGET}]`
  );

  if (existingContextMenuTarget) {
    return {
      element: existingContextMenuTarget as HTMLDivElement,
      existing: false,
    };
  }

  const contextMenuTarget = document.createElement('div');

  return { element: contextMenuTarget as HTMLDivElement, existing: false };
};
