import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Container: FC<ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div
      {...props}
      className={twMerge('container mx-auto p-4', props.className)}
    >
      {props.children}
    </div>
  );
};

export default Container;

export const schema: Schema = {
  component: 'Container',
  category: 'layout',
  description: 'Keep your content at specific width.',
  displayName: 'Container',
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
