import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Section: FC<ComponentPropsWithoutRef<'section'>> = (props) => {
  return (
    <section {...props} className={twMerge('py-24', props.className)}></section>
  );
};

export default Section;

export const schema: Schema = {
  component: 'Section',
  category: 'layout',
  description: 'Split your website into sections.',
  displayName: 'Section',
  props: [
    {
      name: 'children',
      type: 'component',
      value: [],
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
  ],
};
