import { Schema } from '@cms/template-engine/types';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Paragraph: FC<
  PropsWithChildren & HTMLAttributes<HTMLParagraphElement>
> = ({ children, id, className }) => {
  return (
    <p id={id} data-label="Paragraph" className={twMerge('mb-2', className)}>
      {children}
    </p>
  );
};

export default Paragraph;

export const schema: Schema = {
  component: 'Paragraph',
  category: 'typography',
  richText: true,
  description:
    'Use Container components to keep your content within a specific width',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Default paragraph',
      displayName: 'Container components',
      description: 'Put other components inside the container',
    },
  ],
};
