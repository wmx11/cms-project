import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Title: FC<PropsWithChildren & HTMLAttributes<HTMLTimeElement>> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={twMerge(
        'text-7xl text-zinc-800 font-black mb-8 uppercase leading-tight',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
