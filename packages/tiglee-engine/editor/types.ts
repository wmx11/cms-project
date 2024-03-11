import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type CodeElement = {
  type: 'code';
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
};

export type FormattedText = {
  text: string;
  bold?: false;
  italic?: false;
  underline?: false;
  strikethrough?: false;
};

export type CustomText = FormattedText;

export type CustomElement = ParagraphElement | HeadingElement | CodeElement;

export type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
