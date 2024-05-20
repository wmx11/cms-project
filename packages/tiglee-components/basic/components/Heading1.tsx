import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading1: FC<ComponentPropsWithoutRef<'h1'>> = (props) => {
  return (
    <h1
      className={twMerge(
        'text-tg-foreground mb-8 text-7xl leading-tight',
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: props.children as string }}
    ></h1>
  );
};

export default Heading1;

export const schema: Schema = {
  component: 'Heading1',
  category: 'heading',
  editable: true,
  description: 'Big section heading.',
  displayName: 'Heading 1',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Heading 1',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
  ],
};
