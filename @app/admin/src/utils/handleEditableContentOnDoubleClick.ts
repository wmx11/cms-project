import { MouseEvent as ReactMouseEvent } from 'react';
import { selectTextContent } from './selectTextContent';

export const handleEditableContentOnDoubleClick = <T extends MouseEvent>(
  e: T | ReactMouseEvent<HTMLElement>
) => {
  const target = e.currentTarget as HTMLElement;

  if (!target) {
    return;
  }

  target.setAttribute('contenteditable', 'true');
  target.focus();
  selectTextContent(target);
};
