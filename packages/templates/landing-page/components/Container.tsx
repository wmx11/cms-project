import { Schema } from '@cms/template-engine/types';
import React, { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="container mx-auto p-4">{children}</div>;
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
  ],
};
