import {
  DATA_ACCEPTS_CHILDREN,
  DATA_DND_INITIALIZED,
  DRAGGABLE,
} from '@cms/template-engine/constants';
import dragAndDropComponent from '@cms/template-engine/modules/dragAndDropComponent';
import { BuilderStoreState } from '../../../store/useGlobalStore';
import { BuilderState } from '../../../types';
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

  return 'afterend';
};

export const handleDragStart = (e: Event) => {
  const event = e as DragEvent;
  const target = e.target as HTMLBaseElement;
  draggableElement = target;
  event.dataTransfer?.clearData();
  event.dataTransfer?.setData('text/plain', target.id as string);
};

export const handleDragEnd = (e: Event) => {
  draggableElement = null;
};

export const handleDrag = (e: Event) => {
  e.preventDefault();
};

export const handleDragOver = (e: Event) => {
  e.preventDefault();
  const event = e as DragEvent;
  const target = e.target as HTMLBaseElement;

  const position = getElementInsertPosition(target, event.clientY);

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

export const handleDragEnter = (e: Event) => {
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

export const handleDragLeave = (e: Event) => {
  const target = e.target as HTMLBaseElement;
  Object.assign(target.style, {
    background: '',
  });
};

export const handleDrop = (e: Event) => {
  e.preventDefault();
  const event = e as DragEvent;

  const data = event.dataTransfer?.getData('text');

  const element = document.getElementById(data as string);

  const target = e.target as HTMLBaseElement;

  const elementInsertPosition = getElementInsertPosition(
    target as HTMLElement,
    event.clientY
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

  const newSchema = dragAndDropComponent({
    schema: builderState?.schema,
    selectedComponentPath: draggableElement?.id as string,
    targetComponentPath: target?.id as string,
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
