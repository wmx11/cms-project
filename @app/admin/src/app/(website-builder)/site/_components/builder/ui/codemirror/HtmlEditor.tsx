'use client';
import { html } from '@codemirror/lang-html';
import CodeMirror from '@uiw/react-codemirror';
import { FC, useCallback, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const HtmlEditor: FC<Props> = ({ value, onChange }) => {
  const [_value, _setValue] = useState<string>(value);

  const _onChange = useCallback((value: string) => {
    _setValue(value);
    onChange(value);
  }, []);

  return (
    <CodeMirror
      value={_value}
      onChange={_onChange}
      extensions={[html()]}
      height="200px"
    />
  );
};

export default HtmlEditor;
