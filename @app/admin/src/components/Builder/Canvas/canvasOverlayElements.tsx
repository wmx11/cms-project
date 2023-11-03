import {
  ACTIVE,
  DATA_CANVAS_OVERLAY_ADD_ELEMENT_BUTTON,
  DATA_CANVAS_OVERLAY_CONTEXT_MENU_TARGET,
  DATA_CANVAS_OVERLAY_CONTROLS,
  DATA_CANVAS_OVERLAY_HIGHLIGHT,
  DATA_CANVAS_OVERLAY_HIGHLIGHT_LABEL,
  DATA_LABEL,
  DRATA_CANVAS_OVERLAY_DRAG_AND_DROP_HIGHLIGHT
} from '@cms/template-engine/constants';

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

export const canvasDragAndDropHighlight = ({
  canvasOverlay,
}: {
  canvasOverlay: HTMLDivElement;
}) => {
  if (typeof document === undefined) {
    return { element: null, existing: false };
  }

  const existingDnDHighlight = document.querySelector(
    `[${DRATA_CANVAS_OVERLAY_DRAG_AND_DROP_HIGHLIGHT}]`
  );

  if (existingDnDHighlight) {
    return { element: existingDnDHighlight as HTMLDivElement, existing: true };
  }

  const dNdHighlight = document.createElement('div');

  dNdHighlight.setAttribute(DRATA_CANVAS_OVERLAY_DRAG_AND_DROP_HIGHLIGHT, '');

  dNdHighlight.classList.add('bg-violet-500', 'shadow-lg', 'shadow-violet-500');

  canvasOverlay?.appendChild(dNdHighlight);

  return { element: dNdHighlight as HTMLDivElement, existing: false };
};

export const canvasHighlightLabel = (target: HTMLBaseElement) => {
  if (typeof document === undefined) {
    return { element: null, existing: false };
  }

  const existingHighlightLabel = document.querySelector(
    `[${DATA_CANVAS_OVERLAY_HIGHLIGHT_LABEL}]`
  ) as HTMLDivElement | null;

  if (existingHighlightLabel) {
    existingHighlightLabel.innerText = target.getAttribute(DATA_LABEL) || '';
    return {
      element: existingHighlightLabel as HTMLDivElement,
      existing: true,
    };
  }

  const highlightLabel = document.createElement('div');

  highlightLabel.setAttribute(DATA_CANVAS_OVERLAY_HIGHLIGHT_LABEL, '');

  highlightLabel.innerText = target.getAttribute(DATA_LABEL) || '';

  highlightLabel.classList.add(
    'px-4',
    'py-1',
    'rounded-full',
    'bg-violet-500',
    'text-xs'
  );

  Object.assign(highlightLabel.style, {
    color: 'white',
    position: 'absolute',
    transform: 'translateY(-12px)',
    pointerEvents: 'none',
    zIndex: '100',
  });

  return { element: highlightLabel as HTMLDivElement, existing: false };
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

export const canvasAddElementButton = () => {
  if (typeof document === undefined) {
    return { element: null, existing: false };
  }

  const existingAddElementButton = document.querySelector(
    `[${DATA_CANVAS_OVERLAY_ADD_ELEMENT_BUTTON}]`
  );

  if (existingAddElementButton) {
    return {
      element: existingAddElementButton as HTMLDivElement,
      existing: true,
    };
  }

  const addElementButton = document.createElement('div');

  addElementButton.innerHTML = '+';

  addElementButton.classList.add(
    'rounded-full',
    'bg-violet-500',
    'text-xs',
    'overflow-hidden'
  );

  return { element: addElementButton as HTMLDivElement, existing: false };
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
