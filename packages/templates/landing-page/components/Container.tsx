import { Schema } from '@cms/packages/template-engine/types';
import {
  horizontalAlign,
  layoutType,
  textAlign,
  verticalAlign,
} from '@cms/packages/template-engine/variants/variants';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const containerCva = cva('container mx-auto p-4', {
  variants: {
    horizontalAlign,
    verticalAlign,
    textAlign,
    layoutType,
  },
});

type ContainerVariantProps = VariantProps<typeof containerCva>;

const Container: FC<
  PropsWithChildren & HTMLAttributes<HTMLDivElement> & ContainerVariantProps
> = ({
  layoutType,
  textAlign,
  horizontalAlign,
  verticalAlign,
  className,
  children,
  style,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={twMerge(
        containerCva({
          className,
          horizontalAlign,
          layoutType,
          textAlign,
          verticalAlign,
        })
      )}
    >
      {children}
    </div>
  );
};

export default Container;

export const schema: Schema = {
  component: 'Container',
  category: 'layout',
  description:
    'Use Container components to keep your content within a specific width',
  props: [
    {
      name: 'children',
      type: 'component',
      value: [],
      displayName: 'Container components',
      description: 'Put other components inside the container',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
      displayName: 'Container classes',
      description: 'You can use Tailwind classes to style this container',
    },
  ],
};
