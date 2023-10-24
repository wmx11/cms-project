import { RenderElementProps } from 'slate-react';

const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case 'code':
      return (
        <pre {...props.attributes}>
          <code>{props.children}</code>
        </pre>
      );
    default:
      return <p {...props.attributes}>{props.children}</p>;
  }
};

export default renderElement;
