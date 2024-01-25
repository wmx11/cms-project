import { FC, useCallback, useState } from 'react';
import { Descendant, Editor, Transforms, createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import EditorToolbar from './EditorToolbar';
import renderElement from './renderElement';
import renderLeaf from './renderLeaf';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

interface SlateEditorProps {
  initialValue: Descendant[];
}

const SlateEditor: FC = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const renderElementController = useCallback(renderElement, []);
  const renderLeafController = useCallback(renderLeaf, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <EditorToolbar editor={editor} />
      <Editable
        renderElement={renderElementController}
        renderLeaf={renderLeafController}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case '`': {
              event.preventDefault();
              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === 'code',
              });
              Transforms.setNodes(
                editor,
                { type: match ? null : 'code' },
                { match: (n) => Editor.isBlock(editor, n) }
              );
              break;
            }

            case 'b': {
              event.preventDefault();
              Editor.addMark(editor, 'bold', true);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default SlateEditor;
