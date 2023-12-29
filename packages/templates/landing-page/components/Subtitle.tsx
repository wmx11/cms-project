import { Schema } from '@cms/packages/template-engine/types';
import {
  fontSize,
  textAlign,
} from '@cms/packages/template-engine/variants/variants';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const subtitleCva = cva('text-xl mb-2', {
  variants: {
    textAlign,
    fontSize,
  },
});

type SubtitleVariantProps = VariantProps<typeof subtitleCva>;

const Subtitle: FC<
  PropsWithChildren & HTMLAttributes<HTMLTitleElement> & SubtitleVariantProps
> = (props) => {
  return (
    <h2 className={twMerge(subtitleCva({ ...props } as SubtitleVariantProps))}>
      {props.children}
    </h2>
  );
};

export default Subtitle;

export const schema: Schema = {
  component: 'Subtitle',
  category: 'typography',
  editable: true,
  description:
    'Use Container components to keep your content within a specific width',
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
