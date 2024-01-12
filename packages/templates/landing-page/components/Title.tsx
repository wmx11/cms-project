import { Schema } from '@cms/packages/template-engine/types';
import { FC, HTMLProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Title: FC<PropsWithChildren & HTMLProps<HTMLTitleElement>> = (props) => {
  return (
    <h1
      className={twMerge(
        'text-7xl text-zinc-800 font-black mb-8 uppercase leading-tight',
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: props.children || '' }}
    ></h1>
  );
};

export default Title;

export const schema: Schema = {
  component: 'Title',
  category: 'typography',
  editable: true,
  description: 'Use this to give titles to something',
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
