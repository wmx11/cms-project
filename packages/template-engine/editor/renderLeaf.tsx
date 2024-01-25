import { RenderLeafProps } from 'slate-react';
import { CustomText } from './types';

const renderLeaf = (props: RenderLeafProps) => {
  const styles = {
    bold: 'font-bold',
    italic: 'italic',
    strikethrough: 'line-through',
    underline: 'underline',
  } as unknown as keyof Omit<CustomText, 'text'>;

  const mappedStyles = Object.keys(props.leaf)
    .filter((item) => item !== 'text')
    .map((item) => styles[item as keyof typeof styles])
    .join(' ');

  return (
    <span {...props.attributes} className={mappedStyles}>
      {props.children}
    </span>
  );
};

export default renderLeaf;
