import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading1: FC<ComponentPropsWithoutRef<'h1'>> = (props) => {
  return (
    <h1
      className={twMerge(
        'text-tg-foreground mb-8 text-7xl font-black leading-tight',
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: props.children as string }}
    ></h1>
  );
};

export default Heading1;

export { schema } from '@cms/packages/tiglee-components/basic/components/Heading1';
