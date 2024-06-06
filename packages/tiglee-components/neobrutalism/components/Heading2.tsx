import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading2: FC<ComponentPropsWithoutRef<'h2'>> = (props) => {
  return (
    <h2
      className={twMerge(
        'text-tg-foreground mb-4 text-3xl font-bold',
        props.className
      )}
      dangerouslySetInnerHTML={{ __html: props.children as string }}
    ></h2>
  );
};

export default Heading2;

export { schema } from '@cms/packages/tiglee-components/basic/components/Heading2';
