import { Schema } from '@cms/template-engine/types';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Title: FC<PropsWithChildren & HTMLAttributes<HTMLTimeElement>> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={twMerge(
        'text-7xl text-zinc-800 font-black mb-8 uppercase leading-tight',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Title;

export const schema: Schema = {
  component: 'Title',
  category: 'typography',
  description: 'Use this to give titles to something',
  props: [
    {
      name: 'children',
      type: 'string',
      value: '',
      displayName: 'Your title',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
      displayName: 'Title classes',
      description: 'You can use Tailwind classes to style this title',
    },
  ],
};
