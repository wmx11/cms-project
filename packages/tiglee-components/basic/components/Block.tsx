import { Schema } from '@cms/packages/tiglee-engine/types';
import {
  ComponentPropsWithoutRef,
  FC
} from 'react';
import { twMerge } from 'tailwind-merge';

const Block: FC<ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div {...props} className={twMerge('', props.className)}></div>;
};

export default Block;

export const schema: Schema = {
  component: 'Block',
  category: 'layout',
  description: 'Use Block element to vertically stack your content',
  displayName: 'Block',
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
      displayName: 'Block classes',
      description: 'You can use Tailwind classes to style this block',
    },
  ],
};
