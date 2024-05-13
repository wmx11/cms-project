import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Subtitle: FC<ComponentPropsWithoutRef<'h2'>> = (props) => {
  return (
    <h2
      className={twMerge('text-tg-foreground mb-2', props.className)}
      dangerouslySetInnerHTML={{ __html: props.children || '' }}
    ></h2>
  );
};

export default Subtitle;

export const schema: Schema = {
  component: 'Subtitle',
  category: 'heading',
  editable: true,
  description:
    'Use Container components to keep your content within a specific width',
  displayName: 'Subtitle',
  props: [
    {
      name: 'className',
      type: 'string',
      value: '',
      displayName: 'Title classes',
      description: 'You can use Tailwind classes to style this title',
    },
    {
      name: 'children',
      type: 'string',
      value: 'Default subtitle',
      displayName: 'Container components',
      description: 'Put other components inside the container',
    },
  ],
};
