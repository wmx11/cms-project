import { Schema } from '@cms/packages/template-engine/types';
import { FC, HTMLProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Paragraph: FC<PropsWithChildren & HTMLProps<HTMLParagraphElement>> = (
  props
) => {
  return <p className={twMerge('mb-2 text-tg-foreground', props.className)}>{props.children}</p>;
};

export default Paragraph;

export const schema: Schema = {
  component: 'Paragraph',
  category: 'text',
  richText: true,
  description:
    'Use Container components to keep your content within a specific width',
  displayName: 'Paragraph',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Default paragraph',
      displayName: 'Container components',
      description: 'Put other components inside the container',
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
