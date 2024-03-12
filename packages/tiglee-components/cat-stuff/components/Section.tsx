import { Schema } from '@cms/packages/tiglee-engine/types';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Section: FC<PropsWithChildren & HTMLAttributes<HTMLBaseElement>> = (
  props
) => {
  return (
    <section {...props} className={twMerge('py-24', props.className)}></section>
  );
};

export default Section;

export const schema: Schema = {
  component: 'Section',
  category: 'layout',
  description:
    'Use Section components to split your website into different sections',
  displayName: 'Section',
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
