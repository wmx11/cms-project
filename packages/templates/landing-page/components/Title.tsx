import { Schema } from '@cms/template-engine/types';
import { textAlign, fontSize } from '@cms/template-engine/variants/variants';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const titleCva = cva(
  'text-7xl text-zinc-800 font-black mb-8 uppercase leading-tight',
  {
    variants: {
      textAlign,
      fontSize,
    },
  }
);

type TitleVariantProps = VariantProps<typeof titleCva>;

const Title: FC<
  PropsWithChildren & HTMLAttributes<HTMLTitleElement> & TitleVariantProps
> = (props) => {
  return (
    <h1
      style={JSON.parse((props.style as string) || '{}')}
      className={twMerge(titleCva({ ...props } as TitleVariantProps))}
    >
      {props.children}
    </h1>
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
    {
      name: 'style',
      type: 'string',
      value: '{}',
      displayName: 'Title styles',
      description: 'You can use Tailwind classes to style this title',
    },
  ],
};
