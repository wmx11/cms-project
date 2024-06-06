import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading3: FC<ComponentPropsWithoutRef<'h3'>> = (props) => {
  return (
    <h3
      className={twMerge(
        'text-tg-foreground mb-2 text-xl font-semibold',
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: props.children as string }}
    ></h3>
  );
};

export default Heading3;

export { schema } from '@cms/packages/tiglee-components/basic/components/Heading3';
