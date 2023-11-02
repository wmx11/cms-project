import {
  DATA_ACCEPTS_CHILDREN,
  DATA_CANVAS,
} from '@cms/template-engine/constants';

export const handleDragStart = (e: Event) => {
  const event = e as DragEvent;
  const target = e.target as HTMLBaseElement;
  event.dataTransfer?.clearData();
  event.dataTransfer?.setData('text/plain', target.id as string);
};

export const handleDragEnd = (e: Event) => {
  const target = e.target as HTMLBaseElement;
};

export const handleDrag = (e: Event) => {
  e.preventDefault();
  const event = e as DragEvent;
  const target = e.target as HTMLBaseElement;
};

export const handleDragOver = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLBaseElement;

  if (target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'false') {
    Object.assign(target.style, {
      borderColor: 'red',
      background: 'red',
    });

    return;
  }

  Object.assign(target.style, {
    borderColor: 'green',
    background: 'green',
  });
};

export const handleDragEnter = (e: Event) => {
  const target = e.target as HTMLBaseElement;

  if (target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'false') {
    Object.assign(target.style, {
      borderColor: 'red',
      background: 'red',
    });

    return;
  }

  Object.assign(target.style, {
    borderColor: 'green',
    background: 'green',
  });
};

export const handleDragLeave = (e: Event) => {
  const target = e.target as HTMLBaseElement;
  Object.assign(target.style, {
    borderColor: '',
    background: '',
  });
};

export const handleDrop = (e: Event) => {
  e.preventDefault();
  const event = e as DragEvent;

  const data = event.dataTransfer?.getData('text');

  const element = document.getElementById(data as string);

  const target = e.target as HTMLBaseElement;

  if (
    target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'true' &&
    element &&
    target.id !== data
  ) {
    target.appendChild(element);
  }

  Object.assign(target.style, {
    borderColor: '',
    background: '',
  });
};

export const initHandleDragAndDrop = () => {
  if (typeof window === undefined) {
    return null;
  }

  const dropZones = document.querySelectorAll(
    `[${DATA_ACCEPTS_CHILDREN}=true]`
  ) as unknown as HTMLBaseElement[];

  const draggableItems = document.querySelectorAll(
    '[draggable]'
  ) as unknown as HTMLBaseElement[];

  dropZones.forEach((dropZone) => {
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
  });

  draggableItems.forEach((draggableItem) => {
    draggableItem.addEventListener('dragstart', handleDragStart);
    draggableItem.addEventListener('drag', handleDrag);
    draggableItem.addEventListener('dragend', handleDragEnd);
  });
};
