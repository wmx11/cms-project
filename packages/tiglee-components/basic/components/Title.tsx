import { Schema } from '@cms/packages/tiglee-engine/types';
import { FC, HTMLProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Title: FC<PropsWithChildren & HTMLProps<HTMLTitleElement>> = (props) => {
  return (
    <h1
      className={twMerge(
        'text-tg-foreground mb-8 text-7xl font-black uppercase leading-tight',
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: props.children || '' }}
    ></h1>
  );
};

export default Title;

export const schema: Schema = {
  component: 'Title',
  category: 'heading',
  editable: true,
  description: 'Use this to give titles to something',
  displayName: 'Title',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Title',
      displayName: 'Your title',
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
