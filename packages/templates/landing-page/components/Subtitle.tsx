import { Schema } from '@cms/packages/template-engine/types';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Subtitle: FC<PropsWithChildren & HTMLAttributes<HTMLTitleElement>> = (
  props
) => {
  return (
    <h2
      className={twMerge('mb-2 text-tg-foreground', props.className)}
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
