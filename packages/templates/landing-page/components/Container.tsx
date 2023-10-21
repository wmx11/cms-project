import { Schema } from '@cms/template-engine/types';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Container: FC<PropsWithChildren & HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div
      {...props}
      className={twMerge('container mx-auto p-4', props?.className)}
    >
      {props?.children}
    </div>
  );
};

export default Container;

export const schema: Schema = {
  component: 'Container',
  category: 'layout',
  description:
    'Use Container components to keep your content within a specific width',
  props: [
    {
      name: 'children',
      type: 'component',
      value: [],
      displayName: 'Container components',
      description: 'Put other components inside the container',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
      displayName: 'Container classes',
      description: 'You can use Tailwind classes to style this container',
    },
  ],
};
