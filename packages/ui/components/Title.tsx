import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Title: FC<PropsWithChildren & HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
}) => {
  return (
    <h1 className={twMerge('text-4xl font-bold mb-4', className)}>
      {children}
    </h1>
  );
};

export default Title;
