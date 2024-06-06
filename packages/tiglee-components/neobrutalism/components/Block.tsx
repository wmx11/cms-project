import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Block: FC<ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div {...props} className={twMerge(props.className)}></div>;
};

export default Block;

export const schema: Schema = {
  component: 'Block',
  category: 'layout',
  description: 'Use block elements to vertically stack or wrap your content.',
  displayName: 'Block (<div>)',
  props: [
    {
      name: 'children',
      type: 'component',
      value: [],
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
  ],
};
