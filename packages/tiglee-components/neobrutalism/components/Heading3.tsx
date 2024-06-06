import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading3: FC<ComponentPropsWithoutRef<'h3'>> = (props) => {
  return (
    <h3
      className={twMerge(
        'text-tg-foreground mb-2 text-xl font-semibold',
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: props.children as string }}
    ></h3>
  );
};

export default Heading3;

export const schema: Schema = {
  component: 'Heading3',
  category: 'heading',
  editable: true,
  description: 'Small section heading.',
  displayName: 'Heading 3',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Heading 3',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
  ],
};
