'use client';
import { Bold, Italic, Underline } from '@cms/ui/components/Icons';
import { Button, ButtonProps } from '@nextui-org/react';
import {
  toggleBoldMark,
  toggleItalicMark,
  toggleUnderlineMark
} from './commands';
import { CustomEditor } from './types';

const EditorToolbar = ({ editor }: { editor: CustomEditor }) => {
  const defaultProps: ButtonProps = {
    size: 'sm',
    color: 'primary',
    variant: 'light',
    radius: 'none',
  };

  return (
    <div>
      <Button
        {...defaultProps}
        startContent={<Bold />}
        onClick={(e) => {
          e.preventDefault();
          toggleBoldMark(editor);
        }}
      ></Button>
      <Button
        {...defaultProps}
        startContent={<Italic />}
        onClick={(e) => {
          e.preventDefault();
          toggleItalicMark(editor);
        }}
      ></Button>
      <Button
        {...defaultProps}
        startContent={<Underline />}
        onClick={(e) => {
          e.preventDefault();
          toggleUnderlineMark(editor);
        }}
      ></Button>
    </div>
  );
};

export default EditorToolbar;
