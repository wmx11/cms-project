import { Editor } from 'slate';
import { CustomEditor } from './types';

// Bold
export const isBoldMarkActive = (editor: CustomEditor) => {
  const marks = Editor.marks(editor);
  return marks ? marks.bold : false;
};

export const toggleBoldMark = (editor: CustomEditor) => {
  const isActive = isBoldMarkActive(editor);
  if (isActive) {
    Editor.removeMark(editor, 'bold');
  } else {
    Editor.addMark(editor, 'bold', true);
  }
};

// Italic
export const isItalicMarkActive = (editor: CustomEditor) => {
  const marks = Editor.marks(editor);
  return marks ? marks.italic : false;
};

export const toggleItalicMark = (editor: CustomEditor) => {
  const isActive = isItalicMarkActive(editor);
  if (isActive) {
    Editor.removeMark(editor, 'italic');
  } else {
    Editor.addMark(editor, 'italic', true);
  }
};

// Underline
export const isUnderlineActive = (editor: CustomEditor) => {
  const marks = Editor.marks(editor);
  return marks ? marks.underline : false;
};

export const toggleUnderlineMark = (editor: CustomEditor) => {
  const isActive = isUnderlineActive(editor);
  if (isActive) {
    Editor.removeMark(editor, 'underline');
  } else {
    Editor.addMark(editor, 'underline', true);
  }
};
