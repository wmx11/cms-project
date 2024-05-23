import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface TitleProps
  extends ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4'> {
  order?: 1 | 2 | 3 | 4;
}

const Title: FC<TitleProps> = ({ order = 1, className, ...props }) => {
  switch (order) {
    case 1:
      return (
        <h1
          {...props}
          className={twMerge('mb-4 text-6xl font-bold', className)}
        ></h1>
      );
    case 2:
      return (
        <h2 {...props} className={twMerge('mb-3 text-4xl', className)}></h2>
      );
    case 3:
      return (
        <h3 {...props} className={twMerge('mb-2 text-2xl', className)}></h3>
      );
    case 4:
      return (
        <h4 {...props} className={twMerge('mb-1 text-xl', className)}></h4>
      );
    default:
      return null;
  }
};

export default Title;
