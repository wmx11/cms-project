import { Schema } from '@cms/template-engine/types';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Section: FC<PropsWithChildren & HTMLAttributes<HTMLBaseElement>> = ({
  children,
  className,
}) => {
  return <section className={twMerge('py-24', className)}>{children}</section>;
};

export default Section;

export const schema: Schema = {
  component: 'Section',
  category: 'layout',
  description:
    'Use Section components to split your website into different sections',
  props: [
    {
      name: 'children',
      type: 'component',
      value: [],
      displayName: 'Section components',
      description: 'Put other components inside the section',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
      displayName: 'Section classes',
      description: 'You can use Tailwind classes to style this section',
    },
  ],
};
