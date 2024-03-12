import {
  DATA_ACCEPTS_CHILDREN,
  DATA_DND_INITIALIZED,
  DATA_TARGET_ID,
  DRAGGABLE,
} from '@cms/packages/tiglee-engine/constants';
import dragAndDropComponent from '@cms/packages/tiglee-engine/modules/dragAndDropComponent';
import { BuilderStoreState } from '@admin/store/useBuilderStore';
import { BuilderState } from '@admin/types';
import { CanvasHandlerProps } from './canvasEventsHandlers';
import { canvasDragAndDropHighlight } from './canvasOverlayElements';

const RED = '#fee2e2';
const GREEN = '#dcfce7';

let builderState: BuilderStoreState | null = null;
let canvas: HTMLDivElement | null = null;
let canvasOverlay: HTMLDivElement | null = null;
let canvasRect: DOMRect | undefined = undefined;
let draggableElement: HTMLBaseElement | null = null;

const getElementInsertPosition = (item: Element, cursorY: number) => {
  const { y, height } = item.getBoundingClientRect();
  const elementHalfHeight = height / 2;
  const isCursorBeyondHalfElement = cursorY > y + elementHalfHeight;
  const acceptsChildren = item.getAttribute(DATA_ACCEPTS_CHILDREN) === 'true';

  if (acceptsChildren) {
    return isCursorBeyondHalfElement ? 'beforeend' : 'afterbegin';
  }

  if (!acceptsChildren) {
    return isCursorBeyondHalfElement ? 'afterend' : 'beforebegin';
  }

  return 'beforeend';
};

export const handleDragStart = (e: DragEvent) => {
  const target = e.target as HTMLBaseElement;
  draggableElement = target;
  e.dataTransfer?.clearData();
  e.dataTransfer?.setData(
    'text/plain',
    target.getAttribute(DATA_TARGET_ID) || (target.id as string)
  );
};

export const handleDragEnd = (e: DragEvent) => {
  draggableElement = null;
};

export const handleDrag = (e: DragEvent) => {
  e.preventDefault();
};

export const handleDragOver = (e: DragEvent) => {
  e.preventDefault();

  const target = e.target as HTMLBaseElement;

  const position = getElementInsertPosition(target, e.clientY);

  const highlight = canvasDragAndDropHighlight({
    canvasOverlay: canvasOverlay as HTMLDivElement,
  });

  if (highlight.element && canvasRect && draggableElement) {
    const { top, height, width, left } = target.getBoundingClientRect();

    const getTopPosition = () => {
      if (!canvasRect) {
        return 0;
      }

      if (position.includes('end')) {
        return top + height - canvasRect?.y - 2;
      }

      return top - canvasRect?.y;
    };
    Object.assign(highlight.element?.style, {
      position: 'absolute',
      width: `${width}px`,
      zIndex: '100',
      height: '2px',
      top: `${getTopPosition()}px`,
      left: `${left - canvasRect.x}px`,
    });
  }

  if (target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'false') {
    Object.assign(target.style, {
      background: RED,
    });

    return;
  }

  Object.assign(target.style, {
    background: GREEN,
  });
};

export const handleDragEnter = (e: DragEvent) => {
  const target = e.target as HTMLBaseElement;

  if (target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'false') {
    Object.assign(target.style, {
      background: RED,
    });

    return;
  }

  Object.assign(target.style, {
    background: GREEN,
  });
};

export const handleDragLeave = (e: DragEvent) => {
  const target = e.target as HTMLBaseElement;
  Object.assign(target.style, {
    background: '',
  });
};

export const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopImmediatePropagation();

  const data = e.dataTransfer?.getData('text');
  const element = document.getElementById(data as string);
  const target = e.target as HTMLBaseElement;

  const elementInsertPosition = getElementInsertPosition(
    target as HTMLElement,
    e.clientY
  );

  const highlight = canvasDragAndDropHighlight({
    canvasOverlay: canvasOverlay as HTMLDivElement,
  });

  if (highlight.element) {
    highlight.element.remove();
  }

  Object.assign(target.style, {
    borderColor: '',
    background: '',
  });

  if (!builderState) {
    return null;
  }

  const elementId = element?.getAttribute(DATA_TARGET_ID) || element?.id;
  const targetId = target?.getAttribute(DATA_TARGET_ID) || target?.id;

  const newSchema = dragAndDropComponent({
    schema: builderState?.schema,
    selectedComponentPath: elementId as string,
    targetComponentPath: targetId as string,
    insertPosition: elementInsertPosition,
  });

  if (!newSchema) {
    return null;
  }

  builderState.renderTemplate(newSchema);
};

export const initHandleDragAndDrop = ({
  canvasRef,
  canvasOverlayRef,
  state,
}: CanvasHandlerProps & BuilderState) => {
  canvas = canvasRef.current;
  canvasOverlay = canvasOverlayRef.current;
  canvasRect = canvas?.getBoundingClientRect();
  builderState = state;

  const dropZones = document.querySelectorAll(
    `[${DATA_ACCEPTS_CHILDREN}=true]:not([${DATA_DND_INITIALIZED}=true])`
  ) as unknown as HTMLBaseElement[];

  const draggableItems = document.querySelectorAll(
    `[${DRAGGABLE}]:not([${DATA_DND_INITIALIZED}=true])`
  ) as unknown as HTMLBaseElement[];

  dropZones.forEach((dropZone) => {
    dropZone.setAttribute(DATA_DND_INITIALIZED, 'true');
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
  });

  draggableItems.forEach((draggableItem) => {
    draggableItem.setAttribute(DATA_DND_INITIALIZED, 'true');
    draggableItem.addEventListener('dragstart', handleDragStart);
    draggableItem.addEventListener('drag', handleDrag);
    draggableItem.addEventListener('dragend', handleDragEnd);
  });
};
