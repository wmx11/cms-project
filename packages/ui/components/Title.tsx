import { textAlign } from '@cms/packages/template-engine/variants/variants';
import { cva, type VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const titleCva = cva('text-4xl font-bold mb-4', {
  variants: {
    textAlign,
  },
});

type TitleVariantProps = VariantProps<typeof titleCva>;

const Title: FC<
  PropsWithChildren & HTMLAttributes<HTMLHeadingElement> & TitleVariantProps
> = ({ children, className, textAlign }) => {
  return (
    <h1 className={twMerge(titleCva({ textAlign, className }))}>{children}</h1>
  );
};

export default Title;
