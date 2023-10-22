import { Schema } from '@cms/template-engine/types';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Subtitle: FC<PropsWithChildren & HTMLAttributes<HTMLTitleElement>> = ({
  children,
  className,
  id,
}) => {
  return (
    <h2
      id={id}
      data-editable
      data-label="Subtitle"
      className={twMerge('text-xl mb-2', className)}
    >
      {children}
    </h2>
  );
};

export default Subtitle;

export const schema: Schema = {
  component: 'Subtitle',
  category: 'typography',
  description:
    'Use Container components to keep your content within a specific width',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Default subtitle',
      displayName: 'Container components',
      description: 'Put other components inside the container',
    },
  ],
};
