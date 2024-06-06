import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Text: FC<ComponentPropsWithoutRef<'p'>> = (props) => {
  return (
    <p className={twMerge('text-tg-foreground', props.className)}>
      {props.children}
    </p>
  );
};

export default Text;

export const schema: Schema = {
  component: 'Text',
  category: 'text',
  richText: true,
  description: 'Start writing with plain text.',
  displayName: 'Text',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Your text here.',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
  ],
};
