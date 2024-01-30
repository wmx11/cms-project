import { DRATA_CANVAS_OVERLAY_DND_HIGHLIGHT } from '@cms/packages/template-engine/constants';

export const canvasDragAndDropHighlight = ({
  canvasOverlay,
}: {
  canvasOverlay: HTMLDivElement;
}) => {
  if (typeof document === undefined) {
    return { element: null, existing: false };
  }

  const existingDnDHighlight = document.querySelector(
    `[${DRATA_CANVAS_OVERLAY_DND_HIGHLIGHT}]`
  );

  if (existingDnDHighlight) {
    return { element: existingDnDHighlight as HTMLDivElement, existing: true };
  }

  const dNdHighlight = document.createElement('div');

  dNdHighlight.setAttribute(DRATA_CANVAS_OVERLAY_DND_HIGHLIGHT, '');

  dNdHighlight.classList.add('bg-violet-500', 'shadow-lg', 'shadow-violet-500');

  canvasOverlay?.appendChild(dNdHighlight);

  return { element: dNdHighlight as HTMLDivElement, existing: false };
};
