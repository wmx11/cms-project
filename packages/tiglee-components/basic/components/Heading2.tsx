import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading2: FC<ComponentPropsWithoutRef<'h2'>> = (props) => {
  return (
    <h2
      className={twMerge(
        'text-tg-foreground mb-4 text-3xl',
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: props.children || '' }}
    ></h2>
  );
};

export default Heading2;

export const schema: Schema = {
  component: 'Heading2',
  category: 'heading',
  editable: true,
  description: 'Medium section heading.',
  displayName: 'Heading 2',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Heading 2',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
  ],
};
