import { Schema } from '@cms/template-engine/types';
import {
  horizontalAlign,
  textAlign,
  verticalAlign,
  layoutType,
  flexColumns,
} from '@cms/template-engine/variants/variants';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const sectionCva = cva('py-24', {
  variants: {
    horizontalAlign,
    verticalAlign,
    textAlign,
    layoutType,
    flexColumns,
  },
});

type SectionVariantProps = VariantProps<typeof sectionCva>;

const Section: FC<
  PropsWithChildren & HTMLAttributes<HTMLBaseElement> & SectionVariantProps
> = ({
  layoutType,
  flexColumns,
  textAlign,
  horizontalAlign,
  verticalAlign,
  className,
  children,
  style,
  ...restProps
}) => {
  return (
    <section
      {...restProps}
      style={JSON.parse((style as string) || '{}')}
      className={twMerge(
        sectionCva({
          layoutType,
          flexColumns,
          textAlign,
          horizontalAlign,
          verticalAlign,
          className,
        })
      )}
    >
      {children}
    </section>
  );
};

export default Section;

export const schema: Schema = {
  component: 'Section',
  category: 'layout',
  description:
    'Use Section components to split your website into different sections',
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
    {
      name: 'style',
      type: 'string',
      value: '',
      displayName: 'Section styles',
      description: 'You can use Tailwind classes to style this section',
    },
  ],
};
